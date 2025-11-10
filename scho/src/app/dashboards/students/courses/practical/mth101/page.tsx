"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";

type Topic = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
};

const TOPICS: Topic[] = [
  {
    id: 1,
    title: "Understanding Graphs and Coordinates",
    description: "Learn how to interpret, plot, and analyze mathematical graphs accurately.",
    videoUrl: "https://www.youtube.com/embed/kcPj3kIuPQg",
  },
  {
    id: 2,
    title: "Differentiation Basics",
    description: "Introduction to limits, slopes, and rate of change in calculus.",
    videoUrl: "https://www.youtube.com/embed/5cK8rxAG5Tg",
  },
  {
    id: 3,
    title: "Integration Techniques",
    description: "Step-by-step understanding of integration for area under a curve.",
    videoUrl: "https://www.youtube.com/embed/QwH4xGv8WJY",
  },
];

export default function Mth101Practicals() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-60 px-4 sm:px-8 py-10">
      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-50 mb-2">
          MTH101 Practicals
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore each topic with guided video explanations and hands-on practice tasks.
        </p>
      </motion.header>

      {/* Topics Section */}
      <section className="max-w-5xl mx-auto space-y-6">
        {TOPICS.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={20} />
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{topic.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveVideo(topic.videoUrl)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                >
                  <PlayCircle size={18} />
                  Watch Guide
                </button>

                <Link
                  href={`/dashboards/students/courses/practical/mth101/practice`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                >
                  <CheckCircle size={18} />
                  Practice
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-white rounded-2xl overflow-hidden w-full max-w-3xl shadow-xl relative">
            <iframe
              src={activeVideo}
              className="w-full h-[280px] sm:h-[400px]"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-2 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}