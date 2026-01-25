
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
    AlertCircle
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
        { title: "Go Live", icon: PlayCircle, color: "text-red-400", href: "/instructors/go-live" },
        { title: "Create Material", icon: FileText, color: "text-blue-400", href: "/instructors/material" },
        { title: "Create Video", icon: Video, color: "text-green-400", href: "/instructors/video" },
        { title: "Create Summary", icon: BookOpen, color: "text-yellow-400", href: "/instructors/summary" },
        { title: "Practical Class", icon: PenTool, color: "text-indigo-400", href: "/instructors/practical" },
        { title: "Assignment", icon: ClipboardList, color: "text-teal-400", href: "/instructors/assignment" },
        { title: "Tests", icon: FileCheck, color: "text-purple-400", href: "/instructors/test" },
        { title: "Quiz", icon: HelpCircle, color: "text-pink-400", href: "/instructors/quiz" },
        { title: "CBT", icon: GraduationCap, color: "text-orange-400", href: "/instructors/cbt" },
        { title: "Rate Students", icon: Star, color: "text-yellow-300", href: "/instructors/rate" }
    ];

    return (
        <div className="min-h-screen w-full bg-[#0F172A] text-white overflow-x-hidden">
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto mt-10">
                
                {/* Header Section */}
                <header className="w-full bg-[#1E293B] border border-[#334155] rounded-2xl p-6 shadow-xl flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{greeting}, Instructor 👋</h2>
                        <p className="text-slate-400 mt-1">Manage your courses and track material approvals.</p>
                    </div>
                    <Link href="/instructors/profile" className="bg-[#334155] px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#475569] transition shadow-lg">
                        CheckIns
                    </Link>
                </header>

                {/* Status & Community Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* NEW: Approval Status Card */}
                    <Link href="/instructors/status" className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 hover:border-yellow-500/50 transition group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <Clock size={32} className="text-yellow-400" />
                            <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Action Required</span>
                        </div>
                        <h3 className="font-bold text-lg">Review Queue</h3>
                        <p className="text-slate-400 text-sm mt-1">You have <span className="text-white font-bold">2 items</span> requiring corrections from workers.</p>
                    </Link>

                    <Link href="/instructors/community" className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 hover:border-purple-500/50 transition">
                        <UsersRound size={32} className="text-purple-400 mb-4" />
                        <h3 className="font-bold text-lg">Community</h3>
                        <p className="text-slate-400 text-sm mt-1">Collaborate with fellow department heads and instructors.</p>
                    </Link>

                    <Link href="/instructors/support" className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 hover:border-blue-500/50 transition">
                        <MessageSquare size={32} className="text-blue-400 mb-4" />
                        <h3 className="font-bold text-lg">Support</h3>
                        <p className="text-slate-400 text-sm mt-1">Contact the Quality Assurance team for technical help.</p>
                    </Link>
                </div>

                {/* Tools Grid */}
                <section>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <PenTool size={20} className="text-slate-400" /> Instructor Tools
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {actions.map(action => {
                            const Icon = action.icon;
                            return (
                                <Link key={action.title} href={action.href} className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 hover:bg-[#2D3748] transition-all flex flex-col items-center text-center group">
                                    <div className={`p-3 rounded-lg bg-slate-800 group-hover:scale-110 transition-transform mb-3 ${action.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <h4 className="font-semibold text-sm">{action.title}</h4>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
