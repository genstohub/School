"use client";

import React, { useState, use, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Image as ImageIcon, Send, ChevronLeft, X, Upload, Info, 
  CheckCircle2, Bold, Italic, Sigma, AlignLeft, AlignCenter, 
  AlignRight, ChevronDown, Minus, Plus, History as HistoryIcon,
  ListIcon, FunctionSquare
} from "lucide-react";

const SYMBOLS = {
  Calculus: ["∫", "∬", "∭", "∮", "∇", "∂", "dx", "dy", "dt", "∆", "ε", "δ", "lim", "→", "∞", "f'", "f''"],
  Math: ["π", "Σ", "√", "≈", "≠", "±", "≤", "≥", "Δ", "∏", "θ", "ω", "τ", "∠", "∝", "≡"],
  Science: ["α", "β", "γ", "λ", "μ", "Ω", "℃", "℉", "⇌", "ΔH", "ρ", "ψ", "κ", "Å", "ν", "σ", "ζ", "χ"],
  Stats: ["μ", "σ", "ρ", "χ²", "n!", "P(A)", "x̄", "ŷ", "∈", "⊂", "∀", "∃", "∩", "∪", "¬", "∧", "∨", "⊕", "⇒", "⇔"],
  Operators: ["+", "-", "=", "×", "÷", "/", "_", "^", "{", "}", "[", "]", "|", "~", "¬", "±", "∓", "∗", "∘", "∙", ">", "<"],
  General: ["©", "®", "™", "•", "§", "†", "‡", "¶", "«", "»", "“", "”", "‘", "’"]
};

