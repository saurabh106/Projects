// app/_components/Header.jsx

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useGoogleSignIn from "./useGoogleSignIn.js";
import { useAuthContext } from "../provider.js";
import Link from "next/link.js";

function Header() {
  const { user } = useAuthContext();

  const googleSignIn = useGoogleSignIn();
  const [loading, setLoading] = useState(false);
  const [Dloading, setDLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn(); // Wait until sign-in completes
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false); // Stop loading whether success or fail
    }
  };

  const handleDashboardClick = () => {
    setDLoading(true);
    setTimeout(() => {
      setDLoading(false);
      // Optional: Add navigation or logic here
    }, 2000);
  };
  useEffect(() => {
    if (user?.photoUrl) {
      console.log("User photoUrl:", user.photoUrl);
    }
  }, [user]);
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
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"}>
              <Button
                className={`px-4 py-4 text-lg hover:cursor-pointer hover:bg-gray-400${
                  loading ? "bg-gray-300 cursor-not-allowed opacity-70" : ""
                }`}
                onClick={handleDashboardClick}
                disabled={Dloading}
              >
                {Dloading ? "Loading..." : "Dashboard"}
              </Button>
            </Link>
            {user?.photoURL && (
              <Image
                src={user.photoURL}
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
