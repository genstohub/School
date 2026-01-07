"use client";

import React, { useState, useEffect } from "react";
import { Menu, Bell, User, X, Loader2, Book, Brain, MessageSquare, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks";

interface Notification {
  id: string;
  text: string;
  type: "course" | "quiz" | "message" | "general";
  time: string;
  isRead: boolean;
}

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  // 1. Fetch Notifications from REST API / Worker
  useEffect(() => {
    async function getNotifications() {
      if (!isNotifOpen) return; // Only fetch when the drawer opens
      
      try {
        setLoading(true);
        const res = await fetch("/api/students/notifications"); // Replace with your Worker URL
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setNotifications(data.notifications || []);
      } catch (err) {
        console.error("Notification error:", err);
      } finally {
        setLoading(false);
      }
    }
    getNotifications();
  }, [isNotifOpen]);

  // Helper to render icon based on type
  const getIcon = (type: string) => {
    switch (type) {
      case "course": return <Book size={16} className="text-blue-400" />;
      case "quiz": return <Brain size={16} className="text-purple-400" />;
      case "message": return <MessageSquare size={16} className="text-green-400" />;
      default: return <Bell size={16} className="text-gray-400" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <>
      <header className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="text-gray-300 hover:text-white lg:hidden">
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-white hidden sm:block">Student Dashboard</h1>
        </div>

        <div className="flex items-center gap-5">
          {/* Notification Bell */}
          <button
            className="relative text-gray-300 hover:text-white p-1"
            onClick={() => setIsNotifOpen(true)}
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
      {isNotifOpen && (
        <>
          <div onClick={() => setIsNotifOpen(false)} className="fixed inset-0 bg-black/70 z-40 transition-opacity" />
          <div className="fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-gray-800 shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-lg font-bold text-white">Notifications</h2>
              <button onClick={() => setIsNotifOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <Loader2 className="animate-spin mb-2" size={24} />
                  <p className="text-xs">Checking for updates...</p>
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-3 rounded-xl border transition-all ${n.isRead ? 'bg-transparent border-gray-800' : 'bg-gray-800/50 border-gray-700 shadow-sm'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{getIcon(n.type)}</div>
                      <div className="flex-1">
                        <p className={`text-sm leading-snug ${n.isRead ? 'text-gray-400' : 'text-gray-200'}`}>
                          {n.text}
                        </p>
                        <span className="text-[10px] text-gray-500 mt-2 block font-medium uppercase tracking-tight">{n.time}</span>
                      </div>
                      {!n.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Bell className="text-gray-600" size={24} />
                  </div>
                  <p className="text-gray-400 text-sm">All caught up!</p>
                  <p className="text-xs text-gray-600 mt-1">No new notifications for you.</p>
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-800">
                <button 
                  className="w-full py-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition"
                  onClick={() => setNotifications(prev => prev.map(n => ({...n, isRead: true})))}
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}