"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  BookOpen, 
  ArrowLeft, 
  Loader2, 
  ChevronRight, 
  Trophy, 
  AlertCircle,
  RefreshCcw,
  Zap
} from "lucide-react";

// --- Types ---
interface ExamTopic {
  id: string;
  title: string;
  questionCount: number;
  durationMinutes: number;
}

export default function ExamTopicsPage() {
  const params = useParams();
  const courseId = (params.course as string).toUpperCase();

  const [topics, setTopics] = useState<ExamTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
const fetchExamTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch(`/api/students/exams/topics?courseId=${params.course}`);
      
      if (!res.ok) {
        throw new Error(res.status === 404 
          ? "No exams have been published for this course yet." 
          : "Failed to connect to the examination server.");
      }
      
      const data: ExamTopic[] = await res.json();
      setTopics(data);
    } catch (err: unknown) {
      // Check if the error is an actual Error object to safely access .message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected system error occurred.");
      }
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    if (params.course) fetchExamTopics();
  }, [params.course]);

  return (
    <section className="min-h-screen bg-black p-4 sm:p-8 md:p-12 text-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/students/courses/exam" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-blue-500 transition-all mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Exam Portal
        </Link>

        {/* Header */}
        <header className="mb-12 border-l-4 border-blue-600 pl-6">
          <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">Assessment Modules</span>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-2">
            {courseId} Assignments
          </h1>
          <p className="text-gray-500 text-sm mt-2">Select a topic to begin your timed examination.</p>
        </header>

        {/* --- UI STATES --- */}

        <AnimatePresence mode="wait">
          {loading ? (
            /* 1. SCANNING STATE */
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full animate-pulse" />
                <Loader2 className="animate-spin text-blue-600 relative z-10" size={50} />
              </div>
              <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">
                Fetching Assignment Papers...
              </p>
            </motion.div>
          ) : error ? (
            /* 2. ERROR STATE */
            <motion.div 
              key="error"
              className="text-center py-20 bg-red-500/5 rounded-[3rem] border border-red-500/10 px-6"
            >
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500/50" />
              <p className="text-gray-400 text-sm mb-6">{error}</p>
              <button 
                onClick={fetchExamTopics}
                className="bg-gray-900 border border-gray-800 px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest hover:bg-gray-800 transition-all"
              >
                <RefreshCcw size={14} className="inline mr-2" /> RETRY
              </button>
            </motion.div>
          ) : (
            /* 3. TOPICS LIST */
            <motion.div 
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4"
            >
              {topics.map((topic, index) => (
                <Link
                  key={topic.id}
                  href={`/students/courses/assignments/${params.course}/topics/${topic.id}`}
                  className="group flex items-center justify-between bg-gray-900/40 border border-gray-800 p-6 rounded-[2rem] hover:border-blue-500/50 hover:bg-gray-900 transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="bg-gray-950 p-4 rounded-2xl text-gray-700 group-hover:text-blue-500 transition-all">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white group-hover:text-blue-500 transition-colors">
                        {topic.title}
                      </h2>
                      <div className="flex gap-4 mt-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                          <BookOpen size={12} /> {topic.questionCount} Questions
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                          <Trophy size={12} /> {topic.durationMinutes} Minutes
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-950 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all">
                    <ChevronRight size={20} className="text-gray-700 group-hover:text-white" />
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && !error && topics.length === 0 && (
          <div className="text-center py-24 bg-gray-900/20 rounded-[3rem] border border-dashed border-gray-800">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500 font-black uppercase text-[10px] tracking-widest">No exam papers found</p>
          </div>
        )}

      </div>
    </section>
  );
}