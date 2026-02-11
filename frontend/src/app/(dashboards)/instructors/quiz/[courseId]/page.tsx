"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Save, Trash2, Plus, Clock, HelpCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  type: "mcq" | "tf";
  text: string;
  answer: string;
  options: { key: string; text: string }[];
}

export default function QuizBuilderPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const { courseId } = use(params);
  
  const [title, setTitle] = useState("");
  const [topicId, setTopicId] = useState("");
  const [duration, setDuration] = useState(10);
  const [questions, setQuestions] = useState<Question[]>([
    { id: crypto.randomUUID(), type: "mcq", text: "", answer: "A", options: [
      { key: "A", text: "" }, { key: "B", text: "" }, { key: "C", text: "" }, { key: "D", text: "" }
    ]}
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const addQuestion = (type: "mcq" | "tf") => {
    const newQ: Question = {
      id: crypto.randomUUID(),
      type,
      text: "",
      answer: type === "mcq" ? "A" : "True",
      options: type === "mcq" ? [
        { key: "A", text: "" }, { key: "B", text: "" }, { key: "C", text: "" }, { key: "D", text: "" }
      ] : []
    };
    setQuestions([...questions, newQ]);
  };

  const updateQuestion = (id: string, field: string, value: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const handlePublish = async () => {
    const payload = { courseId, topicId, title, durationMinutes: duration, questions };
    const res = await fetch('/api/quizzes/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) setIsSuccess(true);
  };

  return (
    <main className="min-h-screen  text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link href="/instructors/material" className="flex items-center gap-2 text-gray-500 mb-8"><ChevronLeft size={18}/> Back</Link>
        
        <header className="mb-12 border-l-4 border-blue-500 pl-6">
          <h1 className="text-4xl font-black uppercase">Quiz <span className="text-blue-500">Engine</span></h1>
          <p className="text-gray-500 text-xs font-bold mt-2 uppercase tracking-widest">Course: {courseId}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900/40 p-8 rounded-[2rem] border border-gray-800 space-y-4">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quiz Title (e.g. Chapter 1 Basics)" className="bg-transparent text-2xl font-bold w-full outline-none" />
              <input value={topicId} onChange={(e) => setTopicId(e.target.value.toLowerCase().replace(/\s/g, '-'))} placeholder="Topic Slug (e.g. introduction-to-react)" className="bg-transparent text-blue-500 font-mono text-sm w-full outline-none" />
            </div>

            {questions.map((q, idx) => (
              <div key={q.id} className="bg-[#0A0A0A] border border-gray-800 rounded-[2rem] p-8 relative">
                <button onClick={() => setQuestions(questions.filter(item => item.id !== q.id))} className="absolute top-8 right-8 text-gray-600 hover:text-red-500"><Trash2 size={18}/></button>
                <p className="text-[10px] font-black text-blue-500 uppercase mb-4">Question {idx + 1} — {q.type}</p>
                <textarea value={q.text} onChange={(e) => updateQuestion(q.id, 'text', e.target.value)} placeholder="Write the question here..." className="bg-transparent w-full text-lg font-medium outline-none resize-none mb-6" />
                
                {q.type === 'mcq' ? (
                  <div className="space-y-3">
                    {q.options.map((opt, oIdx) => (
                      <div key={opt.key} className="flex items-center gap-4">
                        <button onClick={() => updateQuestion(q.id, 'answer', opt.key)} className={`w-10 h-10 rounded-xl font-bold border ${q.answer === opt.key ? "bg-blue-600 border-blue-600" : "border-gray-800 text-gray-600"}`}>{opt.key}</button>
                        <input value={opt.text} onChange={(e) => {
                          const newOpts = [...q.options];
                          newOpts[oIdx].text = e.target.value;
                          setQuestions(questions.map(item => item.id === q.id ? { ...item, options: newOpts } : item));
                        }} className="bg-gray-900/50 border border-gray-800 p-3 rounded-xl flex-1 text-sm" placeholder={`Option ${opt.key}...`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-4">
                    {["True", "False"].map(val => (
                      <button key={val} onClick={() => updateQuestion(q.id, 'answer', val)} className={`flex-1 py-4 rounded-xl border-2 font-bold ${q.answer === val ? "border-blue-600 bg-blue-600/10 text-blue-500" : "border-gray-800 text-gray-500"}`}>{val}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-4">
              <button onClick={() => addQuestion('mcq')} className="flex-1 py-4 border-2 border-dashed border-gray-800 rounded-2xl text-gray-500 flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-500 transition-all font-bold"><Plus size={18}/> Multiple Choice</button>
              <button onClick={() => addQuestion('tf')} className="flex-1 py-4 border-2 border-dashed border-gray-800 rounded-2xl text-gray-500 flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-500 transition-all font-bold"><Plus size={18}/> True/False</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0A0A0A] border border-gray-800 p-6 rounded-3xl">
              <div className="flex items-center gap-2 mb-4 text-gray-400"><Clock size={16}/> <span className="text-[10px] font-bold uppercase">Duration</span></div>
              <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="bg-transparent text-3xl font-black w-full outline-none" />
              <p className="text-[10px] text-gray-600 mt-1 uppercase font-bold">Minutes to complete</p>
            </div>
            <button onClick={handlePublish} className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"><Save size={18}/> Publish Quiz</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl">
             <motion.div initial={{scale: 0.9}} animate={{scale: 1}} className="bg-white p-12 rounded-[3rem] text-center max-w-sm">
                <CheckCircle2 size={60} className="mx-auto text-green-500 mb-6"/>
                <h2 className="text-gray-950 text-2xl font-black uppercase mb-2">Quiz Live</h2>
                <p className="text-gray-500 text-sm font-bold mb-8">Your topic practice is now available for students.</p>
                <button onClick={() => router.push('/instructors/material')} className="w-full bg-gray-950 text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-widest">Done</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}