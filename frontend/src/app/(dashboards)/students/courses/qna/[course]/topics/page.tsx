"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function QnaTopicsPage({ params }: { params: { course: string } }) {
  const courseName = params.course.toUpperCase();

  const topics = [
    { id: "topic1", title: "Introduction & Overview" },
    { id: "topic2", title: "Key Concepts and Definitions" },
    { id: "topic3", title: "Practical Applications" },
    { id: "topic4", title: "Challenges and FAQs" },
    { id: "topic5", title: "Final Review & Summary" },
  ];

  return (
    <main className="min-h-screen bg-gray-900 p-6 sm:p-8 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#035b77]">
            {courseName} — Q&A Topics
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Select a topic to join the discussion and ask or answer questions.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/dashboards/students/courses/qna/${params.course}/topics/${topic.id}`}
                className="block bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-[#035b77]/10 p-3 rounded-xl">
                    <MessageSquare className="text-[#035b77] w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Open discussion forum</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
          <Link
            href="/dashboards/students/courses/qna"
            className="inline-block bg-[#035b77] text-white px-6 py-2 rounded-lg hover:bg-[#024f65] transition"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    </main>
  );
}