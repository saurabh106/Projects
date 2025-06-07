// lib/checkUser.js
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      console.warn("No Clerk user found");
      return null;
    }

    // Safely get user details with fallbacks
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Unknown";
    const email = user.emailAddresses[0]?.emailAddress;
    
    if (!email) {
      console.warn("No email found for Clerk user");
      return null;
    }

    // First try to find user by clerkUserId
    const existingUserByClerkId = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (existingUserByClerkId) {
      return existingUserByClerkId;
    }

    // Check if email exists with different clerkUserId
    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      // Case 1: Email exists but with different clerkUserId - merge accounts
      if (existingUserByEmail.clerkUserId && existingUserByEmail.clerkUserId !== user.id) {
        console.warn(`Email ${email} already associated with different Clerk account`);
        // Option 1: Update existing record (recommended)
        const updatedUser = await db.user.update({
          where: { email },
          data: { clerkUserId: user.id },
        });
        return updatedUser;
        
    
      }
      return await db.user.update({
        where: { email },
        data: { clerkUserId: user.id },
      });
    }

    // Create new user if no existing records found
    return await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        email,
        imageUrl: user.imageUrl,
      },
    });

  } catch (error) {
    console.error("Error in checkUser:", error);
    
    // Handle specific Prisma errors
    if (error.code === "P2002") {
      console.error("Unique constraint violation:", error.meta?.target);
    }
    
    return null;
  }
};