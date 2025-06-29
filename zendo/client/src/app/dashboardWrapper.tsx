import React from "react";
import Navbar from "@/app/(components)/Navbar"
import Sidebar from "./(components)/Sidebar";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50/50 text-gray-900 transition-colors duration-150 dark:bg-gray-900 dark:text-gray-100">
      {/* {sidebar} */}
      <Sidebar/>
      <main
        className={`flex w-full flex-col overflow-y-auto bg-white p-4 md:p-6 md:pl-64 dark:bg-gray-800`}
      >
        <Navbar/>
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
