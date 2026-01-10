"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronRight, 
  Hash, 
  ClipboardCheck,
  ShieldCheck,
  BookOpen
} from "lucide-react";

// 1. Define Types for strict Type-Safety
type Level = "ALL" | "100L" | "200L";

interface Course {
  id: string;
  code: string;
  level: string;
  title: string;
  description: string;
}

// 2. Comprehensive Course Data
const courseData: Course[] = [
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

export default function ExamSelectionPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<Level>("ALL");

  const levels: Level[] = ["ALL", "100L", "200L"];

  const filteredCourses = useMemo(() => {
    return courseData.filter(course => {
      const matchesSearch = course.code.toLowerCase().includes(search.toLowerCase()) || 
                            course.title.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = levelFilter === "ALL" || course.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [search, levelFilter]);

  // Navigate to the specific Exam Topics page
  const handleNavigate = (courseCode: string) => {
    const formattedCode = courseCode.toLowerCase();
    router.push(`/students/courses/exam/${formattedCode}/topics`);
  };

  return (
    <main className="min-h-screen bg-black text-gray-200 p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 border-l-4 border-blue-600 pl-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-blue-500" />
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">
              Authorized Assessment Stream
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Examination <span className="text-gray-800 text-2xl md:text-4xl">Registry</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3 max-w-xl font-medium leading-relaxed">
            Select a course module to access available examination topics. Ensure your session is secure before proceeding.
          </p>
        </header>

        {/* Control Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <input 
              type="text" 
              placeholder="Search registry (e.g. MTH101)..."
              className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-blue-600 focus:bg-gray-900 transition-all placeholder:text-gray-700 font-bold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 p-1 bg-gray-900/50 border border-gray-800 rounded-2xl shrink-0">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                  levelFilter === lvl 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, index) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.01 }}
                onClick={() => handleNavigate(course.code)}
                className="group cursor-pointer bg-gray-950 border border-gray-900 p-8 rounded-[2.5rem] hover:border-blue-600/50 hover:bg-blue-600/5 transition-all duration-500 flex flex-col h-full shadow-2xl relative overflow-hidden"
              >
                {/* Subtle Background Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-[9px] font-black px-4 py-1.5 bg-black border border-gray-800 rounded-full text-gray-500 tracking-[0.2em] group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all uppercase">
                    {course.level}
                  </span>
                </div>
                
                <div className="relative z-10 flex-grow">
                  <h2 className="text-2xl font-black text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight leading-none mb-2">
                    {course.code}
                  </h2>
                  <p className="text-xs font-bold text-gray-400 mb-4 tracking-wide uppercase">
                    {course.title}
                  </p>
                  <p className="text-[11px] leading-relaxed text-gray-600 line-clamp-2 font-medium">
                    {course.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-900 flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 group-hover:text-blue-500 transition-colors">
                    Access Topics
                  </span>
                  <ChevronRight size={18} className="text-gray-800 group-hover:translate-x-2 group-hover:text-blue-500 transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-gray-900/10 border border-dashed border-gray-800 rounded-[3rem]"
          >
            <Hash className="mx-auto text-gray-800 mb-4" size={48} />
            <h3 className="text-white font-black uppercase text-xs tracking-widest mb-1">Null Result</h3>
            <p className="text-gray-600 font-bold text-[10px] uppercase tracking-widest">No matching courses found in the current registry.</p>
          </motion.div>
        )}

      </div>
    </main>
  );
}

 