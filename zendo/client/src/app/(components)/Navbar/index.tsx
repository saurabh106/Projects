import React from "react";
import { Search, Settings } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80 dark:text-white">
      {/* Search bar */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="search"
            placeholder="Search..."
            className="w-48 rounded-lg border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm transition-all duration-200 focus:w-56 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:w-56 sm:focus:w-64 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500 dark:focus:border-blue-400"
          />
        </div>
      </div>
      {/* {icons} */}
      <div className="flex items-center">
        <Link
          href={"/settings"}
          className="h-min w-min rounded p-2 hover:bg-gray-100"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="mr-5 ml-2 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
