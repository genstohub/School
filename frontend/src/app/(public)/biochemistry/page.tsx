"use client";

import {
  GraduationCap,
  FlaskConical,
  Dna,
  Beaker,
  ShieldCheck,
  Microscope,
  Zap,
  Activity,
  ClipboardList
} from "lucide-react";

export default function BiochemistryPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">B.Sc. Biochemistry</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Exploring the chemical processes within and relating to living organisms. 
          A laboratory-based science that brings together biology and chemistry.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Dna className="w-8 h-8 text-[#1E293B]" />}
          title="Molecular Biology"
          items={[
            "Genetic Engineering",
            "DNA Replication & Repair",
            "Protein Synthesis",
            "Molecular Genetics",
          ]}
        />
        <CourseCard
          icon={<Activity className="w-8 h-8 text-[#1E293B]" />}
          title="Metabolism"
          items={[
            "Bioenergetics",
            "Carbohydrate Metabolism",
            "Lipid & Amino Acid Metabolism",
            "Metabolic Regulation",
          ]}
        />
        <CourseCard
          icon={<FlaskConical className="w-8 h-8 text-[#1E293B]" />}
          title="Enzymology"
          items={[
            "Enzyme Kinetics",
            "Mechanism of Enzyme Action",
            "Industrial Applications",
            "Co-enzymes & Cofactors",
          ]}
        />
        <CourseCard
          icon={<Microscope className="w-8 h-8 text-[#1E293B]" />}
          title="Medical Biochemistry"
          items={[
            "Clinical Biochemistry",
            "Nutritional Biochemistry",
            "Pharmacology basics",
            "Immunochemistry",
          ]}
        />
        <CourseCard
          icon={<Beaker className="w-8 h-8 text-[#1E293B]" />}
          title="Analytical Techniques"
          items={[
            "Chromatography",
            "Electrophoresis",
            "Spectroscopy",
            "Centrifugation",
          ]}
        />
        <CourseCard
          icon={<ClipboardList className="w-8 h-8 text-[#1E293B]" />}
          title="Research & Ethics"
          items={[
            "Bioinformatics",
            "Biosafety & Bioethics",
            "Research Methodology",
            "Biostatistics",
          ]}
        />
      </div>

      {/* Industry relevance */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0]">
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-6 text-center">Professional Fields</h2>
        <div className="grid md:grid-cols-2 gap-8 text-[#64748B]">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#1E293B] shrink-0" />
            <p><strong>Pharmaceuticals:</strong> Drug design, development, and testing for metabolic disorders.</p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#1E293B] shrink-0" />
            <p><strong>Clinical Research:</strong> Working in forensic science and diagnostic medical laboratories.</p>
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