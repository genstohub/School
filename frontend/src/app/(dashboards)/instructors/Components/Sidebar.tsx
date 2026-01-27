"use client";

import React from "react";
import {
  LayoutDashboard,
  FilePlus,
  Settings,
  Users,
  Bell,
  LogOut,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  role: "instructor" | "student" | "worker" | "admin"; // Added role prop
}

export default function Sidebar({ isOpen, setIsOpen, role }: SidebarProps) {
  const pathname = usePathname();

  // Filter out the logout from the main loop so we can style it specially at the bottom
  const navItems = [
    { name: "Dashboard", href: `/${role}s`, icon: LayoutDashboard },
    { name: "Create Course", href: "/instructors/create-course", icon: FilePlus },
    { name: "Settings", href: `/${role}s/settings`, icon: Settings },
    { name: "Community", href: "/instructors/community", icon: Users },
    { name: "Notifications", href: "/instructors/notifications", icon: Bell },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-800 w-64 h-full flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white italic tracking-tighter">UNIQUENESS</h2>
          <button
            className="text-gray-300 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <Menu />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                  active
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section - Fixed to bottom */}
        <div className="p-4 border-t border-gray-700 bg-gray-900/50">
          <Link
            // This points to your universal logout page with the role parameter
            href={`/auth/logout?role=${role}`}
            className="flex items-center gap-3 w-full p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}