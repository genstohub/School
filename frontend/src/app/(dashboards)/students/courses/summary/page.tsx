"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, FileText } from "lucide-react";

const courses = [
  {
    id: "mth101",
    code: "MTH101",
    title: "Algebra Basics",
    description: "Introduction to algebraic expressions, equations, and factorization techniques.",
    objectives: [
      "Understand algebraic symbols and notations",
      "Solve linear and quadratic equations",
      "Apply algebraic principles to problem-solving",
    ],
  },
  {
    id: "phy102",
    code: "PHY102",
    title: "Mechanics",
    description: "Study of motion, forces, energy, and Newton’s laws of motion.",
    objectives: [
      "Understand motion in one and two dimensions",
      "Apply Newton’s laws to solve physics problems",
      "Analyze kinetic and potential energy transformations",
    ],
  },
  {
    id: "chm103",
    code: "CHM103",
    title: "Chemical Bonding",
    description: "Explore atomic structure and types of bonds that form between atoms.",
    objectives: [
      "Describe ionic, covalent, and metallic bonding",
      "Explain molecular geometry and bond polarity",
      "Predict properties of substances based on bonding types",
    ],
  },
];

export default function CourseSummaryPage() {
  return (
    <section className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
          >
        
        Course Summaries
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <Link
              href={`/dashboards/students/courses/summary/${course.id}/topics`}
              className="block bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl border hover:border-green-500 transition-all duration-300 h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-green-600 w-6 h-6" />
                  <h2 className="font-semibold text-gray-800 text-lg">{course.code}</h2>
                </div>
                <FileText className="text-blue-500 w-5 h-5" />
              </div>

              <h3 className="text-gray-700 font-medium mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>

              <ul className="text-gray-700 text-sm space-y-2 list-disc list-inside">
                {course.objectives.map((obj, i) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}