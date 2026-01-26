"use client";

import React, { useState, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, Sparkles, FileText, Save, 
  Type, ListOrdered, Quote, BookOpen,
  Layers, Zap, Hash, CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function SummaryCreationPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  // Content State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Stats Logic
  const wordCount = useMemo(() => content.trim().split(/\s+/).filter(Boolean).length, [content]);
  const readingTime = useMemo(() => Math.ceil(wordCount / 200), [wordCount]);

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim() && tags.length < 5) {
      setTags([...tags, currentTag.trim().toUpperCase()]);
      setCurrentTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <main className="min-h-screen bg-[#050505] rounded-3xl text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link href="/instructors/material" className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-500 mb-10 group transition-colors">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Hub</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Editor (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <header className="border-l-4 border-cyan-500 pl-6">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                Content <span className="text-cyan-500">Editor</span>
              </h1>
              <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] mt-2 uppercase">
                Generating Summary for {courseCode}
              </p>
            </header>

            <div className="bg-[#0A0A0A] border border-gray-800 rounded-[2.5rem] overflow-hidden focus-within:border-cyan-500/50 transition-all">
              {/* Toolbar */}
              <div className="flex items-center gap-4 p-4 border-b border-gray-800 bg-gray-900/20">
                <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"><Type size={18}/></button>
                <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"><ListOrdered size={18}/></button>
                <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"><Quote size={18}/></button>
                <div className="h-6 w-[1px] bg-gray-800 mx-2" />
                <button className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 text-cyan-500 rounded-lg hover:bg-cyan-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-tighter">
                  <Sparkles size={14} /> AI Enhance
                </button>
              </div>

              <div className="p-8 space-y-6">
                <input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summary Title (e.g. Week 4: The Laws of Thermodynamics)"
                  className="w-full bg-transparent text-3xl font-black outline-none placeholder:text-gray-800 tracking-tight"
                />
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start typing the core takeaways..."
                  className="w-full bg-transparent text-gray-300 text-lg leading-relaxed outline-none min-h-[400px] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right: Metadata & Stats (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tag System */}
            <div className="bg-[#0A0A0A] border border-gray-800 rounded-[2rem] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Hash className="text-cyan-500" size={16} />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Core Concepts</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <AnimatePresence>
                  {tags.map((tag, i) => (
                    <motion.span 
                      key={tag}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="bg-gray-900 text-[10px] font-black px-3 py-1.5 rounded-lg border border-gray-800 flex items-center gap-2"
                    >
                      {tag}
                      <button onClick={() => removeTag(i)} className="hover:text-red-500">×</button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              <input 
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={addTag}
                placeholder="Add keyword + Enter"
                className="w-full bg-black border border-gray-800 p-4 rounded-xl text-xs font-bold outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            {/* Reading Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl p-6">
                <Layers className="text-cyan-500 mb-2" size={20} />
                <p className="text-[9px] font-black text-gray-500 uppercase">Words</p>
                <p className="text-2xl font-black">{wordCount}</p>
              </div>
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl p-6">
                <Zap className="text-cyan-500 mb-2" size={20} />
                <p className="text-[9px] font-black text-gray-500 uppercase">Est. Read</p>
                <p className="text-2xl font-black">{readingTime}m</p>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem] space-y-4">
               <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Quality Checklist</h4>
               <ul className="space-y-3">
                 {[
                   { text: "Includes Learning Objectives", met: content.length > 50 },
                   { text: "Concise & Scannable", met: wordCount < 1000 },
                   { text: "Core Keywords Tagged", met: tags.length >= 2 }
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-tight">
                     <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${item.met ? "bg-cyan-500 border-cyan-500 text-black" : "border-gray-700"}`}>
                       {item.met && <CheckCircle2 size={10} />}
                     </div>
                     <span className={item.met ? "text-gray-200" : "text-gray-600"}>{item.text}</span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Action */}
            <button 
              onClick={() => setIsSuccess(true)}
              disabled={!content || !title}
              className="w-full py-6 bg-cyan-500 text-black rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              Publish Summary
            </button>
          </div>

        </div>
      </div>

      {/* Modern Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/95 backdrop-blur-2xl p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white text-gray-950 rounded-[4rem] p-12 max-w-lg w-full text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <BookOpen size={48} />
              </div>
              <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none">Summary <br/>Archived</h2>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-10 leading-relaxed">
                Topic: {title} <br/>
                Reading Time: ~{readingTime} minutes
              </p>
              <div className="flex flex-col gap-3">
                <button onClick={() => { setIsSuccess(false); setTitle(""); setContent(""); setTags([]); }} className="w-full py-5 bg-gray-950 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-black transition-all">
                  Create New Summary
                </button>
                <button onClick={() => router.push('/instructors/material')} className="w-full py-5 text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-black">
                  Exit to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}