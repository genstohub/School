"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Calculator, FlaskConical, BookOpen, 
  Atom, BarChart3, Binary, Languages, Sprout,
  Database, Loader2, AlertCircle, ChevronRight
} from "lucide-react";

// --- Types ---
interface Course {
  id: string;
  code: string;
  level: "100L" | "200L";
  title: string;
  description: string;
}

type LevelFilter = "All" | "100L" | "200L";

// --- Full Comprehensive Course Data ---
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

// --- Dynamic Icon Picker ---
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

export default function CourseMaterialPage() {
  const router = useRouter();
  
  // States
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("All");

  // API Sync Simulation
  useEffect(() => {
    async function syncData() {
      try {
        setLoading(true);
        // This is where you would fetch: await fetch('/api/materials')
        // For now, we use your comprehensive list
        setCourses(INITIAL_COURSE_DATA);
      } catch (err) {
        setError("Failed to sync with central database.");
      } finally {
        setTimeout(() => setLoading(false), 800); // Small delay for UX feel
      }
    }
    syncData();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchSearch = c.code.toLowerCase().includes(search.toLowerCase()) || 
                          c.title.toLowerCase().includes(search.toLowerCase());
      const matchLevel = levelFilter === "All" || c.level === levelFilter;
      return matchSearch && matchLevel;
    });
  }, [search, levelFilter, courses]);

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 border-l-4 border-[#035b77] pl-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Study <span className="text-[#035b77]">Vault</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold tracking-[0.2em] mt-2 uppercase">
            Centralized Academic Resource Management
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
          <div className="relative w-full lg:max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
            <input 
              type="text"
              placeholder="Filter by code or course name..."
              className="w-full bg-gray-900/40 border border-gray-800 rounded-[2rem] py-5 pl-16 pr-6 focus:outline-none focus:border-[#035b77] transition-all placeholder:text-gray-700 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex bg-gray-900/40 p-1.5 rounded-[1.5rem] border border-gray-800 shrink-0">
            {(["All", "100L", "200L"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  levelFilter === lvl ? "bg-[#035b77] text-white shadow-xl shadow-[#035b77]/20" : "text-gray-600 hover:text-gray-400"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Content States */}
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-[#035b77] animate-spin mb-6" />
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-700 uppercase">Synchronizing...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2rem] flex items-center gap-6 max-w-2xl mx-auto">
            <AlertCircle className="text-red-500" size={32} />
            <p className="font-bold text-red-500 uppercase tracking-tighter">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => {
                const Icon = getIcon(course.code);
                return (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.01 }}
                    onClick={() => router.push(`/students/courses/material/${course.id}/topics`)}
                    className="group relative cursor-pointer bg-gray-900/20 border border-gray-800/60 p-8 rounded-[2.5rem] hover:bg-gray-900/40 hover:border-[#035b77]/40 transition-all overflow-hidden flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 bg-black border border-gray-800 rounded-2xl flex items-center justify-center text-[#035b77] group-hover:scale-110 group-hover:bg-[#035b77] group-hover:text-white transition-all duration-500">
                        <Icon size={24} />
                      </div>
                      <span className="text-[8px] font-black tracking-widest bg-gray-950 px-3 py-1.5 rounded-full text-gray-500 border border-gray-900">
                        {course.level}
                      </span>
                    </div>

                    <h2 className="text-xl font-black uppercase tracking-tight mb-2 leading-none">
                      {course.code}
                    </h2>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-tighter line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-gray-700 leading-relaxed font-medium line-clamp-3 mb-8">
                      {course.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-800/40 flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 group-hover:text-[#035b77] transition-colors">Open Material</span>
                      <ChevronRight size={14} className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty Result */}
        {!loading && filteredCourses.length === 0 && (
          <div className="py-32 text-center border border-dashed border-gray-800 rounded-[3rem]">
            <Database size={48} className="mx-auto text-gray-800 mb-6" />
            <p className="text-[10px] font-black tracking-widest text-gray-600 uppercase">Search query returned zero results</p>
          </div>
        )}
      </div>
    </main>
  );
}