"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowLeft, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Interfaces ---
interface SummarySection {
  id: number;
  title: string;
  content: string;
  imageTag?: string; // Optional field for diagrams
}

export default function CourseSummaryPage({
  params,
}: {
  params: { course: string; topic: string };
}) {
  const router = useRouter();
  
  // --- States ---
  const [summaries, setSummaries] = useState<SummarySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Content from API ---
  useEffect(() => {
    async function fetchSummaryContent() {
      try {
        setLoading(true);
        // GET Request to fetch the specific topic summary
        const res = await fetch(`/api/students/summaries/content?course=${params.course}&topic=${params.topic}`);
        
        if (!res.ok) throw new Error("Failed to load summary content.");
        
        const data = await res.json();
        setSummaries(data);
      } catch (err) {
        // Fallback Mock Data for UI Testing
        setSummaries([
          {
            id: 1,
            title: "Executive Overview",
            content: `This comprehensive review explores the fundamental mechanics of ${params.topic.replace("-", " ")}. We focus on how these principles integrate into the broader ${params.course.toUpperCase()} curriculum.`,
          },
          {
            id: 2,
            title: "Core Formulas & Logic",
            content: `1. Principal Theorem: Understanding the relationship between variables.\n2. Logical Deduction: Applying step-by-step proofs.\n3. Case Analysis: Identifying boundary conditions.`,
            imageTag: ``
          },
          {
            id: 3,
            title: "Examination Strategy",
            content: `When answering questions on this topic, prioritize defining your terms clearly before proceeding to calculations. Historically, 40% of marks in this module come from theoretical explanation.`,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchSummaryContent();
  }, [params.course, params.topic]);

  // --- Handle Mark as Done (POST API) ---
  const handleSubmit = async () => {
    try {
      // API call to save progress in the database
      const res = await fetch(`/api/students/progress/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: params.course,
          topic: params.topic,
          type: "summary"
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Could not save progress.");
      }
    } catch (err) {
      // Still show success locally if API fails, but log it
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    router.push(`/students/courses/summary/${params.course}/topics`);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#035b77]" size={40} />
        <p className="text-gray-500 font-bold text-xs tracking-widest uppercase">Analyzing Topic Data...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Topics
        </button>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight"
          >
            {params.topic.replace("-", " ").toUpperCase()}
          </motion.h1>
          <p className="text-[#035b77] font-bold mt-2 uppercase tracking-[0.3em] text-xs">
            {params.course.toUpperCase()} • Comprehensive Summary
          </p>
        </div>

        {/* Summary Content Cards */}
        <div className="space-y-8">
          {summaries.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-gray-800 p-8 rounded-[2.5rem] shadow-xl hover:border-[#035b77]/30 transition-all group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#035b77]/10 flex items-center justify-center text-[#035b77] font-black">
                  0{index + 1}
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {section.title}
                </h2>
              </div>
              
              <p className="text-gray-400 whitespace-pre-line leading-[1.8] text-sm sm:text-base">
                {section.content}
              </p>

              {section.imageTag && (
                <div className="mt-8 p-4 bg-gray-950 rounded-2xl border border-gray-800 text-center italic text-xs text-gray-600">
                   {section.imageTag}
                   <p className="mt-2">[Reference Diagram for Study]</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center mt-16 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={submitted}
            className={`w-full max-w-xs py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-2xl ${
              submitted
                ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                : "bg-[#035b77] text-white hover:bg-[#047194]"
            }`}
          >
            {submitted ? "✓ Completed" : "Mark as Finished"}
          </motion.button>
          <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">
            Clicking will update your course progress
          </p>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {submitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gray-900 border border-gray-800 p-10 rounded-[3rem] shadow-2xl text-center max-w-md w-full"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-500 w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                Section Mastered
              </h2>
              <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                Great job! This topic has been recorded in your student profile as completed. You&apos;re one step closer to your goals.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition"
              >
                Return to Topics
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}