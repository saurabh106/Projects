"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useGoogleSignIn from "./useGoogleSignIn.js";
import { useAuthContext } from "../provider.js";
import Link from "next/link.js";
import toast from "react-hot-toast";


function Header() {
  const { user } = useAuthContext();

  const googleSignIn = useGoogleSignIn();
  const [loading, setLoading] = useState(false);
  const [Dloading, setDLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
    } catch (error) {
      toast.error("Google Sign-In Error: , Try again");
   
    } finally {
      setLoading(false); 
    }
  };

  const handleDashboardClick = () => {
    setDLoading(true);
    setTimeout(() => {
      setDLoading(false);
    
    }, 2000);
  };

 
useEffect(() => {
    if (user?.pictureURL) {
      console.log("User pictureURL:", user.pictureURL);
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
            {user?.pictureURL && (
              <Image
                src={user.pictureURL}
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
