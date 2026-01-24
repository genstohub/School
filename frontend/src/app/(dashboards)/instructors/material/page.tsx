"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calculator, FlaskConical, BookOpen, 
  Atom, BarChart3, Binary, Languages, Sprout,
  ChevronRight, ArrowLeft, FileEdit, CheckCircle, Clock
} from "lucide-react";
import Link from "next/link";

// --- Types ---
interface Course {
  id: string;
  code: string;
  level: "100L" | "200L";
  title: string;
  description: string;
  drafts?: number; // Added for Instructor view
  published?: number; // Added for Instructor view
}

const INITIAL_COURSE_DATA: Course[] = [
  // 100 Level
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

  // 200 Level
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

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 pt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <Link href="/instructors" className="flex items-center gap-2 text-gray-500 hover:text-[#035b77] mb-8 group transition-colors">
           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
           <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
        </Link>

        {/* CMS Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-[#035b77] pl-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Contribution <span className="text-[#035b77]">Hub</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] mt-3 uppercase">
              Manage, draft and publish academic materials
            </p>
          </div>
          
          {/* Quick Metrics */}
          <div className="flex gap-8 border-t md:border-t-0 md:border-l border-gray-800 pt-6 md:pt-0 md:pl-8">
            <div className="text-center">
                <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Total Published</p>
                <p className="text-2xl font-black text-[#035b77]">142</p>
            </div>
            <div className="text-center">
                <p className="text-[10px] font-black text-gray-600 uppercase mb-1">Active Drafts</p>
                <p className="text-2xl font-black text-amber-500">14</p>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            <input 
              type="text"
              placeholder="Search assigned courses..."
              className="w-full bg-gray-900/40 border border-gray-800 rounded-[2rem] py-5 pl-16 pr-6 focus:outline-none focus:border-[#035b77] transition-all placeholder:text-gray-700"
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

        {/* Editorial Grid */}
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
                  transition={{ delay: idx * 0.02 }}
                  onClick={() => router.push(`/instructors/material/${course.id}`)}
                  className="group relative cursor-pointer bg-[#0A0A0A] border border-gray-800 p-1 rounded-[2rem] overflow-hidden hover:border-[#035b77]/50 transition-all"
                >
                  <div className="p-7">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#035b77] transition-colors">
                        <Icon size={20} />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black tracking-widest text-gray-600 mb-1 uppercase">Assignment</span>
                        <span className="text-[10px] font-black text-[#035b77]">{course.level}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-black uppercase tracking-tighter text-white mb-1">{course.code}</h2>
                    <p className="text-[10px] font-bold text-gray-500 uppercase mb-6">{course.title}</p>
                    
                    {/* Status Indicators */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-800/50">
                            <div className="flex items-center gap-2 text-amber-500 mb-1">
                                <Clock size={12} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Drafts</span>
                            </div>
                            <p className="text-lg font-black">{course.drafts || 0}</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-800/50">
                            <div className="flex items-center gap-2 text-green-500 mb-1">
                                <CheckCircle size={12} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Live</span>
                            </div>
                            <p className="text-lg font-black">{course.published || 0}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                      <div className="flex items-center gap-2">
                        <FileEdit size={14} className="text-[#035b77]" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Manage Material</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-700 group-hover:text-[#035b77] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}