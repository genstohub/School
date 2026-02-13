"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  CheckCircle, XCircle, Loader2, ArrowLeft, Timer, Send, Trophy, X, AlertCircle 
} from "lucide-react";

interface QuestionOption {
  key: string;
  text: string;
}

interface Question {
  id: number;
  type: "mcq" | "tf";
  text: string;
  answer: string;
  options?: QuestionOption[];
}

export default function TopicQuizPage() {
  const router = useRouter();
  const params = useParams();
  
  // Extracting from dynamic segments [course] and [topic]
  const courseCode = params.course as string;
  const topicId = params.topic as string;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showAnswersModal, setShowAnswersModal] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        const res = await fetch(`/api/quizzes/${courseCode}/${topicId}`);
        if (!res.ok) throw new Error("Could not find questions for this topic.");
        const data = await res.json();
        setQuestions(data.questions);
        setSecondsLeft((data.duration_minutes || 5) * 60);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error loading quiz");
      } finally {
        setLoading(false);
      }
    }
    if (topicId) loadQuiz();
  }, [courseCode, topicId]);

  useEffect(() => {
    if (submitted || loading || secondsLeft <= 0 || questions.length === 0) return;
    const timer = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    if (secondsLeft === 0) doSubmit();
    return () => clearInterval(timer);
  }, [secondsLeft, submitted, loading, questions]);

  const doSubmit = async () => {
    if (submitted || isSaving) return;
    setIsSaving(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.answer) correctCount++; });
    
    setScore({ correct: correctCount, total: questions.length });
    setSubmitted(true);
    setShowResultsModal(true);
    setIsSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="min-h-screen bg-gray-950 p-4 sm:p-8 text-gray-100">
      <header className="max-w-4xl mx-auto mb-8 flex justify-between items-center sticky top-0 bg-gray-950/90 backdrop-blur-md py-4 border-b border-gray-800">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white flex items-center gap-2"><ArrowLeft size={16}/> Exit</button>
        <div className="flex items-center gap-4">
          <div className="font-mono text-blue-400 px-4 py-2 border border-gray-800 rounded-xl flex items-center gap-2">
            <Timer size={18}/> {Math.floor(secondsLeft/60)}:{String(secondsLeft%60).padStart(2,'0')}
          </div>
          <button onClick={doSubmit} className="bg-blue-600 px-6 py-2 rounded-xl font-bold">Submit</button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        {questions.map((q, idx) => (
          <article key={q.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-blue-500 font-black mb-2 uppercase text-xs">Question {idx + 1}</p>
            <p className="text-lg font-medium mb-6">{q.text}</p>
            <div className="grid gap-3">
              {q.type === "mcq" ? (
                q.options?.map(opt => (
                  <button key={opt.key} onClick={() => setAnswers({...answers, [q.id]: opt.key})} className={`p-4 text-left rounded-xl border-2 transition-all ${answers[q.id] === opt.key ? "border-blue-600 bg-blue-600/10" : "border-gray-800"}`}>
                    <span className="mr-4 font-bold opacity-50">{opt.key}</span> {opt.text}
                  </button>
                ))
              ) : (
                ["True", "False"].map(val => (
                  <button key={val} onClick={() => setAnswers({...answers, [q.id]: val})} className={`p-4 rounded-xl border-2 ${answers[q.id] === val ? "border-blue-600 bg-blue-600/10" : "border-gray-800"}`}>
                    {val}
                  </button>
                ))
              )}
            </div>
          </article>
        ))}
      </div>

      {showResultsModal && score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 p-10 rounded-3xl text-center border border-gray-800 max-w-sm w-full">
            <Trophy size={48} className="mx-auto text-blue-500 mb-4"/>
            <h2 className="text-3xl font-bold mb-6">{Math.round((score.correct/score.total)*100)}%</h2>
            <button onClick={() => {setShowResultsModal(false); setShowAnswersModal(true)}} className="w-full bg-blue-600 py-4 rounded-xl font-bold mb-3">Review Answers</button>
            <button onClick={() => router.back()} className="text-gray-500 uppercase text-xs font-bold">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}