"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen } from "lucide-react";

const examTopics = [
  { id: "algebra", title: "Algebra Basics" },
  { id: "geometry", title: "Geometry Principles" },
  { id: "calculus", title: "Introduction to Calculus" },
];

export default function Exam({ params }: { params: { course: string } }) {
  return (
    <section className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-100"
      >
        Exam Topics
      </motion.h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {examTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <Link
              href={`/dashboards/students/courses/exam/${params.course}/topics/${topic.id}`}
              className="block bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl border hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="text-blue-600 w-6 h-6" />
                <h2 className="font-semibold text-gray-800 text-lg">{topic.title}</h2>
              </div>
              <p className="text-gray-600 text-sm">
                Take your exam for this topic and test your understanding.
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}