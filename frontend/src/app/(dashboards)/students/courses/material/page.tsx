"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {courses} from "@/constants"
import { 
  BookOpen, Calculator, FlaskConical, PenTool, 
  Cpu, Microscope, Leaf, Globe, Search, Filter 
} from "lucide-react";

// // --- Types & Interfaces ---
// interface Course {
//   id: string;
//   title: string;
//   desc: string;
// }

interface Topic {
  title: string;
  slug: string;
}

// --- Icons Mapping for Courses ---
const getIcon = (title: string): LucideIcon => {
  const code = title.split(" ")[0].toUpperCase();
  if (code === "MTH") return Calculator;
  if (code === "PHY") return Atom;
  if (code === "CHM") return FlaskConical;
  if (code === "BIO") return BookOpen;
  if (code === "STA") return BarChart3;
  if (code === "CMP") return Binary;
  if (code === "GST") return Languages;
  if (code === "AGR") return Sprout;
  return BookOpen;
};

export default function StudyMatePage() {
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

export default function CourseMaterialPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"All" | "100L" | "200L">("All");

  const handleNavigate = (courseCode: string) => {
    router.push(`/students/courses/material/${courseCode.toLowerCase()}/topics`);
  };

  const filteredCourses = courseData.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(search.toLowerCase()) || 
                          course.title.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "All" || course.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <main className="min-h-screen bg-gray-950 p-4 sm:p-6 md:p-10 text-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Materials
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Search and select your course to access the materials.
          </p>
        </div>

        {/* Controls: Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search by code or title (e.g. MTH 101)..."
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#035b77] transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex bg-gray-900 p-1 rounded-2xl border border-gray-800">
            {(["All", "100L", "200L"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  levelFilter === lvl ? "bg-[#035b77] text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <motion.div 
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence>
            {filteredCourses.map((course, index) => {
              const Icon = getIcon(course.code);
              return (
                <motion.div
                  key={course.code}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer bg-gray-900 rounded-3xl p-6 border border-gray-800 hover:border-[#035b77]/50 transition-all flex flex-col items-center text-center relative overflow-hidden group shadow-xl"
                  onClick={() => handleNavigate(course.code)}
                >
                  {/* Decorative Background Blur */}
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#035b77]/10 blur-2xl rounded-full transition-all group-hover:bg-[#035b77]/20" />
                  
                  <div className="bg-[#035b77]/10 p-4 rounded-2xl mb-5 text-[#035b77] group-hover:bg-[#035b77] group-hover:text-white transition-colors">
                    <Icon size={28} />
                  </div>

                  <span className="text-[10px] font-black tracking-widest text-[#035b77] uppercase mb-1">
                    {course.level}
                  </span>
                  
                  <h2 className="text-xl font-bold text-white mb-2">
                    {course.code}
                  </h2>
                  
                  <p className="text-sm font-medium text-gray-400 mb-4 line-clamp-1">
                    {course.title}
                  </p>
                  
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 font-medium">No courses match your search or filter.</p>
          </div>
        )}
      </div>
    </main>
  );
}