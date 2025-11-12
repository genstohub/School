"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, ClipboardList } from "lucide-react";

const courseTopics = {
  mth101: [
    { id: "algebra", title: "Algebra Assignment", tasks: 3 },
    { id: "geometry", title: "Geometry Assignment", tasks: 2 },
    { id: "calculus", title: "Calculus Practice", tasks: 4 },
  ],
  phy102: [
    { id: "motion", title: "Motion & Forces Assignment", tasks: 3 },
    { id: "energy", title: "Energy Concepts", tasks: 2 },
  ],
  eng103: [
    { id: "grammar", title: "Grammar Correction", tasks: 4 },
    { id: "composition", title: "Essay Writing Practice", tasks: 2 },
  ],
  bio104: [
    { id: "cells", title: "Cell Structure Assignment", tasks: 3 },
    { id: "genetics", title: "Genetics Basics", tasks: 2 },
  ],
};

export default function TestPage() {
  const { course } = useParams();

  const topics = courseTopics[course as keyof typeof courseTopics] || [];

  return (
    <main className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#035b77] mb-2">
            {course?.toString().toUpperCase()} – Test
          </h1>
          <p className="text-gray-500">
            Select a topic below to view or submit your assignment.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/dashboards/students/courses/test/${course}/topics/${topic.id}`}
                className="block bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#035b77]/10 p-3 rounded-xl">
                      <FileText className="text-[#035b77] w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {topic.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    {topic.tasks} Tasks • Due soon
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {topics.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <ClipboardList className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No assignments found for this course yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}