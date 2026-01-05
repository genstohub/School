"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  ArrowLeft, 
  Timer, 
  Send,
  Trophy,
  X,
  AlertCircle
} from "lucide-react";

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
  
  const courseCode = params.courseCode as string;
  const topicId = params.topicId as string;

  // --- Quiz State ---
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // --- UI State ---
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // 1. Fetch Questions dynamically based on Topic ID
  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`/api/courses/${courseCode}/topics/${topicId}/questions`);
        
        if (!res.ok) throw new Error("Could not find questions for this topic.");
        
        const data = await res.json();
        
        if (!data.questions || data.questions.length === 0) {
          throw new Error("No questions available for this topic yet.");
        }

        setQuestions(data.questions);
        setSecondsLeft((data.durationMinutes || 5) * 60);
      } catch (error) {
        console.error("Quiz load error:", error);
        setError(error instanceof Error ? error.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }
    if (topicId) loadQuiz();
  }, [courseCode, topicId]);

  // 2. Timer Logic
  useEffect(() => {
    if (submitted || loading || secondsLeft <= 0 || questions.length === 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    
    if (secondsLeft === 0) doSubmit();
    
    return () => clearInterval(timer);
  }, [secondsLeft, submitted, loading, questions]);

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleSelect = (qid: number, value: string) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: value }));
  };

  // 3. Final Submission
  const doSubmit = async () => {
    if (submitted || isSaving || questions.length === 0) return;
    setIsSaving(true);

    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) correctCount++;
    });

    const finalScore = { correct: correctCount, total: questions.length };
    const percentage = (correctCount / questions.length) * 100;

    try {
      await fetch(`/api/courses/${courseCode}/topics/${topicId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score: percentage,
          correctCount,
          totalQuestions: questions.length,
          timeTaken: (questions.length * 15) - secondsLeft, 
        }),
      });

      setScore(finalScore);
      setSubmitted(true);
      setShowResultsModal(true);
    } catch (err) {
      console.error("Save error:", err);
      // Fallback to local results if DB save fails
      setScore(finalScore);
      setSubmitted(true);
      setShowResultsModal(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin mb-4 text-blue-500" size={48} />
        <p className="text-gray-400 animate-pulse font-medium">Loading your practice session...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">Quiz Unavailable</h2>
        <p className="text-gray-400 mb-6 max-w-md">{error}</p>
        <button 
          onClick={() => router.back()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-8 text-gray-100">
      {/* Fixed Header */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 bg-gray-950/90 backdrop-blur-md py-4 z-20 border-b border-gray-800">
        <div>
          <button onClick={() => router.back()} className="flex items-center text-gray-400 hover:text-white transition text-sm mb-1 group">
            <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> Exit Quiz
          </button>
          <h1 className="text-xl font-bold">Topic Practice</h1>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg border-2 ${secondsLeft <= 30 ? "border-red-500 text-red-500 animate-pulse" : "border-gray-800 text-blue-400"}`}>
            <Timer size={20} />
            {formatTime(secondsLeft)}
          </div>
          <button 
            onClick={doSubmit} 
            disabled={submitted || isSaving} 
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            Submit
          </button>
        </div>
      </div>

      {/* Questions Scroll Area */}
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        {questions.map((q, idx) => (
          <article key={q.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl transition-all hover:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-600/20 text-blue-500 text-xs font-black px-2 py-1 rounded">Q{idx + 1}</span>
              <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">{q.type}</span>
            </div>
            
            <p className="text-lg text-gray-200 font-medium leading-relaxed mb-6">{q.text}</p>

            <div className="space-y-3">
              {isMCQ(q) ? (
                <div className="grid grid-cols-1 gap-3">
                  {q.options.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(q.id, opt.key)}
                      disabled={submitted}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                        answers[q.id] === opt.key 
                          ? "border-blue-600 bg-blue-600/10 text-white" 
                          : "border-gray-800 bg-gray-800/40 text-gray-400 hover:border-gray-600"
                      }`}
                    >
                      <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold ${answers[q.id] === opt.key ? "bg-blue-600" : "bg-gray-700"}`}>
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
                      onClick={() => handleSelect(q.id, val)}
                      disabled={submitted}
                      className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${
                        answers[q.id] === val 
                          ? "border-blue-600 bg-blue-600/10 text-white" 
                          : "border-gray-800 bg-gray-800/40 text-gray-400"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Results Modal */}
      {showResultsModal && score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-sm w-full p-8 shadow-2xl text-center relative">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center border-8 border-gray-950 shadow-xl">
              <Trophy size={40} className="text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mt-8 mb-2">Quiz Results</h2>
            <p className="text-gray-400 text-sm mb-6">Great job on finishing the practice!</p>
            
            <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 border border-gray-700">
              <span className="text-5xl font-black text-blue-500">
                {Math.round((score.correct / score.total) * 100)}%
              </span>
              <p className="text-gray-400 font-medium mt-2">{score.correct} / {score.total} Correct Answers</p>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { setShowResultsModal(false); setShowAnswersModal(true); }}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-blue-900/20"
              >
                Review Answers
              </button>
              <button 
                onClick={() => router.push(`/students/courses/quiz/${courseCode}`)}
                className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold transition"
              >
                Back to Topics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Review Overlay */}
      {showAnswersModal && (
        <div className="fixed inset-0 z-50 bg-gray-950 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-gray-950 py-4 z-10 border-b border-gray-800">
              <h2 className="text-2xl font-bold">Performance Review</h2>
              <button 
                onClick={() => setShowAnswersModal(false)}
                className="p-2 hover:bg-gray-800 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              {questions.map((q, i) => {
                const isCorrect = answers[q.id] === q.answer;
                return (
                  <div key={q.id} className={`p-5 rounded-2xl border-2 ${isCorrect ? "border-green-900/30 bg-green-950/10" : "border-red-900/30 bg-red-950/10"}`}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-gray-200">Q{i+1}: {q.text}</p>
                      {isCorrect ? <CheckCircle className="text-green-500 shrink-0" size={20} /> : <XCircle className="text-red-500 shrink-0" size={20} />}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className={isCorrect ? "text-green-400" : "text-red-400"}>
                        Your Choice: <span className="font-bold">{answers[q.id] || "Skipped"}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-green-400 font-medium">
                          Correct Answer: <span className="font-bold">{q.answer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <button 
              onClick={() => router.push(`/students/courses/quiz/${courseCode}`)}
              className="w-full mt-10 py-4 bg-gray-900 border border-gray-800 text-white rounded-2xl font-bold hover:bg-gray-800 transition"
            >
              Finish Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}