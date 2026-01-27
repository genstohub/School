"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { REST_API } from "@/constants";
import {
    LogOut, CheckCircle2, ArrowRight,
    Trophy, Clock, Home, Briefcase, 
    FileCheck, Loader2
} from "lucide-react";

// Define the dash types
type DashboardType = "student" | "worker" | "instructor" | "admin";

export default function UniversalLogoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const userRole = (searchParams.get("role") || "student") as DashboardType;

    const [status, setStatus] = useState<"processing" | "success">("processing");
    const [confirmLogout, setConfirmLogout] = useState<boolean>(true);

    const roleConfig = useMemo(() => {
        const configs: Record<DashboardType, { 
            label: string; 
            icon: React.ReactNode; 
            statLabel: string; 
            homePath: string 
        }> = {
            student: { 
                label: "Lessons", 
                icon: <CheckCircle2 size={18} />, 
                statLabel: "Study", 
                homePath: "/students" 
            },
            worker: { 
                label: "Tasks", 
                icon: <Briefcase size={18} />, 
                statLabel: "Active", 
                homePath: "/workers" 
            },
            instructor: { 
                label: "Reviews", 
                icon: <FileCheck size={18} />, 
                statLabel: "Teaching", 
                homePath: "/instructors" 
            },
            admin: { 
                label: "Logs", 
                icon: <ShieldCheck size={18} className={""} />, 
                statLabel: "Uptime", 
                homePath: "/admin" 
            },
        };
        return configs[userRole];
    }, [userRole]);

    const summary = {
        timeSpent: "4.2h",
        completed: 12,
        points: 450
    };

    const performLogout = async () => {
        setConfirmLogout(false);
        try {
            const response = await fetch(REST_API + "/auth_logout/logout", {
                credentials: "include",
                method: "post"
            });
            const res = await response.json();

            if (res.success) {
                // 1. Clear local items immediately
                localStorage.removeItem("user_role");
                sessionStorage.clear();
                
                // 2. Force Next.js to re-sync the server-side state (clears dashboard cache)
                router.refresh(); 
                
                setStatus("success");
            }
        } catch (error) {
            console.error("Logout error:", error);
            router.push(roleConfig.homePath); 
        }
    };

    // Helper for a clean exit
    const handleFinalExit = () => {
        // Using window.location.href forces a full browser reload
        // ensuring no React state or dashboard memory persists.
        window.location.href = "/";
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050505] text-gray-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full animate-in fade-in zoom-in duration-300">
                <div className="bg-[#0A0A0B] border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-center relative overflow-hidden">
                    
                    <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[80px] opacity-20 ${
                        userRole === 'admin' ? 'bg-red-600' : 'bg-blue-600'
                    }`}></div>

                    {status === "processing" ? (
                        confirmLogout ? (
                            <div className="space-y-6 py-10">
                                <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto border border-zinc-800">
                                    <LogOut className="text-zinc-500" size={32} />
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-2xl font-black uppercase tracking-tighter italic">
                                        End <span className="text-blue-500">Session?</span>
                                    </h1>
                                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                                        Terminating {userRole} access...
                                    </p>
                                </div>
                                <div className="pt-4 space-y-4">
                                    <button
                                        onClick={performLogout}
                                        className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all active:scale-[0.98]"
                                    >
                                        Yes, Secure Logout <ArrowRight size={18} />
                                    </button>
                                    <button
                                        onClick={() => router.back()}
                                        className="w-full text-zinc-600 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                                    >
                                        Cancel and Return
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 py-10">
                                <Loader2 className="mx-auto text-blue-500 animate-spin" size={48} />
                                <h2 className="text-lg font-black uppercase tracking-widest">Syncing Data...</h2>
                            </div>
                        )
                    ) : (
                        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                                    <CheckCircle2 size={40} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-black italic uppercase tracking-tighter">
                                    Session <span className="text-emerald-500">Closed</span>
                                </h1>
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                                    Final {userRole} report generated
                                </p>
                            </div>

                            <div className="bg-black/40 border border-zinc-800 rounded-3xl p-6 grid grid-cols-3 gap-2">
                                <div className="space-y-1">
                                    <Clock className="mx-auto text-blue-400" size={16} />
                                    <p className="text-lg font-black tracking-tighter">{summary.timeSpent}</p>
                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">{roleConfig.statLabel}</p>
                                </div>
                                <div className="space-y-1 border-x border-zinc-800">
                                    <div className="flex justify-center text-emerald-400">{roleConfig.icon}</div>
                                    <p className="text-lg font-black tracking-tighter">{summary.completed}</p>
                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">{roleConfig.label}</p>
                                </div>
                                <div className="space-y-1">
                                    <Trophy className="mx-auto text-yellow-500" size={16} />
                                    <p className="text-lg font-black tracking-tighter">+{summary.points}</p>
                                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">Merit</p>
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <button
                                    onClick={handleFinalExit}
                                    className="w-full bg-zinc-100 text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all"
                                >
                                    Return to Home <Home size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-center text-zinc-300 text-[10px] mt-10 font-black uppercase tracking-[0.4em]">
                    &copy; Base Platform Security Protocol
                </p>
            </div>
        </div>
    );
}

function ShieldCheck({ size, className }: { size: number, className: string }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}