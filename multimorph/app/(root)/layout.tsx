
import React from "react";
import Sidebar from "../../components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import { Toaster } from "@/components/ui/sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white lg:flex-row ">

<Sidebar/>
<MobileNav/>
      <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
        <div className="wrapper">{children}</div>
      </div>
      <Toaster/>
    </main>
  );
};

export default Layout;
//1.44.17