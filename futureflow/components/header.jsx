import {
  SignedOut,
  SignInButton,
  SignedIn,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header =  async() => {
  await checkUser();


  return (
    <header className="fixed top-0 w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-background/95 backdrop-blur-md z-50 shadow-sm">
      <nav className="container mx-auto flex items-center justify-between px-4 h-16">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2">
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button
                variant="outline"
                className="h-9 gap-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-9 gap-2 px-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
                  <StarIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-lg shadow-xl border border-gray-100 dark:border-gray-800">
                <DropdownMenuItem className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Link
                    href={"/resume"}
                    className="flex items-center gap-3 w-full"
                  >
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Link
                    href={"/ai-cover-letter"}
                    className="flex items-center gap-3 w-full"
                  >
                    <PenBox className="h-4 w-4 text-purple-500" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Link
                    href={"/interview"}
                    className="flex items-center gap-3 w-full"
                  >
                    <GraduationCap className="h-4 w-4 text-green-500" />
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton>
                <Button variant="outline" className="h-9 px-4">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button className="h-9 px-4 bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifer: "fonr-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
