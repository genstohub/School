"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  { code: "BIO101", title: "General Biology I" },
  { code: "MTH101", title: "General Mathematics I" },
  { code: "PHY101", title: "Physics for Beginners" },
  { code: "CMP111", title: "Introduction to Computer Science" },
  { code: "CHM101", title: "Basic Chemistry I" },
];

export default function QuizCoursesPage() {
  const router = useRouter();

  const handleNavigate = (courseCode: string) => {
    router.push(`/dashboards/students/courses/quiz/${courseCode.toLowerCase()}/topics`);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
            Quiz Courses
          </h1>
          <p className="text-gray-500 mt-2">
            Select a course below to view available topics and start your quiz.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <motion.div
              key={course.code}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
              onClick={() => handleNavigate(course.code)}
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4">
                  <BookOpen className="text-blue-600 w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {course.code}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{course.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}