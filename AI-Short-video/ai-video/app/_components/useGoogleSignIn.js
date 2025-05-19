// app/_hooks/useGoogleSignIn.js
"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";

export default function useGoogleSignIn() {
  const provider = new GoogleAuthProvider();

  const signIn = async () => {
    try {
      // Start the sign-in process
      const result = await signInWithPopup(auth, provider);
      
      // Get the Google credentials and user details
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      
      // Log the user object
      console.log("User signed in:", user);

      // Optionally, you can return the user object for use in your app
      return user;
    } catch (error) {
      // Handle different Firebase auth errors
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the popup before completing the sign-in.");
      } else {
        console.error("Sign-in error:", error.message);  // Log other errors
      }
      
      return null;  // Return null in case of any error
    }
  };

  return signIn;
}
