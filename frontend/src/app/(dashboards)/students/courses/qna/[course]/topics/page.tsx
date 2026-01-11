"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Users,
  RefreshCcw,
  WifiOff
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

  // --- Fetch Logic (Memoized for Retry) ---
  const fetchTopics = useCallback(async () => {
    if (!courseParam) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // --- API CALL ---
      const response = await fetch(`/api/students/qna/topics?course=${courseParam}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Forum unreachable: ${response.status}`);
      }
      
      const data = await response.json();
      setTopics(data.topics || []);
      setCourseInfo(data.course || { code: courseParam.toUpperCase(), title: "Course Forum" });
      
    } catch (err) {
      const message = err instanceof Error ? err.message : "A connection error occurred.";
      setError(message === "Failed to fetch" ? "Network unreachable. Check your internet connection." : message);
    } finally {
      setLoading(false);
    }
  }, [courseParam]);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

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
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed font-medium">
            Select a specific module to browse existing questions or start a new discussion. 
            Connect with peers and faculty experts in real-time.
          </p>
        </header>

        {/* State Handling */}
        <AnimatePresence mode="wait">
          {loading ? (
            /* 1. LOADING STATE */
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6"
            >
              <Loader2 className="animate-spin text-[#035b77]" size={40} />
              <p className="text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">Synchronizing Forum...</p>
            </motion.div>
          ) : error ? (
            /* 2. ERROR STATE (With Retry & Go Back) */
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/5 border border-red-500/20 p-12 rounded-[3rem] flex flex-col items-center text-center gap-6 max-w-xl mx-auto"
            >
              <div className="bg-red-500/10 p-4 rounded-full">
                <WifiOff size={40} className="text-red-500" />
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest text-red-500 mb-2">Sync Error</h4>
                <p className="text-sm font-medium text-gray-500 leading-relaxed">{error}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <button 
                  onClick={fetchTopics}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-lg shadow-red-500/20 w-full sm:w-auto"
                >
                  <RefreshCcw size={14} /> Retry Sync
                </button>

                <Link 
                  href="/students/courses/qna"
                  className="flex items-center gap-2 bg-transparent border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl transition-all w-full sm:w-auto text-center justify-center"
                >
                  <ArrowLeft size={14} /> Go Back
                </Link>
              </div>
            </motion.div>
          ) : topics.length === 0 ? (
            /* 3. EMPTY STATE */
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-32 border border-dashed border-gray-900 rounded-[3rem] bg-gray-950/30"
            >
              <MessageSquare size={48} className="mx-auto text-gray-800 mb-6" />
              <p className="text-[10px] font-black tracking-widest text-gray-700 uppercase">No active discussion modules found in this stream</p>
            </motion.div>
          ) : (
            /* 4. SUCCESS GRID */
            <motion.div 
              key="grid"
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