"use client";

import React from "react";
import {
  Home,
  Video,
  Users,
  Group,
  LifeBuoy,
  Menu,
  Bookmark,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  // We hardcode the role here since this is specifically the Student Sidebar
  const role = "student"; 

  const navItems = [
    { name: "Dashboard", href: "/students", icon: Home },
    { name: "Live Sessions", href: "/students/live", icon: Video },
    { name: "Community", href: "/students/community", icon: Users },
    { name: "Study Mate", href: "/students/study-mate", icon: Group },
    { name: "Bookmark", href: "/students/bookmark", icon: Bookmark },
    { name: "Support", href: "/students/support", icon: LifeBuoy },
    { name: "Settings", href: "/students/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          // Fixed the class: replaced 'bg-blur' with proper Tailwind 'backdrop-blur-sm'
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-30 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-800 w-64 h-full flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white tracking-tighter italic">BASE</h2>
          <button
            className="text-gray-300 lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <Menu />
          </button>
        </div>

        {/* Navigation Links */}
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

        {/* --- ADDED LOGOUT SECTION --- */}
        <div className="p-4 border-t border-gray-700">
          <Link
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