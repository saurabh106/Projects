import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
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

        <div className="pb-10"> {/* Added padding-bottom here */}
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <div>
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