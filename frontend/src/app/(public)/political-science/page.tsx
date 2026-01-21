"use client";

import {
  GraduationCap,
  Scale,
  Globe,
  Gavel,
  Users,
  Search,
  BookOpen,
  ShieldCheck,
  History,
} from "lucide-react";

export default function PoliticalSciencePage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">B.Sc. Political Science</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Analyzing the mechanics of power, governance, and public policy to understand 
          and shape the political landscapes of the modern world.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Gavel className="w-8 h-8 text-[#3e68aa]" />}
          title="Political Theory"
          items={[
            "Ancient Political Thought",
            "Modern Political Thought",
            "Comparative Politics",
            "Contemporary Political Analysis",
          ]}
        />
        <CourseCard
          icon={<Globe className="w-8 h-8 text-[#3e68aa]" />}
          title="International Relations"
          items={[
            "International Law & Organizations",
            "Diplomacy & Foreign Policy",
            "International Economic Relations",
            "Global Security & Conflict",
          ]}
        />
        <CourseCard
          icon={<Scale className="w-8 h-8 text-[#3e68aa]" />}
          title="Public Administration"
          items={[
            "Public Policy Analysis",
            "Local Government Studies",
            "Personnel Management",
            "Administrative Law",
          ]}
        />
        <CourseCard
          icon={<History className="w-8 h-8 text-[#3e68aa]" />}
          title="African & Local Politics"
          items={[
            "Government and Politics in Africa",
            "Nigerian Government & Politics",
            "Political Economy of Development",
            "Civil-Military Relations",
          ]}
        />
        <CourseCard
          icon={<Search className="w-8 h-8 text-[#3e68aa]" />}
          title="Research Methodology"
          items={[
            "Logic of Political Inquiry",
            "Quantitative Research Methods",
            "Political Sociology",
            "Statistics for Social Sciences",
          ]}
        />
        <CourseCard
          icon={<Users className="w-8 h-8 text-[#3e68aa]" />}
          title="Human Rights & Ethics"
          items={[
            "Human Rights Law",
            "Political Behavior",
            "Citizenship & Leadership",
            "Gender and Politics",
          ]}
        />
      </div>

      {/* Career Pathways */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0]">
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">Career Opportunities</h2>
        <div className="grid md:grid-cols-2 gap-8 text-[#64748B]">
          <div className="space-y-3">
            <p><strong>Public Service:</strong> Roles in federal/state government agencies and civil service.</p>
            <p><strong>Diplomacy:</strong> Foreign service officers and international organization staff (UN, AU).</p>
          </div>
          <div className="space-y-3">
            <p><strong>Policy Analysis:</strong> Working with think tanks, NGOs, and legislative committees.</p>
            <p><strong>Political Communication:</strong> Political consulting, public relations, and journalism.</p>
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
        <div className="p-2 bg-[#F8FAFC] rounded-lg group-hover:bg-[#707c90] group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-[#253b6d]">{title}</h3>
      </div>
      <ul className="list-disc ml-6 space-y-1 text-[#64748B] text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}