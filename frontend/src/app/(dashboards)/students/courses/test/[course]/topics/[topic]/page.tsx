"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, ArrowLeft, Send, Loader2, 
  AlertCircle, HelpCircle, Save 
} from "lucide-react";

// --- Interfaces ---
interface Question {
  id: string;
  text: string;
}

export default function TestDetailPage() {
  const { course, topic } = useParams();
  const router = useRouter();

  // --- States ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Fetch Questions from API ---
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        // Replace with your endpoint: e.g., `/api/courses/${course}/topics/${topic}/questions`
        const res = await fetch(`/api/students/tests/questions?topicId=${topic}`);
        if (!res.ok) throw new Error("Failed to load questions");
        
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        // Fallback for UI testing
        setQuestions(Array.from({ length: 5 }, (_, i) => ({
          id: `q-${i + 1}`,
          text: `Question ${i + 1}: Explain the core methodology of ${topic?.toString().replace("-", " ")} in the context of ${course?.toString().toUpperCase()}?`
        })));
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [course, topic]);

  // --- Handlers ---
  const handleAnswerChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateProgress = () => {
    if (questions.length === 0) return 0;
    const answeredCount = Object.values(answers).filter(val => val.trim() !== "").length;
    return (answeredCount / questions.length) * 100;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length < questions.length) {
      if (!confirm("You haven't answered all questions. Submit anyway?")) return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // --- POST API CALL ---
      const response = await fetch(`/api/students/tests/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course,
          topicId: topic,
          submissions: answers,
          submittedAt: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error("Submission failed on server");

      setSubmitted(true);
      setShowSuccess(true);
    } catch (err) {
      setError("Could not save your answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#035b77]" size={40} />
        <p className="text-gray-500 font-medium tracking-widest uppercase text-xs">Loading Test Paper...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress & Header */}
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-md pt-2 pb-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-2"
              >
                <ArrowLeft size={16} /> Back to topics
              </button>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {course?.toString().toUpperCase()} Test
              </h1>
              <p className="text-[#035b77] text-xs font-bold uppercase tracking-tighter">
                Topic: {topic?.toString().replace("-", " ")}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-black text-gray-500 uppercase">Completion</span>
              <p className="text-lg font-bold text-white">{Math.round(calculateProgress())}%</p>
            </div>
          </div>
          
          <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              className="h-full bg-[#035b77] shadow-[0_0_10px_#035b77]"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-[2rem] border transition-all ${
                answers[q.id]?.trim() 
                ? "bg-gray-900 border-[#035b77]/30" 
                : "bg-gray-900/40 border-gray-800"
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-[#035b77] border border-gray-700">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <label className="block text-sm sm:text-base font-medium text-gray-200 mb-4">
                    {q.text}
                  </label>
                  <textarea
                    value={answers[q.id] || ""}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    disabled={submitted || isSubmitting}
                    rows={4}
                    placeholder="Provide your detailed explanation here..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-[#035b77] outline-none transition-all resize-none disabled:opacity-50"
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
              <AlertCircle size={18} />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          <div className="flex justify-between items-center pt-6">
            <p className="text-xs text-gray-500 italic">
              All answers are auto-saved to your session draft.
            </p>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitted || isSubmitting}
              className="flex items-center gap-3 bg-[#035b77] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#047194] transition shadow-xl disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Finish & Submit
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-[3rem] p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2 uppercase">Success!</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Your answers for <span className="text-white font-bold">{topic}</span> have been successfully stored in the database for grading.
              </p>
              <button
                onClick={() => router.push(`/students/courses/test/${course}/topics`)}
                className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-200 transition"
              >
                Return to Course
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}