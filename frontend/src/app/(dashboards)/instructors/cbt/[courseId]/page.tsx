"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, Monitor, Clock, ShieldCheck, 
  Settings, Save, Plus, Trash2, 
  HelpCircle, ChevronRight, AlertTriangle, Cpu
} from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  text: string;
  type: "MCQ" | "True/False" | "Short Answer";
  points: number;
}

interface CBTForm {
  title: string;
  durationMinutes: number;
  totalMarks: number;
  isProctored: boolean;
  showResultsImmediately: boolean;
  questions: Question[];
}

export default function CBTCreationPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  const [form, setForm] = useState<CBTForm>({
    title: "",
    durationMinutes: 60,
    totalMarks: 100,
    isProctored: true,
    showResultsImmediately: false,
    questions: [{ id: "1", text: "", type: "MCQ", points: 5 }]
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const addQuestion = () => {
    setForm(prev => ({
      ...prev,
      questions: [...prev.questions, { 
        id: Math.random().toString(36).substr(2, 9), 
        text: "", 
        type: "MCQ", 
        points: 5 
      }]
    }));
  };

  const updateQuestion = (id: string, text: string) => {
    setForm(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === id ? { ...q, text } : q)
    }));
  };

  return (
    <main className="min-h-screen bg-[#020408] rounded-3xl text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <Link href="/instructors" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-500 mb-10 group transition-colors">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/80">Examination Control</span>
        </Link>

        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-l-4 border-blue-600 pl-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none italic">
              CBT <span className="text-blue-600">Engine</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] mt-3 uppercase">
              Formal Assessment Protocol for {courseCode}
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-blue-600/10 border border-blue-500/20 px-6 py-3 rounded-2xl flex items-center gap-3">
              <Clock className="text-blue-500" size={18} />
              <span className="text-lg font-black">{form.durationMinutes} MINS</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Question Builder (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2 mb-10">
               <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Examination Title</label>
               <input 
                 value={form.title}
                 onChange={(e) => setForm({...form, title: e.target.value})}
                 placeholder="e.g., Mid-Semester Advanced Calculus Exam"
                 className="w-full bg-transparent text-3xl font-black outline-none border-b border-gray-800 focus:border-blue-600 py-4 transition-all"
               />
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {form.questions.map((q, idx) => (
                  <motion.div 
                    key={q.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0A0E14] border border-gray-800 rounded-3xl p-8 group relative"
                  >
                    <div className="flex items-start gap-6">
                       <span className="text-2xl font-black text-gray-800 italic">Q{idx + 1}</span>
                       <div className="flex-1 space-y-4">
                          <textarea 
                            value={q.text}
                            onChange={(e) => updateQuestion(q.id, e.target.value)}
                            placeholder="Type exam question here..."
                            className="w-full bg-transparent text-lg font-bold outline-none resize-none min-h-[80px]"
                          />
                          <div className="flex gap-4">
                             <span className="bg-blue-600/10 text-blue-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-blue-500/20">
                               {q.type}
                             </span>
                             <span className="text-gray-600 text-[9px] font-black uppercase tracking-tighter">
                               {q.points} Points
                             </span>
                          </div>
                       </div>
                       <button className="text-gray-800 hover:text-red-500 transition-colors">
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button 
                onClick={addQuestion}
                className="w-full py-8 rounded-3xl border-2 border-dashed border-gray-900 flex items-center justify-center gap-3 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all bg-blue-600/5"
              >
                <Plus size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">Insert Question Node</span>
              </button>
            </div>
          </div>

          {/* Logic & Security Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0A0E14] border border-gray-800 rounded-[2.5rem] p-8 space-y-8">
              
              <div className="flex items-center gap-3 mb-2">
                 <ShieldCheck className="text-blue-500" size={20} />
                 <h3 className="text-xs font-black uppercase tracking-widest">Security Suite</h3>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                {[
                  { label: "AI Proctoring", state: form.isProctored, key: "isProctored" },
                  { label: "Instant Feedback", state: form.showResultsImmediately, key: "showResultsImmediately" }
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => setForm({...form, [item.key]: !item.state})}
                    className="w-full flex justify-between items-center p-4 bg-black/40 border border-gray-800 rounded-2xl group hover:border-blue-500/50 transition-all"
                  >
                    <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${item.state ? 'bg-blue-600' : 'bg-gray-800'}`}>
                       <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${item.state ? 'right-1' : 'left-1'}`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Exam Metadata */}
              <div className="space-y-6 pt-4 border-t border-gray-900">
                 <div>
                    <label className="text-[9px] font-black uppercase text-gray-600 block mb-2">Time Limit (Min)</label>
                    <input 
                      type="number"
                      value={form.durationMinutes}
                      onChange={(e) => setForm({...form, durationMinutes: parseInt(e.target.value) || 0})}
                      className="w-full bg-black border border-gray-800 p-4 rounded-xl text-sm font-black outline-none focus:border-blue-600 transition-all"
                    />
                 </div>
                 <div className="p-4 bg-blue-600/5 border border-blue-600/20 rounded-2xl flex items-center gap-4">
                    <Cpu className="text-blue-500" size={20} />
                    <p className="text-[9px] font-bold uppercase text-gray-400 leading-tight">
                      Questions will be <span className="text-white">shuffled automatically</span> for each candidate.
                    </p>
                 </div>
              </div>

            </div>

            <button 
              onClick={() => setIsSuccess(true)}
              disabled={!form.title}
              className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Monitor size={18} />
              Deploy CBT
            </button>
          </aside>
        </div>
      </div>

      {/* Deployment Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/95 backdrop-blur-2xl p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-blue-600 text-white rounded-[4rem] p-12 max-w-md w-full text-center relative overflow-hidden"
            >
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <ShieldCheck size={48} />
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none text-white">System <br/>Active</h2>
              <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-10 leading-relaxed">
                Examination {form.title} is now <br/> encrypted and staged for deployment.
              </p>
              <button 
                onClick={() => router.push('/instructors')}
                className="w-full py-5 bg-white text-blue-600 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
              >
                Back to Command Hub
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}