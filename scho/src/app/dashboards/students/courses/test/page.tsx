"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Calculator, FlaskConical, PenTool } from "lucide-react";

const courses = [
  {
    code: "MTH101",
    title: "General Mathematics I",
    description: "Foundations of algebra, geometry, and calculus.",
    icon: Calculator,
  },
  {
    code: "PHY102",
    title: "Physics for Beginners",
    description: "Basic mechanics, energy, and waves.",
    icon: FlaskConical,
  },
  {
    code: "ENG103",
    title: "English Composition I",
    description: "Effective writing and communication skills.",
    icon: PenTool,
  },
  {
    code: "BIO104",
    title: "General Biology I",
    description: "Introduction to cellular and molecular biology.",
    icon: BookOpen,
  },
];

export default function Test() {
  const router = useRouter();

  const handleNavigate = (courseCode: string) => {
    router.push(`/dashboards/students/courses/test/${courseCode.toLowerCase()}/topics`);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
            Course Test
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Select a course below to view and complete your assignments.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = course.icon;
            return (
              <motion.div
                key={course.code}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
                onClick={() => handleNavigate(course.code)}
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="bg-[#035b77]/10 p-3 rounded-full mb-4">
                    <Icon className="text-[#035b77] w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {course.code}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {course.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}