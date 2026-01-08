"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  ClipboardList, 
  Loader2, 
  AlertCircle, 
  ArrowLeft,
  ChevronRight,
  Clock,
  RefreshCcw,
  WifiOff,
  SearchX
} from "lucide-react";

// --- Interfaces ---
interface TopicContent {
  id: string;
  title: string;
  tasks: number;
  dueDate?: string;
  description?: string;
}

interface CourseData {
  courseName: string;
  topics: TopicContent[];
}

export default function CourseTopicsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.course as string;

  // --- States ---
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Logic (Memoized for Retry) ---
  const fetchCourseContent = useCallback(async () => {
    if (!courseId) return;
    
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/students/courses/test/${courseId}`);
      
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        // Custom error handling for 404 or empty data from API
        if (response.status === 404) {
          throw new Error("No topic available for this course.");
        }
        throw new Error(errData.message || `Server Error: ${response.status}`);
      }

      const result: CourseData = await response.json();
      
      // Secondary check: if result is successful but topics array is null/undefined
      if (!result.topics || result.topics.length === 0) {
        setData(result); // Still set data to get course name
      } else {
        setData(result);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "A network anomaly occurred.";
      setError(message === "Failed to fetch" ? "Network unreachable. Check your internet connection." : message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourseContent();
  }, [fetchCourseContent]);

  return (
    <main className="min-h-screen bg-black p-6 sm:p-8 md:p-12 text-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()} 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Selection
        </button>

        {/* Header Section */}
        <header className="mb-16 border-l-4 border-[#035b77] pl-6">
          <span className="text-[#035b77] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
            Assessment Terminal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            {data?.courseName || courseId?.toUpperCase().replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed font-medium">
            Authorized modules only. Select an assessment block to initiate the testing sequence.
          </p>
        </header>

        {/* State Handling Container */}
        <AnimatePresence mode="wait">
          {loading ? (
            /* 1. LOADING STATE */
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6"
            >
              <Loader2 className="animate-spin text-[#035b77]" size={40} />
              <p className="text-[10px] font-black tracking-[0.3em] text-gray-700 uppercase">Indexing Modules...</p>
            </motion.div>
          ) : error ? (
            /* 2. ERROR STATE (Including "No Topic Available") */
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/5 border border-red-500/20 p-12 rounded-[3rem] flex flex-col items-center text-center gap-6 max-w-xl mx-auto"
            >
              <div className="bg-red-500/10 p-4 rounded-full">
                <AlertCircle size={40} className="text-red-500" />
              </div>
              <div>
                <h4 className="font-black uppercase text-sm tracking-widest text-red-500 mb-2">Access Error</h4>
                <p className="text-sm font-medium text-gray-500 leading-relaxed italic">
                   {error.includes("404") || error.includes("not found") ? "No topic available for this course" : error}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={fetchCourseContent}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl transition-all shadow-lg shadow-red-500/20"
                >
                  <RefreshCcw size={14} /> Retry Sync
                </button>
                <button 
                  onClick={() => router.back()}
                  className="flex items-center gap-2 bg-gray-900 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl transition-all border border-gray-800"
                >
                  <ArrowLeft size={14} /> Go Back
                </button>
              </div>
            </motion.div>
          ) : !data || data.topics.length === 0 ? (
            /* 3. EMPTY STATE */
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-32 border border-dashed border-gray-900 rounded-[3rem] bg-gray-950/30 flex flex-col items-center gap-6"
            >
              <SearchX size={48} className="text-gray-800" />
              <div>
                <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2">Registry Empty</h4>
                <p className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">No topic available for this course</p>
              </div>
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 bg-gray-900 text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 rounded-2xl transition-all border border-gray-800"
              >
                <ArrowLeft size={14} /> Return to Grid
              </button>
            </motion.div>
          ) : (
            /* 4. SUCCESS STATE (Render Grid) */
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/students/courses/test/${courseId}/topics/${topic.id}`}
                    className="group relative block bg-gray-900/20 border border-gray-800 rounded-[2.5rem] p-8 hover:border-[#035b77]/50 hover:bg-gray-900/40 transition-all shadow-2xl overflow-hidden h-full flex flex-col"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#035b77]/5 rounded-full -mr-12 -mt-12 blur-3xl group-hover:bg-[#035b77]/10 transition-all" />
                    
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-black border border-gray-800 p-4 rounded-2xl text-gray-600 group-hover:text-white group-hover:bg-[#035b77] group-hover:border-[#035b77] transition-all duration-500">
                        <FileText size={24} />
                      </div>
                      <ChevronRight size={20} className="text-gray-800 group-hover:text-white group-hover:translate-x-2 transition-all" />
                    </div>

                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight mb-3">
                      {topic.title}
                    </h3>

                    <p className="text-xs text-gray-600 font-medium mb-8 line-clamp-2 leading-relaxed flex-grow">
                      {topic.description || "Instructional parameters and objectives contained within."}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#035b77]">
                          Load Factor
                        </span>
                        <span className="text-[10px] font-bold text-gray-300">
                          {topic.tasks} Items
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 items-end">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 flex items-center gap-1">
                          <Clock size={10} /> Deadline
                        </span>
                        <span className="text-[10px] font-bold text-red-500/80 uppercase">
                          {topic.dueDate || "Open"}
                        </span>
                      </div>
                    </div>
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