export default function InstructorPublishPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [content, setContent] = useState("");
  const [imageSize, setImageSize] = useState(300);
  const [toc, setToc] = useState<string[]>([]);
  
  const [isPreview, setIsPreview] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isSymbolOpen, setIsSymbolOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const lines = content.split('\n');
    const headers = lines
      .filter(line => line.startsWith('# '))
      .map(line => line.replace('# ', ''));
    setToc(headers);
  }, [content]);

  // Clears the form after submission
  const clearForm = () => {
    setTopic("");
    setSubTopic("");
    setContent("");
    setImageSize(300);
    setIsSuccessModalOpen(false);
  };

  const applyStyle = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = selectedText || "text";
    const newText = content.substring(0, start) + prefix + replacement + suffix + content.substring(end);
    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + replacement.length);
    }, 10);
  };

  const handleDeviceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      applyStyle(`\n![${file.name}](${imageUrl})\n`);
      setIsMediaModalOpen(false);
    }
  };

  const parseContent = (text: string) => {
    // We remove markdown image syntax from the HTML view to prevent link leakage
    const cleanedText = text.replace(/!\[.*?\]\((.*?)\)/g, '');
    
    return cleanedText
      .replace(/# (.*?)(\n|$)/g, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-2">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/_(.*?)_/g, '<i>$1</i>')
      .replace(/\$(.*?)\$/g, '<code class="bg-blue-50 text-blue-700 px-1 rounded font-mono">$1</code>')
      .replace(/\n/g, '<br/>')
      .replace(/<p align='(.*?)'>(.*?)<\/p>/g, '<div style="text-align:$1">$2</div>');
  };

  const extractImageUrl = () => {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-[#14314e] rounded-2xl p-4 md:p-10 text-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        <Link href="/instructors/material" className="inline-flex items-center text-sm font-medium text-[#64748B] mb-8 group transition-colors">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to Selection
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-3xl font-black tracking-tight">{courseCode} Pro Editor</h1>
                <p className="text-[#64748B] mt-2 text-xs font-bold uppercase tracking-widest tracking-[0.2em]">Academic Content Environment</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsPreview(!isPreview)} className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#E2E8F0] rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all">
                   {isPreview ? "Resume Writing" : "Full Preview"}
                </button>
                <button onClick={() => setIsSuccessModalOpen(true)} className="flex items-center gap-2 px-6 py-2.5 bg-[#035b77] text-white rounded-xl font-bold shadow-lg hover:shadow-cyan-900/20 transition-all">
                  <Send size={18} /> Publish
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Primary Topic Title" className="p-4 bg-white border border-[#E2E8F0] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#035b77]/20" />
              <input value={subTopic} onChange={(e) => setSubTopic(e.target.value)} placeholder="Sub-module Title" className="p-4 bg-white border border-[#E2E8F0] rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#035b77]/20" />
            </div>

            {!isPreview && (
              <div className="bg-[#1E293B] p-2 rounded-t-2xl flex flex-wrap gap-2 items-center border-b border-white/10 relative">
                <ToolbarBtn onClick={() => applyStyle("**", "**")} icon={<Bold size={18}/>} title="Bold" />
                <ToolbarBtn onClick={() => applyStyle("_", "_")} icon={<Italic size={18}/>} title="Italic" />
                <div className="h-6 w-[1px] bg-white/20 mx-1" />
                <ToolbarBtn onClick={() => applyStyle("# ", "")} icon={<ListIcon size={18}/>} title="Header" />
                <ToolbarBtn onClick={() => applyStyle("$", "$")} icon={<FunctionSquare size={18}/>} title="Formula" />
                <div className="h-6 w-[1px] bg-white/20 mx-1" />
                <ToolbarBtn onClick={() => applyStyle("<p align='left'>", "</p>")} icon={<AlignLeft size={18}/>} />
                <ToolbarBtn onClick={() => applyStyle("<p align='center'>", "</p>")} icon={<AlignCenter size={18}/>} />
                <ToolbarBtn onClick={() => applyStyle("<p align='right'>", "</p>")} icon={<AlignRight size={18}/>} />
                
                <div className="relative">
                  <button onClick={() => setIsSymbolOpen(!isSymbolOpen)} className="p-2 text-white/70 hover:text-white flex items-center gap-1 bg-white/5 rounded-lg transition-colors">
                    <Sigma size={18} /> <ChevronDown size={14} />
                  </button>
                  {isSymbolOpen && (
                    <div className="absolute top-12 left-0 z-[100] bg-white shadow-2xl rounded-2xl p-5 w-80 border border-[#E2E8F0] max-h-[450px] overflow-y-auto">
                      {Object.entries(SYMBOLS).map(([category, syms]) => (
                        <div key={category} className="mb-4">
                          <p className="text-[10px] font-black uppercase text-[#035b77] mb-2 tracking-tighter border-b border-gray-100 pb-1">{category}</p>
                          <div className="grid grid-cols-6 gap-1">
                            {syms.map(s => (
                              <button key={s} onClick={() => { applyStyle(s); setIsSymbolOpen(false); }} className="p-2 hover:bg-gray-100 rounded-lg text-sm transition-colors text-gray-800 font-medium">
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
                  <ImageIcon size={14} /> Add Asset
                </button>
              </div>
            )}

            <div className="bg-white rounded-b-2xl border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[650px] flex flex-col md:flex-row">
              {/* Writer Panel */}
              <div className={`p-8 flex-1 ${isPreview ? 'hidden' : 'block'}`}>
                <textarea 
                  ref={textareaRef} 
                  value={content} 
                  onChange={(e) => setContent(e.target.value)} 
                  className="w-full h-full min-h-[500px] focus:outline-none text-lg leading-[1.9] resize-none text-gray-800 font-serif"
                  placeholder="Start writing academic material..."
                />
              </div>

              {/* Preview Panel */}
              <div className={`flex-1 bg-[#F8FAFC] border-l border-[#E2E8F0] p-8 overflow-y-auto ${isPreview ? 'w-full block' : 'hidden md:block w-[480px]'}`}>
                {/* ToC and Image Resizer ONLY visible during writing/split-mode */}
                {!isPreview && (
                  <>
                    {toc.length > 0 && (
                      <div className="mb-6 p-4 bg-white rounded-xl border border-[#E2E8F0] border-l-4 border-l-[#035b77]">
                        <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Live Outline</h4>
                        <ul className="space-y-1">
                          {toc.map((item, i) => (
                            <li key={i} className="text-xs font-bold text-[#035b77] truncate">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {extractImageUrl() && (
                      <div className="mb-8 p-4 bg-white rounded-xl border border-[#E2E8F0]">
                         <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black text-[#035b77] uppercase">Scaling Engine</span>
                          <span className="text-[10px] font-bold text-gray-400">{imageSize}px</span>
                        </div>
                        <input type="range" min="150" max="1000" value={imageSize} onChange={(e) => setImageSize(parseInt(e.target.value))} className="w-full accent-[#035b77] mb-2" />
                      </div>
                    )}
                  </>
                )}

                {/* Final Rendered Content */}
                <div className="prose prose-slate max-w-none">
                  <h1 className="text-4xl font-black mb-1">{topic || "Draft Material"}</h1>
                  <h2 className="text-lg font-bold text-[#035b77]/60 mb-8 tracking-tight">{subTopic}</h2>
                  
                  {/* Image Render - Link is never shown as text */}
                  {extractImageUrl() && (
                    <div className="mb-6 flex justify-center">
                      <img src={extractImageUrl()!} alt="Asset" style={{ width: `${imageSize}px` }} className="rounded-xl shadow-md border border-gray-100" />
                    </div>
                  )}

                  <div 
                    className="text-gray-700 leading-relaxed text-lg" 
                    dangerouslySetInnerHTML={{ __html: parseContent(content) }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Device Upload */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-gray-900">ATTACH IMAGE</h2>
              <button onClick={() => setIsMediaModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X /></button>
            </div>
            <button onClick={() => fileInputRef.current?.click()} className="w-full p-16 border-2 border-dashed border-gray-100 rounded-3xl hover:border-[#035b77] hover:bg-blue-50/50 transition-all flex flex-col items-center gap-4 group">
              <Upload size={32} className="text-gray-300 group-hover:text-[#035b77]" /> 
              <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-[#035b77]">Select from Device</span>
            </button>
            <input type="file" ref={fileInputRef} onChange={handleDeviceUpload} className="hidden" accept="image/*" />
          </div>
        </div>
      )}

      {/* Submission Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#035b77]/10 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] p-12 max-w-sm w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-black mb-2">Published!</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">Content has been saved and forms cleared for your next entry.</p>
            <button onClick={clearForm} className="w-full py-4 bg-[#035b77] text-white rounded-2xl font-bold shadow-lg hover:bg-black transition-all">Start New Topic</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarBtn({ icon, onClick, title }: { icon: React.ReactNode, onClick: () => void, title?: string }) {
  return (
    <button onClick={onClick} title={title} className="p-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all">
      {icon}
    </button>
  );
}