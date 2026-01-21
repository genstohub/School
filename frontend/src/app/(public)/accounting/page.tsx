"use client";

import {
  GraduationCap,
  Calculator,
  BarChart3,
  FileText,
  ShieldCheck,
  Scale,
  PieChart,
  Briefcase,
  TrendingUp,
} from "lucide-react";

export default function AccountingPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-[#F1F5F9] rounded-2xl mb-4">
          <GraduationCap className="w-10 h-10 text-[#1E293B]" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A]">B.Sc. Accounting</h1>
        <p className="text-[#64748B] mt-2 max-w-3xl mx-auto">
          Preparing students for professional excellence in financial reporting, 
          auditing, taxation, and strategic financial management.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-[#1E293B] mb-6 border-b pb-2">Core Curriculum</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <CourseCard
          icon={<Calculator className="w-8 h-8 text-[#1E293B]" />}
          title="Financial Accounting"
          items={[
            "Principles of Accounting",
            "Intermediate Accounting I & II",
            "Advanced Financial Accounting",
            "Corporate Reporting",
          ]}
        />
        <CourseCard
          icon={<ShieldCheck className="w-8 h-8 text-[#1E293B]" />}
          title="Auditing & Assurance"
          items={[
            "Principles of Auditing",
            "Internal Audit & Control",
            "Public Sector Auditing",
            "Forensic Accounting",
          ]}
        />
        <CourseCard
          icon={<Scale className="w-8 h-8 text-[#1E293B]" />}
          title="Taxation"
          items={[
            "Personal Income Tax",
            "Corporate Taxation",
            "Tax Management & Planning",
            "Indirect Taxes (VAT, etc.)",
          ]}
        />
        <CourseCard
          icon={<PieChart className="w-8 h-8 text-[#1E293B]" />}
          title="Management Accounting"
          items={[
            "Cost Accounting",
            "Performance Management",
            "Budgeting & Control",
            "Strategic Management Accounting",
          ]}
        />
        <CourseCard
          icon={<TrendingUp className="w-8 h-8 text-[#1E293B]" />}
          title="Finance & Investment"
          items={[
            "Financial Management",
            "Investment Analysis",
            "Portfolio Management",
            "International Finance",
          ]}
        />
        <CourseCard
          icon={<FileText className="w-8 h-8 text-[#1E293B]" />}
          title="Business Law & Ethics"
          items={[
            "Company Law",
            "Commercial Law",
            "Professional Ethics",
            "Corporate Governance",
          ]}
        />
      </div>

      {/* Professional Practice */}
      <div className="bg-[#F8FAFC] p-8 rounded-xl border border-[#E2E8F0]">
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-6">Career Trajectories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded border border-gray-100">
            <h3 className="font-bold text-[#1E293B] mb-2">Public Accounting</h3>
            <p className="text-sm text-[#64748B]">Auditor, Tax Consultant, or Financial Advisor at firms like the Big Four.</p>
          </div>
          <div className="p-4 bg-white rounded border border-gray-100">
            <h3 className="font-bold text-[#1E293B] mb-2">Corporate Finance</h3>
            <p className="text-sm text-[#64748B]">Financial Controller, Budget Analyst, or Chief Financial Officer (CFO).</p>
          </div>
          <div className="p-4 bg-white rounded border border-gray-100">
            <h3 className="font-bold text-[#1E293B] mb-2">Public Sector</h3>
            <p className="text-sm text-[#64748B]">Accountant General&apos;s Office, Revenue Services, or Internal Revenue.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] hover:border-[#1E293B] transition-all duration-300 shadow-sm flex flex-col group">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#F8FAFC] rounded-lg group-hover:bg-[#dbdfe6] group-hover:text-white transition-colors duration-300">
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