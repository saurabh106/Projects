"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { navLinks } from "../../constants";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-72 bg-white p-5 shadow-md shadow-[0_4px_6px_-1px_rgba(147,197,253,0.5)] lg:flex bg-black">
      <div className="flex size-full flex-col gap-4 ">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Image
            src="/assets/images/Logo.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        <nav className="hidden w-full flex-col md:flex">
          <SignedIn>
            {(() => {
              // const hasActive = navLinks.some((link) => link.route === pathname);

              return (
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

                  <li className="flex-center cursor-pointer gap-2 p-4">
                    <UserButton showName />
                  </li>
                </ul>
              );
            })()}
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-blue-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
