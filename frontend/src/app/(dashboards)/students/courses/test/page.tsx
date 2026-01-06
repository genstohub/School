"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Calculator, FlaskConical, PenTool, 
  Cpu, Microscope, Leaf, Globe, Search, Filter 
} from "lucide-react";

// --- Types ---
interface Course {
  code: string;
  title: string;
  description: string;
  level: "100L" | "200L";
}

// --- Data ---
const courseData: Course[] = [
  // 100 Level
  { code: "MTH101", title: "General Mathematics I", description: "Algebra, geometry, and foundations of calculus.", level: "100L" },
  { code: "MTH102", title: "General Mathematics II", description: "Calculus and analytical geometry.", level: "100L" },
  { code: "STA101", title: "Introduction to Statistics", description: "Data collection, analysis and probability basics.", level: "100L" },
  { code: "CMP101", title: "Introduction to Computer Science", description: "History and basics of computing systems.", level: "100L" },
  { code: "CMP102", title: "Computer Programming I", description: "Introduction to logic and structured programming.", level: "100L" },
  { code: "GST109", title: "Information & Digital Literacy Skills", description: "Navigating digital information environments.", level: "100L" },
  { code: "BIO101", title: "General Biology I", description: "Cellular biology and molecules of life.", level: "100L" },
  { code: "BIO102", title: "General Biology II", description: "Organismal biology and ecosystems.", level: "100L" },
  { code: "CHM101", title: "General Chemistry I", description: "Inorganic and physical chemistry fundamentals.", level: "100L" },
  { code: "CHM102", title: "General Chemistry II", description: "Organic and physical chemistry basics.", level: "100L" },
  { code: "PHY101", title: "General Physics I", description: "Mechanics, heat and properties of matter.", level: "100L" },
  { code: "PHY102", title: "General Physics II", description: "Electricity, magnetism and modern physics.", level: "100L" },
  { code: "BIO107", title: "Practical Biology I", description: "Laboratory techniques for biology.", level: "100L" },
  { code: "CHM107", title: "Practical Chemistry I", description: "Laboratory techniques for chemistry.", level: "100L" },
  { code: "GST101", title: "Use of English I", description: "Communication and grammar skills.", level: "100L" },
  { code: "GST102", title: "Use of English II", description: "Writing and composition skills.", level: "100L" },
  { code: "GST103", title: "Nigerian Peoples and Culture", description: "Social and cultural history of Nigeria.", level: "100L" },
  { code: "GST104", title: "Study Skills & ICT", description: "Effective learning and computer tools.", level: "100L" },
  { code: "GST105", title: "History & Philosophy of Science", description: "Evolution of scientific thought.", level: "100L" },
  { code: "GST106", title: "Logic, Philosophy & Human Existence", description: "Critical thinking and philosophical basics.", level: "100L" },
  { code: "GST107", title: "Peace & Conflict Studies", description: "Conflict resolution and peace building.", level: "100L" },
  { code: "GST108", title: "Entrepreneurship Studies I", description: "Foundations of starting a business.", level: "100L" },
  { code: "AGR101", title: "Introduction to Agriculture", description: "Overview of agricultural systems.", level: "100L" },
  { code: "AGR102", title: "Principles of Crop Production", description: "Plant growth and farm management.", level: "100L" },
  { code: "AGR103", title: "Principles of Animal Production", description: "Livestock management and breeding.", level: "100L" },
  { code: "AGR104", title: "Introduction to Soil Science", description: "Soil properties and fertility.", level: "100L" },
  { code: "AGR105", title: "Agricultural Economics & Extension", description: "Agri-business and community teaching.", level: "100L" },
  { code: "AGR106", title: "Introduction to Forestry & Wildlife", description: "Conservation and forest management.", level: "100L" },
  { code: "AGR107", title: "Practical Agriculture I", description: "On-farm practical applications.", level: "100L" },
  { code: "AGR108", title: "Agricultural Biochemistry Basics", description: "Chemical processes in living organisms.", level: "100L" },

  // 200 Level
  { code: "MTH201", title: "Mathematical Methods I", description: "Advanced calculus and vector analysis.", level: "200L" },
  { code: "MTH202", title: "Mathematical Methods II", description: "Complex variables and differential equations.", level: "200L" },
  { code: "STA201", title: "Probability Theory & Distributions", description: "Mathematical foundations of probability.", level: "200L" },
  { code: "CMP201", title: "Computer Programming II (OOP)", description: "Object-oriented concepts and languages.", level: "200L" },
  { code: "CMP202", title: "Data Structures & Algorithms", description: "Optimizing code and data organization.", level: "200L" },
  { code: "BIO201", title: "Cell Biology & Genetics", description: "Inheritance and cellular mechanics.", level: "200L" },
  { code: "BIO202", title: "Ecology & Environmental Biology", description: "Nature's systems and conservation.", level: "200L" },
  { code: "BIO207", title: "Biological Techniques", description: "Advanced biological laboratory methods.", level: "200L" },
  { code: "CHM201", title: "Organic Chemistry I", description: "Structure and reaction of carbon compounds.", level: "200L" },
  { code: "CHM202", title: "Physical Chemistry II", description: "Thermodynamics and kinetics.", level: "200L" },
  { code: "PHY201", title: "Electricity & Magnetism", description: "Advanced modern physics concepts.", level: "200L" },
  { code: "PHY202", title: "Waves, Optics & Thermodynamics", description: "Behavior of light, sound, and heat.", level: "200L" },
  { code: "CHM207", title: "Practical Chemistry II", description: "Quantitative chemical analysis lab.", level: "200L" },
];

// Helper to assign icons based on course code prefix
const getIcon = (code: string) => {
  const prefix = code.substring(0, 3).toUpperCase();
  switch (prefix) {
    case 'MTH': case 'STA': return Calculator;
    case 'CHM': return FlaskConical;
    case 'PHY': return FlaskConical;
    case 'BIO': return Microscope;
    case 'CMP': return Cpu;
    case 'AGR': return Leaf;
    case 'GST': return PenTool;
    default: return BookOpen;
  }
};

export default function CourseTestPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<"All" | "100L" | "200L">("All");

  const handleNavigate = (courseCode: string) => {
    router.push(`/students/courses/test/${courseCode.toLowerCase()}/topics`);
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
            Test Center
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Search and select your course to access assignments, quizzes, and past questions.
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