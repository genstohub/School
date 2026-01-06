"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Course {
  code: string;
  title: string;
  level: "100L" | "200L";
}

const allCourses: Course[] = [
  // 100 Level Courses
  { code: "MTH101", title: "General Mathematics I", level: "100L" },
  { code: "MTH102", title: "General Mathematics II", level: "100L" },
  { code: "STA101", title: "Introduction to Statistics", level: "100L" },
  { code: "CMP101", title: "Introduction to Computer Science", level: "100L" },
  { code: "CMP102", title: "Computer Programming I", level: "100L" },
  { code: "GST109", title: "Information & Digital Literacy", level: "100L" },
  { code: "BIO101", title: "General Biology I", level: "100L" },
  { code: "BIO102", title: "General Biology II", level: "100L" },
  { code: "CHM101", title: "General Chemistry I", level: "100L" },
  { code: "CHM102", title: "General Chemistry II", level: "100L" },
  { code: "PHY101", title: "General Physics I", level: "100L" },
  { code: "PHY102", title: "General Physics II", level: "100L" },
  { code: "BIO107", title: "Practical Biology I", level: "100L" },
  { code: "CHM107", title: "Practical Chemistry I", level: "100L" },
  { code: "GST101", title: "Use of English I", level: "100L" },
  { code: "GST102", title: "Use of English II", level: "100L" },
  { code: "GST103", title: "Nigerian Peoples and Culture", level: "100L" },
  { code: "GST104", title: "Study Skills & ICT", level: "100L" },
  { code: "GST105", title: "History & Philosophy of Science", level: "100L" },
  { code: "GST106", title: "Logic & Human Existence", level: "100L" },
  { code: "GST107", title: "Peace & Conflict Studies", level: "100L" },
  { code: "GST108", title: "Entrepreneurship Studies I", level: "100L" },
  { code: "AGR101", title: "Introduction to Agriculture", level: "100L" },
  { code: "AGR102", title: "Principles of Crop Production", level: "100L" },
  { code: "AGR103", title: "Principles of Animal Production", level: "100L" },
  { code: "AGR104", title: "Introduction to Soil Science", level: "100L" },
  { code: "AGR105", title: "Agric Economics & Extension", level: "100L" },
  { code: "AGR106", title: "Forestry & Wildlife", level: "100L" },
  { code: "AGR107", title: "Practical Agriculture I", level: "100L" },
  { code: "AGR108", title: "Agricultural Biochemistry", level: "100L" },

  // 200 Level Courses
  { code: "MTH201", title: "Mathematical Methods I", level: "200L" },
  { code: "MTH202", title: "Mathematical Methods II", level: "200L" },
  { code: "STA201", title: "Probability Theory", level: "200L" },
  { code: "CMP201", title: "Computer Programming II (OOP)", level: "200L" },
  { code: "CMP202", title: "Data Structures & Algorithms", level: "200L" },
  { code: "BIO201", title: "Cell Biology & Genetics", level: "200L" },
  { code: "BIO202", title: "Ecology & Environmental Biology", level: "200L" },
  { code: "BIO207", title: "Biological Techniques", level: "200L" },
  { code: "CHM201", title: "Organic Chemistry I", level: "200L" },
  { code: "CHM202", title: "Physical Chemistry II", level: "200L" },
  { code: "PHY201", title: "Electricity & Modern Physics", level: "200L" },
  { code: "PHY202", title: "Waves, Optics & Thermo", level: "200L" },
  { code: "CHM207", title: "Practical Chemistry II", level: "200L" },
];

export default function QnaCoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "100L" | "200L">("All");

  const handleNavigate = (courseCode: string) => {
    router.push(`/students/courses/qna/${courseCode.toLowerCase()}/topics`);
  };

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || course.level === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gray-950 p-4 sm:p-6 md:p-10 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Course Q&A
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Select a course to explore discussion topics, ask questions, and collaborate with your peers.
          </p>
        </header>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search by course code or name..."
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#035b77] transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Level Filter */}
          <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800">
            {(["All", "100L", "200L"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setActiveFilter(lvl)}
                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                  activeFilter === lvl 
                    ? "bg-[#035b77] text-white shadow-lg" 
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                key={course.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.97 }}
                className="cursor-pointer bg-gray-900 rounded-3xl p-6 border border-gray-800 hover:border-[#035b77]/50 transition-colors group relative overflow-hidden"
                onClick={() => handleNavigate(course.code)}
              >
                {/* Level Badge */}
                <span className="absolute top-4 right-4 text-[10px] font-black bg-gray-950 text-gray-500 px-2 py-1 rounded-md border border-gray-800">
                  {course.level}
                </span>

                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#035b77]/10 p-4 rounded-2xl mb-4 group-hover:bg-[#035b77]/20 transition-colors">
                    <BookOpen className="text-[#035b77] w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1 tracking-tight">
                    {course.code}
                  </h2>
                  <p className="text-sm text-gray-500 leading-tight">
                    {course.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-gray-900/50 rounded-[3rem] border border-dashed border-gray-800">
            <p className="text-gray-500 font-medium">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}