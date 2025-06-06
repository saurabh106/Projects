"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const habdelScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", habdelScroll);
    return () => {
      window.removeEventListener("scroll", habdelScroll);
    };
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 pb-2 pr-2 md:text-6xl lg:text-7xl xl:text-8xl">
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your career with personalized AI-driven coaching, expert
            guidance, and actionable insights.
          </p>
        </div>

        <div className="pb-10 flex justify-center space-x-4 ">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Link href="/see-new">
            <Button size="lg" variant="outline" className="px-8 cursor-pointer">
              See What's New
            </Button>
          </Link>
        </div>
      </div>

      <div className="hero-image-wrapper mt-5 md:mt-0 hero-image">
        <div ref={imageRef} className="hero-image">
          <Image
            src={"/banner.jpeg"}
            width={1280}
            height={720}
            alt="Banner Image"
            className="rounded-lg shadow-2xl border mx-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
