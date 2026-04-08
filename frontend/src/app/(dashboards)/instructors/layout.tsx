"use client";

import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { useRouter } from "next/navigation";
import { useLoggedIn, useSignedPathProtector, useUserType } from "@/hooks";

export default function InstructorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isPathArea = useSignedPathProtector("/instructors");
  const { userType } = useUserType();
  const { loggedIn } = useLoggedIn();

  // Handle Protection via useEffect to avoid "Render-phase redirects"
  useEffect(() => {
    if (!isPathArea) {
      if (!loggedIn) {
        router.replace("/signin");
      } else if (userType && userType !== "instructor") {
        // If a Student tries to access /instructors, send them to /students
        router.replace(`/${userType}s`);
      }
    }
  }, [loggedIn, isPathArea, userType, router]);

  // While checking auth, you might want to show a loading spinner
  // so the user doesn't see a blank screen or a "flash" of the dashboard
  if (!isPathArea && !loggedIn) {
      return (
        <div className="h-screen bg-gray-950 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin" />
        </div>
      );
  }

  // If we are in the correct path area, render the full UI
  if (isPathArea) {
    return (
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
            role="instructor" 
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }
}