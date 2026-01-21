"use client";

import {
  GraduationCap,
  Target,
  BarChart3,
  TrendingUp,
  Globe,
  Users,
  Zap,
  Briefcase,
  Share2,
} from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">B.Sc. Marketing</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Mastering the art of branding, digital strategy, and market research to 
          connect products with people in a competitive global economy.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Target className="w-8 h-8 text-[#3e68aa]" />}
          title="Core Marketing Strategy"
          items={[
            "Principles of Marketing",
            "Marketing Management",
            "Brand Management",
            "Strategic Marketing",
          ]}
        />
        <CourseCard
          icon={<Users className="w-8 h-8 text-[#3e68aa]" />}
          title="Consumer Psychology"
          items={[
            "Consumer Behavior",
            "Customer Relationship Management",
            "Service Marketing",
            "Sales Management",
          ]}
        />
        <CourseCard
          icon={<Share2 className="w-8 h-8 text-[#3e68aa]" />}
          title="Digital & Media"
          items={[
            "Digital Marketing Strategy",
            "Social Media Marketing",
            "Advertising & Sales Promotion",
            "Public Relations",
          ]}
        />
        <CourseCard
          icon={<BarChart3 className="w-8 h-8 text-[#3e68aa]" />}
          title="Market Research"
          items={[
            "Market Research Methodology",
            "Marketing Analytics",
            "Pricing Strategies",
            "Product Development",
          ]}
        />
        <CourseCard
          icon={<Globe className="w-8 h-8 text-[#3e68aa]" />}
          title="Global & Industrial"
          items={[
            "International Marketing",
            "B2B (Industrial) Marketing",
            "Supply Chain Management",
            "Logistics & Distribution",
          ]}
        />
        <CourseCard
          icon={<TrendingUp className="w-8 h-8 text-[#3e68aa]" />}
          title="Specialized Marketing"
          items={[
            "Retail Management",
            "Non-Profit Marketing",
            "Ethical & Green Marketing",
            "Entrepreneurial Marketing",
          ]}
        />
      </div>

      {/* Industry Focus */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0]">
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">Strategic Competencies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-white rounded-lg border border-gray-200 text-xs font-bold text-[#1E293B]">SEO/SEM Analysis</div>
          <div className="p-3 bg-white rounded-lg border border-gray-200 text-xs font-bold text-[#1E293B]">Brand Identity</div>
          <div className="p-3 bg-white rounded-lg border border-gray-200 text-xs font-bold text-[#1E293B]">Data Analytics</div>
          <div className="p-3 bg-white rounded-lg border border-gray-200 text-xs font-bold text-[#1E293B]">Copywriting</div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] hover:border-[#1E293B] transition-all duration-300 shadow-sm flex flex-col group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#F8FAFC] rounded-lg group-hover:bg-[#afb4bd] group-hover:text-white transition-colors duration-300">
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