"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  PlusCircle, 
  Image as ImageIcon, 
  Send, 
  Save, 
  Type, 
  List, 
  Eye,
  ChevronLeft,
  X,
  Search,
  Upload,
  Info
} from "lucide-react";

export default function InstructorPublishPage() {
  const [content, setContent] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [topic, setTopic] = useState("");
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Mock Data for Media Library
  const savedImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1532187896946-ba93c525996b?q=80&w=200&auto=format&fit=crop", name: "Lab_Sample_A.png", date: "20 Jan 2026" },
    { id: 2, url: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=200&auto=format&fit=crop", name: "DNA_Structure.jpg", date: "18 Jan 2026" },
    { id: 3, url: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=200&auto=format&fit=crop", name: "Chemical_Equation.svg", date: "15 Jan 2026" },
    { id: 4, url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&auto=format&fit=crop", name: "Supply_Chain_Chart.png", date: "12 Jan 2026" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 lg:pt-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/instructor" 
          className="inline-flex items-center text-sm font-medium text-[#64748B] hover:text-[#1E293B] mb-8 transition-colors group"
        >
          <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </Link>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Create Study Material</h1>
            <p className="text-[#64748B] mt-2">Draft high-quality content for student review and learning.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-[#1E293B] font-semibold hover:bg-gray-50 transition-all shadow-sm">
              <Save size={18} /> Save Draft
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1E293B] text-white rounded-xl font-semibold hover:bg-[#0F172A] transition-all shadow-lg shadow-blue-900/10">
              <Send size={18} /> Submit for Review
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1E293B] uppercase tracking-widest">Course Code</label>
            <select 
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full p-3.5 bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1E293B]/10 focus:border-[#1E293B] outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Select a course code...</option>
              <option value="CSC201">CSC 201 - Programming Logic</option>
              <option value="MCB305">MCB 305 - Industrial Microbiology</option>
              <option value="CVE402">CVE 402 - Soil Mechanics</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1E293B] uppercase tracking-widest">Topic Title</label>
            <input 
              type="text"
              placeholder="Enter the specific topic title..."
              className="w-full p-3.5 bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1E293B]/10 focus:border-[#1E293B] outline-none transition-all"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>

        {/* Professional Editor Container */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          {/* Editor Toolbar */}
          <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] p-3 flex flex-wrap gap-1 items-center">
            <ToolbarButton icon={<Type size={18} />} label="Text" />
            <ToolbarButton icon={<PlusCircle size={18} />} label="Bold" />
            <ToolbarButton icon={<List size={18} />} label="Bullet List" />
            <div className="w-px h-6 bg-[#E2E8F0] mx-2" />
            
            <button 
              onClick={() => setIsMediaModalOpen(true)}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#1E293B] text-white rounded-lg text-sm font-semibold hover:bg-blue-900 transition-all shadow-sm"
            >
              <ImageIcon size={16} /> Insert Media
            </button>
            
            <div className="ml-auto flex gap-2">
              <button className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-white rounded-lg transition-all" title="Preview Mode">
                <Eye size={20} />
              </button>
            </div>
          </div>

          {/* Textarea Wrapper */}
          <div className="relative group">
            <textarea 
              className="w-full min-h-137.5 p-10 bg-white focus:outline-none text-[#1E293B] text-lg leading-[1.8] resize-none"
              placeholder="Begin writing your academic material here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {/* Real-time Status Floating Label */}
            <div className="absolute bottom-6 right-8 flex items-center gap-2 bg-[#F1F5F9]/80 backdrop-blur-md border border-[#E2E8F0] px-4 py-2 rounded-full pointer-events-none">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">Drafting Mode</span>
            </div>
          </div>
        </div>

        {/* Quality Assurance Note */}
        <div className="mt-8 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl flex gap-4 items-start">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Info size={20} />
          </div>
          <div className="text-sm text-blue-900/80 leading-relaxed">
            <span className="font-bold block text-blue-950 mb-1">Quality Assurance Standards</span>
            Your material will be queued for <strong>Workers&apos; Review</strong> immediately after submission. Ensure all images inserted are clear and data citations are accurate to avoid rejection.
          </div>
        </div>
      </div>

      {/* Media Library Modal */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-6 border-b flex justify-between items-center bg-[#F8FAFC]">
              <div>
                <h2 className="text-xl font-bold text-[#0F172A]">Academic Media Library</h2>
                <p className="text-xs text-[#64748B] mt-1">Select diagrams, charts, or lab results to embed.</p>
              </div>
              <button onClick={() => setIsMediaModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-[#64748B]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" placeholder="Search by image name or date..." className="w-full pl-11 pr-4 py-3 border border-[#E2E8F0] rounded-xl outline-none focus:ring-2 focus:ring-[#1E293B]/5 transition-all" />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F1F5F9] text-[#1E293B] rounded-xl font-bold hover:bg-[#E2E8F0] transition-all">
                  <Upload size={18} /> Upload New
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {savedImages.map((img) => (
                  <div key={img.id} className="group relative border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#1E293B] cursor-pointer transition-all hover:shadow-md bg-white">
                    <img src={img.url} alt={img.name} className="w-full h-36 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <div className="p-3">
                      <p className="text-[11px] font-bold text-[#0F172A] truncate">{img.name}</p>
                      <p className="text-[9px] text-[#64748B] uppercase font-medium mt-0.5">{img.date}</p>
                    </div>
                    <div className="absolute inset-0 bg-[#0F172A]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-5 py-2 bg-white text-[#0F172A] text-xs font-bold rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform">Insert Into Page</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 border-t bg-[#F8FAFC] flex justify-end">
              <button onClick={() => setIsMediaModalOpen(false)} className="px-8 py-2.5 bg-[#1E293B] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/10">Close Library</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="p-2 text-[#64748B] hover:bg-white hover:text-[#1E293B] rounded-lg transition-all flex items-center gap-2 group">
      <span className="opacity-70 group-hover:opacity-100">{icon}</span>
      <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline">{label}</span>
    </button>
  );
}