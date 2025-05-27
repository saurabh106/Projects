"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 transition-opacity duration-1000",
              mounted ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 dark:from-blue-400 dark:to-purple-500">
            Learning Full-Stack & DevOps
            </span>
            <br />
            <span className="text-foreground">Currently Building Projects</span>
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-opacity duration-1000 delay-300",
              mounted ? "opacity-100" : "opacity-0"
            )}
          >
            I build exceptional digital experiences with modern technologies.
            Specializing in web development, mobile applications, and cloud infrastructure.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row justify-center gap-4 transition-opacity duration-1000 delay-500",
              mounted ? "opacity-100" : "opacity-0"
            )}
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="/#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/#contact">
                Contact Me
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}