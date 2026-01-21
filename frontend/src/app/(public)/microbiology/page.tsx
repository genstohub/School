"use client";

import {
  GraduationCap,
  Microscope,
  FlaskConical,
  Activity,
  ShieldAlert,
  Beaker,
  Dna,
  Bug,
  Search
} from "lucide-react";

export default function MicrobiologyPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">B.Sc. Microbiology</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Deciphering the microscopic world to tackle global challenges in health, 
          agriculture, and environmental sustainability.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Bug className="w-8 h-8 text-[#1E293B]" />}
          title="Bacteriology"
          items={[
            "General Bacteriology",
            "Pathogenic Bacteriology",
            "Bacterial Genetics",
            "Microbial Physiology",
          ]}
        />
        <CourseCard
          icon={<ShieldAlert className="w-8 h-8 text-[#1E293B]" />}
          title="Virology & Immunology"
          items={[
            "Basic Virology",
            "Medical Mycology",
            "Fundamental Immunology",
            "Host-Parasite Relations",
          ]}
        />
        <CourseCard
          icon={<Dna className="w-8 h-8 text-[#1E293B]" />}
          title="Molecular Biology"
          items={[
            "Microbial Genetics",
            "Genetic Engineering",
            "Biotechnology",
            "Recombinant DNA Tech",
          ]}
        />
        <CourseCard
          icon={<Beaker className="w-8 h-8 text-[#1E293B]" />}
          title="Applied Microbiology"
          items={[
            "Industrial Microbiology",
            "Food Microbiology",
            "Petroleum Microbiology",
            "Fermentation Tech",
          ]}
        />
        <CourseCard
          icon={<Activity className="w-8 h-8 text-[#1E293B]" />}
          title="Medical/Public Health"
          items={[
            "Clinical Microbiology",
            "Epidemiology",
            "Diagnostic Microbiology",
            "Pharmaceutical Micro",
          ]}
        />
        <CourseCard
          icon={<Search className="w-8 h-8 text-[#1E293B]" />}
          title="Environmental"
          items={[
            "Environmental Microbiology",
            "Soil Microbiology",
            "Water Microbiology",
            "Bio-remediation",
          ]}
        />
      </div>

      {/* Lab Note */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0]">
        <div className="flex items-center gap-4 mb-4">
          <FlaskConical className="text-[#1E293B] w-8 h-8" />
          <h2 className="text-xl font-bold text-[#0F172A]">Laboratory Excellence</h2>
        </div>
        <p className="text-[#64748B] text-sm leading-relaxed">
          Students gain extensive hands-on experience in aseptic techniques, 
          microbial staining, culture media preparation, and modern diagnostic 
          equipment to prepare for roles in clinical and industrial labs.
        </p>
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