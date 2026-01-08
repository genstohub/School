"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  LayoutGrid, 
  Clock, 
  Award, 
  ChevronRight, 
  Lock,
  Loader2,
  Database,
  Search
} from "lucide-react";

// --- Types ---
interface ExamTopic {
  id: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  isLocked: boolean;
  highScore?: number;
}

export default function ExamTopicSelectionPage() {
  const { course } = useParams();
  const router = useRouter();

  const [topics, setTopics] = useState<ExamTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // --- API Fetch ---
  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true);
        // Replace with: /api/exams/topics?courseCode=${course}
        const response = await fetch(`/api/exams/topics?course=${course}`);
        const data = await response.json();
        setTopics(data);
      } catch (err) {
        console.error("Failed to load exam topics");
      } finally {
        setLoading(false);
      }
    }
    if (course) fetchTopics();
  }, [course]);

  const filteredTopics = topics.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.push('/students/courses/exam')}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-red-500 transition-all mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
             <span className="bg-sky-600 text-white px-3 py-1 rounded text-[10px] font-black uppercase">
               {course}
             </span>
             <div className="h-[1px] flex-grow bg-gray-900" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            Select <span className="text-lemon-600 text-outline">Module</span>
          </h1>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
          <input 
            type="text" 
            placeholder="Search topic or year..."
            className="w-full bg-gray-900/40 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold outline-none focus:border-red-600 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Grid State */}
        {loading ? (
          <div className="py-24 flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-red-600 animate-spin mb-4" />
            <p className="text-[10px] font-black tracking-widest text-gray-700 uppercase">Indexing Modules...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredTopics.map((topic, idx) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => !topic.isLocked && router.push(`/students/courses/exam/${course}/topics/${topic.id}`)}
                  className={`group relative p-6 rounded-[2rem] border transition-all overflow-hidden cursor-pointer ${
                    topic.isLocked 
                    ? "bg-gray-950 border-gray-900 opacity-60 grayscale" 
                    : "bg-gray-900/20 border-gray-800 hover:border-red-600/50 hover:bg-gray-900/40"
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-black rounded-xl border border-gray-800 text-gray-500 group-hover:text-red-500 transition-colors">
                      <LayoutGrid size={20} />
                    </div>
                    {topic.isLocked ? (
                      <Lock size={16} className="text-gray-700" />
                    ) : topic.highScore && (
                      <div className="flex items-center gap-2 text-green-500 text-[9px] font-black uppercase tracking-widest">
                        <Award size={12} /> Scored: {topic.highScore}%
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-black uppercase tracking-tight mb-2 group-hover:text-white transition-colors">
                    {topic.title}
                  </h3>

                  <div className="flex items-center gap-6 text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} /> {topic.durationMinutes} Mins
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Database size={12} /> {topic.totalQuestions} Questions
                    </div>
                  </div>

                  <div className="absolute right-6 bottom-6 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                    <ChevronRight size={24} className="text-red-600" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Empty Result */}
        {!loading && filteredTopics.length === 0 && (
          <div className="py-20 text-center border border-dashed border-gray-800 rounded-[3rem]">
            <p className="text-[10px] font-black tracking-widest text-gray-700 uppercase">No active assessments found</p>
          </div>
        )}
      </div>
    </main>
  );
}