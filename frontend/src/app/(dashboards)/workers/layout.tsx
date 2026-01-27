"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { useRouter } from "next/navigation";
import { useLoggedIn, useSignedPathProtector, useUserType } from "@/hooks";

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auth & Protection Hooks
  const isPathArea = useSignedPathProtector("/workers");
  const { userType } = useUserType();
  const { loggedIn } = useLoggedIn();

  // Security Redirects
  useEffect(() => {
    if (!isPathArea) {
      if (!loggedIn) {
        router.replace("/signin");
      } else if (userType && userType !== "worker") {
        // If an Instructor/Student tries to access /workers, send them to their right home
        router.replace(`/${userType}s`);
      }
    }
  }, [loggedIn, isPathArea, userType, router]);

  // Loading state while auth is being verified
  if (!isPathArea && !loggedIn) {
    return (
      <div className="h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Now correctly uses state */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Now toggles the sidebar state */}
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}