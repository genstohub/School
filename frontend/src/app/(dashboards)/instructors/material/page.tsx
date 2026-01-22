"use client";

import React, { useState } from "react";
import { 
  PlusCircle, 
  Image as ImageIcon, 
  Send, 
  Save, 
  Type, 
  List, 
  Eye,
  AlertCircle,
  ChevronLeft,
  X,
  Search,
  CheckCircle2,
  Upload
} from "lucide-react";

export default function InstructorPublishPage() {
  const [content, setContent] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [topic, setTopic] = useState("");
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Mock Data for Media Library
  const savedImages = [
    { id: 1, url: "/api/placeholder/150/150", name: "Structural_Stress_Diagram.png", date: "2024-01-10" },
    { id: 2, url: "/api/placeholder/150/150", name: "Bacterial_Growth_Curve.jpg", date: "2024-01-12" },
    { id: 3, url: "/api/placeholder/150/150", name: "Circuit_Logic_Gate.svg", date: "2024-01-15" },
    { id: 4, url: "/api/placeholder/150/150", name: "Supply_Chain_Flow.png", date: "2024-01-18" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 mt-10">
      <div className="max-w-5xl mx-auto">
        {/* Navigation & Header */}
        <button className="flex items-center text-sm text-[#64748B] hover:text-[#1E293B] mb-6 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Create Study Material</h1>
            <p className="text-[#64748B]">Draft your lecture notes and submit for departmental review.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-[#1E293B] font-medium hover:bg-gray-50 transition-all">
              <Save size={18} /> Save Draft
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-[#1E293B] text-white rounded-lg font-medium hover:bg-[#0F172A] transition-all shadow-sm">
              <Send size={18} /> Submit for Review
            </button>
          </div>
        </div>

        {/* Metadata Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1E293B] uppercase tracking-wider">Course Code</label>
            <select 
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1E293B] outline-none"
            >
              <option value="">Select Course</option>
              <option value="CSC201">CSC 201 - Computer Programming</option>
              <option value="MCB305">MCB 305 - Food Microbiology</option>
              <option value="CVE402">CVE 402 - Structural Design</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#1E293B] uppercase tracking-wider">Topic Title</label>
            <input 
              type="text"
              placeholder="e.g., Introduction to Heat Mass Transfer"
              className="w-full p-3 bg-white border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#1E293B] outline-none"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="bg-white border border-[#E2E8F0] border-b-0 rounded-t-2xl p-3 flex flex-wrap gap-2 items-center">
          <ToolbarButton icon={<Type size={18} />} label="Heading" />
          <ToolbarButton icon={<PlusCircle size={18} />} label="Bold" />
          <ToolbarButton icon={<List size={18} />} label="List" />
          <div className="w-px h-6 bg-gray-200 mx-2" />
          
          {/* Media Library Trigger */}
          <button 
            onClick={() => setIsMediaModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F5F9] text-[#1E293B] rounded-lg text-sm font-semibold hover:bg-[#E2E8F0] transition-all"
          >
            <ImageIcon size={18} /> Media Library
          </button>
          
          <div className="ml-auto flex gap-2">
            <button className="p-2 text-[#64748B] hover:text-[#1E293B]"><Eye size={20} /></button>
          </div>
        </div>

        {/* Main Writing Area */}
        <div className="relative">
          <textarea 
            className="w-full min-h-[500px] p-8 bg-white border border-[#E2E8F0] rounded-b-2xl focus:outline-none text-[#1E293B] leading-relaxed resize-none shadow-sm"
            placeholder="Start typing your academic material here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Media Library Modal */}
        {isMediaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-6 border-b flex justify-between items-center bg-[#F8FAFC]">
                <div>
                  <h2 className="text-xl font-bold text-[#0F172A]">Media Library</h2>
                  <p className="text-xs text-[#64748B]">Select or upload images for your course material</p>
                </div>
                <button onClick={() => setIsMediaModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <X size={20} className="text-[#64748B]" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Search saved images..." className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-[#1E293B]" />
                  </div>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1E293B] text-white rounded-lg font-medium hover:bg-[#0F172A]">
                    <Upload size={18} /> Upload New
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {savedImages.map((img) => (
                    <div key={img.id} className="group relative border rounded-xl overflow-hidden hover:border-[#1E293B] cursor-pointer transition-all">
                      <img src={img.url} alt={img.name} className="w-full h-32 object-cover" />
                      <div className="p-2 bg-white">
                        <p className="text-[10px] font-bold text-[#0F172A] truncate">{img.name}</p>
                        <p className="text-[8px] text-[#64748B]">{img.date}</p>
                      </div>
                      <div className="absolute inset-0 bg-[#1E293B]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="px-3 py-1 bg-white text-[#1E293B] text-xs font-bold rounded-full">Insert</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t bg-[#F8FAFC] flex justify-end">
                <button 
                  onClick={() => setIsMediaModalOpen(false)}
                  className="px-6 py-2 bg-[#1E293B] text-white rounded-lg text-sm font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="p-2 text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B] rounded-lg transition-all flex items-center gap-1">
      {icon}
      <span className="text-xs font-medium hidden sm:inline">{label}</span>
    </button>
  );
}