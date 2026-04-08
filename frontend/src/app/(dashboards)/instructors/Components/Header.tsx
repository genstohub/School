"use client";

import React, { useState, useEffect } from "react";
import { Menu, Bell, User, X, Loader2, Book, Brain, MessageSquare, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks";
import NotificationPanel from "./NotificationPanel";
import { Notification } from "@/types";


interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useUser();

  const unreadCount = notifications.filter(n => n.status==="unread").length;

  return (
    <>
      <header className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="text-gray-300 hover:text-white lg:hidden">
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-white hidden sm:block">Instructor Dashboard</h1>
        </div>

        <div className="flex items-center gap-5">
          {/* Notification Bell */}
          <button
            className="relative text-gray-300 hover:text-white p-1"
            onClick={() => setIsNotificationOpen(true)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-gray-800">
                {unreadCount}
              </span>
            )}
          </button>

          <Link href="/students/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors overflow-hidden border border-gray-700">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={18} />
              )}
            </div>
            <span className="hidden sm:block text-sm font-medium">
              {user?.first_name} {user?.last_name}
            </span>
          </Link>
        </div>
      </header>

      {/* NOTIFICATION PANEL */}
      {isNotificationOpen && (
        <NotificationPanel isNotificationOpen setIsNotificationOpen={setIsNotificationOpen} notifications={notifications} setNotifications={setNotifications}/>
      )}
    </>
  );
}