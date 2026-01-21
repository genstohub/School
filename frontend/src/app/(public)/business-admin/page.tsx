"use client";

import {
  GraduationCap,
  Users,
  LineChart,
  Target,
  Gavel,
  Calculator,
  Globe2,
  UserPlus,
  Briefcase,
  Lightbulb,
} from "lucide-react";

export default function BusinessAdminPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <GraduationCap className="w-16 h-16 mx-auto text-emerald-700" />
        <h1 className="text-3xl font-bold mt-4 text-slate-900">B.Sc. Business Administration</h1>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          Business Administration equips students with the leadership, analytical, 
          and organizational skills required to manage modern enterprises. It integrates 
          strategy, finance, and human dynamics to drive business success.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-emerald-800 mb-6">Core Components</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card
          icon={<Target className="w-8 h-8 text-emerald-700" />}
          title="Management & Strategy"
          items={[
            "Principles of Management",
            "Strategic Management & Planning",
            "Organizational Behavior",
            "Business Policy",
          ]}
        />
        <Card
          icon={<Calculator className="w-8 h-8 text-blue-700" />}
          title="Finance & Accounting"
          items={[
            "Business Finance & Investment",
            "Financial & Managerial Accounting",
            "Auditing & Taxation",
            "Corporate Reporting",
          ]}
        />
        <Card
          icon={<LineChart className="w-8 h-8 text-indigo-600" />}
          title="Marketing Management"
          items={[
            "Marketing Research & Strategy",
            "Consumer Behavior",
            "Brand & Product Management",
            "Digital Marketing Trends",
          ]}
        />
        <Card
          icon={<UserPlus className="w-8 h-8 text-orange-600" />}
          title="Human Resources"
          items={[
            "HR Planning & Recruitment",
            "Performance Management",
            "Industrial & Labour Relations",
            "Compensation & Benefits",
          ]}
        />
        <Card
          icon={<Globe2 className="w-8 h-8 text-cyan-600" />}
          title="Operations & Logistics"
          items={[
            "Production & Operations Management",
            "Supply Chain & Logistics",
            "Total Quality Management (TQM)",
            "Project Management",
          ]}
        />
        <Card
          icon={<Gavel className="w-8 h-8 text-red-700" />}
          title="Business Environment"
          items={[
            "Business Law & Ethics",
            "Government & Business Relations",
            "International Business",
            "Commercial Law",
          ]}
        />
        <Card
          icon={<Lightbulb className="w-8 h-8 text-yellow-600" />}
          title="Entrepreneurship"
          items={[
            "Small Business Management",
            "Innovation & New Venture Creation",
            "Venture Capital & Seed Funding",
          ]}
        />
        <Card
          icon={<Briefcase className="w-8 h-8 text-slate-600" />}
          title="Practical Studies"
          items={[
            "Business Communication",
            "Management Information Systems",
            "Internship & Seminar Papers",
          ]}
        />
      </div>

      {/* Career Paths */}
      <div className="bg-emerald-50 p-8 rounded-xl border border-emerald-100">
        <h2 className="text-2xl font-semibold text-emerald-900 mb-6">Career Trajectories</h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-emerald-700 uppercase text-xs tracking-widest mb-2">Corporate</h3>
            <p className="text-sm">Operations Manager, Business Analyst, or Management Consultant.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-emerald-700 uppercase text-xs tracking-widest mb-2">Human Capital</h3>
            <p className="text-sm">HR Director, Talent Acquisition Specialist, or Employee Relations Manager.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="font-bold text-emerald-700 uppercase text-xs tracking-widest mb-2">Finance</h3>
            <p className="text-sm">Financial Planner, Credit Manager, or Portfolio Administrator.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-50 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
      </div>
      <ul className="list-disc ml-6 text-gray-700 space-y-1 text-sm">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}