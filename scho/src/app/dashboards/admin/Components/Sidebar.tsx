"use client";

import React from "react";
import Link from "next/link";
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
} from "lucide-react";

export default function Sidebar({
  isOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const links = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/admin" },
    { name: "Manage Students", icon: Users, href: "/dashboard/admin/students" },
    { name: "Manage Instructors", icon: UserCog, href: "/dashboard/admin/instructors" },
    { name: "Manage Workers", icon: UserCheck, href: "/dashboard/admin/workers" },
    { name: "Courses & Content", icon: FileText, href: "/dashboard/admin/courses" },
    { name: "Reports & Analytics", icon: BarChart3, href: "/dashboard/admin/reports" },
    { name: "Tasks & Assignments", icon: ClipboardList, href: "/dashboard/admin/tasks" },
    { name: "Notifications", icon: Bell, href: "/dashboard/admin/notifications" },
    { name: "Settings", icon: Settings, href: "/dashboard/admin/settings" },
  ];

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed md:static md:translate-x-0 z-30 bg-gray-800 w-64 h-full transition-transform duration-300 flex flex-col`}
    >
      <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">Admin Panel</div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
            >
              <Icon size={20} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}