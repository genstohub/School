"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlayCircle,
  Search,
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Cpu,
  Database,
  Globe,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";

const courseVideos = [
  { code: "MTH101", title: "Mathematics Fundamentals", icon: Calculator },
  { code: "PHY101", title: "Introduction to Physics", icon: Atom },
  { code: "CHM101", title: "General Chemistry", icon: FlaskConical },
  { code: "CSC101", title: "Computer Science Basics", icon: Cpu },
  { code: "STA101", title: "Statistics & Probability", icon: Database },
  { code: "ENG101", title: "English Composition", icon: BookOpen },
  { code: "GEO101", title: "Geography & Earth Studies", icon: Globe },
  { code: "BIO101", title: "Biological Science", icon: Layers },
];

export default function CourseVideosPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCourses = courseVideos.filter(
    (course) =>
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigation = (courseCode: string) => {
    router.push(`/dashboards/students/courses/video/${courseCode}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 py-8 lg:px-12">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-blue-700">
          📽 Course Videos
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Watch detailed video lessons for each course. Choose a course to
          explore its video materials.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search course by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCourses.map(({ code, title, icon: Icon }) => (
          <motion.div
            key={code}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleNavigation(code)}
            className="flex items-center justify-between bg-white-600 text-gray-600 py-4 px-5 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition-all"
          >
            <div className="flex items-center gap-3">
              <Icon size={22} />
              <div>
                <h3 className="font-semibold text-lg">{code}</h3>
                <p className="text-sm text-red-100">{title}</p>
              </div>
            </div>
            <PlayCircle size={22} className="text-white" />
          </motion.div>
        ))}
      </div>

      {/* Horizontal Rule Line */}
      <div className="mt-10 border-t border-gray-200" />

      {/* Footer Note */}
      <p className="text-center text-gray-500 mt-4 text-sm">
        Each course contains multiple video lessons and related resources.
      </p>
    </div>
  );
}