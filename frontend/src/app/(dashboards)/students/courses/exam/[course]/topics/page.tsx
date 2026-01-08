"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Timer, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  AlertCircle,
  Loader2,
  Flag
} from "lucide-react";

// --- Types ---
interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  imageUrl?: string;
}

interface ExamSession {
  questions: Question[];
  durationSeconds: number;
  sessionToken: string;
}

export default function LiveExamEngine() {
  const { course, topic } = useParams();
  const router = useRouter();

  // Engine State
  const [exam, setExam] = useState<ExamSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // { questionId: optionId }
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Fetch Exam Data
  useEffect(() => {
    async function initExam() {
      try {
        const res = await fetch(`/api/exams/start?course=${course}&topic=${topic}`, { method: 'POST' });
        if (!res.ok) throw new Error("Unauthorized access to exam stream.");
        const data: ExamSession = await res.json();
        
        setExam(data);
        setTimeLeft(data.durationSeconds);
        setLoading(false);
      } catch (err) {
        router.push(`/students/courses/exam/${course}/topics/${topic}`);
      }
    }
    initExam();
  }, [course, topic, router]);

  // 2. Timer Logic
  useEffect(() => {
    if (timeLeft <= 0 || loading) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          autoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, loading]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // 3. Action Handlers
  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const autoSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/exams/submit`, {
        method: 'POST',
        body: JSON.stringify({ sessionToken: exam?.sessionToken, answers }),
      });
      router.push(`/students/courses/exam/result?session=${exam?.sessionToken}`);
    } catch (err) {
      console.error("Critical: Auto-submit failed.");
    }
  }, [answers, exam, isSubmitting, router]);

  if (loading || !exam) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin mb-4" />
        <p className="text-[10px] font-black tracking-widest text-gray-600 uppercase">Encrypting Session...</p>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentIndex];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* HUD (Heads Up Display) */}
      <nav className="border-b border-gray-900 bg-black/50 backdrop-blur-md sticky top-0 z-50 p-4 md:px-12 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-black uppercase tracking-tighter text-red-600">{course} Live</h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Question {currentIndex + 1} of {exam.questions.length}</p>
        </div>

        <div className={`flex items-center gap-3 px-6 py-2 rounded-full border ${timeLeft < 60 ? "border-red-600 bg-red-600/10 text-red-500 animate-pulse" : "border-gray-800 bg-gray-900 text-gray-300"}`}>
          <Timer size={16} />
          <span className="font-black text-sm tabular-nums">{formatTime(timeLeft)}</span>
        </div>

        <button 
          onClick={autoSubmit}
          className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all flex items-center gap-2"
        >
          Submit <Send size={14} />
        </button>
      </nav>

      <div className="flex-grow grid lg:grid-cols-12 max-w-7xl mx-auto w-full p-6 md:p-12 gap-12">
        {/* Question Area */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Direct Question</span>
                <h1 className="text-xl md:text-2xl font-bold leading-relaxed">
                  {currentQuestion.text}
                </h1>
                {currentQuestion.imageUrl && (
                  <img src={currentQuestion.imageUrl} alt="Context" className="rounded-2xl border border-gray-800 max-h-64 object-cover" />
                )}
              </div>

              <div className="grid gap-4">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(currentQuestion.id, opt.id)}
                    className={`p-6 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                      answers[currentQuestion.id] === opt.id 
                      ? "border-red-600 bg-red-600/5 text-white" 
                      : "border-gray-800 bg-gray-900/20 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    <span className="text-sm font-medium">{opt.text}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion.id] === opt.id ? "border-red-600" : "border-gray-700"
                    }`}>
                      {answers[currentQuestion.id] === opt.id && <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-900">
            <button 
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => prev - 1)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white disabled:opacity-20"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            
            <div className="flex gap-2">
               <button className="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-500 hover:text-yellow-500">
                 <Flag size={16} />
               </button>
            </div>

            <button 
              disabled={currentIndex === exam.questions.length - 1}
              onClick={() => setCurrentIndex(prev => prev + 1)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white disabled:opacity-20"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Question Grid Sidebar */}
        <div className="lg:col-span-4 lg:border-l lg:border-gray-900 lg:pl-12">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-6">Question Map</h3>
          <div className="grid grid-cols-5 gap-2">
            {exam.questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`aspect-square rounded-lg text-[10px] font-black border transition-all ${
                  currentIndex === idx 
                    ? "bg-red-600 border-red-600 text-white" 
                    : answers[q.id] 
                      ? "bg-gray-800 border-gray-700 text-gray-300"
                      : "bg-transparent border-gray-800 text-gray-600 hover:border-gray-500"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="mt-12 p-6 bg-red-950/10 border border-red-900/30 rounded-[2rem]">
            <div className="flex items-center gap-3 text-red-500 mb-3">
              <AlertCircle size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Warning</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase">
              Refreshing this page or attempting to navigate away will auto-submit your current progress.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}