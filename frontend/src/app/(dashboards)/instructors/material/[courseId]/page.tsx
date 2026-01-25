"use client";

import React, { useState, use, useRef } from "react";
import Link from "next/link";
import { 
  PlusCircle, Image as ImageIcon, Send, Save, Type, 
  List, Eye, ChevronLeft, X, Search, Upload, Info,
  History, CheckCircle2, Clock, Heading1, Heading2, Layout
} from "lucide-react";

export default function InstructorPublishPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams?.courseId || "";
  const courseCode = courseId.toUpperCase();

  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper to insert Markdown syntax
  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 10);
  };

  const handlePreviewToggle = () => setIsPreview(!isPreview);

  const handleSubmitForReview = () => {
    setIsSubmitting(true);
    // Logic to send to 'Workers/Approvers' would go here
    setTimeout(() => {
      alert("Material submitted to workers for approval!");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 lg:pt-20 text-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        
        <Link href="/instructors/material" className="inline-flex items-center text-sm font-medium text-[#64748B] hover:text-[#1E293B] mb-8 group">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to Selection
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Header with Submit Logic */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{courseCode} Editor</h1>
                <p className="text-[#64748B] mt-2">Create high-quality study materials for approval.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handlePreviewToggle}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm border ${
                    isPreview ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-white border-[#E2E8F0]"
                  }`}
                >
                  <Eye size={18} /> {isPreview ? "Edit Mode" : "Preview"}
                </button>
                <button 
                  onClick={handleSubmitForReview}
                  disabled={isSubmitting || !content}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#035b77] text-white rounded-xl font-semibold hover:bg-[#024a61] disabled:opacity-50 transition-all shadow-lg"
                >
                  {isSubmitting ? "Submitting..." : <><Send size={18} /> Submit to Workers</>}
                </button>
              </div>
            </div>

            {/* Topic Input */}
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#64748B] block mb-2">Main Topic</label>
              <input 
                type="text"
                placeholder="Enter the main chapter or topic title..."
                className="w-full p-5 bg-white border border-[#E2E8F0] rounded-2xl text-xl font-bold outline-none focus:border-[#035b77] transition-all"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Notion-style Editor/Preview Area */}
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[600px]">
              {!isPreview && (
                <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-4 flex flex-wrap gap-2 items-center">
                  <button onClick={() => insertText("## ")} className="p-2 hover:bg-white rounded-lg flex items-center gap-1 text-xs font-bold uppercase"><Heading1 size={16}/> Sub-topic</button>
                  <button onClick={() => insertText("### ")} className="p-2 hover:bg-white rounded-lg flex items-center gap-1 text-xs font-bold uppercase"><Heading2 size={16}/> Section</button>
                  <button onClick={() => insertText("\n- ")} className="p-2 hover:bg-white rounded-lg"><List size={18}/></button>
                  <div className="h-6 w-[1px] bg-gray-300 mx-2" />
                  <button 
                    onClick={() => setIsMediaModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
                  >
                    <ImageIcon size={16} /> Add Image
                  </button>
                </div>
              )}

              <div className="p-10">
                {isPreview ? (
                  <div className="prose prose-slate max-w-none">
                    <h1 className="text-4xl font-black mb-6">{topic || "Untitled Topic"}</h1>
                    {/* Basic Markdown Parser simulation */}
                    <div className="whitespace-pre-wrap leading-relaxed text-lg text-gray-700">
                      {content || "No content to preview yet..."}
                    </div>
                  </div>
                ) : (
                  <textarea 
                    ref={textareaRef}
                    className="w-full min-h-[500px] focus:outline-none text-[#1E293B] text-lg leading-[1.8] resize-none"
                    placeholder="Use 'Sub-topic' button to organize your content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar with Guidelines */}
          <div className="lg:w-80 shrink-0">
             <div className="bg-[#1E293B] text-white rounded-3xl p-6 sticky top-24 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                   <Layout size={18} className="text-amber-400" />
                   <h3 className="font-bold text-xs uppercase tracking-widest">Submission Guide</h3>
                </div>
                <ul className="space-y-4 text-xs text-gray-300 leading-relaxed">
                  <li className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#035b77] flex items-center justify-center text-[10px] shrink-0">1</div>
                    <span>Define a clear <strong>Main Topic</strong> for the module.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#035b77] flex items-center justify-center text-[10px] shrink-0">2</div>
                    <span>Use <strong>Sub-topics</strong> (Heading 1) to break down complex ideas.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#035b77] flex items-center justify-center text-[10px] shrink-0">3</div>
                    <span>Insert images where diagrams are necessary.</span>
                  </li>
                </ul>
             </div>
          </div>
        </div>
      </div>

      {/* Media Modal - Same as before but with insert logic */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
           <div className="bg-white w-full max-w-4xl rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase tracking-tight">Departmental Assets</h2>
                <button onClick={() => setIsMediaModalOpen(false)} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"><X /></button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Mock data images */}
                {[1,2,3,4].map(i => (
                  <div 
                    key={i}
                    onClick={() => {
                        insertText(`\n![Diagram ${i}](https://images.unsplash.com/photo-1532187896946-ba93c525996b?w=400)\n`);
                        setIsMediaModalOpen(false);
                    }}
                    className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:ring-4 ring-[#035b77] transition-all"
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase">Asset {i}</div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold">Insert</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}