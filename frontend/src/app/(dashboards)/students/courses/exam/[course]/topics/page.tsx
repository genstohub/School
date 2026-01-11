"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Trophy,
  Activity
} from "lucide-react";

// 1. Define the Topic Interface
interface Topic {
  id: string;
  title: string;
  questions: number;
  time: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Mixed";
}

// 2. Define the Course Data structure using the Topic interface
const TOPICS_DATA: Record<string, Topic[]> = {
  mth101: [
    { id: "sets-logic", title: "Sets and Logic", questions: 20, time: "30m", difficulty: "Beginner" },
    { id: "quadratics", title: "Quadratic Equations", questions: 15, time: "25m", difficulty: "Intermediate" },
    { id: "trigonometry", title: "Trigonometric Identities", questions: 25, time: "40m", difficulty: "Advanced" },
  ],
  cmp101: [
    { id: "binary-logic", title: "Binary Arithmetic", questions: 20, time: "20m", difficulty: "Beginner" },
    { id: "hardware-arch", title: "Hardware Architecture", questions: 30, time: "30m", difficulty: "Intermediate" },
  ],
  default: [
    { id: "general-assessment", title: "Full Course Assessment", questions: 50, time: "60m", difficulty: "Mixed" },
  ]
};

export default function CourseTopicsPage() {
  const { course } = useParams();
  const router = useRouter();
  
  const courseCode = typeof course === "string" ? course.toUpperCase() : "COURSE";
  
  // 3. Extract topics with a clear type fallback
  const topics: Topic[] = TOPICS_DATA[course as string] || TOPICS_DATA.default;

  return (
    <main className="min-h-screen bg-black text-gray-200 p-4 sm:p-8 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <button 
          onClick={() => router.push("/students/courses/exam")}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-500 transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Registry
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-blue-600"></div>
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">
              Examination Modules
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4">
            {courseCode} <span className="text-gray-800">Topics</span>
          </h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-[10px] font-bold text-gray-400">
              <Activity size={12} className="text-green-500" />
              SYSTEMS ACTIVE
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-[10px] font-bold text-gray-400">
              <ShieldCheck size={12} className="text-blue-500" />
              ENCRYPTED STREAM
            </div>
          </div>
        </header>

        {/* Topics List */}
        <div className="grid gap-4">
          {topics.map((topic: Topic, index: number) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/students/courses/exam/${course}/topics/${topic.id}`)}
              className="group cursor-pointer bg-gray-950 border border-gray-900 hover:border-blue-600/50 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-8xl font-black text-white/[0.02] pointer-events-none group-hover:text-blue-600/[0.03] transition-colors">
                0{index + 1}
              </span>

              <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight">
                    {topic.title}
                  </h3>
                  <div className="flex gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-gray-600">
                      <Clock size={10} /> {topic.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-gray-600">
                      <Trophy size={10} /> {topic.questions} Questions
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-6 relative z-10">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.2em] mb-1">Difficulty</p>
                  <p className={`text-[10px] font-black uppercase ${
                    topic.difficulty === 'Advanced' ? 'text-red-500' : 
                    topic.difficulty === 'Intermediate' ? 'text-yellow-500' : 
                    topic.difficulty === 'Mixed' ? 'text-blue-500' : 'text-green-500'
                  }`}>
                    {topic.difficulty}
                  </p>
                </div>
                <div className="bg-blue-600/10 p-3 rounded-xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            Select a module to initiate the live assessment engine
          </p>
        </footer>
      </div>
    </main>
  );
}