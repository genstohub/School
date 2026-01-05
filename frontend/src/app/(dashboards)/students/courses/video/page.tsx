"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlayCircle,
  Search,
  BookOpen,
  Calculator,
  FlaskConical,
  Binary,
  Languages,
  Sprout,
  BarChart3,
  Dna,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

// Interface for TypeScript type safety
interface CourseVideo {
  id: string;
  title: string;
  desc: string;
}

const courses: CourseVideo[] = [
  // 100 Level Courses
  { id: "mth101", title: "MTH 101", desc: "General Mathematics I" },
  { id: "mth102", title: "MTH 102", desc: "General Mathematics II" },
  { id: "sta101", title: "STA 101", desc: "Introduction to Statistics" },
  { id: "cmp101", title: "CMP 101", desc: "Introduction to Computer Science" },
  { id: "cmp102", title: "CMP 102", desc: "Computer Programming I" },
  { id: "gst109", title: "GST 109", desc: "Information & Digital Literacy" },
  { id: "bio101", title: "BIO 101", desc: "General Biology I" },
  { id: "bio102", title: "BIO 102", desc: "General Biology II" },
  { id: "chm101", title: "CHM 101", desc: "General Chemistry I" },
  { id: "chm102", title: "CHM 102", desc: "General Chemistry II" },
  { id: "phy101", title: "PHY 101", desc: "General Physics I" },
  { id: "phy102", title: "PHY 102", desc: "General Physics II" },
  { id: "bio107", title: "BIO 107", desc: "Practical Biology I" },
  { id: "chm107", title: "CHM 107", desc: "Practical Chemistry I" },
  { id: "gst101", title: "GST 101", desc: "Use of English I" },
  { id: "gst102", title: "GST 102", desc: "Use of English II" },
  { id: "gst103", title: "GST 103", desc: "Nigerian Peoples and Culture" },
  { id: "gst104", title: "GST 104", desc: "Study Skills & ICT" },
  { id: "gst105", title: "GST 105", desc: "History & Philosophy of Science" },
  { id: "gst106", title: "GST 106", desc: "Logic & Human Existence" },
  { id: "gst107", title: "GST 107", desc: "Peace & Conflict Studies" },
  { id: "gst108", title: "GST 108", desc: "Entrepreneurship Studies I" },
  { id: "agr101", title: "AGR 101", desc: "Introduction to Agriculture" },
  { id: "agr102", title: "AGR 102", desc: "Principles of Crop Production" },
  { id: "agr103", title: "AGR 103", desc: "Principles of Animal Production" },
  { id: "agr104", title: "AGR 104", desc: "Introduction to Soil Science" },
  { id: "agr105", title: "AGR 105", desc: "Agric Economics & Extension" },
  { id: "agr106", title: "AGR 106", desc: "Forestry & Wildlife" },
  { id: "agr107", title: "AGR 107", desc: "Practical Agriculture I" },
  { id: "agr108", title: "AGR 108", desc: "Agricultural Biochemistry" },
  // 200 Level Courses
  { id: "mth201", title: "MTH 201", desc: "Mathematical Methods I" },
  { id: "mth202", title: "MTH 202", desc: "Mathematical Methods II" },
  { id: "sta201", title: "STA 201", desc: "Probability Theory" },
  { id: "cmp201", title: "CMP 201", desc: "Computer Programming II (OOP)" },
  { id: "cmp202", title: "CMP 202", desc: "Data Structures & Algorithms" },
  { id: "bio201", title: "BIO 201", desc: "Cell Biology & Genetics" },
  { id: "bio202", title: "BIO 202", desc: "Ecology & Environmental Biology" },
  { id: "bio207", title: "BIO 207", desc: "Biological Techniques" },
  { id: "chm201", title: "CHM 201", desc: "Organic Chemistry I" },
  { id: "chm202", title: "CHM 202", desc: "Physical Chemistry II" },
  { id: "phy201", title: "PHY 201", desc: "Electricity & Modern Physics" },
  { id: "phy202", title: "PHY 202", desc: "Waves, Optics & Thermo" },
  { id: "chm207", title: "CHM 207", desc: "Practical Chemistry II" },
];

// Dynamic Icon Selector
const getCourseIcon = (title: string) => {
  const prefix = title.split(" ")[0].toUpperCase();
  switch (prefix) {
    case "MTH": return Calculator;
    case "PHY": return Zap; // Modern Physics/Electricity feel
    case "CHM": return FlaskConical;
    case "BIO": return Dna;
    case "STA": return BarChart3;
    case "CMP": return Binary;
    case "GST": return Languages;
    case "AGR": return Sprout;
    default: return BookOpen;
  }
};

export default function CourseVideosPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleNavigation = (id: string) => {
    router.push(`/students/courses/video/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-6 py-8 lg:px-12 text-white">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-blue-500">
          📽 Course Videos
        </h1>
        <p className="text-gray-400 mt-2 max-w-xl mx-auto">
          Watch detailed video lessons for each course. Choose a course to
          explore its video materials.
        </p>
      </motion.div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search course by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {filteredCourses.map((course) => {
          const Icon = getCourseIcon(course.title);
          return (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleNavigation(course.id)}
              className="flex items-center justify-between bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-md cursor-pointer hover:bg-blue-900/40 hover:border-blue-500 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-900 rounded-lg group-hover:bg-blue-600 transition-colors">
                  <Icon size={24} className="text-blue-400 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-100">{course.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-1">{course.desc}</p>
                </div>
              </div>
              <PlayCircle size={24} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No courses found matching &quot;{search}&quot;
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-10 border-t border-gray-800 pt-6">
        <p className="text-center text-gray-500 text-sm">
          Each course contains multiple video lessons and related resources.
        </p>
      </div>
    </div>
  );
}