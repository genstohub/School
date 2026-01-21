"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Briefcase,
  BookOpen,
  Binary,
  TrendingUp,
  Settings,
  BarChart3,
  HardHat,
  Zap,
  Microscope,
  FlaskConical,
  Utensils,
  Target,
  Library,
  Calculator,
  Scale,
  GraduationCap,
  ChevronRight,
  Search,
  X
} from "lucide-react";

const programs = [
  {
    title: "B.Sc Computer Science",
    icon: <Cpu size={24} />,
    description: "Learn algorithms, programming, and cutting-edge technology to build the future of computing.",
    href: "/computer",
  },
  {
    title: "B.Sc Business Administration",
    icon: <Briefcase size={24} />,
    description: "Gain management, finance, and leadership skills to succeed in the business world.",
    href: "/business-admin",
  },
  {
    title: "B.Eng Mechanical Engineering",
    icon: <Settings size={24} />,
    description: "Design, build, and innovate machines and structures that power industries.",
    href: "/mechanical",
  },
  {
    title: "B.Eng Civil Engineering",
    icon: <HardHat size={24} />,
    description: "Build sustainable infrastructure, from bridges to smart cities and transport systems.",
    href: "/civil",
  },
  {
    title: "B.Eng Electrical Engineering",
    icon: <Zap size={24} />,
    description: "Master power systems, electronics, and telecommunications for a digital age.",
    href: "/electrical",
  },
  {
    title: "B.Sc Microbiology",
    icon: <Microscope size={24} />,
    description: "Study microorganisms to solve challenges in health, agriculture, and environment.",
    href: "/microbiology",
  },
  {
    title: "B.Sc Biochemistry",
    icon: <FlaskConical size={24} />,
    description: "Explore the chemical processes within living organisms at a molecular level.",
    href: "/biochemistry",
  },
  {
    title: "B.Sc Food Science & Tech",
    icon: <Utensils size={24} />,
    description: "Apply science to improve food safety, preservation, and nutritional quality.",
    href: "/food-science",
  },
  {
    title: "B.Sc Economics",
    icon: <TrendingUp size={24} />,
    description: "Analyze market trends, public policy, and global financial resource allocation.",
    href: "/economics",
  },
  {
    title: "B.Sc Accounting",
    icon: <Calculator size={24} />,
    description: "Master financial reporting, auditing, and taxation for corporate excellence.",
    href: "/accounting",
  },
  {
    title: "B.Sc Marketing",
    icon: <Target size={24} />,
    description: "Learn consumer behavior, branding, and digital strategy to drive growth.",
    href: "/marketing",
  },
  {
    title: "B.Sc Political Science",
    icon: <Scale size={24} />,
    description: "Examine power dynamics, governance, and international relations worldwide.",
    href: "/political-science",
  },
  {
    title: "Library & Info Science",
    icon: <Library size={24} />,
    description: "Organize, manage, and preserve information in the modern digital era.",
    href: "/library-science",
  },
  {
    title: "B.Sc Statistics",
    icon: <BarChart3 size={24} />,
    description: "Master data collection and mathematical modeling to drive decision-making.",
    href: "/statistics",
  },
  {
    title: "B.Sc Mathematics",
    icon: <Binary size={24} />,
    description: "Develop pure logical reasoning and advanced problem-solving techniques.",
    href: "/mathematics",
  },
  {
    title: "B.A. English Literature",
    icon: <BookOpen size={24} />,
    description: "Analyze literary works and develop elite communication and writing skills.",
    href: "/english",
  }
];

export default function AllProgramsPage() {
  const [query, setQuery] = useState("");

  const filteredPrograms = programs.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 lg:p-16 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
            <GraduationCap className="w-8 h-8 text-[#1E293B]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mb-4">
            Academic Programs
          </h1>
          <div className="w-20 h-1.5 bg-[#1E293B] mx-auto rounded-full mb-8"></div>
          
          {/* Real-time Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#64748B]" />
            </div>
            <input
              type="text"
              placeholder="Search for a degree program..."
              className="block w-full pl-11 pr-12 py-4 bg-white border border-[#E2E8F0] rounded-2xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1E293B] focus:border-transparent transition-all shadow-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#64748B] hover:text-[#1E293B]"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPrograms.map((program, index) => (
              <Link key={index} href={program.href} className="group">
                <ProgramCard
                  title={program.title}
                  icon={program.icon}
                  description={program.description}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#CBD5E1]">
            <p className="text-[#64748B] text-lg">No programs match your search criteria.</p>
            <button 
              onClick={() => setQuery("")}
              className="mt-4 text-[#1E293B] font-bold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProgramCard({
  title,
  icon,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="h-full bg-white rounded-xl border border-[#E2E8F0] p-8 transition-all duration-300 group-hover:border-[#1E293B] group-hover:shadow-xl group-hover:shadow-slate-200/50 flex flex-col relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#F1F5F9] rounded-full group-hover:bg-[#1E293B]/5 transition-colors duration-300"></div>
      
      {/* Icon Wrapper */}
      <div className="relative mb-6">
        <div className="w-12 h-12 flex items-center justify-center bg-[#2a4672] text-white rounded-lg group-hover:bg-[#0F172A] transition-colors duration-300">
          {icon}
        </div>
      </div>

      {/* Text Content */}
      <div className="relative flex flex-col grow">
        <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight group-hover:text-[#1E293B] transition-colors">
          {title}
        </h3>
        <p className="text-[#64748B] text-sm leading-relaxed mb-8">
          {description}
        </p>
        
        <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-[#1E293B]">
          Explore
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </div>
  );
}