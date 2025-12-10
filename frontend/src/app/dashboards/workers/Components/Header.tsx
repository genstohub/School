"use client";

import React, { useState } from "react";
import { Menu, Bell, User, X } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-3">
        {/* Left: Menu + Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="text-gray-300 hover:text-white focus:outline-none lg:hidden"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-white hidden sm:block">
            Worker Dashboard
          </h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <button
            className="relative text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsNotifOpen(true)}
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 text-gray-300 hover:text-white focus:outline-none">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
          </button>
        </div>
      </header>

      {/* NOTIFICATION DRAWER */}
      {isNotifOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsNotifOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-80 bg-gray-800 border-l border-gray-700 shadow-xl z-40 transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
              <button
                onClick={() => setIsNotifOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
              {/* Sample Notifications */}
              <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition">
                <p className="text-sm text-gray-200">
                  👩‍🎓 Student <b>Mary</b> logged in.
                </p>
                <span className="text-xs text-gray-400">5 mins ago</span>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition">
                <p className="text-sm text-gray-200">
                  👨‍🏫 Instructor <b>James</b> uploaded a new resource.
                </p>
                <span className="text-xs text-gray-400">10 mins ago</span>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition">
                <p className="text-sm text-gray-200">
                  🧾 Admin assigned a new task.
                </p>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}