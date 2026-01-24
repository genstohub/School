"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  PlusCircle, Image as ImageIcon, Send, Save, Type, 
  List, Eye, ChevronLeft, X, Search, Upload, Info,
  History, CheckCircle2, Clock
} from "lucide-react";

export default function InstructorPublishPage({ params }: { params: { courseId: string } }) {
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  
  const courseCode = params.courseId.toUpperCase();

  // Mock data for existing topics in this specific course
  const existingTopics = [
    { id: 1, title: "Course Introduction", status: "Published", date: "Jan 12" },
    { id: 2, title: "Fundamental Concepts", status: "Under Review", date: "Jan 15" },
    { id: 3, title: "Advanced Methodology", status: "Draft", date: "Jan 18" },
  ];

  const savedImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1532187896946-ba93c525996b?q=80&w=200&auto=format&fit=crop", name: "Lab_Sample_A.png" },
    { id: 2, url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=200&auto=format&fit=crop", name: "DNA_Structure.jpg" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 lg:pt-20 text-[#0F172A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <Link href="/instructor/material" className="inline-flex items-center text-sm font-medium text-[#64748B] hover:text-[#1E293B] mb-8 group transition-colors">
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to Course Selection
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Editor Column (Left) */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Material for {courseCode}</h1>
                <p className="text-[#64748B] mt-2">Drafting academic content for departmental review.</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm">
                  <Save size={18} /> Save Draft
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1E293B] text-white rounded-xl font-semibold hover:bg-[#0F172A] transition-all shadow-lg">
                  <Send size={18} /> Submit
                </button>
              </div>
            </div>

            <div className="mb-8">
              <label className="text-xs font-bold uppercase tracking-widest text-[#1E293B] block mb-2">Topic Title</label>
              <input 
                type="text"
                placeholder="e.g. Introduction to Organic Synthesis"
                className="w-full p-4 bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1E293B]/10 outline-none transition-all"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-3 flex flex-wrap gap-1 items-center">
                <ToolbarButton icon={<Type size={18} />} label="Text" />
                <ToolbarButton icon={<List size={18} />} label="List" />
                <button 
                  onClick={() => setIsMediaModalOpen(true)}
                  className="ml-4 flex items-center gap-2 px-4 py-1.5 bg-[#1E293B] text-white rounded-lg text-sm font-semibold hover:bg-blue-900 transition-all shadow-sm"
                >
                  <ImageIcon size={16} /> Insert Media
                </button>
              </div>

              <div className="relative group">
                <textarea 
                  className="w-full min-h-[500px] p-10 bg-white focus:outline-none text-[#1E293B] text-lg leading-[1.8] resize-none"
                  placeholder="Start typing your study material..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="absolute bottom-6 right-8 flex items-center gap-2 bg-[#F1F5F9]/80 backdrop-blur-md border border-[#E2E8F0] px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                  <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Drafting Mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* Topics Sidebar (Right) */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <History size={18} className="text-[#64748B]" />
                <h3 className="font-bold text-sm uppercase tracking-wider">Course Progress</h3>
              </div>
              
              <div className="space-y-4">
                {existingTopics.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl border border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors cursor-default">
                    <p className="text-xs font-bold text-[#1E293B] mb-1 line-clamp-1">{t.title}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        t.status === 'Published' ? 'bg-green-100 text-green-700' : 
                        t.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {t.status}
                      </span>
                      <span className="text-[9px] text-[#94A3B8] font-medium">{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#F1F5F9]">
                <div className="flex gap-3 items-start">
                  <Info size={16} className="text-[#64748B] shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-[#64748B]">
                    Ensure your content follows the departmental guidelines for <strong>{courseCode}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Media Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
           <div className="bg-white w-full max-w-4xl rounded-3xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Media Library</h2>
                <button onClick={() => setIsMediaModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {savedImages.map(img => (
                  <div key={img.id} className="group relative border rounded-xl p-2 cursor-pointer hover:border-black transition-all">
                    <img src={img.url} className="h-32 w-full object-cover rounded-lg mb-2" alt="" />
                    <p className="text-xs font-bold truncate">{img.name}</p>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                        <span className="text-white text-[10px] font-bold px-3 py-1 border border-white rounded-full">Insert</span>
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

function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="p-2 text-[#64748B] hover:bg-white hover:text-[#1E293B] rounded-lg transition-all flex items-center gap-2">
      {icon} <span className="text-[11px] font-bold uppercase hidden sm:inline">{label}</span>
    </button>
  );
}