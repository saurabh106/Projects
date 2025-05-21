"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import useGoogleSignIn from "./useGoogleSignIn.js";
import Link from "next/link.js";
import { useAuthContext } from "../provider.js";

function Hero() {
  const googleSignIn = useGoogleSignIn();
  const [loading, setLoading] = useState(false);
  const [Dloading, setDLoading] = useState(false);
  const { user } = useAuthContext();

  const handleGoogleSignIn = () => {
    setLoading(true);

    
    setTimeout(() => {
      setLoading(false);
    }, 2000);

   
    googleSignIn().catch((error) => {
      console.error("Google Sign-In Error:", error);
      setLoading(false); // Just in case of failure
    });
  };

  const handleDashboardClick = () => {
    setDLoading(true);
    setTimeout(() => {
      setDLoading(false);
    }, 2000);
  };


  return (
    <div className="md:px-20 lg:px-36 xl:px-48 p-15 flex flex-col items-center justify-center mt-24">
      <h1 className="font-bold text-6xl text-center ">
        Ai Short Video Generator
      </h1>

      <p className="mt-14 text-2xl text-center text-gray-500 ">
        Our AI-powered platform takes your ideas and turns them into stunning,
        fully-crafted video stories — combining creativity, technology, and
        automation like never before.
      </p>

      <div className=" font-bold flex">
        <div className="mt-15 font-bold transform transition-transform duration-300 hover:rotate-x-10 hover:rotate-y-10 hover:shadow-xl flex">
          <Button
            className="mr-14 gap-18 px-8 py-4 text-lg hover:cursor-pointer hover:bg-gray-400 "
            variant="secondary"
            size="lg"
          >
            Explore
          </Button>
        </div>
        <div className="mt-15  transform transition-transform duration-300 hover:rotate-x-10 hover:rotate-y-10 hover:shadow-xl flex">
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
            {/* {user?.pictureURL && (
              <Image
                src={user.pictureURL}
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
            )} */}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
