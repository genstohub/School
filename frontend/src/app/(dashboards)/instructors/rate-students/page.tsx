"use client";

import React, { useState, useMemo } from "react";
import { 
  ArrowLeft, Star, Search, Plus, Minus,
  User, Award, ChevronDown, 
  Building2, Loader2, CheckCircle2, AlertCircle
} from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  department: string;
  rating: number; 
  lastActive: string;
}

export default function RateStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState<string | null>(null); // Track which ID is being saved
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Alex Johnson", department: "Faculty of Engineering", rating: 5, lastActive: "2 hrs ago" },
    { id: "2", name: "Sarah Williams", department: "Computer Science", rating: 4, lastActive: "5 hrs ago" },
    { id: "3", name: "Michael Chen", department: "Pure & Applied Mathematics", rating: 3, lastActive: "1 day ago" },
    { id: "4", name: "Elena Rodriguez", department: "Faculty of Engineering", rating: 5, lastActive: "10 mins ago" },
    { id: "5", name: "David Smith", department: "Biochemistry", rating: 2, lastActive: "3 days ago" },
  ]);

  // DATABASE SYNC HANDLER
  const adjustRating = async (id: string, delta: number) => {
    const student = students.find(s => s.id === id);
    if (!student) return;

    const newRating = Math.min(5, Math.max(1, student.rating + delta));
    if (newRating === student.rating) return;

    // 1. Optimistic UI Update
    setIsUpdating(id);
    setStudents(prev => prev.map(s => s.id === id ? { ...s, rating: newRating } : s));

    try {
      // 2. Database Call
      // Replace with your actual API endpoint: await fetch(`/api/students/${id}/rate`, { method: 'POST', body: JSON.stringify({ rating: newRating }) })
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network lag
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      // 3. Revert on Error
      setSaveStatus('error');
      setStudents(prev => prev.map(s => s.id === id ? { ...s, rating: student.rating } : s));
      alert("Database sync failed. Reverting to previous rank.");
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredStudents = useMemo(() => {
    return students
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(s => minRating === 0 || s.rating === minRating)
      .sort((a, b) => b.rating - a.rating);
  }, [searchTerm, minRating, students]);

  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 md:p-12 relative">
      
      {/* Dynamic Sync Status Toast */}
      <div className="fixed top-10 right-10 z-50 pointer-events-none">
        {saveStatus === 'success' && (
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <CheckCircle2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">DB Synced</span>
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="bg-red-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <AlertCircle size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Sync Failed</span>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <Link href="/instructors" className="flex items-center gap-2 text-slate-400 hover:text-white transition group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500/80">Command Hub</span>
          </Link>
          <div className="bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-2xl flex items-center gap-3">
             <Award size={18} className="text-yellow-500" />
             <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500">Merit Registry 2026</span>
          </div>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-4">
            Student <span className="text-yellow-500">Ranking</span>
          </h1>
        </header>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Filter by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1E293B] border border-[#334155] rounded-2xl py-4 pl-12 text-sm font-medium outline-none focus:border-yellow-500 transition-all"
            />
          </div>
          <div className="md:col-span-4 relative">
            <select 
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full appearance-none bg-[#1E293B] border border-[#334155] rounded-2xl py-4 px-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-yellow-500 cursor-pointer"
            >
              <option value={0}>All Ranks</option>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-[2.5rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <th className="px-8 py-6">Student</th>
                <th className="px-8 py-6">Department</th>
                <th className="px-8 py-6">Merit</th>
                <th className="px-8 py-6 text-right">Update Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 border border-slate-700">
                         {isUpdating === student.id ? <Loader2 size={18} className="animate-spin text-yellow-500" /> : <User size={20} />}
                      </div>
                      <span className="font-bold text-sm">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-tight">
                      <Building2 size={14} className="text-slate-600" />
                      {student.department}
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={`${star <= student.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-800"}`} 
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => adjustRating(student.id, -1)}
                        disabled={student.rating <= 1 || isUpdating === student.id}
                        className="p-3 bg-slate-900 rounded-xl hover:bg-red-500/10 hover:text-red-500 text-slate-500 transition-all border border-slate-800 disabled:opacity-20"
                      >
                        <Minus size={16} />
                      </button>
                      <button 
                        onClick={() => adjustRating(student.id, 1)}
                        disabled={student.rating >= 5 || isUpdating === student.id}
                        className="p-3 bg-slate-900 rounded-xl hover:bg-yellow-500 hover:text-black text-slate-500 transition-all border border-slate-800 disabled:opacity-20"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}