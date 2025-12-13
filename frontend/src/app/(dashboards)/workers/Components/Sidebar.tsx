"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Activity, ClipboardList, Bell, Settings, LogOut } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/dashboard/worker" },
    { name: "Monitor Students", icon: <Users size={18} />, href: "/dashboard/worker/students" },
    { name: "Monitor Instructors", icon: <Activity size={18} />, href: "/dashboard/worker/instructors" },
    { name: "Tasks", icon: <ClipboardList size={18} />, href: "/dashboard/worker/tasks" },
    { name: "Notifications", icon: <Bell size={18} />, href: "/dashboard/worker/notifications" },
    { name: "Settings", icon: <Settings size={18} />, href: "/dashboard/worker/settings" },
  ];

  return (
    <>
      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-gray-800 text-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Worker Panel</h2>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-700 p-4">
          <button
            onClick={() => console.log("Logging out...")}
            className="flex items-center gap-3 text-gray-300 hover:text-white w-full"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}