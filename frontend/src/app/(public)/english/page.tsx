"use client";

import React from "react";
import {
  GraduationCap,
  BookOpen,
  PenTool,
  Globe,
  Languages,
  Scroll,
  History,
  ShieldCheck,
  Search,
  MessageSquare
} from "lucide-react";

export default function EnglishLiteraturePage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">B.A. English Literature</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Developing elite communication skills and critical insight through the 
          study of global literatures, linguistics, and creative expression.
        </p>
      </div>

      {/* Core Curriculum Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<History className="w-8 h-8 text-[#1E293B]" />}
          title="Literary History"
          items={[
            "Old & Middle English Literature",
            "The Renaissance Period",
            "Victorian & Romantic Poetry",
            "Modern & Post-Modern Prose",
          ]}
        />
        <CourseCard
          icon={<Languages className="w-8 h-8 text-[#1E293B]" />}
          title="Linguistics"
          items={[
            "Introduction to Phonetics",
            "Syntax & Morphology",
            "Sociolinguistics",
            "History of the English Language",
          ]}
        />
        <CourseCard
          icon={<Globe className="w-8 h-8 text-[#1E293B]" />}
          title="World Literatures"
          items={[
            "African Oral Literature",
            "Post-Colonial Studies",
            "American & Caribbean Lit",
            "Commonwealth Literature",
          ]}
        />
        <CourseCard
          icon={<Scroll className="w-8 h-8 text-[#1E293B]" />}
          title="Drama & Theater"
          items={[
            "Shakespearean Studies",
            "Modern African Drama",
            "Greek & Classical Drama",
            "Dramatic Theory & Criticism",
          ]}
        />
        <CourseCard
          icon={<PenTool className="w-8 h-8 text-[#1E293B]" />}
          title="Writing & Criticism"
          items={[
            "Creative Writing Workshop",
            "Literary Theory & Criticism",
            "Advanced Composition",
            "Poetics and Rhetoric",
          ]}
        />
        <CourseCard
          icon={<Search className="w-8 h-8 text-[#1E293B]" />}
          title="Research & Media"
          items={[
            "Research Methodology",
            "Media & Communication",
            "Digital Humanities",
            "Gender in Literature",
          ]}
        />
      </div>

      {/* Career Pathways */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0]">
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6" /> Professional Outcomes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-lg border border-[#E2E8F0] shadow-sm">
            <h3 className="font-bold text-[#1E293B] mb-2">Media & Publishing</h3>
            <p className="text-sm text-[#64748B]">Editor, Journalist, Content Strategist, or Professional Critic.</p>
          </div>
          <div className="p-5 bg-white rounded-lg border border-[#E2E8F0] shadow-sm">
            <h3 className="font-bold text-[#1E293B] mb-2">Public Relations</h3>
            <p className="text-sm text-[#64748B]">Corporate Communication, Speech Writing, and Brand Storytelling.</p>
          </div>
          <div className="p-5 bg-white rounded-lg border border-[#E2E8F0] shadow-sm">
            <h3 className="font-bold text-[#1E293B] mb-2">Education & Law</h3>
            <p className="text-sm text-[#64748B]">Teaching, Academic Research, or transition into Legal Practice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] hover:border-[#1E293B] transition-all duration-300 shadow-sm flex flex-col group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#F8FAFC] rounded-lg group-hover:bg-[#1E293B] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-[#0F172A]">{title}</h3>
      </div>
      <ul className="list-disc ml-6 space-y-1 text-[#64748B] text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}