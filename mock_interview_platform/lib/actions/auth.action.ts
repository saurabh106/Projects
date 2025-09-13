"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

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

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User not found. Please sign up first.",
      };
    }
    await setSessionCookie(idToken);
    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (e) {
    console.error("Error signing in", e);
    return {
      success: false,
      message: "Failed to sign in",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookiedStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookiedStore.set("session", sessionCookie, {
    httpOnly: true,
    maxAge: ONE_WEEK,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return sessionCookie;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const sessionCookie = (await cookieStore).get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userDoc = await db.collection("users").doc(decodedClaims.uid).get();

    if (!userDoc.exists) return null;

    return {
      ...userDoc.data(),
      id: userDoc.id,
    } as User;
  } catch (e) {
    console.error("Error fetching user data", e);
    return null;
  }
}
