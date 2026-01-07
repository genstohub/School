"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, ArrowLeft, Loader2, ChevronRight, Bookmark, AlertCircle, RefreshCcw } from "lucide-react";

// --- Strict Interfaces ---
interface SummaryTopic {
  id: string;
  title: string;
  readingTime: string;
  shortDescription: string;
}

export default function CourseSummaryTopicsPage() {
  const params = useParams();
  // Ensure courseId is handled safely as a string
  const courseParam = Array.isArray(params.course) ? params.course[0] : params.course;
  const courseId = (courseParam || "").toUpperCase();

  const [topics, setTopics] = useState<SummaryTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Dynamic query based on the instructor's course selection
      const res = await fetch(`/api/students/summaries/topics?courseId=${courseParam}`);
      
      if (!res.ok) {
        throw new Error(res.status === 404 
          ? "No summary resources have been uploaded for this course yet." 
          : "Server connection failed. Please try again later.");
      }
      
      const data: SummaryTopic[] = await res.json();
      setTopics(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred while fetching course topics.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseParam) {
      fetchTopics();
    }
  }, [courseParam]);

  return (
    <section className="min-h-screen bg-gray-950 p-4 sm:p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/students/courses/summary" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#035b77] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to summaries
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-[#035b77]/20 text-[#035b77] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Study Guide
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {courseId} — Summary Topics
          </h1>
          <p className="text-gray-500 mt-2">
            Review the condensed lecture notes provided by your instructor for this module.
          </p>
        </header>

        {/* --- UI STATES --- */}

        {/* 1. Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-[#035b77]" size={40} />
            <p className="text-gray-500 font-bold animate-pulse uppercase text-[10px] tracking-[0.2em]">
              Fetching Database Records...
            </p>
          </div>
        )}

        {/* 2. Error State (No Mock Data fallback) */}
        {!loading && error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-6 bg-red-500/5 rounded-[3rem] border border-red-500/20"
          >
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500/80" />
            <h3 className="text-lg font-bold text-white mb-2">Connection Issue</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto mb-8">
              {error}
            </p>
            <button 
              onClick={fetchTopics}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-2xl text-xs font-bold transition-all border border-gray-800"
            >
              <RefreshCcw size={14} /> Retry Connection
            </button>
          </motion.div>
        )}

        {/* 3. Success State - Topics Grid */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {!loading && !error && topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/students/courses/summary/${courseParam}/topics/${topic.id}`}
                  className="group flex items-center justify-between bg-gray-900 border border-gray-800 p-6 rounded-[2rem] hover:border-[#035b77]/50 transition-all shadow-xl"
                >
                  <div className="flex items-center gap-5">
                    <div className="bg-gray-950 p-4 rounded-2xl text-[#035b77] group-hover:bg-[#035b77] group-hover:text-white transition-all">
                      <Bookmark size={20} />
                    </div>
                    <div>
                      <h2 className="font-bold text-white text-lg group-hover:text-[#035b77] transition-colors">
                        {topic.title}
                      </h2>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                          {topic.readingTime}
                        </span>
                        <p className="text-xs text-gray-600 italic hidden sm:block truncate max-w-[250px]">
                          {topic.shortDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 4. Empty State (Success but 0 results) */}
        {!loading && !error && topics.length === 0 && (
          <div className="text-center py-20 bg-gray-900/30 rounded-[3rem] border border-dashed border-gray-800">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-800" />
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
              No Content Uploaded Yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
}