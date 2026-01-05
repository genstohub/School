"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  Loader2, 
  CheckCircle2, 
  ArrowRight,
  Trophy,
  Clock
} from "lucide-react";
import Link from "next/link";

interface SessionSummary {
  hoursSpent: number;
  lessonsCompleted: number;
  pointsEarned: number;
}

export default function LogoutPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"processing" | "success">("processing");

  // Mock session data - in a real app, you'd fetch this from state or local storage before clearing
  const summary: SessionSummary = {
    hoursSpent: 2.5,
    lessonsCompleted: 4,
    pointsEarned: 150
  };

  useEffect(() => {
    const performLogout = async () => {
      try {
        // 1. Logic for Backend Engineer:
        // await fetch('/api/auth/logout', { method: 'POST' });
        
        // 2. Clear local storage/cookies
        // localStorage.removeItem('token');
        
        // Simulate a brief delay for a "clean" logout feel
        setTimeout(() => {
          setStatus("success");
        }, 2000);
      } catch (error) {
        console.error("Logout failed", error);
        router.push("/students/dashboard");
      }
    };

    performLogout();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
          
          {/* Decorative background glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          {status === "processing" ? (
            <div className="space-y-6 py-8">
              <div className="relative inline-block">
                <div className="w-20 h-20 border-4 border-gray-800 border-t-blue-600 rounded-full animate-spin"></div>
                <LogOut className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">Logging you out...</h1>
                <p className="text-gray-500 text-sm">Safely saving your progress and closing your session.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-600/20 text-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 size={40} />
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-2">Great work today!</h1>
                <p className="text-gray-400">You&apos;ve been successfully logged out.</p>
              </div>

              {/* Session Summary Card */}
              <div className="bg-gray-950/50 border border-gray-800 rounded-2xl p-4 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <Clock className="mx-auto text-blue-400 mb-1" size={16} />
                  <p className="text-lg font-bold">{summary.hoursSpent}h</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Study</p>
                </div>
                <div className="text-center border-x border-gray-800">
                  <CheckCircle2 className="mx-auto text-green-400 mb-1" size={16} />
                  <p className="text-lg font-bold">{summary.lessonsCompleted}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Lessons</p>
                </div>
                <div className="text-center">
                  <Trophy className="mx-auto text-yellow-500 mb-1" size={16} />
                  <p className="text-lg font-bold">+{summary.pointsEarned}</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">XP</p>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Link 
                  href="/auth/login" 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                >
                  Log Back In <ArrowRight size={18} />
                </Link>
                <Link 
                  href="/" 
                  className="w-full text-gray-500 hover:text-white text-sm font-medium transition-colors"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-center text-gray-600 text-xs mt-8 font-medium">
        &copy; {new Date().getFullYear()} BASE Platform. See you tomorrow!
        </p>
      </div>
    </div>
  );
}