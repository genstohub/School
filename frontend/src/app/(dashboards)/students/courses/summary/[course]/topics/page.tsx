"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, ArrowLeft, Loader2, ChevronRight, Bookmark } from "lucide-react";

// --- Interfaces ---
interface SummaryTopic {
  id: string;
  title: string;
  readingTime: string;
  shortDescription: string;
}

export default function CourseSummaryTopicsPage() {
  const params = useParams();
  const courseId = (params.course as string).toUpperCase();

  const [topics, setTopics] = useState<SummaryTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true);
        // Replace with your endpoint: e.g., `/api/students/summaries/${params.course}`
        const res = await fetch(`/api/students/summaries/topics?courseId=${params.course}`);
        
        if (!res.ok) throw new Error("Could not load topics.");
        
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        // Fallback for UI visualization
        setTopics([
          { id: "intro", title: "Core Fundamentals", readingTime: "5 min", shortDescription: "Essential concepts you must know." },
          { id: "key-theories", title: "Key Theories & Laws", readingTime: "8 min", shortDescription: "Detailed breakdown of primary course theories." },
          { id: "summary-final", title: "Final Exam Quick Review", readingTime: "12 min", shortDescription: "A bird's eye view of the entire syllabus." },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, [params.course]);

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
            Select a topic to view the condensed study notes and key examination points.
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#035b77]" size={40} />
            <p className="text-gray-500 font-medium animate-pulse uppercase text-xs tracking-widest">Loading Summaries...</p>
          </div>
        )}

        {/* Topics Grid */}
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {!loading && topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/students/courses/summary/${params.course}/topics/${topic.id}`}
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
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                          {topic.readingTime} read
                        </span>
                        <p className="text-xs text-gray-600 italic hidden sm:block">
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

        {/* Empty State */}
        {!loading && topics.length === 0 && (
          <div className="text-center py-20 bg-gray-900/50 rounded-[3rem] border border-dashed border-gray-800">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-800" />
            <p className="text-gray-500 font-medium">No summary topics available for this course yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}