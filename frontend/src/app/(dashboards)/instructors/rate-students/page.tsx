"use client";

import React, { useState, useMemo } from "react";
import { 
  ArrowLeft, Star, Search, Filter, 
  ChevronDown, User, TrendingUp, Mail,
  Award, SlidersHorizontal
} from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  email: string;
  rating: number; // 1 to 5
  course: string;
  lastActive: string;
}

export default function RateStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState<number>(0); // 0 means 'All'

  // Mock Data - In a real app, this would come from your DB
  const [students] = useState<Student[]>([
    { id: "1", name: "Alex Johnson", email: "alex.j@uni.edu", rating: 5, course: "Quantum Physics", lastActive: "2 hrs ago" },
    { id: "2", name: "Sarah Williams", email: "s.williams@uni.edu", rating: 4, course: "Organic Chemistry", lastActive: "5 hrs ago" },
    { id: "3", name: "Michael Chen", email: "m.chen@uni.edu", rating: 3, course: "Advanced Calculus", lastActive: "1 day ago" },
    { id: "4", name: "Elena Rodriguez", email: "elena.r@uni.edu", rating: 5, course: "Quantum Physics", lastActive: "10 mins ago" },
    { id: "5", name: "David Smith", email: "d.smith@uni.edu", rating: 2, course: "Organic Chemistry", lastActive: "3 days ago" },
  ]);

  // Filtering Logic
  const filteredStudents = useMemo(() => {
    return students
      .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(s => minRating === 0 || s.rating === minRating)
      .sort((a, b) => b.rating - a.rating);
  }, [searchTerm, minRating, students]);

  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <Link href="/instructors" className="flex items-center gap-2 text-slate-400 hover:text-white transition group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Command Center</span>
          </Link>

          <div className="flex items-center gap-4 bg-[#1E293B] border border-[#334155] p-2 rounded-2xl">
            <div className="flex items-center px-3 text-yellow-500">
               <Award size={18} />
               <span className="ml-2 text-[10px] font-black uppercase tracking-widest">Instructor Merit System</span>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-4">
            Student <span className="text-yellow-500">Ranking</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl">
            Evaluate student performance, assign merit stars, and filter by academic standing. 
            Highest ranking is <span className="text-yellow-500 font-bold">5 Stars</span>.
          </p>
        </header>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          <div className="md:col-span-7 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1E293B] border border-[#334155] rounded-2xl py-4 pl-12 pr-4 text-sm font-medium outline-none focus:border-yellow-500 transition-all"
            />
          </div>

          <div className="md:col-span-5 flex gap-2">
            <div className="flex-1 relative group">
              <select 
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full appearance-none bg-[#1E293B] border border-[#334155] rounded-2xl py-4 px-6 text-[10px] font-black uppercase tracking-widest outline-none focus:border-yellow-500 transition-all cursor-pointer"
              >
                <option value={0}>All Star Ratings</option>
                <option value={5}>5 Stars (Top Tier)</option>
                <option value={4}>4 Stars (Advanced)</option>
                <option value={3}>3 Stars (Proficient)</option>
                <option value={2}>2 Stars (Developing)</option>
                <option value={1}>1 Star (Needs Review)</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
            
            <button className="bg-[#1E293B] border border-[#334155] p-4 rounded-2xl hover:bg-slate-700 transition">
              <SlidersHorizontal size={18} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-[2rem] overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <th className="px-8 py-6">Student Entity</th>
                <th className="px-8 py-6">Course Path</th>
                <th className="px-8 py-6">Current Rating</th>
                <th className="px-8 py-6">Engagement</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-yellow-500 border border-slate-700">
                           <User size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-sm leading-none mb-1">{student.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-400">
                      {student.course}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={star <= student.rating ? "text-yellow-500 fill-yellow-500" : "text-slate-700"} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[10px] font-bold text-slate-500 italic">{student.lastActive}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-3 bg-slate-800 rounded-xl hover:bg-yellow-500 hover:text-black transition-all group">
                         <Mail size={16} />
                       </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-600">
                       <TrendingUp size={48} className="opacity-20" />
                       <p className="text-sm font-bold uppercase tracking-widest">No candidates match this criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Stats Footer */}
        <footer className="mt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">
           <p>Showing {filteredStudents.length} Students</p>
           <p>Academic Year 2026</p>
        </footer>
      </div>
    </main>
  );
}