"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";

const courses = [
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

export default function StudyMatePage() {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-black p-4 sm:p-6 md:p-10">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-300 mb-6"
      >
        Study Mate
      </motion.h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses (e.g. MTH 101)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-900 border border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="max-w-7xl mx-auto grid 
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-4 sm:gap-6">
        
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
          >
            <Link
              href={`/students/study-mate/${course.id}`}
              className="flex flex-col items-center justify-center 
              bg-gray-800 rounded-2xl p-5 min-h-[160px]
              shadow-md hover:shadow-blue-900/20 border border-gray-700 hover:border-blue-500
              transition-all duration-300 text-center group"
            >
              <BookOpen className="text-blue-500 group-hover:text-blue-400 w-8 h-8 mb-3 transition-colors" />
              <h2 className="text-white font-bold text-lg leading-tight">{course.title}</h2>
              <p className="text-gray-400 text-xs mt-2 line-clamp-2">{course.desc}</p>
            </Link>
          </motion.div>
        ))}

        {/* If no matches */}
        {filteredCourses.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-20">
            No matching courses found for &quot;{search}&quot;.
          </p>
        )}
      </div>
    </section>
  );
}