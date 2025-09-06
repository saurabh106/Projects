"use server";

import { db } from "@/firebase/admin";

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    
    const userRecord = await db.collection("users").doc(uid).get();


    if (userRecord.exists) {
        return {
            success: false,
            message: "User already exists. Please Sign in instead ",
        };
    }
await db.collection("users").doc(uid).set({
      name,
      email,
      
    });

  } catch (e: any) {
    console.error("Error creating a user", e);

    if (e.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "The email is already in use",
      };
    }
    return {
      success: false,
      message: "Failed to create an account",
    };
  }
}
