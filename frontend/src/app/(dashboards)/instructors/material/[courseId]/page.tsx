"use client";

import React, { useState, use, useRef } from "react";
import Link from "next/link";
import { 
  Image as ImageIcon, Send, ChevronLeft, X, Upload, Info, 
  CheckCircle2, Bold, Italic, Sigma, AlignLeft, AlignCenter, 
  AlignRight, ChevronDown, Minus, Plus, History as HistoryIcon 
} from "lucide-react";

// Categorized Symbols (40+)
const SYMBOLS = {
  Math: ["π", "∞", "Σ", "√", "∫", "≈", "≠", "±", "≤", "≥", "Δ", "∏", "θ", "ω", "τ"],
  Science: ["α", "β", "γ", "δ", "λ", "μ", "Ω", "℃", "℉", "→", "⇌", "ΔH", "ρ", "ψ", "κ"],
  Stats: ["μ", "σ", "ρ", "χ²", "n!", "P(A)", "x̄", "ŷ", "∈", "⊂", "∀", "∃", "∩", "∪"],
  General: ["©", "®", "™", "•", "§", "†", "‡", "¶", "«", "»"]
};

export default function InstructorPublishPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [content, setContent] = useState("");
  const [imageSize, setImageSize] = useState(300);
  
  const [isPreview, setIsPreview] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isSymbolOpen, setIsSymbolOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Formatting Logic with Text Selection Support
  const applyStyle = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    // If no text is selected, we use a placeholder so the user sees the effect
    const replacement = selectedText || "text";
    const newText = content.substring(0, start) + prefix + replacement + suffix + content.substring(end);
    
    setContent(newText);
    
    // Maintain focus and set selection back to the styled text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + replacement.length);
    }, 10);
  };

  const insertSymbol = (sym: string) => {
    applyStyle(sym);
    setIsSymbolOpen(false);
  };

  const extractImageUrl = () => {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 text-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        
        <Link href="/instructors/material" className="inline-flex items-center text-sm font-medium text-[#64748B] mb-8 group">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to Selection
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-3xl font-black tracking-tight">{courseCode} Editor</h1>
                <p className="text-[#64748B] mt-2 text-xs font-bold uppercase tracking-widest">Departmental Content Creator</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsPreview(!isPreview)} className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#E2E8F0] rounded-xl font-bold shadow-sm">
                  {isPreview ? "Edit Mode" : "Preview Material"}
                </button>
                <button onClick={() => setIsSuccessModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-[#035b77] text-white rounded-xl font-bold shadow-lg">
                  <Send size={18} /> Submit for Approval
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Main Topic Title" className="p-4 bg-white border border-[#E2E8F0] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#035b77]/20" />
              <input value={subTopic} onChange={(e) => setSubTopic(e.target.value)} placeholder="Sub-topic Name" className="p-4 bg-white border border-[#E2E8F0] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#035b77]/20" />
            </div>

            {!isPreview && (
              <div className="bg-[#1E293B] p-2 rounded-t-2xl flex flex-wrap gap-2 items-center border-b border-white/10 relative">
                <ToolbarBtn onClick={() => applyStyle("**", "**")} icon={<Bold size={18}/>} />
                <ToolbarBtn onClick={() => applyStyle("_", "_")} icon={<Italic size={18}/>} />
                <div className="h-6 w-[1px] bg-white/20 mx-1" />
                <ToolbarBtn onClick={() => applyStyle("<p align='left'>", "</p>")} icon={<AlignLeft size={18}/>} />
                <ToolbarBtn onClick={() => applyStyle("<p align='center'>", "</p>")} icon={<AlignCenter size={18}/>} />
                <ToolbarBtn onClick={() => applyStyle("<p align='right'>", "</p>")} icon={<AlignRight size={18}/>} />
                <div className="h-6 w-[1px] bg-white/20 mx-1" />
                
                <div className="relative">
                  <button onClick={() => setIsSymbolOpen(!isSymbolOpen)} className="p-2 text-white/70 hover:text-white flex items-center gap-1 bg-white/5 rounded-lg transition-colors">
                    <Sigma size={18} /> <ChevronDown size={14} />
                  </button>
                  {isSymbolOpen && (
                    <div className="absolute top-12 left-0 z-[100] bg-white shadow-2xl rounded-2xl p-4 w-72 border border-[#E2E8F0] max-h-[400px] overflow-y-auto">
                      {Object.entries(SYMBOLS).map(([category, syms]) => (
                        <div key={category} className="mb-4">
                          <p className="text-[10px] font-black uppercase text-gray-400 mb-2 border-b pb-1">{category}</p>
                          <div className="grid grid-cols-5 gap-1">
                            {syms.map(s => (
                              <button key={s} onClick={() => insertSymbol(s)} className="p-2 hover:bg-[#035b77] hover:text-white rounded-lg text-sm transition-colors">
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={() => setIsMediaModalOpen(true)} className="ml-auto flex items-center gap-2 px-4 py-1.5 bg-[#035b77] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#047194]">
                  <ImageIcon size={14} /> Add Image
                </button>
              </div>
            )}

            <div className="bg-white rounded-b-2xl border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[600px] flex flex-col md:flex-row">
              <div className={`p-8 flex-1 ${isPreview ? 'hidden' : 'block'}`}>
                <textarea 
                  ref={textareaRef} 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  className="w-full h-full min-h-[500px] focus:outline-none text-lg leading-[1.8] resize-none"
                  placeholder="Start typing or highlight text to style it..."
                />
              </div>

              <div className={`flex-1 bg-[#F8FAFC] border-l border-[#E2E8F0] p-8 ${isPreview ? 'w-full block' : 'hidden md:block w-[450px]'}`}>
                <h3 className="text-[10px] font-black uppercase text-[#64748B] mb-6 tracking-widest flex items-center gap-2">
                  <Info size={14} /> Live Component Rendering
                </h3>
                
                {extractImageUrl() && (
                  <div className="mb-8 p-6 bg-white rounded-3xl border border-[#E2E8F0] shadow-sm">
                    <label className="text-[10px] font-black text-[#035b77] mb-4 uppercase flex justify-between">
                      Image Scale <span>{imageSize}px</span>
                    </label>
                    <div className="flex items-center gap-4 mb-4">
                      <Minus size={16} className="text-gray-400" />
                      <input type="range" min="100" max="800" value={imageSize} onChange={(e) => setImageSize(parseInt(e.target.value))} className="flex-1 accent-[#035b77] cursor-pointer" />
                      <Plus size={16} className="text-gray-400" />
                    </div>
                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-[#F1F5F9] flex items-center justify-center p-2">
                       <img src={extractImageUrl()!} alt="Editor Preview" style={{ width: `${imageSize}px` }} className="transition-all duration-200 shadow-lg rounded-lg" />
                    </div>
                  </div>
                )}

                <div className="prose prose-slate max-w-none">
                  <h1 className="text-3xl font-black">{topic || "Untitled Topic"}</h1>
                  <h2 className="text-xl font-bold text-[#035b77] mb-6">{subTopic}</h2>
                  <div 
                    className="whitespace-pre-wrap text-gray-700 leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black uppercase">Insert Media</h2>
              <button onClick={() => setIsMediaModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => { applyStyle(`![New Image](https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800)`); setIsMediaModalOpen(false); }} className="p-8 border-2 border-dashed border-gray-200 rounded-3xl hover:border-[#035b77] hover:bg-gray-50 transition-all flex flex-col items-center gap-4">
                <Upload size={32} className="text-[#035b77]" /> 
                <span className="text-xs font-black uppercase">Device</span>
              </button>
              <button onClick={() => { applyStyle(`![Asset](https://images.unsplash.com/photo-1532187896946-ba93c525996b?w=800)`); setIsMediaModalOpen(false); }} className="p-8 border-2 border-dashed border-gray-200 rounded-3xl hover:border-[#035b77] hover:bg-gray-50 transition-all flex flex-col items-center gap-4">
                <HistoryIcon size={32} className="text-[#035b77]" /> 
                <span className="text-xs font-black uppercase">Recent</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#035b77]/20 backdrop-blur-xl p-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2">Material Sent!</h2>
            <p className="text-[#64748B] text-sm mb-8">The departmental workers will review and approve your submission shortly.</p>
            <button onClick={() => setIsSuccessModalOpen(false)} className="w-full py-4 bg-[#1E293B] text-white rounded-2xl font-bold shadow-lg hover:bg-black transition-all">Continue Editing</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarBtn({ icon, onClick }: { icon: React.ReactNode, onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
      {icon}
    </button>
  );
}