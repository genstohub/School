"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calculator, FlaskConical, BookOpen, 
  Atom, BarChart3, Binary, Languages, Sprout,
  ChevronRight, ArrowLeft, PlusCircle, CheckCircle, Clock
} from "lucide-react";
import Link from "next/link";
import { INITIAL_COURSE_DATA } from "@/constants";

// --- Types ---
// interface Course {
//   id: string;
//   code: string;
//   level: "100L" | "200L";
//   title: string;
//   description: string;
//   drafts: number;    
//   published: number; 
// }

const getIcon = (code: string) => {
  const prefix = code.substring(0, 3).toUpperCase();
  switch (prefix) {
    case "MTH": return Calculator;
    case "PHY": return Atom;
    case "CHM": return FlaskConical;
    case "BIO": return BookOpen;
    case "STA": return BarChart3;
    case "CMP": return Binary;
    case "GST": return Languages;
    case "AGR": return Sprout;
    default: return BookOpen;
  }
};

export default function InstructorHubPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");

  const filteredCourses = useMemo(() => {
    return INITIAL_COURSE_DATA.filter(c => {
      const matchSearch = c.code.toLowerCase().includes(search.toLowerCase()) || 
                          c.title.toLowerCase().includes(search.toLowerCase());
      const matchLevel = levelFilter === "All" || c.level === levelFilter;
      return matchSearch && matchLevel;
    });
  }, [search, levelFilter]);

  const totalPublished = INITIAL_COURSE_DATA.reduce((acc, curr) => acc + curr.published, 0);
  const activeDrafts = INITIAL_COURSE_DATA.reduce((acc, curr) => acc + curr.drafts, 0);

  return (
    <main className="min-h-screen bg-gray-800 rounded-2xl text-white p-6 md:p-12 pt-20">
      <div className="max-w-7xl mx-auto">
        
        <Link href="/instructors" className="flex items-center gap-2 text-gray-500 hover:text-[#035b77] mb-8 group transition-colors">
           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
           <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-[#035b77] pl-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Contribution <span className="text-[#035b77]">Hub</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] mt-3 uppercase">
              Manage and Create academic materials
            </p>
          </div>
          
          <div className="flex gap-8 border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-8">
            <div className="text-center">
                <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Total Published</p>
                <p className="text-2xl font-black text-[#035b77]">{totalPublished}</p>
            </div>
            <div className="text-center">
                <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Total Drafts</p>
                <p className="text-2xl font-black text-amber-500">{activeDrafts}</p>
            </div>
          </div>
        </header>

        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            <input 
              type="text"
              placeholder="Search assigned courses..."
              className="w-full bg-gray-900/40 border border-gray-800 rounded-[2rem] py-5 pl-16 pr-6 focus:outline-none focus:border-[#035b77] transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex bg-gray-900/40 p-1.5 rounded-[1.5rem] border border-gray-800 shrink-0">
            {["All", "100L", "200L"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  levelFilter === lvl ? "bg-[#035b77] text-white" : "text-gray-600 hover:text-gray-400"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => {
              const Icon = getIcon(course.code);
              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.01 }}
                  // Removed onClick from the entire card
                  className="group relative bg-[#0A0A0A] border border-gray-800 p-1 rounded-[2.5rem] overflow-hidden hover:border-gray-700 transition-all"
                >
                  <div className="p-7">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-gray-400">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-black text-[#035b77] bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
                        {course.level}
                      </span>
                    </div>

                    <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-1">
                      {course.code}
                    </h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-6 line-clamp-1">{course.title}</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800/50">
                            <div className="flex items-center gap-2 text-amber-500 mb-1">
                                <Clock size={12} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Drafts</span>
                            </div>
                            <p className="text-xl font-black">{course.drafts}</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800/50">
                            <div className="flex items-center gap-2 text-green-500 mb-1">
                                <CheckCircle size={12} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Live</span>
                            </div>
                            <p className="text-xl font-black">{course.published}</p>
                        </div>
                    </div>

                    {/* Navigation restricted only to this button area */}
                    <button 
                      onClick={() => router.push(`/instructors/summary/${course.id}`)}
                      className="w-full flex items-center justify-between pt-4 border-t border-gray-800/50 group/btn"
                    >
                      <div className="flex items-center gap-2">
                        <PlusCircle size={14} className="text-[#035b77] group-hover/btn:scale-110 transition-transform" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover/btn:text-white transition-colors">
                          Create New
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-gray-700 group-hover/btn:text-[#035b77] group-hover/btn:translate-x-1 transition-all" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-20 text-center border border-dashed border-gray-800 rounded-[3rem]">
            <p className="text-[10px] font-black tracking-widest text-gray-600 uppercase">No assignments found</p>
          </div>
        )}
      </div>
    </main>
  );
}