"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Clock, 
  AlertCircle, 
  Loader2, 
  ArrowLeft, 
  ShieldCheck,
  Zap,
  ChevronRight,
  Info
} from "lucide-react";

// --- Interfaces ---
interface CBTTopic {
  id: string;
  title: string;
  durationMinutes: number;
  totalQuestions: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
}

interface CourseResponse {
  courseCode: string;
  courseTitle: string;
  availableTests: CBTTopic[];
}

export default function CBTOptionsPage() {
  const { course } = useParams();
  const router = useRouter();

  // --- API State ---
  const [data, setData] = useState<CourseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCBTTopics() {
      if (!course) return;

      try {
        setLoading(true);
        setError(null);

        // --- PRODUCTION API CALL ---
        // Expected endpoint: /api/students/cbt/topics/[courseCode]
        const response = await fetch(`/api/students/cbt/topics/${course}`);
        
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Unable to retrieve CBT modules for this sector.");
        }

        const result: CourseResponse = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Connection to testing server failed.");
      } finally {
        setLoading(false);
      }
    }

    fetchCBTTopics();
  }, [course]);

  return (
    <main className="min-h-screen bg-black text-gray-100 p-6 md:p-12 lg:p-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-blue-500 transition-colors mb-12"
        >
          <ArrowLeft size={14} /> Return to Course Grid
        </button>

        {/* Header Section */}
        <header className="mb-16 border-l-4 border-blue-600 pl-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap size={14} className="text-blue-500 fill-blue-500" />
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em]">
              Authorized Test Stream
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none mb-4">
            {data?.courseCode || course} <span className="text-gray-800">Available Tests</span>
          </h1>
          <p className="text-gray-500 max-w-2xl text-sm font-medium leading-relaxed">
            Select a specific testing module. Ensure your network stability is optimal before initializing the countdown.
          </p>
        </header>

        {/* Dynamic Content States */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="py-32 flex flex-col items-center gap-6"
            >
              <Loader2 className="animate-spin text-blue-600" size={48} />
              <p className="text-[10px] font-black tracking-[0.5em] text-gray-800 uppercase">Synchronizing Modules...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/10 border border-red-900/30 p-10 rounded-[2.5rem] flex flex-col items-center text-center gap-4 max-w-2xl mx-auto"
            >
              <AlertCircle size={40} className="text-red-600" />
              <h4 className="text-white font-black uppercase tracking-widest">Access Denied</h4>
              <p className="text-gray-500 text-sm font-bold">{error}</p>
            </motion.div>
          ) : data?.availableTests.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-32 border border-dashed border-gray-900 rounded-[3rem]"
            >
              <Info size={40} className="mx-auto text-gray-800 mb-6" />
              <p className="text-[10px] font-black tracking-widest text-gray-700 uppercase">No active testing windows for this module</p>
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="grid gap-6"
            >
              {data?.availableTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gray-900/20 border border-gray-800 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8 hover:border-blue-600/50 hover:bg-blue-600/5 transition-all duration-300"
                >
                  {/* Status Indicator */}
                  <div className="w-16 h-16 bg-black border border-gray-800 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shrink-0">
                    <ShieldCheck size={32} />
                  </div>

                  {/* Info */}
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-blue-500 transition-colors">
                      {test.title}
                    </h3>
                    <p className="text-gray-600 text-xs font-medium max-w-md leading-relaxed mb-4">
                      {test.description}
                    </p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-black/50 px-3 py-1 rounded-lg">
                        <Clock size={12} className="text-blue-500" /> {test.durationMinutes} Minutes
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-black/50 px-3 py-1 rounded-lg">
                        <Zap size={12} className="text-blue-500" /> {test.totalQuestions} Questions
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    href={`/students/courses/cbt/${course}/start/${test.id}`}
                    className="w-full md:w-auto bg-white text-black text-[10px] font-black uppercase tracking-widest px-10 py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all shadow-2xl shrink-0"
                  >
                    Initialize <Play size={12} className="fill-current" />
                  </Link>

                  <ChevronRight size={24} className="hidden lg:block text-gray-900 group-hover:text-blue-900 transition-colors" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-900 text-center">
          <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.5em]">
            Secured Session • Anti-Cheat Protocol Active • IP Logged
          </p>
        </footer>
      </div>
    </main>
  );
}