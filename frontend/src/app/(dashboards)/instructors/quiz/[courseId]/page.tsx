"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, Plus, Trash2, Rocket, 
  Trophy, Target, Zap
} from "lucide-react";
import Link from "next/link";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIdx: number;
  points: number;
  difficulty: "Easy" | "Medium" | "Hard";
}

export default function QuizCreationPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    { id: "1", question: "", options: ["", "", ""], correctIdx: 0, points: 10, difficulty: "Easy" }
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, {
      id: Math.random().toString(36).substr(2, 9),
      question: "",
      options: ["", "", ""],
      correctIdx: 0,
      points: 10,
      difficulty: "Easy"
    }]);
  };

  /**
   * Refactored update handler:
   * Uses a generic <K> to ensure the 'value' matches the 'field' type in QuizQuestion.
   */
  const updateQuestion = <K extends keyof QuizQuestion>(id: string, field: K, value: QuizQuestion[K]) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOption = (qId: string, optIdx: number, val: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const newOpts = [...q.options];
        newOpts[optIdx] = val;
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  return (
    <main className="min-h-screen  text-white rounded-3xl p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link href="/instructors" className="inline-flex items-center gap-2 text-gray-500 hover:text-violet-500 mb-10 group transition-colors">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
        </Link>

        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-l-4 border-violet-600 pl-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Flash <span className="text-violet-600">Quiz</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] mt-3 uppercase">
              Interactive knowledge check for {courseCode}
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-violet-600/10 border border-violet-500/20 px-6 py-3 rounded-2xl flex items-center gap-3">
                <Trophy className="text-violet-500" size={18} />
                <span className="text-lg font-black">{questions.reduce((acc, q) => acc + q.points, 0)} Total Pts</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-6">
            <input 
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              placeholder="Give your quiz a name..."
              className="w-full bg-transparent text-3xl font-black outline-none border-b border-gray-900 pb-4 mb-8 focus:border-violet-600 transition-colors"
            />

            <AnimatePresence mode="popLayout">
              {questions.map((q, idx) => (
                <motion.div 
                  key={q.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#0D0C12] border border-gray-800 rounded-[2.5rem] p-8 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 px-6 py-2 bg-gray-900 border-l border-b border-gray-800 rounded-bl-2xl">
                     <span className={`text-[9px] font-black uppercase tracking-widest ${
                       q.difficulty === 'Easy' ? 'text-green-500' : q.difficulty === 'Medium' ? 'text-violet-500' : 'text-red-500'
                     }`}>
                       {q.difficulty}
                     </span>
                  </div>

                  <div className="flex gap-6 mb-8">
                    <span className="text-4xl font-black text-gray-800 italic">#{idx + 1}</span>
                    <textarea 
                      value={q.question}
                      onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                      placeholder="Ask something interesting..."
                      className="w-full bg-transparent text-xl font-bold outline-none resize-none pt-2"
                    />
                  </div>

                  <div className="space-y-3 mb-8">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-4 group/opt">
                        <button 
                          type="button"
                          onClick={() => updateQuestion(q.id, 'correctIdx', optIdx)}
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                            q.correctIdx === optIdx ? "bg-violet-600 border-violet-600 text-white" : "border-gray-800 text-gray-700"
                          }`}
                        >
                          <span className="font-black text-xs">{String.fromCharCode(65 + optIdx)}</span>
                        </button>
                        <input 
                          value={opt}
                          onChange={(e) => updateOption(q.id, optIdx, e.target.value)}
                          placeholder="Option text..."
                          className={`flex-1 bg-gray-900/40 p-4 rounded-xl text-sm font-bold outline-none border transition-all ${
                            q.correctIdx === optIdx ? "border-violet-600/50" : "border-transparent"
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-900">
                    <div className="flex gap-4">
                      {(["Easy", "Medium", "Hard"] as const).map(level => (
                        <button 
                          key={level}
                          type="button"
                          onClick={() => updateQuestion(q.id, 'difficulty', level)}
                          className={`text-[9px] font-black uppercase tracking-widest transition-colors ${
                            q.difficulty === level ? "text-white" : "text-gray-600 hover:text-gray-400"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                    <button 
                      type="button"
                      onClick={() => setQuestions(prev => prev.filter(item => item.id !== q.id))}
                      className="text-gray-700 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button 
              type="button"
              onClick={addQuestion}
              className="w-full py-6 rounded-[2rem] border-2 border-dashed border-gray-900 flex items-center justify-center gap-3 text-gray-600 hover:border-violet-600 hover:text-violet-600 transition-all"
            >
              <Plus size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Add Question</span>
            </button>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-violet-600 p-8 rounded-[2.5rem] text-black">
              <Zap className="mb-4" size={32} />
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">Power Quiz</h3>
              <p className="text-[10px] font-bold uppercase tracking-tight opacity-80 mb-6">
                Keep questions punchy and options distinct for rapid recall.
              </p>
              
              <div className="space-y-4">
                 <div className="flex justify-between items-center bg-black/10 p-4 rounded-2xl">
                    <span className="text-[9px] font-black uppercase">Auto-Shuffle</span>
                    <div className="w-8 h-4 bg-black/20 rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-black rounded-full"/></div>
                 </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setIsSuccess(true)}
              disabled={!quizName || questions.some(q => !q.question)}
              className="w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-violet-500 hover:text-white transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Rocket size={18} />
              Launch Quiz
            </button>
          </aside>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/95 backdrop-blur-2xl p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-violet-600 text-white rounded-[4rem] p-12 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 opacity-10">
                <Rocket size={200} />
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Target size={40} />
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none">Quiz Live!</h2>
              <p className="text-white/80 text-[10px] font-black uppercase tracking-widest mb-10">
                Students can now challenge {quizName}
              </p>
              <button 
                type="button"
                onClick={() => router.push('/instructors')} 
                className="w-full py-5 bg-black text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
              >
                Back to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}