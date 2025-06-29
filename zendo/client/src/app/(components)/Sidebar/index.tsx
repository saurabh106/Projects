"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";        
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  const sidebarClassNames = `fixed flex flex-col h-screen justify-between shadow-xl
    transition-all duration-300 z-40 dark:bg-gray-900 overflow-y-auto bg-white
    ${isSidebarCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[72px] w-64 items-center justify-between border-b border-gray-100 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <div className="text-xl font-bold text-gray-800 dark:text-white">
          ZENDO
            </div>
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </button>
          )}
        </div>
        
        {/* TEAM */}
        <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-5 dark:border-gray-800">
          <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">ET</span>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-gray-900"></div>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide dark:text-gray-200">
              ZENDO TEAM
            </h3>
            <div className="mt-1 flex items-center gap-1">
              <LockIcon className="h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Private</p>
            </div>
          </div>
        </div>
        
        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full px-2 py-3">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>

        {/* PROJECTS SECTION */}
        <div className="border-t border-gray-100 px-2 py-1 dark:border-gray-800">
          <button
            onClick={() => setShowProjects((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Projects
            </span>
            {showProjects ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          <AnimatePresence>
            {showProjects && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {projects?.map((project) => (
                  <SidebarLink
                    key={project.id}
                    icon={Layers3}
                    label={project.name}
                    href={`/projects/${project.id}`}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PRIORITIES SECTION */}
        <div className="border-t border-gray-100 px-2 py-1 dark:border-gray-800">
          <button
            onClick={() => setShowPriority((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Priority
            </span>
            {showPriority ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          <AnimatePresence>
            {showPriority && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <SidebarLink
                  icon={AlertCircle}
                  label="Urgent"
                  href="/priority/urgent"
                  color="text-red-500"
                />
                <SidebarLink
                  icon={ShieldAlert}
                  label="High"
                  href="/priority/high"
                  color="text-orange-500"
                />
                <SidebarLink
                  icon={AlertTriangle}
                  label="Medium"
                  href="/priority/medium"
                  color="text-yellow-500"
                />
                <SidebarLink 
                  icon={AlertOctagon} 
                  label="Low" 
                  href="/priority/low" 
                  color="text-blue-500"
                />
                <SidebarLink
                  icon={Layers3}
                  label="Backlog"
                  href="/priority/backlog"
                  color="text-gray-500"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* USER PROFILE */}
      <div className="sticky bottom-0 border-t border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9">
            {!!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={36}
                height={36}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </div>
            )}
          </div> 
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-gray-800 dark:text-white">
              {currentUserDetails?.username}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {currentUserDetails?.email}
            </p>
          </div>
          <button
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  color?: string;
}

const SidebarLink = ({ href, icon: Icon, label, color = "text-gray-600" }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative flex cursor-pointer items-center gap-3 rounded-lg mx-2 my-1 transition-colors ${
          isActive 
            ? "bg-blue-50 dark:bg-gray-800" 
            : "hover:bg-gray-50 dark:hover:bg-gray-800"
        } px-4 py-2.5`}
      >
        {isActive && (
          <motion.div 
            layoutId="activeIndicator"
            className="absolute left-0 top-0 h-full w-1 rounded-r bg-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        <Icon className={`h-5 w-5 ${color} ${isActive ? "text-blue-600" : color}`} />
        <span className={`text-sm font-medium ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"}`}>
          {label}
        </span>
      </motion.div>
    </Link>
  );
};

export default Sidebar;