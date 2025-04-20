// app/_components/Header.jsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useGoogleSignIn from "./useGoogleSignIn.js";
import { useAuthContext } from "../provider.js";

function Header() {
  const { user } = useAuthContext();

  const googleSignIn = useGoogleSignIn();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setLoading(true);

    // Automatically stop loading after 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Fire the actual sign-in function
    googleSignIn().catch((error) => {
      console.error("Google Sign-In Error:", error);
      setLoading(false); // Just in case of failure
    });
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h2 className="text-2xl font-bold hover:cursor-pointer">Ai-Gen</h2>
      </div>

      <div className="font-bold transform transition-transform duration-300 hover:rotate-x-10 hover:rotate-y-10 hover:shadow-xl">
        {!user ? (
          <Button
            className={`px-4 py-4 text-lg hover:cursor-pointer hover:bg-gray-400 ${
              loading ? "bg-gray-300 cursor-not-allowed opacity-70" : ""
            }`}
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Started"}
          </Button>
        ) : (
          <div>
            <Button>Dashboard</Button>
            <Image src={user?.photoUrl}
              alt="userImage"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
