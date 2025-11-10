"use client";

import {
  GraduationCap,
  BarChart4,
  LineChart,
  Calculator,
  Database,
  PieChart,
  Binary,
  Network,
  Briefcase,
} from "lucide-react";

export default function StatisticsPage() {
  return (
    <div className="p-8 max-w-7xl mt-14 mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <GraduationCap className="w-16 h-16 mx-auto text-emerald-600" />
        <h1 className="text-3xl font-bold mt-4">B.Sc. Statistics</h1>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          A B.Sc. in Statistics focuses on data collection, analysis,
          interpretation, and presentation — blending mathematics, probability,
          and computing to solve real-world problems.
        </p>
      </div>

      {/* Core Components Grid */}
      <h2 className="text-2xl font-semibold text-emerald-700 mb-6">
        Core Components
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Card
          icon={<Calculator className="w-8 h-8 text-emerald-600" />}
          title="Foundations in Math & Computing"
          items={[
            "Calculus, Linear Algebra, Matrix Theory",
            "Probability theory & Mathematical statistics",
            "Numerical methods",
            "Intro to programming (Python, R, MATLAB, SAS, SPSS)",
          ]}
        />
        <Card
          icon={<BarChart4 className="w-8 h-8 text-blue-600" />}
          title="Statistical Theory & Methods"
          items={[
            "Descriptive & Inferential statistics",
            "Hypothesis testing & Confidence intervals",
            "Regression (simple, multiple, logistic)",
            "Correlation & Association",
          ]}
        />
        <Card
          icon={<LineChart className="w-8 h-8 text-purple-600" />}
          title="Probability & Stochastic Processes"
          items={[
            "Random variables & probability distributions",
            "Markov chains & Poisson processes",
            "Time series & forecasting",
          ]}
        />
        <Card
          icon={<PieChart className="w-8 h-8 text-pink-600" />}
          title="Applied Statistics"
          items={[
            "Biostatistics & Epidemiology",
            "Econometrics (finance, banking)",
            "Psychometrics & Social statistics",
            "Agricultural & Environmental statistics",
          ]}
        />
        <Card
          icon={<Network className="w-8 h-8 text-orange-600" />}
          title="Design & Sampling"
          items={[
            "Sampling theory (random, stratified, cluster)",
            "Design of Experiments (DOE)",
            "Survey methodology & analysis",
          ]}
        />
        <Card
          icon={<Database className="w-8 h-8 text-indigo-600" />}
          title="Data Science & Computational Stats"
          items={[
            "Data mining & Big Data analytics",
            "Machine learning basics",
            "Statistical programming & visualization",
          ]}
        />
        <Card
          icon={<Binary className="w-8 h-8 text-red-600" />}
          title="Decision Science & Quality Control"
          items={[
            "Operations research & Optimization",
            "Reliability & Risk analysis",
            "Industrial statistics & Six Sigma",
          ]}
        />
        <Card
          icon={<Briefcase className="w-8 h-8 text-gray-600" />}
          title="Research & Project"
          items={[
            "Independent research or consultancy project",
            "Real-world data analysis & reporting",
          ]}
        />
      </div>

      {/* Applications */}
      <div className="bg-emerald-50 p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-emerald-700 mb-6">
          Applications & Career Paths
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h3 className="font-semibold text-emerald-600">Government & Public Sector</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>National statistics bureaus & census</li>
              <li>Policy formulation & evaluation</li>
              <li>Public health statistics & epidemiology</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-600">Business & Finance</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Actuarial science (insurance, pensions, risk)</li>
              <li>Financial analysis & investment risk</li>
              <li>Market research & consumer analytics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-600">Science & Health</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Biostatistics (clinical trials, genetics)</li>
              <li>Environmental statistics (climate, pollution)</li>
              <li>Agricultural statistics (crop yield, pest control)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-600">Technology & Data Science</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Data science & data analytics</li>
              <li>Machine learning & AI modeling</li>
              <li>Business intelligence & big data</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-600">Industry & Manufacturing</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Statistical quality control</li>
              <li>Process optimization & product testing</li>
              <li>Logistics & operations research</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-emerald-600">Education & Research</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>University lecturer or researcher</li>
              <li>Statistical consultant for research projects</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow border border-emerald-200">
        <h3 className="text-lg font-semibold text-emerald-700">
          Why Choose Statistics?
        </h3>
        <p className="text-gray-700 mt-2">
          A B.Sc. in Statistics equips graduates with the ability to analyze,
          interpret, and communicate data for informed decision-making.
          Applications cut across government, business, healthcare, technology,
          and research, making it one of the most versatile degrees in
          today’s data-driven world.
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
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <ul className="list-disc ml-6 mt-3 text-gray-700 space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}