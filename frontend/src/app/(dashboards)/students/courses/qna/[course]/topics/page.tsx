"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
  ChevronRight,
  Hash,
  Users
} from "lucide-react";

// --- Interfaces ---
interface Topic {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  activeUsers?: number;
}

interface CourseDetails {
  code: string;
  title: string;
}

export default function QnaTopicsPage() {
  const params = useParams();
  const courseParam = params.course as string;

  // States
  const [topics, setTopics] = useState<Topic[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      if (!courseParam) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // --- API CALL ---
        // Expected JSON structure: { course: { code: string, title: string }, topics: Topic[] }
        const response = await fetch(`/api/students/qna/topics?course=${courseParam}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Could not synchronize discussion modules.");
        }
        
        const data = await response.json();
        setTopics(data.topics || []);
        setCourseInfo(data.course || { code: courseParam.toUpperCase(), title: "Course Forum" });
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "A connection error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [courseParam]);

  return (
    <main className="min-h-screen bg-black text-gray-100 p-6 sm:p-8 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/students/courses/qna" 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </Link>

        {/* Header */}
        <header className="mb-16 border-l-4 border-[#035b77] pl-6">
          <span className="text-[#035b77] font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">
            Academic Discussion Forum
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            {courseInfo?.code} <span className="text-gray-700">/</span> {courseInfo?.title}
          </h1>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
            Select a specific module to browse existing questions or start a new discussion. 
            Connect with peers and faculty experts in real-time.
          </p>
        </header>

        {/* State Handling */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6"
            >
              <Loader2 className="animate-spin text-[#035b77]" size={40} />
              <p className="text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">Synchronizing Modules...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2rem] flex items-center gap-6 text-red-500 max-w-2xl mx-auto"
            >
              <AlertCircle size={32} />
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest mb-1">Sync Error</h4>
                <p className="text-sm font-medium opacity-80">{error}</p>
              </div>
            </motion.div>
          ) : topics.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-32 border border-dashed border-gray-900 rounded-[3rem]"
            >
              <MessageSquare size={48} className="mx-auto text-gray-800 mb-6" />
              <p className="text-[10px] font-black tracking-widest text-gray-700 uppercase">No active discussion modules found</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid gap-4"
            >
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/students/courses/qna/${courseParam}/topics/${topic.id}`}
                    className="group flex items-center justify-between bg-gray-900/20 border border-gray-800/60 p-8 rounded-[2.5rem] hover:border-[#035b77]/50 hover:bg-gray-900/40 transition-all shadow-2xl"
                  >
                    <div className="flex items-center gap-8">
                      <div className="hidden sm:flex bg-black border border-gray-800 w-16 h-16 rounded-2xl items-center justify-center text-gray-600 group-hover:bg-[#035b77] group-hover:text-white group-hover:border-[#035b77] transition-all duration-500">
                        <Hash size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white group-hover:text-[#035b77] transition-colors uppercase tracking-tight mb-1">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-gray-600 font-medium line-clamp-1 mb-4 group-hover:text-gray-400">
                          {topic.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-[9px] font-black uppercase tracking-widest bg-gray-950 px-3 py-1.5 rounded-full border border-gray-800 text-gray-500 flex items-center gap-2">
                            <MessageSquare size={10} /> {topic.questionsCount} Threads
                          </span>
                          {topic.activeUsers && (
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#035b77] flex items-center gap-2">
                              <Users size={10} /> {topic.activeUsers} Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-800 group-hover:text-white group-hover:translate-x-2 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}