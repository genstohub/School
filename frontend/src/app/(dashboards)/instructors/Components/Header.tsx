"use client";

import React, { useState } from "react";
import { Menu, Bell, User, ChevronDown, X } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <>
      {/* MAIN HEADER */}
      <header className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="text-gray-300 hover:text-white focus:outline-none lg:hidden"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-white hidden sm:block">
            Instructors Dashboard
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <button
            className="relative text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsNotifOpen(true)}
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white focus:outline-none">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User size={18} />
              </div>
              <span className="hidden sm:block text-sm font-medium">
                Philip Wasem
              </span>
              <ChevronDown size={16} className="hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-44 bg-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
              <ul className="py-2 text-sm text-gray-200">
                <li>
                  <a
                    href="/dashboards/students/profile"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    View Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboards/students/settings"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => console.log("Logging out...")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* NOTIFICATION PANEL */}
      {isNotifOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsNotifOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
          />

          {/* Notification Drawer */}
          <div className="fixed top-0 right-0 h-full w-80 bg-gray-800 border-l border-gray-700 shadow-xl z-40 transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">
                Notifications
              </h2>
              <button
                onClick={() => setIsNotifOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
              {/* Example Notifications */}
              <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition">
                <p className="text-sm text-gray-200">
                  📚 New course material uploaded in <b>Mathematics 101</b>.
                </p>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition">
                <p className="text-sm text-gray-200">
                  🧠 Quiz for <b>Physics</b> will start in 1 hour.
                </p>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition">
                <p className="text-sm text-gray-200">
                  💬 Your mentor commented on your assignment.
                </p>
                <span className="text-xs text-gray-400">30 mins ago</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}