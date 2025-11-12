"use client";

import React from "react";
import { Bell, Menu } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="flex justify-between items-center bg-gray-800 p-4 border-b border-gray-700">
      <button onClick={onMenuClick} className="md:hidden p-2 rounded hover:bg-gray-700">
        <Menu size={24} />
      </button>

      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-gray-400">{currentDate}</span>
        <button className="p-2 rounded-lg hover:bg-gray-700 relative">
          <Bell size={22} />
          <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full"></span>
        </button>
      </div>
    </header>
  );
}