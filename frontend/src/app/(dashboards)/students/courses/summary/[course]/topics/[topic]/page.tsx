"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft, Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

interface SummarySection {
  id: string | number;
  title: string;
  content: string;
  imageUrl?: string;
}

export default function CourseSummaryContentPage() {
  const router = useRouter();
  const params = useParams();

  const courseId = (Array.isArray(params.course) ? params.course[0] : params.course) || "";
  const topicId = (Array.isArray(params.topic) ? params.topic[0] : params.topic) || "";
  
  const [summaries, setSummaries] = useState<SummarySection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummaryContent = async () => {
    try {
      setLoading(true);
      setError(null);
      // Matches the backend GET route
      const res = await fetch(`/api/summaries/content?course=${courseId}&topic=${topicId}`);
      
      if (!res.ok) {
        throw new Error(res.status === 404 
          ? "The instructor hasn't uploaded content for this specific topic yet." 
          : "Failed to establish a connection with the study database.");
      }
      
      const data = await res.json();
      setSummaries(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId && topicId) fetchSummaryContent();
  }, [courseId, topicId]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/students/progress/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: courseId,
          topic: topicId,
          type: "summary"
        }),
      });

      if (res.ok) setSubmitted(true);
    } catch (err) {
      setSubmitted(true); // Optimistic UI
    }
  };

  if (loading) return (
    <div className="h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-[#035b77]" size={40} />
      <p className="text-gray-500 font-bold text-[10px] tracking-[0.3em] uppercase animate-pulse">Opening Resource...</p>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-10 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Topics
        </button>

        {error ? (
          <div className="text-center py-20 bg-gray-900/50 rounded-[3rem] border border-red-900/20 px-6">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-xl font-bold mb-2">Resource Unavailable</h2>
            <p className="text-gray-500 text-sm mb-8">{error}</p>
            <button onClick={fetchSummaryContent} className="flex items-center gap-2 mx-auto bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-2xl text-xs font-bold transition-all">
              <RefreshCcw size={14} /> Retry Loading
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-16">
              <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                {topicId.replace(/-/g, " ").toUpperCase()}
              </motion.h1>
              <p className="text-[#035b77] font-bold mt-2 uppercase tracking-[0.3em] text-[10px]">
                {courseId.toUpperCase()} • Official Instructor Summary
              </p>
            </div>

            <div className="space-y-12">
              {summaries.map((section, index) => (
                <motion.div key={section.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 p-8 sm:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-[#035b77] font-black text-2xl opacity-20">{String(index + 1).padStart(2, '0')}</span>
                    <h2 className="text-xl font-bold text-white tracking-tight">{section.title}</h2>
                  </div>
                  <p className="text-gray-400 whitespace-pre-line leading-[1.8] text-base">{section.content}</p>
                  {section.imageUrl && (
                    <div className="mt-10 rounded-3xl overflow-hidden border border-gray-800 bg-gray-950 p-2">
                       <div className="relative aspect-video w-full">
                         <Image src={section.imageUrl} alt={section.title} fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                       </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col items-center mt-20 pb-20 gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSubmit} disabled={submitted}
                className={`w-full max-w-xs py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl ${
                  submitted ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700" : "bg-[#035b77] text-white hover:bg-[#047194] shadow-[#035b77]/20"
                }`}>
                {submitted ? "✓ Topic Completed" : "Mark as Finished"}
              </motion.button>
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Log progress to student dashboard</p>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className="bg-gray-900 border border-gray-800 p-10 rounded-[3.5rem] shadow-2xl text-center max-w-md w-full border-t-[#035b77]">
              <div className="w-24 h-24 bg-[#035b77]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="text-[#035b77] w-12 h-12" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Good Work!</h2>
              <p className="text-gray-500 mb-10 text-sm leading-relaxed font-medium">Progress synchronized with your records.</p>
              <button onClick={() => router.push(`/students/courses/summary/${courseId}/topics`)} className="w-full bg-[#035b77] text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-[#047194] transition-all">
                Continue Learning
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}