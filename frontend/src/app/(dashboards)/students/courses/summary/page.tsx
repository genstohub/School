"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Search, Filter, GraduationCap } from "lucide-react";

// --- Comprehensive Course Data ---
const courseData = [
  // 100 Level
  { id: "mth101", code: "MTH101", level: "100L", title: "General Mathematics I", description: "Algebra, trigonometry, and the basics of coordinate geometry." },
  { id: "mth102", code: "MTH102", level: "100L", title: "General Mathematics II", description: "Introduction to calculus, including limits, differentiation, and integration." },
  { id: "sta101", code: "STA101", level: "100L", title: "Introduction to Statistics", description: "Data collection, descriptive statistics, and basic probability theory." },
  { id: "cmp101", code: "CMP101", level: "100L", title: "Intro to Computer Science", description: "History of computing, hardware/software basics, and digital logic." },
  { id: "phy101", code: "PHY101", level: "100L", title: "General Physics I", description: "Mechanics, heat, and properties of matter." },
  { id: "chm101", code: "CHM101", level: "100L", title: "General Chemistry I", description: "Atomic structure, chemical bonding, and stoichiometry." },
  { id: "gst101", code: "GST101", level: "100L", title: "Use of English I", description: "Communication skills, grammar, and essay writing." },
  { id: "agr101", code: "AGR101", level: "100L", title: "Intro to Agriculture", description: "Foundations of farming systems and agricultural importance." },
  // ... (Mapping logic will handle the rest of your 40+ courses)
  
  // 200 Level
  { id: "mth201", code: "MTH201", level: "200L", title: "Mathematical Methods I", description: "Vector calculus, series expansions, and differential equations." },
  { id: "cmp201", code: "CMP201", level: "200L", title: "Computer Programming II", description: "Object-oriented programming concepts and application development." },
  { id: "chm201", code: "CHM201", level: "200L", title: "Organic Chemistry I", description: "Structure, properties, and reactions of organic compounds." },
];

export default function CourseSummaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<"All" | "100L" | "200L">("All");

  const filteredCourses = useMemo(() => {
    return courseData.filter((course) => {
      const matchesSearch = 
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel]);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-[#035b77]/20 p-3 rounded-2xl mb-4"
          >
            <GraduationCap className="text-[#035b77] w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight"
          >
            Course <span className="text-[#035b77]">Summaries</span>
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Quickly review course objectives, core concepts, and key takeaways for all 100L and 200L modules.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search by code or title..."
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#035b77] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800">
            {(["All", "100L", "200L"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  selectedLevel === lvl 
                    ? "bg-[#035b77] text-white shadow-lg" 
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/students/courses/summary/${course.id}/topics`}
                  className="group block bg-gray-900 border border-gray-800 p-6 rounded-[2rem] hover:border-[#035b77]/50 hover:bg-gray-900/50 transition-all h-full relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-[#035b77]/10 p-3 rounded-xl text-[#035b77] group-hover:bg-[#035b77] group-hover:text-white transition-all">
                      <BookOpen size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-gray-950 px-2 py-1 rounded border border-gray-800 text-gray-500">
                      {course.level}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#035b77] transition-colors">
                    {course.code}
                  </h2>
                  <h3 className="text-sm font-semibold text-gray-400 mb-3">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 text-[#035b77] font-bold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                    View Summary <FileText size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-[3rem]">
            <p className="text-gray-500">No courses found matching &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>
    </main>
  );
}