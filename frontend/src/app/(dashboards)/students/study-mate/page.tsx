"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Search } from "lucide-react";

const courses = [
  { id: "mth101", title: "MTH101", desc: "General Mathematics" },
  { id: "phy101", title: "PHY101", desc: "General Physics" },
  { id: "gst101", title: "GST101", desc: "Use of English" },
  { id: "chm101", title: "CHM101", desc: "General Chemistry" },
  { id: "csc101", title: "CSC101", desc: "Introduction to Computing" },
  { id: "eco101", title: "ECO101", desc: "Economics Principles" },
];

export default function StudyMatePage() {
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gray-90 p-4 sm:p-6 md:p-10">
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
          <Search className="absolute left-3 top-3 text-gray-100 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="max-w-6xl mx-auto grid 
        grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
        gap-5 sm:gap-6">
        
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Link
              href={`/dashboards/students/study-mate/${course.id}`}
              className="flex flex-col items-center justify-center 
              bg-white rounded-2xl p-5
              shadow-md hover:shadow-xl border hover:border-blue-500
              transition-all duration-300 text-center"
            >
              <BookOpen className="text-blue-600 w-10 h-10 mb-2" />
              <h2 className="text-gray-900 font-bold text-lg">{course.title}</h2>
              <p className="text-gray-500 text-sm">{course.desc}</p>
            </Link>
          </motion.div>
        ))}

        {/* If no matches */}
        {filteredCourses.length === 0 && (
          <p className="col-span-full text-center text-gray-100">
            No matching courses found.
          </p>
        )}
      </div>
    </section>
  );
}