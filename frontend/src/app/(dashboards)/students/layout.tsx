//Students layout.tsx

"use client";

import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/*  Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/*  Main section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsOpen(!isOpen)} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}