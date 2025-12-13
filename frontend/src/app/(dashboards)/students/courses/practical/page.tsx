"use client";

import React, { SVGProps, useEffect, useState } from "react";
import Link from "next/link";
import "./practical.css";
import { motion } from "framer-motion";
import {
  Cpu,
  Atom,
  FlaskConical,
  Layers,
  Activity,
  Leaf,
  Zap,
} from "lucide-react";

type Course = {
  code: string;
  title: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  estTime: string; // e.g. "30 mins"
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
};

// mock course list (add/remove items as needed)
const PRACTICAL_COURSES: Course[] = [
  {
    code: "BIO101",
    title: "Biology Practical I",
    icon: Leaf,
    estTime: "45 mins",
    difficulty: "Easy",
    description: "Microscopy, cell observation, and simple staining techniques.",
  },
  {
    code: "CMP111",
    title: "Computer Practical (CMP111)",
    icon: Cpu,
    estTime: "60 mins",
    difficulty: "Medium",
    description: "Intro to shell, file ops, and basic scripting tasks.",
  },
  {
    code: "MTH101",
    title: "Mathematics Practical",
    icon: Activity,
    estTime: "30 mins",
    difficulty: "Easy",
    description: "Hands-on problem solving: graphs, derivatives, integrals.",
  },
  {
    code: "PHY101",
    title: "Physics Practical I",
    icon: Atom,
    estTime: "50 mins",
    difficulty: "Medium",
    description: "Kinematics lab, velocity & acceleration experiments.",
  },
  {
    code: "CHM101",
    title: "Chemistry Practical",
    icon: FlaskConical,
    estTime: "55 mins",
    difficulty: "Hard",
    description: "Titration, concentration calculations and safe handling.",
  },
  {
    code: "AGR101",
    title: "Agricultural Practical",
    icon: Layers,
    estTime: "40 mins",
    difficulty: "Easy",
    description: "Soil testing, planting demonstrations, crop observations.",
  },
  {
    code: "STA101",
    title: "Statistics Practical",
    icon: Zap,
    estTime: "35 mins",
    difficulty: "Medium",
    description: "Data collection, sampling, and simple analyses using tools.",
  },
];

export default function PracticalsIndexPage() {
  // progress stored per-course in localStorage as "practical_progress_<code>"
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    // load progress from localStorage on mount
    const map: Record<string, number> = {};
    PRACTICAL_COURSES.forEach((c) => {
      try {
        const raw = localStorage.getItem(`practical_progress_${c.code.toLowerCase()}`);
        map[c.code] = raw ? Math.min(100, Number(raw)) : 0;
      } catch {
        map[c.code] = 0;
      }
    });
    setProgressMap(map);
  }, []);

  const setProgress = (code: string, value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    const next = { ...progressMap, [code]: clamped };
    setProgressMap(next);
    try {
      localStorage.setItem(`practical_progress_${code.toLowerCase()}`, String(clamped));
    } catch {
      // ignore localStorage errors
    }
  };

  const cardEnter = { opacity: 0, y: 12 };
  const cardEnterAnimate = { opacity: 1, y: 0 };

  return (
    <div className="min-h-screen bg-gray-900 px-4 sm:px-8 py-5">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-4xl mx-auto text-center mb-10"
      >
        <h1 className="text-3xl sm:text-3xl font-extrabold text-gray-50 mb-2">
          🧪 Course Practicals
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practical, hands-on tasks designed to test understanding and build skills. Click any
          course to view practical topics and start.
        </p>
      </motion.header>

      {/* Grid */}
      <motion.section
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {PRACTICAL_COURSES.map((course, i) => {
          const Icon = course.icon;
          const progress = progressMap[course.code] ?? 0;
          return (
            <motion.article
              key={course.code}
              variants={{ hidden: { ...cardEnter }, show: { ...cardEnterAnimate } }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-white rounded-2xl p-5 shadow-md border border-gray-200 overflow-hidden"
            >
              {/* subtle colorful stripes background */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
               
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 inline-flex">
                      <Icon  className="text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {course.code}
                      </h3>
                      <p className="text-sm text-gray-600">{course.title}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-medium px-2 py-1 rounded ${
                        course.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : course.difficulty === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {course.difficulty}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600">{course.description}</p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex-1 pr-3">
                    {/* progress bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="progress-bar"
                        
                        
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {progress}% complete • est {course.estTime}
                    </div>
                  </div>

                  {/* Start Link (right side) */}
                  <div className="flex-shrink-0">
                    <Link
                      href={`/dashboards/students/courses/practical/${course.code.toLowerCase()}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                      aria-label={`Open practicals for ${course.code}`}
                    >
                      Start
                    </Link>
                  </div>
                </div>

                {/* quick controls for demo (simulate progress) */}
                <div className="mt-4 flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setProgress(course.code, Math.max(0, progress - 10))}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
                    aria-label={`Decrease progress for ${course.code}`}
                  >
                    −10%
                  </button>
                  <button
                    onClick={() => setProgress(course.code, Math.min(100, progress + 10))}
                    className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
                    aria-label={`Increase progress for ${course.code}`}
                  >
                    +10%
                  </button>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.section>

      {/* hr */}
      <div className="max-w-6xl mx-auto mt-10 border-t border-gray-200" />

      <p className="max-w-6xl mx-auto text-sm text-gray-500 mt-4 text-center">
        Each practical leads to topic-specific pages with interactive tasks. Progress is saved
        locally for demo — will sync with backend later.
      </p>
    </div>
  );
}