"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// Custom error class for user-related errors
class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}

// Debug utility
const debug = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEBUG] ${message}`, data ?? "");
  }
};

// CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    debug("Creating user", { clerkId: user.clerkId });

    const newUser = await User.create(user);
    debug("User created successfully", { userId: newUser._id });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    debug("Error creating user", error);
    handleError(error);
    throw error; // Re-throw after handling
  }
}

// READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();
    debug("Fetching user by ID", { userId });

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      debug("User not found", { userId });
      return null; // Return null instead of throwing error
    }

    debug("User found", { userId: user._id });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    debug("Error fetching user", { userId, error });
    handleError(error);
    throw error; // Re-throw after handling
  }
}

// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();
    debug("Updating user", { clerkId });

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) {
      debug("User update failed - user not found", { clerkId });
      throw new UserError("User update failed - user not found");
    }

    debug("User updated successfully", { userId: updatedUser._id });
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    debug("Error updating user", { clerkId, error });
    handleError(error);
    throw error;
  }
}

// DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();
    debug("Deleting user", { clerkId });

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      debug("User not found for deletion", { clerkId });
      return null; // Return null instead of throwing error
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");
    debug("User deleted successfully", { userId: deletedUser?._id });

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    debug("Error deleting user", { clerkId, error });
    handleError(error);
    throw error;
  }
}

// USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();
    debug("Updating user credits", { userId, creditFee });

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    );

    if (!updatedUserCredits) {
      debug("User credits update failed - user not found", { userId });
      throw new UserError("User credits update failed");
    }

    debug("Credits updated successfully", { 
      userId: updatedUserCredits._id,
      newBalance: updatedUserCredits.creditBalance 
    });
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    debug("Error updating credits", { userId, creditFee, error });
    handleError(error);
    throw error;
  }
}