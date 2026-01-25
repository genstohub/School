"use client";

import React, { useState, use, useRef } from "react";
import Link from "next/link";
import { 
  PlusCircle, Image as ImageIcon, Send, Save, Type, 
  List, Eye, ChevronLeft, X, Search, Upload, Info,
  History, CheckCircle2, Clock, Heading1, Heading2, Layout,
  Bold, Italic, Type as FontIcon, Sigma, Check
} from "lucide-react";

export default function InstructorPublishPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams?.courseId || "";
  const courseCode = courseId.toUpperCase();

  // Content States
  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [content, setContent] = useState("");
  
  // UI States
  const [isPreview, setIsPreview] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Formatting Logic
  const applyStyle = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);
    
    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 10);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to S3/Cloudinary here
      const fakeUrl = URL.createObjectURL(file);
      applyStyle(`\n![${file.name}](${fakeUrl})\n`);
      setIsMediaModalOpen(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#a0aebc] p-4 md:p-10 lg:pt-20 text-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        
        <Link href="/instructors/material" className="inline-flex items-center text-sm font-medium text-[#64748B] hover:text-[#1E293B] mb-8 group transition-colors">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to Selection
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{courseCode} Workspace</h1>
                <p className="text-[#64748B] mt-2 text-sm uppercase font-semibold tracking-wider">Status: Drafting</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsPreview(!isPreview)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm border ${
                    isPreview ? "bg-[#035b77] text-white border-[#035b77]" : "bg-white border-[#E2E8F0] text-[#64748B]"
                  }`}
                >
                  {isPreview ? <><Type size={18} /> Edit Content</> : <><Eye size={18} /> Live Preview</>}
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={!content || !topic}
                  className="flex items-center gap-2 px-8 py-2.5 bg-[#1E293B] text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg disabled:opacity-30"
                >
                  {isSubmitting ? "Processing..." : "Submit to Workers"}
                </button>
              </div>
            </div>

            {/* Structured Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[#64748B]">Main Topic Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Chapter 1: Thermodynamics"
                  className="w-full p-4 bg-white border border-[#E2E8F0] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#035b77]/20 transition-all"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[#64748B]">Current Sub-Topic</label>
                <input 
                  type="text"
                  placeholder="e.g. 1.2 Entropy and Energy"
                  className="w-full p-4 bg-white border border-[#E2E8F0] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#035b77]/20 transition-all"
                  value={subTopic}
                  onChange={(e) => setSubTopic(e.target.value)}
                />
              </div>
            </div>

            {/* Formatting Toolbar */}
            {!isPreview && (
              <div className="bg-[#1E293B] p-2 rounded-t-2xl flex flex-wrap gap-1 items-center border-b border-white/10">
                <ToolbarBtn onClick={() => applyStyle("**", "**")} icon={<Bold size={16}/>} />
                <ToolbarBtn onClick={() => applyStyle("_", "_")} icon={<Italic size={16}/>} />
                <div className="h-4 w-[1px] bg-white/20 mx-1" />
                <ToolbarBtn onClick={() => applyStyle("\n# ")} icon={<Heading1 size={16}/>} label="H1" />
                <ToolbarBtn onClick={() => applyStyle("\n## ")} icon={<Heading2 size={16}/>} label="H2" />
                <div className="h-4 w-[1px] bg-white/20 mx-1" />
                <ToolbarBtn onClick={() => applyStyle("\n- ")} icon={<List size={16}/>} />
                <ToolbarBtn onClick={() => applyStyle("α")} icon={<Sigma size={16}/>} label="Symbol" />
                
                <button 
                  onClick={() => setIsMediaModalOpen(true)}
                  className="ml-auto flex items-center gap-2 px-4 py-1.5 bg-[#035b77] text-white rounded-lg text-[10px] font-black uppercase hover:bg-[#047194] transition-all"
                >
                  <ImageIcon size={14} /> Insert Asset
                </button>
              </div>
            )}

            <div className={`bg-white rounded-b-2xl border border-[#E2E8F0] shadow-sm min-h-[500px] ${isPreview ? 'rounded-t-2xl' : ''}`}>
              <div className="p-8 md:p-12">
                {isPreview ? (
                  <div className="prose prose-slate max-w-none">
                    <span className="text-[#035b77] font-black uppercase tracking-widest text-xs">{topic}</span>
                    <h1 className="text-4xl font-black mt-2 mb-4">{subTopic || "Untitled Sub-topic"}</h1>
                    <div className="h-1 w-20 bg-[#035b77] mb-10" />
                    <div className="whitespace-pre-wrap text-lg leading-relaxed text-[#334155]">{content}</div>
                  </div>
                ) : (
                  <textarea 
                    ref={textareaRef}
                    className="w-full min-h-[500px] focus:outline-none text-[#1E293B] text-lg leading-[2] resize-none"
                    placeholder="Draft your material here using the toolbar..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0">
             <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sticky top-24 shadow-sm">
                <h3 className="font-black text-xs uppercase tracking-widest text-[#64748B] mb-6 flex items-center gap-2">
                  <Info size={16}/> Quick Symbols
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {['π', 'Ω', 'μ', 'θ', '±', '≠', '≈', '∞'].map(sym => (
                    <button 
                      key={sym} 
                      onClick={() => applyStyle(sym)}
                      className="p-3 bg-[#F8FAFC] hover:bg-[#035b77] hover:text-white rounded-xl text-sm font-bold transition-all"
                    >
                      {sym}
                    </button>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Media Management Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
           <div className="bg-white w-full max-w-3xl rounded-[2.5rem] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-black">Add Media Asset</h2>
                <button onClick={() => setIsMediaModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-[#E2E8F0] rounded-3xl p-10 flex flex-col items-center justify-center gap-4 hover:border-[#035b77] hover:bg-[#F8FAFC] cursor-pointer transition-all group"
                >
                  <div className="w-16 h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="text-[#035b77]" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Upload from Device</p>
                    <p className="text-xs text-[#64748B]">PNG, JPG up to 10MB</p>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                </div>

                <div className="bg-[#F8FAFC] rounded-3xl p-6">
                  <p className="text-xs font-black uppercase text-[#64748B] mb-4">Library Assets</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2].map(i => (
                      <div 
                        key={i} 
                        onClick={() => { applyStyle(`\n![Lib-${i}](https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400)\n`); setIsMediaModalOpen(false); }}
                        className="aspect-square bg-white rounded-xl border border-[#E2E8F0] overflow-hidden cursor-pointer hover:ring-2 ring-[#035b77]"
                      >
                         <div className="h-full w-full bg-gray-200 animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
           </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#035b77]/20 backdrop-blur-xl p-4">
          <div className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-black mb-2">Submission Successful!</h2>
            <p className="text-[#64748B] text-sm mb-8">Your material has been sent to the review team for final approval.</p>
            <button 
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-4 bg-[#1E293B] text-white rounded-2xl font-bold hover:bg-black transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarBtn({ icon, label, onClick }: { icon: React.ReactNode, label?: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2 transition-all">
      {icon} {label && <span className="text-[10px] font-black tracking-widest">{label}</span>}
    </button>
  );
}