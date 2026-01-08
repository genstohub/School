"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  AlertTriangle,
  Loader2,
  CheckCircle2
} from "lucide-react";

// --- Interfaces ---
interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
}

interface ExamData {
  testTitle: string;
  durationMinutes: number;
  questions: Question[];
}

export default function ExamTerminalPage() {
  const { course, testId } = useParams();
  const router = useRouter();

  // --- State Management ---
  const [exam, setExam] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Fetch Exam Data ---
  useEffect(() => {
    async function initExam() {
      try {
        const res = await fetch(`/api/students/cbt/questions/${testId}`);
        if (!res.ok) throw new Error("Failed to load exam questions.");
        const data: ExamData = await res.json();
        setExam(data);
        setTimeLeft(data.durationMinutes * 60);
      } catch (err) {
        console.error(err);
        alert("Security Breach: Unable to verify exam packets.");
        router.back();
      } finally {
        setLoading(false);
      }
    }
    initExam();
  }, [testId, router]);

  // --- Submit Logic ---
  const submitExam = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const res = await fetch(`/api/students/cbt/submit`, {
        method: "POST",
        body: JSON.stringify({ testId, answers, course }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push(`/students/courses/cbt/results/${testId}`);
      }
    } catch (err) {
      alert("Submission Error. Retrying...");
      setIsSubmitting(false);
    }
  }, [testId, answers, course, router, isSubmitting]);

  // --- Timer Logic ---
  useEffect(() => {
    if (timeLeft <= 0 && !loading && exam) {
      submitExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, exam, submitExam]);

  // --- Format Time ---
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-[10px] font-black tracking-[0.4em] text-gray-700 uppercase">Encrypting Session...</p>
    </div>
  );

  const currentQuestion = exam?.questions[currentIndex];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top HUD (Heads-Up Display) */}
      <nav className="border-b border-gray-900 bg-black/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Active Session</span>
          <h2 className="text-sm font-bold uppercase tracking-tighter">{exam?.testTitle}</h2>
        </div>

        <div className={`flex items-center gap-3 px-6 py-2 rounded-full border ${timeLeft < 300 ? 'border-red-600 bg-red-600/10 text-red-500' : 'border-gray-800 bg-gray-900/50 text-blue-500'}`}>
          <Clock size={16} className={timeLeft < 300 ? "animate-pulse" : ""} />
          <span className="font-mono text-xl font-black">{formatTime(timeLeft)}</span>
        </div>

        <button 
          onClick={() => confirm("Finalize and submit?") && submitExam()}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Uploading..." : "Finish Test"} <Send size={12} />
        </button>
      </nav>

      <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        {/* Main Question Area */}
        <main className="flex-grow p-6 md:p-12 lg:p-20 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mb-4 block">
                Question {currentIndex + 1} of {exam?.questions.length}
              </span>
              <h1 className="text-xl md:text-2xl font-bold leading-relaxed mb-12">
                {currentQuestion?.text}
              </h1>

              <div className="space-y-4">
                {currentQuestion?.options.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setAnswers({ ...answers, [currentQuestion.id]: option.id })}
                      className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between group
                        ${isSelected 
                          ? 'border-blue-600 bg-blue-600/10 text-white' 
                          : 'border-gray-800 bg-gray-900/20 text-gray-400 hover:border-gray-600'}`}
                    >
                      <span className="text-sm font-medium">{option.text}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                        ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-700'}`}>
                        {isSelected && <CheckCircle2 size={14} className="text-black" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Right Sidebar: Question Palette */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-900 bg-gray-950/50 p-8">
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Question Palette</h4>
          <div className="grid grid-cols-5 gap-3">
            {exam?.questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = currentIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 text-[10px] font-black rounded-lg transition-all
                    ${isCurrent ? 'ring-2 ring-blue-600 text-white bg-blue-600' : 
                      isAnswered ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-600 border border-gray-800'}`}
                >
                  {(idx + 1).toString().padStart(2, '0')}
                </button>
              );
            })}
          </div>

          <div className="mt-12 space-y-4">
             <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase">
                <div className="w-3 h-3 bg-gray-700 rounded-sm" /> Answered
             </div>
             <div className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase">
                <div className="w-3 h-3 bg-gray-900 border border-gray-800 rounded-sm" /> Unanswered
             </div>
          </div>

          <div className="mt-20 p-6 rounded-[2rem] bg-yellow-500/5 border border-yellow-500/10 flex gap-4">
             <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
             <p className="text-[9px] text-yellow-600/80 font-bold uppercase leading-relaxed">
               System is monitoring your tab activity. Switching windows will trigger an automatic failure.
             </p>
          </div>
        </aside>
      </div>

      {/* Footer Navigation */}
      <footer className="border-t border-gray-900 bg-black p-6 flex items-center justify-between">
        <button 
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(prev => prev - 1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white disabled:opacity-20 transition-all"
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <button 
          disabled={currentIndex === (exam?.questions.length ?? 0) - 1}
          onClick={() => setCurrentIndex(prev => prev + 1)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white disabled:opacity-20 transition-all"
        >
          Next <ChevronRight size={16} />
        </button>
      </footer>
    </div>
  );
}