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
  BookOpen,
  Briefcase,
  ShieldCheck,
  Search,
  Activity,
  Group,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  role: "instructor" | "student" | "worker" | "admin";
}

export default function Sidebar({ isOpen, setIsOpen, role }: SidebarProps) {
  const pathname = usePathname();

  // Define unique navigation items for each role
  const menuConfigs = {
    instructor: [
      { name: "Dashboard", href: "/instructors", icon: LayoutDashboard },
      { name: "Schedule Live", href: "/instructors/schedule", icon: FilePlus },
      { name: "Active Students", href: "/instructors/students", icon: Users },
      { name: "Study Mate", href: "/students/study-mate", icon: Group },
      { name: "Go Live", href: "/instructors/go-live", icon: BookOpen },
      { name: "Weekly Activity", href: "/instructors/weekly-activity", icon: Activity },
      { name: "Settings", href: "/instructors/settings", icon: Settings },
    ],
    student: [
      { name: "My Learning", href: "/students", icon: BookOpen },
      { name: "Browse Courses", href: "/students/browse", icon: Search },
      { name: "Community", href: "/students/community", icon: Users },
      { name: "Notifications", href: "/students/notifications", icon: Bell },
      { name: "Settings", href: "/students/settings", icon: Settings },
    ],
    worker: [
      { name: "Task Board", href: "/workers", icon: Briefcase },
      { name: "Verification", href: "/workers/verify", icon: ShieldCheck },
      { name: "Notifications", href: "/workers/notifications", icon: Bell },
      { name: "Settings", href: "/workers/settings", icon: Settings },
    ],
    admin: [
      { name: "Admin Panel", href: "/admin", icon: ShieldCheck },
      { name: "Manage Users", href: "/admin/users", icon: Users },
      { name: "System Logs", href: "/admin/logs", icon: LayoutDashboard },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ],
  };

  // Select the correct items based on the passed role
  const navItems = menuConfigs[role] || [];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-900 border-r border-gray-800 w-64 h-full flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-xl font-black text-white italic tracking-tighter">
            UNIQUENESS
          </h2>
          <button
            className="text-gray-400 lg:hidden hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-sm ${active ? "font-bold" : "font-medium"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-800">
          <Link
            href={`/auth/logout?role=${role}`}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-black uppercase tracking-widest">Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}