"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CourseSummaryPage({
  params,
}: {
  params: { course: string; topic: string };
}) {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleClose = () => {
    router.push(
      `/dashboards/students/courses/summary/${params.course}/topics`
    );
  };

  const summaries = [    {
      id: 1,
      title: "Overview",
      content: `This topic covers the fundamental concepts of ${params.topic}. You will explore key principles and how they connect to real-world applications.`,
    },
    {
      id: 2,
      title: "Key Points",
      content: `- Understand the importance of ${params.topic} in your course.
- Learn essential formulas and logical steps.
- Develop problem-solving strategies.`,
    },
    {
      id: 3,
      title: "Practical Insight",
      content: `This topic includes case studies and exercises that will help you apply theoretical concepts into practical use.`,
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10"
      >
        {params.course.toUpperCase()} — {params.topic.toUpperCase()} Summary
      </motion.h1>

      <div className="max-w-4xl mx-auto space-y-8">
        {summaries.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleSubmit}
          disabled={submitted}
          className={`px-6 py-2 rounded-lg shadow transition ${
            submitted
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {submitted ? "Marked as Done" : "Mark Summary as Done"}
        </button>
      </div>

      {/* Success Modal */}
      {submitted && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full"
          >
            <CheckCircle className="text-green-600 w-12 h-12 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Summary Completed
            </h2>
            <p className="text-gray-700 mb-4">
              You’ve successfully completed this topic summary.
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}