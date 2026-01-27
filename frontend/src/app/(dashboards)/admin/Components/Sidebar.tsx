"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  UserCheck,
  FileText,
  BarChart3,
  ClipboardList,
  Bell,
  Settings,
  LogOut,
  ShieldAlert
} from "lucide-react";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const role = "admin";

  const links = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Manage Students", icon: Users, href: "/admin/students" },
    { name: "Manage Instructors", icon: UserCog, href: "/admin/instructors" },
    { name: "Manage Workers", icon: UserCheck, href: "/admin/workers" },
    { name: "Courses & Content", icon: FileText, href: "/admin/courses" },
    { name: "Reports & Analytics", icon: BarChart3, href: "/admin/reports" },
    { name: "System Tasks", icon: ClipboardList, href: "/admin/tasks" },
    { name: "Notifications", icon: Bell, href: "/admin/notifications" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static md:translate-x-0 z-30 bg-gray-900 border-r border-gray-800 w-64 h-full transition-transform duration-300 flex flex-col`}
      >
        {/* Admin Header */}
        <div className="px-6 py-6 flex items-center gap-3 border-b border-gray-800">
          <div className="bg-red-500/10 p-2 rounded-lg">
            <ShieldAlert className="text-red-500" size={20} />
          </div>
          <h2 className="text-xl font-black text-white italic tracking-tighter uppercase">
            Admin <span className="text-red-500">Core</span>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-sm ${active ? "font-bold" : "font-medium"}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Universal Logout Link */}
        <div className="p-4 border-t border-gray-800 bg-gray-950/50">
          <Link
            href={`/auth/logout?role=${role}`}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-black uppercase tracking-widest text-red-500/80 group-hover:text-red-400">
              Terminate Session
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}