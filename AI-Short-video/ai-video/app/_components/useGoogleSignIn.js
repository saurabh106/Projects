// app/_hooks/useGoogleSignIn.js
"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";

export default function useGoogleSignIn() {
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("User signed in:", user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  return signIn;
}
