"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, Send, Loader2, AlertCircle } from "lucide-react";

// --- Types ---
interface Question {
  id: string | number;
  text: string;
}

interface AssignmentData {
  courseName: string;
  topicTitle: string;
  questions: Question[];
}

export default function AssignmentDetailPage() {
  const { course, topic } = useParams();
  const router = useRouter();

  // API & Form States
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 1. Fetch Questions from API
  useEffect(() => {
    async function fetchAssignment() {
      try {
        setIsLoading(true);
        // Replace with your actual endpoint: e.g., /api/assignments/${course}/${topic}
        const response = await fetch(`/api/courses/${course}/topics/${topic}`);
        
        if (!response.ok) throw new Error("Failed to load assignment questions.");

        const data: AssignmentData = await response.json();
        setQuestions(data.questions);
        // Initialize answers array based on number of questions received
        setAnswers(new Array(data.questions.length).fill(""));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    if (course && topic) fetchAssignment();
  }, [course, topic]);

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // 2. Submit Answers to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation: Check if all answers are filled
    if (answers.some(ans => ans.trim() === "")) {
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/courses/${course}/topics/${topic}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) throw new Error("Submission failed. Please try again.");

      setSubmitted(true);
      setShowSuccess(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error submitting assignment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.push(`/students/courses/assignments/${course}/topics`);
  };

  // UI: Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-sm font-bold uppercase tracking-widest opacity-50">Loading Questions...</p>
      </div>
    );
  }

  // UI: Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-white font-bold mb-2">Error Loading Assignment</h2>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="text-white bg-red-600 px-6 py-2 rounded-lg text-sm font-bold">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 py-8 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 sm:p-10 relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-100 pb-6">
          <div>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{course}</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#035b77] uppercase tracking-tighter">
              {topic?.toString().replace(/-/g, " ")}
            </h1>
          </div>

          <button
            onClick={() => router.push(`/students/courses/assignments/${course}/topics`)}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition text-sm font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Topics
          </button>
        </div>

        {/* Assignment Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`p-6 rounded-2xl border transition-all ${
                submitted ? "bg-gray-50 border-gray-200" : "bg-white border-gray-100 shadow-sm"
              }`}
            >
              <label htmlFor={`q${q.id}`} className="block font-bold text-gray-800 mb-4 text-lg">
                <span className="text-blue-600 mr-2">Q{i + 1}.</span> {q.text}
              </label>
              <textarea
                id={`q${q.id}`}
                value={answers[i] || ""}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                disabled={submitted || isSubmitting}
                rows={4}
                required
                placeholder="Type your comprehensive response here..."
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all placeholder:text-gray-300"
              ></textarea>
            </motion.div>
          ))}

          <div className="flex justify-end pt-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitted || isSubmitting}
              className="flex items-center gap-3 bg-[#035b77] text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#024a61] transition disabled:opacity-50 shadow-lg shadow-blue-900/20"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {isSubmitting ? "Submitting..." : "Submit Assignment"}
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] shadow-2xl p-10 max-w-md w-full text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">SUBMITTED!</h2>
              <p className="text-gray-500 mb-8 font-medium">
                Your response has been successfully recorded. You can now return to the course dashboard.
              </p>
              <button
                onClick={handleCloseModal}
                className="w-full bg-[#035b77] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#024a61] transition-all shadow-lg"
              >
                Mark as Done & Return
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}