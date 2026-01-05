"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2, ArrowLeft, Timer, Send } from "lucide-react";

// --- Types ---
type Question =
  | {
      id: number;
      type: "mcq";
      text: string;
      options: { key: string; text: string }[];
      answer: string;
    }
  | {
      id: number;
      type: "tf";
      text: string;
      answer: "True" | "False";
    };

function isMCQ(q: Question): q is Extract<Question, { type: "mcq" }> {
  return q.type === "mcq";
}

export default function TopicQuizPage() {
  const router = useRouter();
  const params = useParams();
  
  // Extracting IDs from your route structure
  const courseId = params.courseCode as string;
  const topicId = params.topicId as string;

  // --- State ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // 1. Fetch questions based on the specific topicId
  useEffect(() => {
    async function loadQuizData() {
      try {
        setLoading(true);
        // Matching your API pattern: /api/courses/[courseId]/topics/[topicId]/questions
        const res = await fetch(`/api/courses/${courseId}/topics/${topicId}/questions`);
        if (!res.ok) throw new Error("Failed to load questions");
        
        const data = await res.json();
        setQuestions(data.questions);
        setSecondsLeft(data.durationMinutes * 60 || 300); // Fallback to 5 mins
      } catch (error) {
        console.error("Quiz load error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (courseId && topicId) loadQuizData();
  }, [courseId, topicId]);

  // 2. Timer Logic
  useEffect(() => {
    if (submitted || loading || secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    
    if (secondsLeft === 0 && !submitted) {
        handleManualSubmit();
    }
    
    return () => clearInterval(timer);
  }, [secondsLeft, submitted, loading]);

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleSelect = (qid: number, value: string) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: value }));
  };

  // 3. Submit Results to Backend
  const handleManualSubmit = async () => {
    if (submitted || isSaving) return;
    setIsSaving(true);

    // Calculate score
    const correctCount = questions.reduce((acc, q) => {
      return answers[q.id] === q.answer ? acc + 1 : acc;
    }, 0);

    try {
      // POSTing to your likely results endpoint
      const res = await fetch(`/api/courses/${courseId}/topics/${topicId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          score: (correctCount / questions.length) * 100,
          correctCount,
          totalCount: questions.length
        }),
      });

      if (res.ok) {
        setScore({ correct: correctCount, total: questions.length });
        setSubmitted(true);
        setShowResultsModal(true);
      }
    } catch (err) {
      console.error("Submission failed", err);
      // Still show results locally so student isn't stuck
      setScore({ correct: correctCount, total: questions.length });
      setSubmitted(true);
      setShowResultsModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-gray-100">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
        <p className="animate-pulse">Loading your practice test...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-8 text-gray-100">
      {/* Header Bar */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 bg-gray-950/80 backdrop-blur-md py-4 z-10 border-b border-gray-800">
        <div>
          <button onClick={() => router.back()} className="text-blue-400 text-sm flex items-center gap-1 hover:underline mb-1">
            <ArrowLeft size={14} /> Quit Practice
          </button>
          <h1 className="text-xl font-bold">Topic Practice</h1>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-lg border ${secondsLeft < 60 ? "border-red-500 text-red-500 animate-pulse" : "border-gray-700 text-gray-300"}`}>
            <Timer size={20} />
            {formatTime(secondsLeft)}
          </div>
          <button 
            onClick={handleManualSubmit} 
            disabled={isSaving || submitted}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            Submit
          </button>
        </div>
      </div>

      {/* Questions Container */}
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-blue-500 font-bold text-sm tracking-widest uppercase">Question {idx + 1}</span>
            </div>
            <p className="text-lg text-gray-200 mb-6 leading-relaxed">{q.text}</p>

            {isMCQ(q) ? (
              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt.key}
                    disabled={submitted}
                    onClick={() => handleSelect(q.id, opt.key)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      answers[q.id] === opt.key 
                        ? "border-blue-500 bg-blue-500/10 text-white" 
                        : "border-gray-800 bg-gray-800/40 text-gray-400 hover:border-gray-700 hover:bg-gray-800"
                    }`}
                  >
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold ${answers[q.id] === opt.key ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}>
                      {opt.key}
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-4">
                {["True", "False"].map((val) => (
                  <button
                    key={val}
                    disabled={submitted}
                    onClick={() => handleSelect(q.id, val)}
                    className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${
                      answers[q.id] === val 
                        ? "border-blue-500 bg-blue-500/10 text-white" 
                        : "border-gray-800 bg-gray-800/40 text-gray-400"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Results Modal */}
      {showResultsModal && score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-sm w-full p-8 shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Quiz Finished!</h2>
            <p className="text-gray-400 mb-6">You&apos;ve successfully completed the practice session.</p>
            
            <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-700">
              <div className="text-4xl font-black text-blue-500">{Math.round((score.correct / score.total) * 100)}%</div>
              <div className="text-gray-400 text-sm mt-1">{score.correct} / {score.total} Correct</div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => { setShowResultsModal(false); setShowAnswersModal(true); }}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition"
              >
                Review Answers
              </button>
              <button 
                onClick={() => router.push(`/students/courses/quiz/${courseId}`)}
                className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showAnswersModal && (
        <div className="fixed inset-0 z-50 bg-gray-950 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-950 py-4">
              <h2 className="text-2xl font-bold">Review Mode</h2>
              <button 
                onClick={() => setShowAnswersModal(false)}
                className="px-4 py-2 bg-gray-800 rounded-lg text-sm font-bold"
              >
                Close Review
              </button>
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const isCorrect = answers[q.id] === q.answer;
                return (
                  <div key={q.id} className={`p-6 rounded-2xl border ${isCorrect ? "border-green-900/50 bg-green-900/10" : "border-red-900/50 bg-red-900/10"}`}>
                    <p className="font-bold mb-3">{idx + 1}. {q.text}</p>
                    <div className="flex flex-col gap-1 text-sm">
                      <span className={isCorrect ? "text-green-400" : "text-red-400"}>
                        Your Answer: {answers[q.id] || "No Answer"}
                      </span>
                      {!isCorrect && (
                        <span className="text-green-400">Correct Answer: {q.answer}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}