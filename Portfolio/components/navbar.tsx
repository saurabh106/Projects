"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0  w-full bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              Portfolio
            </Link>
            <div className="h-10 w-10" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity"
            >
              Portfolio
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors px-3 py-2"
              >
                {item.name}
              </Link>
            ))}
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
              className="h-10 w-10 flex items-center justify-center focus:outline-none"
            >
              <ThemeToggle />
            </button>
          </nav>

          {/* Mobile navigation - Both buttons in the same div */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
              className="h-10 w-10 flex items-center justify-center focus:outline-none"
            >
              <ThemeToggle />
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 w-10"
            >
          
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

      
      </div>
    </header>
  );
}