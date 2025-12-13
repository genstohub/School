"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Atom,
  FlaskConical,
  Cpu,
  Globe,
  Layers,
  Beaker,
  Microscope,
  Code,
  Database,
  LineChart,
  CircuitBoard,
  PenTool,
  Cloud,
  Binary,
  Compass,
  Brain,
  Ruler,
  Telescope,
  PenSquare,
  BookMarked,
  TestTube,
  BarChart3,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const allCourses = [
  { code: "MTH101", name: "Calculus I", icon: Calculator, desc: "Introduction to differentiation and integration.", href: "/dashboards/students/courses/material/mth101" },
  { code: "PHY101", name: "Mechanics", icon: Atom, desc: "Fundamentals of motion, force, and energy.", href: "/dashboards/students/courses/material/phy101" },
  { code: "CHM101", name: "General Chemistry", icon: FlaskConical, desc: "Atoms, molecules, and chemical reactions.", href: "/dashboards/students/courses/material/chm101" },
  { code: "CSC101", name: "Intro to Programming", icon: Code, desc: "Learn the basics of programming logic.", href: "/dashboards/students/courses/material/csc101" },
  { code: "BIO101", name: "Biology Fundamentals", icon: Microscope, desc: "Understanding living organisms and systems.", href: "/dashboards/students/courses/material/bio101" },

  { code: "GEO101", name: "Physical Geography", icon: Globe, desc: "Earth’s physical features and environment.", href: "/dashboards/students/courses/material/geo101" },
  { code: "ENG101", name: "English Composition", icon: PenSquare, desc: "Improve writing and communication skills.", href: "/dashboards/students/courses/material/eng101" },
  { code: "ECO101", name: "Principles of Economics", icon: LineChart, desc: "Introduction to micro and macroeconomics.", href: "/dashboards/students/courses/material/eco101" },
  { code: "CVE101", name: "Civil Engineering Basics", icon: Ruler, desc: "Introduction to structural design principles.", href: "/dashboards/students/courses/material/cve101" },
  { code: "EEE101", name: "Electrical Circuits", icon: CircuitBoard, desc: "Basics of electricity and circuit analysis.", href: "/dashboards/students/courses/material/eee101" },
  { code: "SOC101", name: "Sociology Intro", icon: UsersRound, desc: "Understanding human society and culture.", href: "/dashboards/students/courses/material/soc101" },
  { code: "POL101", name: "Political Science", icon: Compass, desc: "Foundations of political theory and systems.", href: "/dashboards/students/courses/material/pol101" },
  { code: "STA101", name: "Statistics", icon: BarChart3, desc: "Data collection, analysis, and interpretation.", href: "/dashboards/students/courses/material/sta101" },
  { code: "PSY101", name: "Intro to Psychology", icon: Brain, desc: "Study of human behavior and mind.", href: "/dashboards/students/courses/material/psy101" },
  { code: "AGR101", name: "Intro to Agriculture", icon: Layers, desc: "Fundamentals of farming and crop production.", href: "/dashboards/students/courses/material/agr101" },
  { code: "CSC102", name: "Web Development", icon: Cloud, desc: "HTML, CSS, and JavaScript for the web.", href: "/dashboards/students/courses/material/csc102" },
  { code: "CSC103", name: "Database Systems", icon: Database, desc: "Understanding data storage and retrieval.", href: "/dashboards/students/courses/material/csc103" },
  { code: "CSC104", name: "Computer Architecture", icon: Cpu, desc: "Study of hardware and system components.", href: "/dashboards/students/courses/material/csc104" },
  { code: "PHY102", name: "Electricity and Magnetism", icon: Beaker, desc: "Study of electric and magnetic phenomena.", href: "/dashboards/students/courses/material/phy102" },
  { code: "CHM102", name: "Organic Chemistry", icon: TestTube, desc: "Structure and behavior of organic compounds.", href: "/dashboards/students/courses/material/chm102" },
  { code: "MAT102", name: "Linear Algebra", icon: Ruler, desc: "Matrices, vectors, and linear transformations.", href: "/dashboards/students/courses/material/mat102" },
  { code: "ENG102", name: "Technical Writing", icon: BookMarked, desc: "Writing reports, proposals, and documentation.", href: "/dashboards/students/courses/material/eng102" },
  { code: "CSC201", name: "Algorithms", icon: Binary, desc: "Study of algorithmic efficiency and design.", href: "/dashboards/students/courses/material/csc201" },
  { code: "CSC202", name: "Software Engineering", icon: PenTool, desc: "Building large-scale reliable software.", href: "/dashboards/students/courses/material/csc202" },
  { code: "CSC203", name: "Artificial Intelligence", icon: Brain, desc: "Introduction to AI and machine learning.", href: "/dashboards/students/courses/material/csc203" },
  { code: "MTH201", name: "Differential Equations", icon: Calculator, desc: "Solving first and second-order equations.", href: "/dashboards/students/courses/material/mth201" },
  { code: "PHY201", name: "Optics and Waves", icon: Telescope, desc: "Study of light, sound, and wave motion.", href: "/dashboards/students/courses/material/phy201" },
  { code: "CSC204", name: "Cloud Computing", icon: Cloud, desc: "Deploy and manage cloud-based systems.", href: "/dashboards/students/courses/material/csc204" },
  { code: "CSC205", name: "Cybersecurity", icon: ShieldCheck, desc: "Fundamentals of digital security and protection.", href: "/dashboards/students/courses/material/csc205" },
  { code: "CSC206", name: "Data Structures", icon: Layers, desc: "Organizing and managing data efficiently.", href: "/dashboards/students/courses/material/csc206" },
];

export default function StudentCourses() {
  const [search, setSearch] = useState("");

  const filteredCourses = allCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Available Courses</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search course by name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const Icon = course.icon;
          return (
            <Link
              href={course.href}
              key={course.code}
              className="bg-gray-800 rounded-2xl p-5 hover:bg-gray-700 transition shadow-lg flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gray-700 p-2 rounded-full">
                  <Icon size={24} className="text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold">{course.code}</h2>
              </div>
              <p className="text-gray-300 text-sm mb-2 font-medium">{course.name}</p>
              <p className="text-gray-400 text-xs flex-1">{course.desc}</p>
            </Link>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No courses found.</p>
      )}
    </div>
  );
}