"use client";

import {
  GraduationCap,
  Sigma,
  Binary,
  FunctionSquare,
  Calculator,
  BarChart,
  Laptop,
  Briefcase,
} from "lucide-react";

export default function MathematicsPage() {
  return (
    <div className="p-8 mt-15 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <GraduationCap className="w-16 h-16 mx-auto text-indigo-600" />
        <h1 className="text-3xl font-bold mt-4">B.Sc. Mathematics</h1>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">
          A B.Sc. in Mathematics provides both theoretical and applied knowledge
          of mathematical principles, logic, structures, and problem-solving
          methods. It builds a foundation in pure and applied mathematics,
          statistics, and computational techniques.
        </p>
      </div>

      {/* Timeline Style */}
      <div className="space-y-12 relative border-l-2 border-indigo-300 ml-4">
        {/* Step 1 */}
        <div className="ml-8">
          <div className="flex items-center gap-3">
            <Sigma className="w-8 h-8 text-indigo-500" />
            <h2 className="text-xl font-semibold">Core Foundations</h2>
          </div>
          <ul className="list-disc ml-8 mt-2 text-gray-700 space-y-1">
            <li>Algebra (linear, abstract, group, ring theory)</li>
            <li>Calculus (differential, integral, multivariable)</li>
            <li>Real & Complex Analysis</li>
            <li>Geometry & Trigonometry</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="ml-8">
          <div className="flex items-center gap-3">
            <FunctionSquare className="w-8 h-8 text-green-500" />
            <h2 className="text-xl font-semibold">Mathematical Methods & Logic</h2>
          </div>
          <ul className="list-disc ml-8 mt-2 text-gray-700 space-y-1">
            <li>Mathematical logic & set theory</li>
            <li>Number theory</li>
            <li>Differential equations (ODEs & PDEs)</li>
            <li>Vector calculus & tensor analysis</li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="ml-8">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-yellow-500" />
            <h2 className="text-xl font-semibold">Applied Mathematics</h2>
          </div>
          <ul className="list-disc ml-8 mt-2 text-gray-700 space-y-1">
            <li>Numerical analysis & optimization</li>
            <li>Operations research</li>
            <li>Mathematical modeling</li>
          </ul>
        </div>

        {/* Step 4 */}
        <div className="ml-8">
          <div className="flex items-center gap-3">
            <BarChart className="w-8 h-8 text-pink-500" />
            <h2 className="text-xl font-semibold">Statistics & Probability</h2>
          </div>
          <ul className="list-disc ml-8 mt-2 text-gray-700 space-y-1">
            <li>Probability theory & stochastic processes</li>
            <li>Descriptive & inferential statistics</li>
            <li>Data analysis & statistical computing</li>
          </ul>
        </div>

        {/* Step 5 */}
        <div className="ml-8">
          <div className="flex items-center gap-3">
            <Laptop className="w-8 h-8 text-blue-500" />
            <h2 className="text-xl font-semibold">Computational Mathematics</h2>
          </div>
          <ul className="list-disc ml-8 mt-2 text-gray-700 space-y-1">
            <li>Programming for mathematics (Python, MATLAB, R)</li>
            <li>Computational methods & algorithms</li>
            <li>Discrete mathematics (graph theory, combinatorics, cryptography)</li>
          </ul>
        </div>

        {/* Step 6 */}
        <div className="ml-8">
          <div className="flex items-center gap-3">
            <Binary className="w-8 h-8 text-purple-500" />
            <h2 className="text-xl font-semibold">Specialized & Advanced Areas</h2>
          </div>
          <ul className="list-disc ml-8 mt-2 text-gray-700 space-y-1">
            <li>Functional analysis & topology</li>
            <li>Fluid dynamics & mathematical physics</li>
            <li>Financial mathematics</li>
          </ul>
        </div>

        {/* Step 7 */}
        <div className="ml-8">
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-semibold">Research & Project</h2>
          </div>
          <ul className="list-disc ml-8 mt-2 text-gray-700 space-y-1">
            <li>Independent research work</li>
            <li>Modeling, computational, or statistical projects</li>
            <li>Application of mathematics to real-world problems</li>
          </ul>
        </div>
      </div>

      {/* Applications */}
      <div className="mt-16 bg-indigo-50 p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
          Applications & Career Paths
        </h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li><b>Education & Research:</b> Lecturing, teaching, or pure/applied math research</li>
          <li><b>Finance & Economics:</b> Actuarial science, banking, risk analysis, economic forecasting</li>
          <li><b>Technology & Data Science:</b> Data science, AI/ML, cryptography, algorithm design</li>
          <li><b>Engineering & Physical Sciences:</b> Modeling, simulation, aerodynamics, fluid dynamics</li>
          <li><b>Government & Public Sector:</b> Statistics, policy research, defense applications</li>
          <li><b>Business & Operations:</b> Operations research, logistics, forecasting</li>
          <li><b>Advanced Studies:</b> M.Sc/Ph.D. in Mathematics, Statistics, Data Science, Finance, Engineering</li>
        </ul>
      </div>

      {/* Closing */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-700">
          Why Choose Mathematics?
        </h3>
        <p className="text-gray-700 mt-2">
          A B.Sc. in Mathematics develops strong logical reasoning, analytical
          thinking, and problem-solving skills. Its applications are broad —
          spanning academia, finance, technology, data science, cryptography,
          engineering, and policy-making.
        </p>
      </div>
    </div>
  );
}