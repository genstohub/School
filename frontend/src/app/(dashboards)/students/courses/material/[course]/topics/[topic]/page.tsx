"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  ArrowLeft, 
  Loader2, 
  BookOpen, 
  AlertCircle,
  FileText,
  Clock
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

interface ContentSection {
  id: string;
  title: string;
  body: string;
  illustrationUrl?: string;
}

export default function ReadingMaterialPage() {
  const router = useRouter();
  const params = useParams();
  
  // Clean up params
  const courseCode = (params.course as string).toUpperCase();
  const topicId = params.topic as string;

  const [content, setContent] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const res = await fetch(`/api/students/materials/content?course=${params.course}&topic=${topicId}`);
        
        if (!res.ok) throw new Error("Material content not found.");
        
        const data = await res.json();
        setContent(data);
      } catch (err) {
        setError("This learning resource is currently unavailable. Please try again later.");
      } finally {
        // Artificial delay for a "smooth" scanning transition
        setTimeout(() => setLoading(false), 1200);
      }
    }
    fetchContent();
  }, [params.course, topicId]);

  const handleMarkAsDone = async () => {
    // API call to update progress
    setIsCompleted(true);
  };

  // --- LOADING STATE ---
  if (loading) {
    return (
      <div className="h-screen bg-gray-950 flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-[#035b77]/30 blur-2xl animate-pulse" />
          <Loader2 className="animate-spin text-[#035b77] relative z-10" size={50} />
        </div>
        <div className="text-center">
          <p className="text-white font-black text-xs tracking-[0.4em] uppercase">Opening Material</p>
          <p className="text-gray-600 text-[10px] mt-2 font-bold uppercase tracking-widest">Deciphering {courseCode} Topic Data...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-950 text-gray-200 selection:bg-[#035b77] selection:text-white">
      {/* Header / Nav */}
      <nav className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-md border-b border-gray-900 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Exit Reader
          </button>
          <div className="flex items-center gap-2 text-[10px] font-black text-[#035b77] uppercase tracking-widest">
            <Clock size={12} /> 15 Min Read
          </div>
        </div>
      </nav>

      <main className="p-6 md:p-12 lg:p-20">
        <div className="max-w-3xl mx-auto">
          
          {/* Breadcrumb & Title */}
          <header className="mb-16 border-l-2 border-[#035b77] pl-6">
            <span className="text-[#035b77] text-xs font-black uppercase tracking-[0.3em]">
              {courseCode} Curriculum
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-2 leading-tight uppercase tracking-tighter">
              {topicId.replace(/-/g, " ")}
            </h1>
          </header>

          {/* Content Body */}
          <div className="space-y-20">
            {error ? (
              <div className="text-center py-20 bg-gray-900/50 rounded-[3rem] border border-gray-800">
                <AlertCircle className="mx-auto text-red-500 mb-4" size={40} />
                <p className="text-gray-400 font-medium">{error}</p>
              </div>
            ) : (
              content.map((section, idx) => (
                <motion.article 
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[#035b77] font-black text-sm tabular-nums">0{idx + 1}</span>
                    <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-[#035b77] transition-colors">
                      {section.title}
                    </h2>
                  </div>

                  <div className="text-gray-400 leading-[1.8] text-lg space-y-4 font-medium">
                    {section.body}
                  </div>

                  {section.illustrationUrl && (
                    <div className="mt-10 rounded-[2rem] overflow-hidden border border-gray-800 bg-black p-2 group-hover:border-[#035b77]/30 transition-all shadow-2xl">
                       <div className="relative aspect-video">
                        <Image 
                          src={section.illustrationUrl} 
                          alt={section.title} 
                          fill 
                          className="object-contain"
                        />
                       </div>
                       <p className="text-center text-[10px] py-4 text-gray-600 font-bold uppercase tracking-widest">
                         Fig {idx+1}: Visual Reference for {section.title}
                       </p>
                    </div>
                  )}
                </motion.article>
              ))
            )}
          </div>

          {/* Completion Footer */}
          {!error && (
            <div className="mt-32 pt-10 border-t border-gray-900 flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMarkAsDone}
                disabled={isCompleted}
                className={`flex items-center gap-3 px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest transition-all ${
                  isCompleted 
                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                  : "bg-white text-black hover:bg-[#035b77] hover:text-white"
                }`}
              >
                {isCompleted ? <><CheckCircle size={18}/> Topic Mastered</> : "Complete Reading"}
              </motion.button>
              <p className="mt-6 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
                {isCompleted ? "Synchronized with your profile" : "Finish to update your progress"}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Progress Bar (at top) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-40">
        <motion.div 
          className="h-full bg-[#035b77]"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }}
        />
      </div>
    </section>
  );
}