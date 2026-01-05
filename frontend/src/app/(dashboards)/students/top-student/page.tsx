"use client";

import React, { useEffect, useState } from "react";
import { Trophy, Medal, Star, User, Loader2, AlertCircle } from "lucide-react";

// --- Interfaces ---
interface TopStudent {
  id: string;
  name: string;
  avatar: string;
  institution: string;
  score: number;
  rankType: "Gold" | "Silver" | "Bronze" | "Elite" | "Rising Star";
}

export default function TopStudentsLeaderboard() {
  const [students, setStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/students/leaderboard/weekly");
        if (!res.ok) throw new Error("Failed to load leaderboard data");
        const data = await res.json();
        setStudents(data.topFive || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  const getRankStyles = (rank: string) => {
    switch (rank) {
      case "Gold": return { icon: <Trophy className="text-yellow-400" size={18} />, color: "border-yellow-500/50 bg-yellow-500/10" };
      case "Silver": return { icon: <Medal className="text-gray-300" size={18} />, color: "border-gray-400/50 bg-gray-400/10" };
      case "Bronze": return { icon: <Medal className="text-orange-400" size={18} />, color: "border-orange-500/50 bg-orange-500/10" };
      case "Elite": return { icon: <Star className="text-purple-400" size={18} />, color: "border-purple-500/50 bg-purple-500/10" };
      default: return { icon: <User className="text-blue-400" size={18} />, color: "border-blue-500/50 bg-blue-500/10" };
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 h-[440px] flex flex-col items-center justify-center border border-gray-700/50">
        <Loader2 className="animate-spin text-blue-500 mb-2" size={32} />
        <p className="text-gray-400 text-sm font-medium">Calculating rankings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-2xl p-6 h-[440px] flex flex-col items-center justify-center text-center border border-gray-700/50">
        <AlertCircle className="text-red-500 mb-2" size={32} />
        <p className="text-gray-400 text-sm px-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-gray-100 flex items-center gap-2">
          Top Students <span className="text-blue-400 text-sm font-normal">of the Week</span>
        </h3>
        <Trophy size={20} className="text-yellow-500" />
      </div>

      <div className="space-y-3">
        {students.map((student, index) => {
          const styles = getRankStyles(student.rankType);
          return (
            <div 
              key={student.id} 
              className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:scale-[1.02] ${styles.color}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div className="absolute -top-1 -left-1 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center text-[10px] font-black border border-gray-700">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-100">{student.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{student.institution}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  {styles.icon}
                  <span className="text-xs font-black text-gray-200">{student.score}</span>
                </div>
                <span className="text-[9px] font-bold uppercase text-gray-500 tracking-widest">{student.rankType}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-6 py-2 bg-gray-900/50 hover:bg-gray-900 border border-gray-700 text-gray-400 text-xs font-bold rounded-xl transition uppercase tracking-widest">
        View All Rankings
      </button>
    </div>
  );
}