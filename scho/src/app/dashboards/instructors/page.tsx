"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Video,
  FileText,
  ClipboardList,
  BookOpen,
  PenTool,
  FileCheck,
  HelpCircle,
  GraduationCap,
  Star,
  PlayCircle,
  UsersRound,
  MessageSquare,
} from "lucide-react";

export default function InstructorDashboard() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const actions = [
    { title: "Go Live", icon: PlayCircle, color: "text-red-400", href: "/dashboard/instructor/go-live" },
    { title: "Create Material", icon: FileText, color: "text-blue-400", href: "/dashboard/instructor/material" },
    { title: "Create Video", icon: Video, color: "text-green-400", href: "/dashboard/instructor/video" },
    { title: "Create Summary", icon: BookOpen, color: "text-yellow-400", href: "/dashboard/instructor/summary" },
    { title: "Practical Class", icon: PenTool, color: "text-indigo-400", href: "/dashboard/instructor/practical" },
    { title: "Assignment", icon: ClipboardList, color: "text-teal-400", href: "/dashboard/instructor/assignment" },
    { title: "Tests", icon: FileCheck, color: "text-purple-400", href: "/dashboard/instructor/test" },
    { title: "Quiz", icon: HelpCircle, color: "text-pink-400", href: "/dashboard/instructor/quiz" },
    { title: "CBT", icon: GraduationCap, color: "text-orange-400", href: "/dashboard/instructor/cbt" },
    { title: "Rate Students", icon: Star, color: "text-yellow-300", href: "/dashboard/instructor/rate" },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white overflow-x-hidden">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Section */}
        <header className="w-full bg-gray-800 rounded-2xl p-5 shadow flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">{greeting}, Instructor 👋</h2>
            <p className="text-gray-400 mt-1">
              Welcome back! Manage your courses, materials, and student engagement.
            </p>
          </div>

          {/* Profile Button */}
          <Link
            href="/dashboard/instructor/profile"
            className="bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
          >
            CheckIns
          </Link>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/dashboard/instructor/community"
            className="bg-gray-800 rounded-2xl p-5 hover:bg-gray-700 transition shadow-md"
          >
            <UsersRound size={30} className="text-purple-400 mb-3" />
            <h3 className="font-semibold text-lg">Instructor Community</h3>
            <p className="text-gray-400 text-sm mt-1">
              Connect and collaborate with fellow instructors.
            </p>
          </Link>

          <Link
            href="/dashboard/instructor/live-sessions"
            className="bg-gray-800 rounded-2xl p-5 hover:bg-gray-700 transition shadow-md"
          >
            <PlayCircle size={30} className="text-red-400 mb-3" />
            <h3 className="font-semibold text-lg">Live Sessions</h3>
            <p className="text-gray-400 text-sm mt-1">
              Manage or schedule your live teaching sessions.
            </p>
          </Link>

          <Link
            href="/dashboard/instructor/support"
            className="bg-gray-800 rounded-2xl p-5 hover:bg-gray-700 transition shadow-md"
          >
            <MessageSquare size={30} className="text-blue-400 mb-3" />
            <h3 className="font-semibold text-lg">Support & Feedback</h3>
            <p className="text-gray-400 text-sm mt-1">
              Reach out for help or share your teaching feedback.
            </p>
          </Link>
        </div>

        {/* Instructor Tools */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Instructor Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition flex flex-col items-start shadow-md"
                >
                  <Icon size={26} className={`mb-3 ${action.color}`} />
                  <h4 className="font-semibold text-sm sm:text-base">{action.title}</h4>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}