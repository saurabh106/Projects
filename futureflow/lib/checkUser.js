import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  // Get the current user from Clerk
  const user = await currentUser();
  console.debug("[checkUser] Clerk user:", user?.id);

  if (!user) {
    console.debug("[checkUser] No user found in Clerk");
    return null;
  }

  try {
    // Check if user already exists in our database
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      console.debug("[checkUser] Existing user found:", loggedInUser.id);
      return loggedInUser;
    }

    // Prepare user data for creation
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
    const email = user.emailAddresses[0]?.emailAddress;
    
    if (!email) {
      console.error("[checkUser] No email address found for user");
      throw new Error("User email address not found");
    }

    console.debug("[checkUser] Creating new user with email:", email);

    // Try to create new user with upsert to handle potential race conditions
    const newUser = await db.user.upsert({
      where: { email },
      update: {
        // Update these fields if user exists with same email but different Clerk ID
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
      },
      create: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
      },
    });

    console.debug("[checkUser] New user created:", newUser.id);
    return newUser;

  } catch (error) {
    console.error("[checkUser] Error:", error);
    
    // Additional error handling for Prisma errors
    if (error.code === 'P2002') {
      console.error("[checkUser] Unique constraint violation:", error.meta?.target);
      
      // Try to find the conflicting user
      const conflictingUser = await db.user.findFirst({
        where: {
          OR: [
            { clerkUserId: user.id },
            { email: user.emailAddresses[0]?.emailAddress }
          ]
        }
      });
      
      console.debug("[checkUser] Conflicting user found:", conflictingUser?.id);
      
      // If we found a user with the same email but different Clerk ID
      if (conflictingUser && conflictingUser.clerkUserId !== user.id) {
        throw new Error("This email is already associated with another account");
      }
      
      // If we found a user with the same Clerk ID (shouldn't happen due to earlier check)
      if (conflictingUser?.clerkUserId === user.id) {
        return conflictingUser;
      }
    }
    
    throw error; // Re-throw other errors
  }
};