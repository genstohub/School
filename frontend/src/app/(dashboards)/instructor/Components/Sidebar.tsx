"use client";

import React from "react";
import {
  LayoutDashboard,
  FilePlus,
  Settings,
  Users,
  Bell,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard/instructor", icon: LayoutDashboard },
    { name: "Create Course", href: "/dashboard/instructor/create-course", icon: FilePlus },
    { name: "Settings", href: "/dashboard/instructor/settings", icon: Settings },
    { name: "Community", href: "/dashboard/instructor/community", icon: Users },
    { name: "Notifications", href: "/dashboard/instructor/notifications", icon: Bell },
    { name: "Profile", href: "/dashboard/instructor/profile", icon: User },
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
          <h2 className="text-xl font-bold text-white">Instructor Panel</h2>
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
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <button
              className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition-colors"
              onClick={() => console.log("Logging out...")}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}