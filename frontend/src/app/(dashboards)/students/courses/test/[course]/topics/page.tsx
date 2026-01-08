"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  ClipboardList, 
  Loader2, 
  AlertCircle, 
  ArrowLeft,
  ChevronRight,
  Clock
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
  const courseId = params.course as string;

  // --- States ---
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourseContent() {
      if (!courseId) return;
      
      try {
        setLoading(true);
        setError(null);

        // --- PRODUCTION API CALL ---
        const response = await fetch(`/api/students/courses/test/${courseId}`);
        
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to synchronize course modules.");
        }

        const result: CourseData = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "A network anomaly occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourseContent();
  }, [courseId]);

  return (
    <main className="min-h-screen bg-black p-6 sm:p-8 md:p-12 text-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/students/courses/test" 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Selection
        </Link>

        {/* Header Section */}
        <header className="mb-16 border-l-4 border-[#035b77] pl-6">
          <span className="text-[#035b77] text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">
            Assessment Terminal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tighter uppercase">
            {data?.courseName || courseId?.toUpperCase()}
          </h1>
          <p className="text-gray-500 max-w-2xl text-sm leading-relaxed font-medium">
            Authorized modules only. Select an assessment block to initiate the testing sequence or review submission parameters.
          </p>
        </header>

        {/* State Handling: Loading */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6"
            >
              <Loader2 className="animate-spin text-[#035b77]" size={40} />
              <p className="text-[10px] font-black tracking-[0.3em] text-gray-700 uppercase">Indexing Modules...</p>
            </motion.div>
          ) : error ? (
            /* State Handling: Error */
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2rem] flex items-center gap-6 text-red-500 max-w-2xl mx-auto"
            >
              <AlertCircle size={32} />
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest mb-1">System Error</h4>
                <p className="text-sm font-bold opacity-80">{error}</p>
              </div>
            </motion.div>
          ) : data?.topics.length === 0 ? (
            /* State Handling: Empty */
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-32 border border-dashed border-gray-900 rounded-[3rem]"
            >
              <ClipboardList size={48} className="mx-auto text-gray-800 mb-6" />
              <p className="text-[10px] font-black tracking-widest text-gray-700 uppercase">No active assessments found in this stream</p>
            </motion.div>
          ) : (
            /* State Handling: Data Success */
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data?.topics.map((topic, index) => (
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
                    {/* Visual Decor */}
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