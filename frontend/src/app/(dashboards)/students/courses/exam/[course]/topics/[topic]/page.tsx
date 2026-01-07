"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { 
  CheckCircle, 
  Lock, 
  Timer, 
  Loader2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  Send
} from "lucide-react";

// --- Interfaces ---
interface Question {
  id: string;
  text: string;
  options: string[];
}

export default function ExamQuestionsPage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topic as string;
  const courseCode = (params.course as string).toUpperCase();

  // --- State Management ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // Default 10 mins
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [examDone, setExamDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examKey = `exam_${courseCode}_${topicId}`;

  // --- 1. Fetch Questions from API ---
  useEffect(() => {
    async function initExam() {
      try {
        setLoading(true);
        // Check if already taken via backend (preferred) or local fallback
        const completed = localStorage.getItem(examKey);
        if (completed === "true") {
          setExamDone(true);
          setLoading(false);
          return;
        }

        const res = await fetch(`/api/students/exams/questions?topicId=${topicId}`);
        if (!res.ok) throw new Error("Could not load exam questions.");
        
        const data = await res.json();
        setQuestions(data.questions);
        setTimeLeft(data.durationSeconds || 600);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Connection failed");
      } finally {
        setTimeout(() => setLoading(false), 1200);
      }
    }
    initExam();
  }, [topicId, examKey]);

  // --- 2. Timer Logic ---
  const handleSubmit = useCallback(async () => {
    if (submitted) return;
    setSubmitted(true);

    try {
      const response = await fetch("/api/students/exams/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topicId, answers }),
      });
      const result = await response.json();
      setScore(result.score);
      localStorage.setItem(examKey, "true");
    } catch (err) {
      console.error("Submission failed", err);
    }
  }, [submitted, topicId, answers, examKey]);

  useEffect(() => {
    if (submitted || examDone || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, examDone, loading, handleSubmit]);

  // --- Helpers ---
  const handleOptionChange = (qId: string, option: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // --- LOADING / ERROR STATES ---
  if (loading) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
      <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.4em]">Initializing Secure Environment...</p>
    </div>
  );

  if (examDone) return (
    <div className="h-screen bg-black flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 border border-gray-800 p-10 rounded-[3rem] text-center max-w-md">
        <Lock className="w-16 h-16 text-blue-600 mx-auto mb-6" />
        <h2 className="text-2xl font-black text-white mb-4 uppercase">Attempt Locked</h2>
        <p className="text-gray-500 text-sm mb-8">You have already completed this assessment. Multiple attempts are disabled for this module.</p>
        <button onClick={() => router.back()} className="w-full bg-white text-black font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
          Return to Dashboard
        </button>
      </motion.div>
    </div>
  );

  return (
    <section className="min-h-screen bg-black text-gray-200 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 py-4 mb-10 flex justify-between items-center">
          <div>
            <span className="text-blue-500 text-[9px] font-black uppercase tracking-widest">{courseCode} Assessment</span>
            <h1 className="text-xl font-bold text-white uppercase">{topicId.replace(/-/g, ' ')}</h1>
          </div>
          <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${timeLeft < 60 ? 'border-red-600 bg-red-600/10 text-red-500' : 'border-gray-800 bg-gray-900 text-blue-500'}`}>
            <Timer size={18} />
            <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Questions Grid */}
        <div className="space-y-6 pb-32">
          {questions.map((q, idx) => (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-900/50 border border-gray-800 p-8 rounded-[2.5rem] hover:border-gray-700 transition-colors"
            >
              <div className="flex gap-4 mb-6">
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600/10 text-blue-500 flex items-center justify-center font-black text-xs">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white leading-relaxed">{q.text}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOptionChange(q.id, opt)}
                    className={`text-left p-4 rounded-2xl border text-sm font-bold transition-all ${
                      answers[q.id] === opt 
                      ? "border-blue-600 bg-blue-600/10 text-white shadow-[0_0_20px_rgba(37,99,235,0.1)]" 
                      : "border-gray-800 bg-gray-950 text-gray-500 hover:border-gray-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Submit Bar */}
        {!submitted && (
          <div className="fixed bottom-8 left-0 w-full px-4">
            <div className="max-w-4xl mx-auto bg-gray-900/90 backdrop-blur-xl border border-gray-700 p-4 rounded-3xl flex justify-between items-center shadow-2xl">
              <p className="hidden md:block text-xs font-bold text-gray-400 px-4 italic">
                {Object.keys(answers).length} of {questions.length} questions answered
              </p>
              <button
                onClick={handleSubmit}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all"
              >
                <Send size={16} /> Finalize Submission
              </button>
            </div>
          </div>
        )}

        {/* Result Overlay */}
        <AnimatePresence>
          {submitted && score !== null && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
            >
              <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-gray-900 border border-gray-800 p-10 rounded-[3rem] text-center max-w-sm w-full shadow-2xl">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500" size={40} />
                </div>
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Exam Scored</h2>
                <div className="text-5xl font-black text-blue-500 my-6">
                  {((score / questions.length) * 100).toFixed(0)}%
                </div>
                <p className="text-gray-500 text-sm mb-8 font-bold">
                  Performance: {score} Correct out of {questions.length}
                </p>
                <button 
                  onClick={() => router.push('/students/courses/exam')}
                  className="w-full bg-white text-black font-black py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                >
                  Close Portal
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}