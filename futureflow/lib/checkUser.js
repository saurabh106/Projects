// lib/checkUser.js
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const CLOCK_SKEW_BUFFER = 60; // seconds
const MAX_RETRIES = 3;

async function withClockRetry(fn) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.message.includes('token-not-active-yet')) {
        const delay = attempt * CLOCK_SKEW_BUFFER * 1000;
        console.warn(`Clock skew detected (attempt ${attempt}), waiting ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error(`Failed after ${MAX_RETRIES} retries`);
}

export const checkUser = async () => {
  try {
    // Handle authentication with clock skew retries
    const { userId } = await withClockRetry(async () => {
      const authResult = await auth();
      if (!authResult.userId) throw new Error("No authenticated user");
      return authResult;
    });

    // Get user details
    const user = await currentUser();
    if (!user) {
      console.warn("Clerk user details not available");
      return null;
    }

    // Process user data
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Anonymous";
    const primaryEmail = user.emailAddresses[0]?.emailAddress;
    
    if (!primaryEmail) {
      console.warn("No valid email found for Clerk user");
      return null;
    }

    // Database operation
    return await db.user.upsert({
      where: { email: primaryEmail },
      update: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        updatedAt: new Date()
      },
      create: {
        clerkUserId: user.id,
        name,
        email: primaryEmail,
        imageUrl: user.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

  } catch (error) {
    console.error("Authentication error:", {
      message: error.message,
      stack: error.stack,
      timeDifference: Math.floor((new Date() - error.time) / 1000)
    });

    if (error.message.includes('infinite redirect loop')) {
      console.error("CRITICAL: Clerk keys mismatch - verify environment variables");
    }
 if (error.code) {
      switch (error.code) {
        case "P2021": // Prisma table does not exist
        case "P2023": // Invalid ID
        case "P2025": // Record not found
          console.error("Database error:", error.code, error.meta);
          break;
      }
    }
    return null;
  }
};