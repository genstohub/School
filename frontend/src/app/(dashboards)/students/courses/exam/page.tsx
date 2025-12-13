"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ClipboardList } from "lucide-react";

const examCourses = [
  { id: "mth101", title: "Mathematics 101", desc: "Algebra, Calculus, and Functions" },
  { id: "phy102", title: "Physics 102", desc: "Kinematics and Dynamics" },
  { id: "chm103", title: "Chemistry 103", desc: "Atomic Structure and Reactions" },
];

export default function ExamsPage() {
  return (
    <section className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
      >
        Course Exams
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {examCourses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <Link
              href={`/dashboards/students/courses/exam/${course.id}/topics`}
              className="block bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl border hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <ClipboardList className="text-blue-600 w-7 h-7" />
                <h2 className="font-semibold text-lg text-gray-800">{course.title}</h2>
              </div>
              <p className="text-gray-600 text-sm">{course.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}