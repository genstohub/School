"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  Atom,
  BookOpen,
  Cpu,
  Globe2,
  Brain,
  PenTool,
  Beaker,
  DollarSign,
} from "lucide-react";

const cbtCourses = [
  {
    id: 1,
    code: "mth101",
    name: "Mathematics 101",
    description: "Test your calculus, algebra, and trigonometry knowledge.",
    questions: 30,
    icon: Calculator,
  },
  {
    id: 2,
    code: "phy101",
    name: "Physics 101",
    description:
      "Challenge yourself with motion, energy, and wave theory questions.",
    questions: 25,
    icon: Atom,
  },
  {
    id: 3,
    code: "csc101",
    name: "Computer Science 101",
    description:
      "Assess your understanding of programming, data, and algorithms.",
    questions: 40,
    icon: Cpu,
  },
  {
    id: 4,
    code: "eng101",
    name: "English 101",
    description:
      "Improve grammar, vocabulary, comprehension, and writing skills.",
    questions: 20,
    icon: BookOpen,
  },
  {
    id: 5,
    code: "bio101",
    name: "Biology 101",
    description:
      "Review cell structures, human anatomy, and biological systems.",
    questions: 35,
    icon: Beaker,
  },
  {
    id: 6,
    code: "bus101",
    name: "Business Administration",
    description: "Evaluate your skills in management, marketing, and finance.",
    questions: 45,
    icon: DollarSign,
  },
  {
    id: 7,
    code: "geo101",
    name: "Geography 101",
    description: "Explore the physical and human geography of our world.",
    questions: 25,
    icon: Globe2,
  },
  {
    id: 8,
    code: "psy101",
    name: "Psychology 101",
    description:
      "Understand behavior, learning processes, and human cognition.",
    questions: 30,
    icon: Brain,
  },
  {
    id: 9,
    code: "art101",
    name: "Fine Art 101",
    description:
      "Test your knowledge of color theory, design, and visual creativity.",
    questions: 18,
    icon: PenTool,
  },
];

export default function CBTPage() {
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown timer (1 week)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setTimeLeft("Time expired");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-4 sm:px-6 py-8 lg:px-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Computer Based Test (CBT)
        </motion.h1>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Prepare for your exams with timed, interactive practice tests.  
          Select a course below to begin.
        </motion.p>
      </section>

      {/* Courses Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {cbtCourses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 shadow-lg border border-gray-700"
          >
            {/* Striped background */}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(59,130,246,0.15),rgba(59,130,246,0.15)_10px,transparent_10px,transparent_20px)]"></div>

            <div className="relative z-10 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 rounded-full bg-blue-100/10 text-blue-400">
                  <course.icon size={24} />
                </div>
                <h3 className="font-semibold text-lg text-gray-100">
                  {course.name}
                </h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {course.description}
              </p>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-blue-400 font-medium">
                  {course.questions} Questions
                </span>
                <span className="text-gray-500">{course.code.toUpperCase()}</span>
              </div>

              {/* Countdown + Start Button */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-gray-400 italic">
                  Time left: {timeLeft}
                </p>
                <Link
                  href={`/dashboards/students/courses/cbt/${course.code}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Start
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}