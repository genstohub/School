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
  Clock,
  ChevronRight,
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
    {
      title: "Q & A",
      icon: PlayCircle,
      color: "text-red-400",
      href: "/students/qna",
    },
    {
      title: "Create Material",
      icon: FileText,
      color: "text-blue-400",
      href: "/instructors/material",
    },
    {
      title: "Create Video",
      icon: Video,
      color: "text-green-400",
      href: "/instructors/video",
    },
    {
      title: "Create Summary",
      icon: BookOpen,
      color: "text-yellow-400",
      href: "/instructors/summary",
    },
    {
      title: "Practical Class",
      icon: PenTool,
      color: "text-indigo-400",
      href: "/instructors/practical",
    },
    {
      title: "Assignment",
      icon: ClipboardList,
      color: "text-teal-400",
      href: "/instructors/assignment",
    },
    {
      title: "Tests",
      icon: FileCheck,
      color: "text-purple-400",
      href: "/instructors/test",
    },
    {
      title: "Quiz",
      icon: HelpCircle,
      color: "text-pink-400",
      href: "/instructors/quiz",
    },
    {
      title: "CBT",
      icon: GraduationCap,
      color: "text-orange-400",
      href: "/instructors/cbt",
    },
    // UPDATED: Redirects to the student ranking/filter page
    {
      title: "Rate Students",
      icon: Star,
      color: "text-yellow-300",
      href: "/instructors/rate-students",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0F172A] text-white overflow-x-hidden">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto mt-10">
        {/* Header Section */}
        <header className="w-full bg-[#1E293B] border border-[#334155] rounded-2xl p-6 shadow-xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold italic tracking-tight">
              {greeting}, Instructor
            </h2>
            <p className="text-slate-400 mt-1 text-sm uppercase font-semibold tracking-wider">
              Academic Command Center
            </p>
          </div>
          <Link
            href="/instructors/profile"
            className="bg-[#334155] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white hover:text-black transition-all shadow-lg uppercase"
          >
            Profile
          </Link>
        </header>

        {/* Status & Community Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* UPDATED: Review Queue Card */}
          <Link
            href="/instructors/review-queue"
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 hover:border-yellow-500 transition group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Clock size={28} className="text-yellow-400" />
              </div>
              <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Needs Correction
              </span>
            </div>
            <h3 className="font-bold text-lg">Review Queue</h3>
            <p className="text-slate-400 text-sm mt-1">
              Pending revisions for{" "}
              <span className="text-white font-bold">2 items</span> flagged by
              QA.
            </p>
            <div className="mt-4 flex items-center text-yellow-500 text-xs font-bold gap-1 group-hover:translate-x-2 transition-transform">
              OPEN EDITOR <ChevronRight size={14} />
            </div>
          </Link>

          {/* REDIRECTED: General Student Community */}
          <Link
            href="/students/community"
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 hover:border-purple-500 transition"
          >
            <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-4">
              <UsersRound size={28} className="text-purple-400" />
            </div>
            <h3 className="font-bold text-lg">General Community</h3>
            <p className="text-slate-400 text-sm mt-1">
              Engage with students and fellow instructors across departments.
            </p>
          </Link>

          <Link
            href="/instructors/support"
            className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 hover:border-blue-500 transition"
          >
            <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-4">
              <MessageSquare size={28} className="text-blue-400" />
            </div>
            <h3 className="font-bold text-lg">Tech Support</h3>
            <p className="text-slate-400 text-sm mt-1">
              Direct line to Quality Assurance and Admin support.
            </p>
          </Link>
        </div>

        {/* Tools Grid (Preserved) */}
        <section>
          <h2 className="text-sm font-black text-slate-500 mb-6 uppercase tracking-[0.3em] flex items-center gap-2">
            Instructor Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 hover:bg-[#2D3748] transition-all flex flex-col items-center text-center group"
                >
                  <div
                    className={`p-4 rounded-2xl bg-slate-800/50 group-hover:scale-110 transition-transform mb-4 ${action.color}`}
                  >
                    <Icon size={28} />
                  </div>
                  <h4 className="font-bold text-[13px] uppercase tracking-wide leading-tight">
                    {action.title}
                  </h4>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
