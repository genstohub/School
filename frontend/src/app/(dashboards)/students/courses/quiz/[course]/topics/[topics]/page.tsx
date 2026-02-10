"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  CheckCircle, XCircle, Loader2, ArrowLeft, Timer, Send, Trophy, X, AlertCircle
} from "lucide-react";

type Question =
  | { id: number; type: "mcq"; text: string; options: { key: string; text: string }[]; answer: string; }
  | { id: number; type: "tf"; text: string; answer: "True" | "False"; };

function isMCQ(q: Question): q is Extract<Question, { type: "mcq" }> {
  return q.type === "mcq";
}

export default function TopicQuizPage() {
  const router = useRouter();
  const params = useParams();
  
  // Adjusted to match folder structure [course] and [topics]
  const courseCode = params.course as string;
  const topicId = params.topics as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        const res = await fetch(`/api/quizzes/content?course=${courseCode}&topic=${topicId}`);
        if (!res.ok) throw new Error("Could not find questions for this topic.");
        const data = await res.json();
        setQuestions(data.questions);
        setSecondsLeft((data.durationMinutes || 5) * 60);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    }
    if (topicId) loadQuiz();
  }, [courseCode, topicId]);

  useEffect(() => {
    if (submitted || loading || secondsLeft <= 0 || questions.length === 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    if (secondsLeft === 0) doSubmit();
    return () => clearInterval(timer);
  }, [secondsLeft, submitted, loading, questions]);

  const doSubmit = async () => {
    if (submitted || isSaving) return;
    setIsSaving(true);

    let correctCount = 0;
    questions.forEach((q) => { if (answers[q.id] === q.answer) correctCount++; });
    const percentage = (correctCount / questions.length) * 100;

    try {
      await fetch(`/api/quizzes/submit-attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course: courseCode,
          topic: topicId,
          score: percentage,
          correctCount,
          totalQuestions: questions.length
        }),
      });
      setScore({ correct: correctCount, total: questions.length });
      setSubmitted(true);
      setShowResultsModal(true);
    } catch (err) {
      setSubmitted(true); // Optimistic fallback
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white"><Loader2 className="animate-spin mb-4 text-blue-500" size={48} /><p>Loading practice...</p></div>;

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-8 text-gray-100">
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 bg-gray-950/90 backdrop-blur-md py-4 z-20 border-b border-gray-800">
        <div>
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white transition text-sm mb-1">← Exit</button>
          <h1 className="text-xl font-bold uppercase tracking-widest">{topicId.replace(/-/g, ' ')}</h1>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-lg border-2 border-gray-800 text-blue-400">
            <Timer size={20} /> {Math.floor(secondsLeft/60)}:{(secondsLeft%60).toString().padStart(2,'0')}
          </div>
          <button onClick={doSubmit} className="bg-blue-600 px-6 py-2 rounded-xl font-bold">Submit</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        {questions.map((q, idx) => (
          <article key={q.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-lg mb-6">{idx + 1}. {q.text}</p>
            <div className="grid gap-3">
              {isMCQ(q) ? q.options.map(opt => (
                <button key={opt.key} onClick={() => !submitted && setAnswers({...answers, [q.id]: opt.key})}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${answers[q.id] === opt.key ? "border-blue-600 bg-blue-600/10" : "border-gray-800"}`}>
                  <span className="font-bold mr-4">{opt.key}</span> {opt.text}
                </button>
              )) : ["True", "False"].map(val => (
                <button key={val} onClick={() => !submitted && setAnswers({...answers, [q.id]: val})}
                  className={`p-4 rounded-xl border-2 transition-all ${answers[q.id] === val ? "border-blue-600 bg-blue-600/10" : "border-gray-800"}`}>
                  {val}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      {showResultsModal && score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl max-w-sm w-full p-8 text-center">
            <Trophy size={48} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold mb-6">Score: {Math.round((score.correct/score.total)*100)}%</h2>
            <button onClick={() => { setShowResultsModal(false); setShowAnswersModal(true); }} className="w-full py-4 bg-blue-600 rounded-xl font-bold mb-3">Review Answers</button>
            <button onClick={() => router.push(`/students/dashboard`)} className="w-full py-4 bg-gray-800 rounded-xl">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}