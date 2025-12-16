"use client";

import React, { useState, ReactNode } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { useLoggedIn, useSignedPathProtector, useUserType } from "@/hooks";

export default function InstructorLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const isPathArea = useSignedPathProtector("/instructors");
  const { userType } = useUserType();
  const { loggedIn } = useLoggedIn();

  if (isPathArea)
    return (
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header (Top Bar) */}
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    );
  else if (!loggedIn) {
    window.location.replace(`/signin`);
  } else if (loggedIn) {
    window.location.replace(`/${userType}s`);
  }
}
