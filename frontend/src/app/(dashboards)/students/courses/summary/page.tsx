"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, FileText, Search, GraduationCap } from "lucide-react";

// --- Full Comprehensive Course Data ---
const courseData = [
  // 100 Level (1-30)
  { id: "mth101", code: "MTH101", level: "100L", title: "General Mathematics I", description: "Algebra, trigonometry, and coordinate geometry basics." },
  { id: "mth102", code: "MTH102", level: "100L", title: "General Mathematics II", description: "Introduction to calculus: limits, differentiation, and integration." },
  { id: "sta101", code: "STA101", level: "100L", title: "Introduction to Statistics", description: "Data collection, descriptive statistics, and probability theory." },
  { id: "cmp101", code: "CMP101", level: "100L", title: "Introduction to Computer Science", description: "Computing history, hardware/software, and digital logic." },
  { id: "cmp102", code: "CMP102", level: "100L", title: "Computer Programming I", description: "Problem-solving and programming using high-level languages." },
  { id: "gst109", code: "GST109", level: "100L", title: "Information & Digital Literacy Skills", description: "Search techniques, database management, and digital safety." },
  { id: "bio101", code: "BIO101", level: "100L", title: "General Biology I", description: "Cell structure, genetics, and basic plant/animal physiology." },
  { id: "bio102", code: "BIO102", level: "100L", title: "General Biology II", description: "Ecological principles, evolution, and organismal diversity." },
  { id: "chm101", code: "CHM101", level: "100L", title: "General Chemistry I", description: "Inorganic and physical chemistry fundamentals." },
  { id: "chm102", code: "CHM102", level: "100L", title: "General Chemistry II", description: "Organic chemistry and chemical thermodynamics." },
  { id: "phy101", code: "PHY101", level: "100L", title: "General Physics I", description: "Mechanics, heat, and the properties of matter." },
  { id: "phy102", code: "PHY102", level: "100L", title: "General Physics II", description: "Electricity, magnetism, and introduction to modern physics." },
  { id: "bio107", code: "BIO107", level: "100L", title: "Practical Biology I", description: "Laboratory techniques and biological observations." },
  { id: "chm107", code: "CHM107", level: "100L", title: "Practical Chemistry I", description: "Qualitative and quantitative chemical analysis labs." },
  { id: "gst101", code: "GST101", level: "100L", title: "Use of English I", description: "Communication in English: reading and study skills." },
  { id: "gst102", code: "GST102", level: "100L", title: "Use of English II", description: "Writing skills, essay composition, and advanced grammar." },
  { id: "gst103", code: "GST103", level: "100L", title: "Nigerian Peoples and Culture", description: "Study of Nigerian history, culture, and social structure." },
  { id: "gst104", code: "GST104", level: "100L", title: "Use of Library, Study Skills & ICT", description: "Information retrieval and effective study methods." },
  { id: "gst105", code: "GST105", level: "100L", title: "History & Philosophy of Science", description: "Evolution of scientific thought and the philosophy of knowledge." },
  { id: "gst106", code: "GST106", level: "100L", title: "Logic, Philosophy & Human Existence", description: "Principles of reasoning and human values." },
  { id: "gst107", code: "GST107", level: "100L", title: "Peace & Conflict Studies", description: "Conflict resolution, peacebuilding, and security." },
  { id: "gst108", code: "GST108", level: "100L", title: "Entrepreneurship Studies I", description: "Foundations of entrepreneurship and innovation." },
  { id: "agr101", code: "AGR101", level: "100L", title: "Introduction to Agriculture", description: "Fundamental principles and importance of agriculture." },
  { id: "agr102", code: "AGR102", level: "100L", title: "Principles of Crop Production", description: "Scientific methods for crop cultivation and management." },
  { id: "agr103", code: "AGR103", level: "100L", title: "Principles of Animal Production", description: "Basics of livestock management and animal health." },
  { id: "agr104", code: "AGR104", level: "100L", title: "Introduction to Soil Science", description: "Soil formation, properties, and fertility management." },
  { id: "agr105", code: "AGR105", level: "100L", title: "Agricultural Economics & Extension", description: "Economic principles and agricultural knowledge sharing." },
  { id: "agr106", code: "AGR106", level: "100L", title: "Introduction to Forestry & Wildlife", description: "Conservation of forests and wild animal species." },
  { id: "agr107", code: "AGR107", level: "100L", title: "Practical Agriculture I", description: "Hands-on experience in farm practice and techniques." },
  { id: "agr108", code: "AGR108", level: "100L", title: "Agricultural Biochemistry Basics", description: "Chemical processes in plants and animals." },

  // 200 Level (1-13)
  { id: "mth201", code: "MTH201", level: "200L", title: "Mathematical Methods I", description: "Advanced vector calculus and differential equations." },
  { id: "mth202", code: "MTH202", level: "200L", title: "Mathematical Methods II", description: "Fourier series, partial differential equations, and complex analysis." },
  { id: "sta201", code: "STA201", level: "200L", title: "Probability Theory & Distributions", description: "Probability laws and statistical distribution patterns." },
  { id: "cmp201", code: "CMP201", level: "200L", title: "Computer Programming II", description: "Object-oriented programming using modern frameworks." },
  { id: "cmp202", code: "CMP202", level: "200L", title: "Data Structures & Algorithms", description: "Organization of data and efficiency of computational tasks." },
  { id: "bio201", code: "BIO201", level: "200L", title: "Cell Biology & Genetics", description: "Heredity, molecular genetics, and cell functions." },
  { id: "bio202", code: "BIO202", level: "200L", title: "Ecology & Environmental Biology", description: "Interaction between organisms and their environment." },
  { id: "bio207", code: "BIO207", level: "200L", title: "Biological Techniques", description: "Advanced laboratory techniques for biological research." },
  { id: "chm201", code: "CHM201", level: "200L", title: "Organic Chemistry I", description: "Chemistry of carbon compounds and functional groups." },
  { id: "chm202", code: "CHM202", level: "200L", title: "Physical Chemistry II", description: "Thermodynamics, kinetics, and electrochemistry." },
  { id: "phy201", code: "PHY201", level: "200L", title: "Electricity & Magnetism", description: "Electromagnetic fields, circuits, and Maxwell's equations." },
  { id: "phy202", code: "PHY202", level: "200L", title: "Waves, Optics & Thermodynamics", description: "Study of light, sound waves, and heat energy." },
  { id: "chm207", code: "CHM207", level: "200L", title: "Practical Chemistry II", description: "Advanced analytical and synthetic chemical laboratory." },
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
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Review objectives and key concepts for all {courseData.length} available 100L and 200L courses.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between sticky top-0 z-10 bg-gray-950/80 backdrop-blur-md py-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search by code (e.g., CHM101)..."
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#035b77] transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800 shadow-inner">
            {(["All", "100L", "200L"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
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
                transition={{ duration: 0.3, delay: (index % 12) * 0.03 }} // Limited delay for performance
              >
                <Link
                  href={`/students/courses/summary/${course.id}/topics`}
                  className="group block bg-gray-900 border border-gray-800 p-6 rounded-[2.5rem] hover:border-[#035b77]/50 hover:bg-gray-900/50 transition-all h-full relative overflow-hidden shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-[#035b77]/10 p-3 rounded-2xl text-[#035b77] group-hover:bg-[#035b77] group-hover:text-white transition-all duration-500">
                      <BookOpen size={20} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-gray-950 px-3 py-1.5 rounded-full border border-gray-800 text-gray-500">
                      {course.level}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-1 group-hover:text-[#035b77] transition-colors">
                    {course.code}
                  </h2>
                  <h3 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-tighter">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-8 line-clamp-3 font-medium">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-2 text-[#035b77] font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all mt-auto border-t border-gray-800/50 pt-4">
                    Access Summary <FileText size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-24 bg-gray-900/20 border border-dashed border-gray-800 rounded-[3rem]">
            <p className="text-gray-500 font-bold tracking-widest uppercase text-xs">No courses found matching your query</p>
          </div>
        )}
      </div>
    </main>
  );
}