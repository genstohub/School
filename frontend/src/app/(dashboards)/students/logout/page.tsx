"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { REST_API } from "@/constants";
import {
    LogOut,
    CheckCircle2,
    ArrowRight,
    Trophy,
    Clock,
    Home
} from "lucide-react";
import Link from "next/link";

interface SessionSummary {
    hoursSpent: number;
    lessonsCompleted: number;
    pointsEarned: number;
}

export default function LogoutPage() {
    const router = useRouter();
    const [status, setStatus] = useState<"processing" | "success">(
        "processing"
    );
    const [confirmLogout, setConfirmLogout] = useState<boolean>(true);

    // Mock session data: In production, pull this from your Auth Context
    // before the token is destroyed.
    const summary: SessionSummary = {
        hoursSpent: 2.5,
        lessonsCompleted: 4,
        pointsEarned: 150
    };

    const performLogout = async () => {
        try {
            // 1. Call your Cloudflare Worker / API logout endpoint
            // await fetch('/api/auth/logout', { method: 'POST' });
            await fetch(REST_API + "/auth_logout/logout", {
                credentials: "include",
                method: "post"
            })
                .then(response => response.json())
                .then(res => {
                    if (res.success) {
                        setStatus("success");
                    }
                });
            // 2. Clear local storage, cookies, and state
            // localStorage.clear();

            // Brief delay to allow the user to see the "Processing" state
            // which confirms their data is being saved.
        } catch (error) {
            console.error("Logout error:", error);
            // If logout fails, redirect back to safety
            router.push("/students/");
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-gray-950 text-gray-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full animate-in fade-in zoom-in duration-300">
                <div className="bg-gray-900 border border-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-center relative overflow-hidden">
                    {/* Background Ambient Glow */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>

                    {status === "processing" ? (
                        confirmLogout ? (
                            <div className="space-y-6 py-10">
                                <div className="relative inline-block">
                                    
                                    <LogOut
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500"
                                        size={28}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold tracking-tight">
                                        Confirm Session End
                                    </h1>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        are you sure you want to logout?
                                    </p>
                                </div>
                                <div className="pt-4 space-y-4">
                                    <div
                                        onClick={() => performLogout()}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]"
                                    >
                                        Yes logout <ArrowRight size={18} />
                                    </div>

                                    <Link
                                        href="/students"
                                        className="w-full text-gray-500 hover:text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors group"
                                    >
                                        <Home
                                            size={16}
                                            className="group-hover:-translate-y-0.5 transition-transform"
                                        />
                                        No please
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 py-10">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 border-4 border-gray-800 border-t-blue-500 rounded-full animate-spin"></div>
                                    <LogOut
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500"
                                        size={28}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-bold tracking-tight">
                                        Ending Session
                                    </h1>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        We&apos;re safely logging you out and{" "}
                                        <br /> syncing your latest progress...
                                    </p>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.15)] rotate-3">
                                    <CheckCircle2 size={40} strokeWidth={2.5} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-extrabold tracking-tight">
                                    See you soon!
                                </h1>
                                <p className="text-gray-400 font-medium">
                                    Your session summary for today:
                                </p>
                            </div>

                            {/* Session Summary Card */}
                            <div className="bg-gray-950/40 border border-white/5 rounded-3xl p-5 grid grid-cols-3 gap-2 backdrop-blur-sm">
                                <div className="space-y-1">
                                    <Clock
                                        className="mx-auto text-blue-400"
                                        size={18}
                                    />
                                    <p className="text-xl font-bold">
                                        {summary.hoursSpent}h
                                    </p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                                        Study
                                    </p>
                                </div>
                                <div className="space-y-1 border-x border-white/5">
                                    <CheckCircle2
                                        className="mx-auto text-green-400"
                                        size={18}
                                    />
                                    <p className="text-xl font-bold">
                                        {summary.lessonsCompleted}
                                    </p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                                        Lessons
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <Trophy
                                        className="mx-auto text-yellow-500"
                                        size={18}
                                    />
                                    <p className="text-xl font-bold">
                                        +{summary.pointsEarned}
                                    </p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">
                                        Points
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <Link
                                    href="/signin"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]"
                                >
                                    Log Back In <ArrowRight size={18} />
                                </Link>

                                <Link
                                    href="/"
                                    className="w-full text-gray-500 hover:text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors group"
                                >
                                    <Home
                                        size={16}
                                        className="group-hover:-translate-y-0.5 transition-transform"
                                    />
                                    Back to Homepage
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <p className="text-center text-gray-700 text-xs mt-10 font-bold uppercase tracking-[0.2em]">
                    &copy; 2026 BASE PLATFORM
                </p>
            </div>
        </div>
    );
}
