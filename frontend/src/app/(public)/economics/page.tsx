"use client";

import {
  GraduationCap,
  TrendingUp,
  Globe,
  PieChart,
  BarChart3,
  Coins,
  Scale,
  BookOpen,
  Briefcase,
  LineChart,
} from "lucide-react";

export default function EconomicsPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <GraduationCap className="w-16 h-16 mx-auto text-amber-600" />
        <h1 className="text-3xl font-bold mt-4 text-slate-900">B.Sc. Economics</h1>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          A B.Sc. in Economics provides a deep understanding of how societies, 
          businesses, and individuals allocate resources. It combines mathematical 
          modeling with social science to analyze market trends, public policy, 
          and global financial systems.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-amber-800 mb-6">
        Core Components
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card
          icon={<TrendingUp className="w-8 h-8 text-amber-600" />}
          title="Economic Theory"
          items={[
            "Microeconomic Analysis (Consumer behavior, Firms)",
            "Macroeconomic Theory (Growth, Inflation, GDP)",
            "Intermediate & Advanced Theory",
            "History of Economic Thought",
          ]}
        />
        <Card
          icon={<LineChart className="w-8 h-8 text-blue-600" />}
          title="Quantitative Methods"
          items={[
            "Mathematical Economics",
            "Econometrics & Data Analysis",
            "Statistical Methods for Social Sciences",
            "Operations Research",
          ]}
        />
        <Card
          icon={<Coins className="w-8 h-8 text-emerald-600" />}
          title="Monetary & Finance"
          items={[
            "Money and Banking",
            "Public Finance & Fiscal Policy",
            "International Finance",
            "Corporate Finance basics",
          ]}
        />
        <Card
          icon={<Globe className="w-8 h-8 text-indigo-600" />}
          title="Development & Global"
          items={[
            "Development Economics",
            "International Trade & Globalization",
            "Comparative Economic Systems",
            "Regional Economic Integration",
          ]}
        />
        <Card
          icon={<Scale className="w-8 h-8 text-red-600" />}
          title="Policy & Applied Econ"
          items={[
            "Environmental Economics",
            "Labour Economics & Industrial Relations",
            "Health Economics",
            "Agricultural Economics",
          ]}
        />
        <Card
          icon={<BarChart3 className="w-8 h-8 text-slate-600" />}
          title="Industrial & Managerial"
          items={[
            "Industrial Economics",
            "Managerial Economics",
            "Project Evaluation",
            "Business Cycles & Forecasting",
          ]}
        />
        <Card
          icon={<BookOpen className="w-8 h-8 text-purple-600" />}
          title="Research & Methodology"
          items={[
            "Research Methods in Economics",
            "Qualitative & Quantitative Techniques",
            "Economics Information Systems",
          ]}
        />
        <Card
          icon={<Briefcase className="w-8 h-8 text-gray-600" />}
          title="Professional Practice"
          items={[
            "Economic Planning",
            "Entrepreneurial Economics",
            "Final Year Research Project",
          ]}
        />
      </div>

      {/* Applications */}
      <div className="bg-amber-50 p-8 rounded-xl shadow border border-amber-100">
        <h2 className="text-2xl font-semibold text-amber-900 mb-6">
          Applications & Career Paths
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="font-semibold text-amber-700">Banking & Financial Services</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Investment Banking & Asset Management</li>
              <li>Financial Risk Analysis</li>
              <li>Central Banking (Policy & Regulation)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-amber-700">Public Policy & Government</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Economic Advisory & Planning</li>
              <li>Taxation & Revenue Management</li>
              <li>Development Planning (NGOs/International Bodies)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-amber-700">Business & Strategy</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Market Research & Consumer Analytics</li>
              <li>Strategic Business Consulting</li>
              <li>Pricing Analysis & Corporate Planning</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-amber-700">Data & Research</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Econometric Modeling & Forecasting</li>
              <li>Policy Impact Research</li>
              <li>Academic Teaching & Advanced Research</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800">
          Why Choose Economics?
        </h3>
        <p className="text-gray-700 mt-2">
          Economics is often called the &quot;Queen of the Social Sciences&quot; because of its 
          rigorous analytical framework. A B.Sc. in Economics doesn&apos;t just teach you 
          about money; it teaches you a way of thinking. It provides the tools to 
          understand complex global events, from supply chain shifts to international 
          trade wars, making it a highly valued degree in both the private and public sectors.
        </p>
      </div>
    </div>
  );
}

/* Reusable Card Component */
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
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition border border-gray-50">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-semibold text-lg text-slate-800">{title}</h3>
      </div>
      <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}