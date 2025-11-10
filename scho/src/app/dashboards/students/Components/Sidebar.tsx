"use client";

import React from "react";
import {
  Home,
  BookOpen,
  Video,
  Users,
  MessageSquare,
  Group,
  LifeBuoy,
  Menu,
  Bookmark,
  Settings,
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
    { name: "Dashboard", href: "/dashboards/students", icon: Home },
    { name: "Courses", href: "/dashboards/students/courses", icon: BookOpen },
    { name: "Live Sessions", href: "/dashboards/students/live", icon: Video },
    { name: "Community", href: "/dashboards/students/community", icon: Users },
    { name: "Study Mate", href: "/dashboards/students/studymate", icon: Group },
    { name: "Chat", href: "/dashboards/students/chat", icon: MessageSquare },
    { name: "BookMark", href: "/dashboard/students/bookmark", icon: Bookmark },
    { name: "Support", href: "/dashboards/students/support", icon: LifeBuoy },
     { name: "Settings", href: "/dashboards/students/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-blur bg-opacity-40 z-20 lg:hidden"
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
          <h2 className="text-xl font-bold text-white">Prep Center</h2>
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
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}