/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const textOptions = ["Full-Stack & DevOps", "Web Applications", "Cloud Infrastructure", "React & Next.js", "Backend Systems"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenTexts = 1500;

  useEffect(() => {
    setMounted(true);
    
    const handleTyping = () => {
      const currentText = textOptions[loopNum % textOptions.length];
      
      if (isDeleting) {
        setTypingText(currentText.substring(0, typingText.length - 1));
        setCurrentIndex(currentIndex - 1);
        
        if (typingText === "") {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      } else {
        setTypingText(currentText.substring(0, typingText.length + 1));
        setCurrentIndex(currentIndex + 1);
        
        if (typingText === currentText) {
          setTimeout(() => setIsDeleting(true), delayBetweenTexts);
        }
      }
    };
    
    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, currentIndex, isDeleting, loopNum, textOptions]);

  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-primary/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-primary/20 animate-gradient-shift" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-background/80 to-background" />
      </div>
      
      {/* Floating gradient dots */}
      <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full bg-blue-500/10 dark:bg-blue-900/20 blur-3xl animate-float-1" />
      <div className="absolute bottom-1/3 left-[15%] w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-900/20 blur-3xl animate-float-2" />
      <div className="absolute top-1/3 left-[25%] w-96 h-96 rounded-full bg-primary/10 dark:bg-primary/20 blur-3xl animate-float-3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn(
          "max-w-3xl mx-auto text-center transform transition-all duration-1000 ease-out",
          mounted ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
        )}>
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6",
            )}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 dark:from-blue-400 dark:to-purple-500">
              Learning... <span className="inline-block min-w-[16rem]">{typingText}</span>
              <span className="animate-pulse">|</span>
            </span>
            <br />
            <span className="text-foreground">Currently Building Projects</span>
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-opacity duration-1000 delay-300",
            )}
          >
            I build exceptional digital experiences with modern technologies.
            Specializing in web development, mobile applications, and cloud infrastructure.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row justify-center gap-4 transition-opacity duration-1000 delay-500",
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

      {/* Add these to your global CSS or Tailwind config */}
 <style jsx global>{`
  /* Base Gradient Animation (Optimized for Mobile) */
  @keyframes gradient-shift-mobile {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Subtle Pulse (Reduced for Performance) */
  @keyframes gradient-pulse-mobile {
    0%, 100% { background-size: 200% 200%; }
    50% { background-size: 210% 210%; }
  }

  /* Smoother Floating (Less Aggressive) */
  @keyframes float-mobile {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(0, -8px, 0) scale(1.02); }
  }

  /* Apply to Elements */
  .animate-gradient-mobile {
    background-size: 200% 200%;
    animation: 
      gradient-shift-mobile 15s ease infinite,
      gradient-pulse-mobile 20s ease infinite alternate;
  }

  .animate-float-mobile {
    animation: float-mobile 6s ease-in-out infinite both;
    will-change: transform; /* Optimizes for mobile rendering */
  }

  /* Touch Feedback (Optional) */
  .touch-feedback:active {
    transform: scale(0.98);
    opacity: 0.9;
    transition: all 0.2s ease;
  }
`}</style>
    </section>
  );
}