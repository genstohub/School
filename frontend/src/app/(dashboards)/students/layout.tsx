"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { useRouter } from "next/navigation";
import { useLoggedIn, useSignedPathProtector, useUserType } from "@/hooks";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  const isPathArea = useSignedPathProtector("/students");
  const { userType } = useUserType();
  const { loggedIn } = useLoggedIn();

  // Guard Logic: Move redirects into useEffect to prevent render-phase crashes
  useEffect(() => {
    if (!isPathArea) {
      if (!loggedIn) {
        router.replace("/signin");
      } else if (userType && userType !== "student") {
        // Redirect Instructors/Workers back to their own domain
        router.replace(`/${userType}s`);
      }
    }
  }, [loggedIn, isPathArea, userType, router]);

  // Show a clean loading state while checking permissions
  if (!isPathArea && !loggedIn) {
    return (
      <div className="h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Only render the layout if we are in the student path area
  if (isPathArea) {
    return (
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setIsOpen(!isOpen)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return null;
}