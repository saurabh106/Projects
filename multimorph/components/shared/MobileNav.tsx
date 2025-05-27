/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "../../constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
    const pathname = usePathname();
  return (
    <header className="flex items-center justify-between pr-8 fixed h-16 w-full border-b-4 border-purple-100 bg-white px-5 lg:hidden">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/Logo.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav>
        <SignedIn>
          <UserButton />

          <Sheet>
            <SheetTrigger><Image src='/assets/icons/menu.svg' alt='menu' width={32} height={32} className='cursor-pointer'/></SheetTrigger>
            <SheetContent className='sheet-content sm:w-64 bg-white text-black'>
             <>
             <div className=' flex justify-center pt-5 pr-5'>
             <Image src='/assets/images/Logo.svg' alt='logo' width={152} height={23}/>
             </div>
             <ul className="w-full flex flex-col gap-2 p-4 rounded-lg bg-white">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li key={link.route}>
                        <Link
                          href={link.route}
                          className={`block w-full px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-blue-600 text-white"
                              : "text-black hover:bg-gray-100"
                          }`}
                        >
                          <Link
                            href={link.route}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
                              isActive
                                ? "bg-blue-600 text-white border-blue-600"
                                : "text-black border-transparent "
                            }`}
                          >
                            <Image 
                              src={link.icon}
                              alt="logo"
                              width={20}
                              height={20}
                              className={`${
                                isActive ? "brightness-200" : "brightness-100"
                              }`}
                            />
                            {link.label}
                          </Link>
                        </Link>
                      </li>
                    );
                  })}
                  </ul>
             </>
            </SheetContent>
          </Sheet>
        </SignedIn>


        <SignedOut>
            <Button asChild className="button bg-blue-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
