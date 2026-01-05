"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Users, 
  ChevronRight, 
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

// --- Types ---
type LevelFilter = 100 | 200 | "All";

interface Course {
  code: string;
  title: string;
  level: 100 | 200;
  category: "Science" | "Math" | "GST" | "Agric" | "CMP";
  activeStudents: number;
}

export default function DepartmentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState<LevelFilter>("All");

  const courses: Course[] = [
    // 100 LEVEL
    { code: "MTH 101", title: "General Mathematics I", level: 100, category: "Math", activeStudents: 142 },
    { code: "MTH 102", title: "General Mathematics II", level: 100, category: "Math", activeStudents: 89 },
    { code: "STA 101", title: "Introduction to Statistics", level: 100, category: "Math", activeStudents: 45 },
    { code: "CMP 101", title: "Introduction to Computer Science", level: 100, category: "CMP", activeStudents: 210 },
    { code: "CMP 102", title: "Computer Programming I", level: 100, category: "CMP", activeStudents: 156 },
    { code: "GST 109", title: "Information & Digital Literacy Skills", level: 100, category: "GST", activeStudents: 32 },
    { code: "BIO 101", title: "General Biology I", level: 100, category: "Science", activeStudents: 120 },
    { code: "BIO 102", title: "General Biology II", level: 100, category: "Science", activeStudents: 115 },
    { code: "CHM 101", title: "General Chemistry I", level: 100, category: "Science", activeStudents: 95 },
    { code: "CHM 102", title: "General Chemistry II", level: 100, category: "Science", activeStudents: 88 },
    { code: "PHY 101", title: "General Physics I", level: 100, category: "Science", activeStudents: 110 },
    { code: "PHY 102", title: "General Physics II", level: 100, category: "Science", activeStudents: 102 },
    { code: "BIO 107", title: "Practical Biology I", level: 100, category: "Science", activeStudents: 45 },
    { code: "CHM 107", title: "Practical Chemistry I", level: 100, category: "Science", activeStudents: 48 },
    { code: "GST 101", title: "Use of English I", level: 100, category: "GST", activeStudents: 300 },
    { code: "GST 102", title: "Use of English II", level: 100, category: "GST", activeStudents: 280 },
    { code: "GST 103", title: "Nigerian Peoples and Culture", level: 100, category: "GST", activeStudents: 150 },
    { code: "AGR 101", title: "Introduction to Agriculture", level: 100, category: "Agric", activeStudents: 54 },
    { code: "AGR 102", title: "Principles of Crop Production", level: 100, category: "Agric", activeStudents: 42 },

    // 200 LEVEL
    { code: "MTH 201", title: "Mathematical Methods I", level: 200, category: "Math", activeStudents: 67 },
    { code: "MTH 202", title: "Mathematical Methods II", level: 200, category: "Math", activeStudents: 62 },
    { code: "STA 201", title: "Probability Theory & Distributions", level: 200, category: "Math", activeStudents: 40 },
    { code: "CMP 201", title: "Computer Programming II (OOP)", level: 200, category: "CMP", activeStudents: 124 },
    { code: "CMP 202", title: "Data Structures & Algorithms", level: 200, category: "CMP", activeStudents: 98 },
    { code: "BIO 201", title: "Cell Biology & Genetics", level: 200, category: "Science", activeStudents: 55 },
    { code: "BIO 202", title: "Ecology & Environmental Biology", level: 200, category: "Science", activeStudents: 48 },
    { code: "CHM 201", title: "Organic Chemistry I", level: 200, category: "Science", activeStudents: 42 },
    { code: "CHM 202", title: "Physical Chemistry II", level: 200, category: "Science", activeStudents: 38 },
    { code: "PHY 201", title: "Electricity & Magnetism", level: 200, category: "Science", activeStudents: 76 },
    { code: "PHY 202", title: "Waves, Optics & Thermodynamics", level: 200, category: "Science", activeStudents: 65 },
    { code: "CHM 207", title: "Practical Chemistry II", level: 200, category: "Science", activeStudents: 30 },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = activeLevel === "All" || course.level === activeLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <Link href="/students/community" className="text-blue-500 flex items-center gap-2 text-sm font-bold hover:underline mb-4">
              <ArrowLeft size={16} /> Back to Community
            </Link>
            <h1 className="text-4xl font-black tracking-tight">Department Study Groups</h1>
            <p className="text-gray-500 font-medium">Select a course to join the live discussion and share resources.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-1 flex">
              {(["All", 100, 200] as LevelFilter[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${
                    activeLevel === lvl ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {lvl === "All" ? "ALL LEVELS" : `${lvl}L`}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-3 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            <input 
              type="text" 
              placeholder="Search by course code or title (e.g., MTH 101)..."
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Active Now</p>
              <p className="text-2xl font-bold">1,204</p>
            </div>
            <Users className="text-blue-500" size={24} />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course.code} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-900 rounded-[3rem]">
            <BookOpen className="mx-auto text-gray-800 mb-4" size={48} />
            <p className="text-gray-500 font-bold">No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Sub-Components ---

function CourseCard({ course }: { course: Course }) {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Math": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "Science": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "CMP": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "GST": return "text-purple-500 bg-purple-500/10 border-purple-500/20";
      case "Agric": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  return (
    <Link href={`/students/department/${course.code.toLowerCase().replace(" ", "-")}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-6 hover:border-blue-600/50 hover:bg-gray-800/30 transition-all group cursor-pointer relative overflow-hidden h-full flex flex-col justify-between">
        
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-600/5 blur-2xl group-hover:bg-blue-600/10 transition-all"></div>

        <div>
          <div className="flex justify-between items-start mb-4">
            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${getCategoryColor(course.category)}`}>
              {course.category}
            </span>
            <span className="text-[10px] text-gray-600 font-bold">{course.level} LEVEL</span>
          </div>

          <h3 className="text-lg font-black group-hover:text-blue-500 transition-colors mb-1 uppercase tracking-tight">
            {course.code}
          </h3>
          <p className="text-sm text-gray-400 font-medium leading-tight">
            {course.title}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
            <Users size={14} className="text-blue-500" />
            <span>{course.activeStudents} active</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-950 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </Link>
  );
}