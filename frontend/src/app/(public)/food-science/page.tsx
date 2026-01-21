"use client";

import React from "react";
import {
  GraduationCap,
  Utensils,
  Thermometer,
  ShieldAlert,
  Beaker,
  Truck,
  Package,
  Factory,
  CheckCircle2,
  BookOpen,
  ClipboardCheck,
  Briefcase,
  FlaskConical,
  Award
} from "lucide-react";

export default function FoodSciencePage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-4xl font-bold text-[#0F172A] mb-4">B.Sc. Food Science & Tech</h1>
        <p className="text-lg text-[#64748B] max-w-3xl mx-auto leading-relaxed">
          From farm to fork: Master the science of food processing, safety, and innovation 
          to feed a growing global population sustainably.
        </p>
      </div>

      {/* Admission Requirements Section */}
      <div className="mb-16 grid md:grid-cols-2 gap-8 items-center bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0]">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B] mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6" /> Entry Requirements
          </h2>
          <ul className="space-y-3 text-[#64748B]">
            <li className="flex gap-2"><strong>UTME:</strong> English, Chemistry, Biology/Agric Science, and Physics or Mathematics.</li>
            <li className="flex gap-2"><strong>O&apos;Level:</strong> Five credits including English, Math, Chemistry, Biology, and Physics.</li>
            <li className="flex gap-2"><strong>Direct Entry:</strong> ND/HND in Food Science or related fields with Upper Credit.</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <span className="block text-3xl font-bold text-[#1E293B]">5</span>
            <span className="text-xs uppercase tracking-wider text-slate-400">Years Duration</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
            <span className="block text-3xl font-bold text-[#1E293B]">SIWES</span>
            <span className="text-xs uppercase tracking-wider text-slate-400">Industrial Training</span>
          </div>
        </div>
      </div>

      {/* Core Curriculum Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-8 border-b pb-2">Departmental Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Beaker className="w-8 h-8 text-[#1E293B]" />}
          title="Food Chemistry"
          items={[
            "Food Composition Analysis",
            "Lipid, Protein & Carb Chemistry",
            "Enzymology in Food Systems",
            "Sensory Evaluation Techniques",
          ]}
        />
        <CourseCard
          icon={<ShieldAlert className="w-8 h-8 text-[#1E293B]" />}
          title="Food Microbiology"
          items={[
            "Food Preservation Principles",
            "Microbial Spoilage & Control",
            "Fermentation Biotechnology",
            "HACCP & Safety Management",
          ]}
        />
        <CourseCard
          icon={<Factory className="w-8 h-8 text-[#1E293B]" />}
          title="Food Engineering"
          items={[
            "Unit Operations in Processing",
            "Heat & Mass Transfer",
            "Post-Harvest Physiology",
            "Refrigeration & Cold Chain",
          ]}
        />
        <CourseCard
          icon={<Package className="w-8 h-8 text-[#1E293B]" />}
          title="Packaging & Storage"
          items={[
            "Biodegradable Packaging",
            "Modified Atmosphere Storage",
            "Labeling & Regulatory Laws",
            "Canning & Bottling Tech",
          ]}
        />
        <CourseCard
          icon={<CheckCircle2 className="w-8 h-8 text-[#1E293B]" />}
          title="Quality Assurance"
          items={[
            "ISO Standards in Food",
            "Food Laws & Legislation",
            "Laboratory Management",
            "Total Quality Management",
          ]}
        />
        <CourseCard
          icon={<Truck className="w-8 h-8 text-[#1E293B]" />}
          title="Commodity Tech"
          items={[
            "Cereal & Pulse Technology",
            "Meat, Poultry & Fish Science",
            "Dairy Science & Technology",
            "Beverage & Cocoa Tech",
          ]}
        />
      </div>

      

      {/* Student Professional Roadmap */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-8">Professional Development</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-l-4 border-[#1E293B] pl-6 py-2">
            <Award className="w-6 h-6 text-[#1E293B] mb-2" />
            <h3 className="font-bold text-[#0F172A]">Certifications</h3>
            <p className="text-sm text-[#64748B]">Earn NIFST (Nigerian Institute of Food Science and Technology) student membership and HACCP Level 3 certifications.</p>
          </div>
          <div className="border-l-4 border-[#1E293B] pl-6 py-2">
            <FlaskConical className="w-6 h-6 text-[#1E293B] mb-2" />
            <h3 className="font-bold text-[#0F172A]">Lab Research</h3>
            <p className="text-sm text-[#64748B]">Final year students engage in original research in food product development and fortification.</p>
          </div>
          <div className="border-l-4 border-[#1E293B] pl-6 py-2">
            <Briefcase className="w-6 h-6 text-[#1E293B] mb-2" />
            <h3 className="font-bold text-[#0F172A]">Internships</h3>
            <p className="text-sm text-[#64748B]">6-month industrial placement in multinational food companies (FMCGs) and regulatory agencies (NAFDAC/SON).</p>
          </div>
        </div>
      </div>

      {/* Industry Impact & Careers */}
      <div className="bg-[#1E293B] p-10 rounded-3xl text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold">Career Prospects</h2>
          <div className="bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
            High Demand Sector
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 bg-white/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-lg">Quality Control Manager</h4>
                <p className="text-slate-400 text-sm">Ensuring every batch of product meets safety and nutritional standards.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 bg-white/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-lg">Product Development Scientist</h4>
                <p className="text-slate-400 text-sm">Innovating new food products, flavors, and nutritional supplements.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 bg-white/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-lg">Food Regulatory Officer</h4>
                <p className="text-slate-400 text-sm">Working with government bodies to enforce food laws and safety codes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 bg-white/20 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-lg">Production Superintendent</h4>
                <p className="text-slate-400 text-sm">Overseeing large-scale manufacturing lines in breweries or flour mills.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] hover:border-[#1E293B] hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col group">
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