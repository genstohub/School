"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { useLoggedIn, useSignedPathProtector, useUserType } from "@/hooks";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Auth & Protection Hooks
  const isPathArea = useSignedPathProtector("/admin");
  const { userType } = useUserType();
  const { loggedIn } = useLoggedIn();

  // Security Logic
  useEffect(() => {
    // If the hook has finished loading and we aren't in the verified path
    if (!isPathArea) {
      if (!loggedIn) {
        router.replace("/signin");
      } else if (userType && userType !== "admin") {
        // Strict redirection: Send non-admins to their respective dashboards
        router.replace(`/${userType}s`);
      }
    }
  }, [loggedIn, isPathArea, userType, router]);

  // Loading state (Full screen) to prevent UI leaking
  if (!isPathArea && !loggedIn) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin" />
        <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">
          Authenticating Admin...
        </p>
      </div>
    );
  }

  // Only render if authorized
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar with Admin-specific Red accents */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Sidebar Toggle */}
        <Header onMenuClick={() => setIsOpen(!isOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-zinc-900 via-gray-950 to-black">
          {children}
        </main>
      </div>
    </div>
  );
}