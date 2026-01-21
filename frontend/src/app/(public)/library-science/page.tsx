"use client";

import {
  GraduationCap,
  Library,
  Database,
  Search,
  Archive,
  BookOpen,
  Globe,
  Monitor,
  ShieldCheck
} from "lucide-react";

export default function LibrarySciencePage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">Library & Information Science</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Empowering the digital age by managing information assets, developing 
          knowledge systems, and facilitating access to global resources.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Library className="w-8 h-8 text-[#1E293B]" />}
          title="Foundations"
          items={[
            "History of Libraries",
            "Information & Society",
            "Reference Services",
            "Information Literacy",
          ]}
        />
        <CourseCard
          icon={<Database className="w-8 h-8 text-[#1E293B]" />}
          title="Organization"
          items={[
            "Cataloguing & Classification",
            "Abstracting & Indexing",
            "Metadata Standards",
            "Resource Description",
          ]}
        />
        <CourseCard
          icon={<Monitor className="w-8 h-8 text-[#1E293B]" />}
          title="Digital Systems"
          items={[
            "Digital Libraries",
            "Database Management",
            "Information Architecture",
            "Web Design for Libraries",
          ]}
        />
        <CourseCard
          icon={<Archive className="w-8 h-8 text-[#1E293B]" />}
          title="Preservation"
          items={[
            "Archives Management",
            "Conservation of Resources",
            "Record Management",
            "Digital Preservation",
          ]}
        />
        <CourseCard
          icon={<Search className="w-8 h-8 text-[#1E293B]" />}
          title="Research & Retrieval"
          items={[
            "Information Retrieval Systems",
            "Research Methods",
            "Bibliometrics",
            "User Studies",
          ]}
        />
        <CourseCard
          icon={<Globe className="w-8 h-8 text-[#1E293B]" />}
          title="Management"
          items={[
            "Library Administration",
            "Copyright & Info Law",
            "Public Relations",
            "Collection Development",
          ]}
        />
      </div>

      {/* Professional Practice */}
      <div className="bg-[#1E293B] p-8 rounded-xl text-white">
        <h2 className="text-2xl font-semibold mb-6">Modern Career Paths</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="font-bold border-b border-slate-500 pb-1">Knowledge Mgmt</h3>
            <p className="text-xs text-slate-300">Working as a Data Steward or Knowledge Officer for corporate entities.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold border-b border-slate-500 pb-1">Academic Repositories</h3>
            <p className="text-xs text-slate-300">Managing university digital repositories and research publications.</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold border-b border-slate-500 pb-1">Cyber-Librarianship</h3>
            <p className="text-xs text-slate-300">Curating online databases and virtual learning environments.</p>
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