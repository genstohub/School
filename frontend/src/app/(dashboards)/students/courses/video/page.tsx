"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlayCircle,
  Search,
  BookOpen,
  Calculator,
  FlaskConical,
  Binary,
  Languages,
  Sprout,
  BarChart3,
  Dna,
  Zap,
  Video, // Added Video icon for the cards
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Interface for TypeScript type safety
interface CourseVideo {
  id: string;
  title: string;
  desc: string;
}

const courses: CourseVideo[] = [
  // 100 Level Courses
  { id: "mth101", title: "MTH 101", desc: "General Mathematics I" },
  { id: "mth102", title: "MTH 102", desc: "General Mathematics II" },
  { id: "sta101", title: "STA 101", desc: "Introduction to Statistics" },
  { id: "cmp101", title: "CMP 101", desc: "Introduction to Computer Science" },
  { id: "cmp102", title: "CMP 102", desc: "Computer Programming I" },
  { id: "gst109", title: "GST 109", desc: "Information & Digital Literacy" },
  { id: "bio101", title: "BIO 101", desc: "General Biology I" },
  { id: "bio102", title: "BIO 102", desc: "General Biology II" },
  { id: "chm101", title: "CHM 101", desc: "General Chemistry I" },
  { id: "chm102", title: "CHM 102", desc: "General Chemistry II" },
  { id: "phy101", title: "PHY 101", desc: "General Physics I" },
  { id: "phy102", title: "PHY 102", desc: "General Physics II" },
  { id: "bio107", title: "BIO 107", desc: "Practical Biology I" },
  { id: "chm107", title: "CHM 107", desc: "Practical Chemistry I" },
  { id: "gst101", title: "GST 101", desc: "Use of English I" },
  { id: "gst102", title: "GST 102", desc: "Use of English II" },
  { id: "gst103", title: "GST 103", desc: "Nigerian Peoples and Culture" },
  { id: "gst104", title: "GST 104", desc: "Study Skills & ICT" },
  { id: "gst105", title: "GST 105", desc: "History & Philosophy of Science" },
  { id: "gst106", title: "GST 106", desc: "Logic & Human Existence" },
  { id: "gst107", title: "GST 107", desc: "Peace & Conflict Studies" },
  { id: "gst108", title: "GST 108", desc: "Entrepreneurship Studies I" },
  { id: "agr101", title: "AGR 101", desc: "Introduction to Agriculture" },
  { id: "agr102", title: "AGR 102", desc: "Principles of Crop Production" },
  { id: "agr103", title: "AGR 103", desc: "Principles of Animal Production" },
  { id: "agr104", title: "AGR 104", desc: "Introduction to Soil Science" },
  { id: "agr105", title: "AGR 105", desc: "Agric Economics & Extension" },
  { id: "agr106", title: "AGR 106", desc: "Forestry & Wildlife" },
  { id: "agr107", title: "AGR 107", desc: "Practical Agriculture I" },
  { id: "agr108", title: "AGR 108", desc: "Agricultural Biochemistry" },
  // 200 Level Courses
  { id: "mth201", title: "MTH 201", desc: "Mathematical Methods I" },
  { id: "mth202", title: "MTH 202", desc: "Mathematical Methods II" },
  { id: "sta201", title: "STA 201", desc: "Probability Theory" },
  { id: "cmp201", title: "CMP 201", desc: "Computer Programming II (OOP)" },
  { id: "cmp202", title: "CMP 202", desc: "Data Structures & Algorithms" },
  { id: "bio201", title: "BIO 201", desc: "Cell Biology & Genetics" },
  { id: "bio202", title: "BIO 202", desc: "Ecology & Environmental Biology" },
  { id: "bio207", title: "BIO 207", desc: "Biological Techniques" },
  { id: "chm201", title: "CHM 201", desc: "Organic Chemistry I" },
  { id: "chm202", title: "CHM 202", desc: "Physical Chemistry II" },
  { id: "phy201", title: "PHY 201", desc: "Electricity & Modern Physics" },
  { id: "phy202", title: "PHY 202", desc: "Waves, Optics & Thermo" },
  { id: "chm207", title: "CHM 207", desc: "Practical Chemistry II" },
];

const getCourseIcon = (title: string) => {
  const prefix = title.split(" ")[0].toUpperCase();
  switch (prefix) {
    case "MTH": return Calculator;
    case "PHY": return Zap;
    case "CHM": return FlaskConical;
    case "BIO": return Dna;
    case "STA": return BarChart3;
    case "CMP": return Binary;
    case "GST": return Languages;
    case "AGR": return Sprout;
    default: return BookOpen;
  }
};

export default function CourseVideosPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigation = (id: string) => {
    router.push(`/students/courses/video/${id}`);
  };

  return (
    <div className="min-h-screen bg-black px-4 sm:px-8 py-12 lg:px-16 text-white">
      {/* Hero Header */}
      <motion.div
        className="text-left mb-16 border-l-4 border-blue-600 pl-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">
          Digital Learning Archive
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
          Course <span className="text-gray-700 text-outline">Videos</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-xl text-sm font-medium leading-relaxed">
          Access high-definition recorded lectures and visual guides for all faculty modules.
        </p>
      </motion.div>

      {/* Search Bar - Integrated with your style */}
      <div className="flex justify-start mb-12">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
          <input
            type="text"
            placeholder="FILTER BY CODE OR TITLE..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-900/40 border border-gray-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white focus:border-blue-600 focus:outline-none placeholder:text-gray-700 transition-all"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCourses.map((course, idx) => {
            const Icon = getCourseIcon(course.title);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                whileHover={{ y: -5 }}
                onClick={() => handleNavigation(course.id)}
                className="group relative flex items-center justify-between bg-gray-900/20 border border-gray-800 p-6 rounded-[2rem] cursor-pointer hover:bg-blue-600/5 hover:border-blue-600/50 transition-all duration-300"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-black border border-gray-800 rounded-2xl flex items-center justify-center text-gray-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500">
                    <Icon size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-lg text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">
                      {course.title}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter group-hover:text-gray-400">
                      {course.desc}
                    </p>
                  </div>
                </div>

                {/* The Play Video Icon Button */}
                <div className="flex flex-col items-center gap-1">
                  <PlayCircle 
                    size={28} 
                    strokeWidth={1.5}
                    className="text-gray-800 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500" 
                  />
                  <span className="text-[8px] font-black text-blue-500/0 group-hover:text-blue-500 transition-all uppercase">Play</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-32 border border-dashed border-gray-900 rounded-[3rem]">
          <Video size={48} className="mx-auto text-gray-800 mb-4 opacity-20" />
          <p className="text-[10px] font-black tracking-widest text-gray-700 uppercase">
            No session found for &quot;{search}&quot;
          </p>
        </div>
      )}
    </div>
  );
}