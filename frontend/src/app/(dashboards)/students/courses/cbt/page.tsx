"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  BookOpen,
  Cpu,
  FlaskConical,
  Zap,
  BarChart3,
  Dna,
  Sprout,
  Languages,
} from "lucide-react";

interface Course {
  code: string;
  title: string;
  level: string;
}

const allCourses: Course[] = [
  // 100 Level Courses
  { code: "MTH101", title: "General Mathematics I", level: "100L" },
  { code: "MTH102", title: "General Mathematics II", level: "100L" },
  { code: "STA101", title: "Introduction to Statistics", level: "100L" },
  { code: "CMP101", title: "Introduction to Computer Science", level: "100L" },
  { code: "CMP102", title: "Computer Programming I", level: "100L" },
  { code: "GST109", title: "Information & Digital Literacy", level: "100L" },
  { code: "BIO101", title: "General Biology I", level: "100L" },
  { code: "BIO102", title: "General Biology II", level: "100L" },
  { code: "CHM101", title: "General Chemistry I", level: "100L" },
  { code: "CHM102", title: "General Chemistry II", level: "100L" },
  { code: "PHY101", title: "General Physics I", level: "100L" },
  { code: "PHY102", title: "General Physics II", level: "100L" },
  { code: "BIO107", title: "Practical Biology I", level: "100L" },
  { code: "CHM107", title: "Practical Chemistry I", level: "100L" },
  { code: "GST101", title: "Use of English I", level: "100L" },
  { code: "GST102", title: "Use of English II", level: "100L" },
  { code: "GST103", title: "Nigerian Peoples and Culture", level: "100L" },
  { code: "GST104", title: "Study Skills & ICT", level: "100L" },
  { code: "GST105", title: "History & Philosophy of Science", level: "100L" },
  { code: "GST106", title: "Logic & Human Existence", level: "100L" },
  { code: "GST107", title: "Peace & Conflict Studies", level: "100L" },
  { code: "GST108", title: "Entrepreneurship Studies I", level: "100L" },
  { code: "AGR101", title: "Introduction to Agriculture", level: "100L" },
  { code: "AGR102", title: "Principles of Crop Production", level: "100L" },
  { code: "AGR103", title: "Principles of Animal Production", level: "100L" },
  { code: "AGR104", title: "Introduction to Soil Science", level: "100L" },
  { code: "AGR105", title: "Agric Economics & Extension", level: "100L" },
  { code: "AGR106", title: "Forestry & Wildlife", level: "100L" },
  { code: "AGR107", title: "Practical Agriculture I", level: "100L" },
  { code: "AGR108", title: "Agricultural Biochemistry", level: "100L" },

  // 200 Level Courses
  { code: "MTH201", title: "Mathematical Methods I", level: "200L" },
  { code: "MTH202", title: "Mathematical Methods II", level: "200L" },
  { code: "STA201", title: "Probability Theory", level: "200L" },
  { code: "CMP201", title: "Computer Programming II (OOP)", level: "200L" },
  { code: "CMP202", title: "Data Structures & Algorithms", level: "200L" },
  { code: "BIO201", title: "Cell Biology & Genetics", level: "200L" },
  { code: "BIO202", title: "Ecology & Environmental Biology", level: "200L" },
  { code: "BIO207", title: "Biological Techniques", level: "200L" },
  { code: "CHM201", title: "Organic Chemistry I", level: "200L" },
  { code: "CHM202", title: "Physical Chemistry II", level: "200L" },
  { code: "PHY201", title: "Electricity & Modern Physics", level: "200L" },
  { code: "PHY202", title: "Waves, Optics & Thermo", level: "200L" },
  { code: "CHM207", title: "Practical Chemistry II", level: "200L" },
];

// Helper to assign icons based on course code
const getIcon = (code: string) => {
  const prefix = code.substring(0, 3).toUpperCase();
  switch (prefix) {
    case "MTH": return Calculator;
    case "PHY": return Zap;
    case "CHM": return FlaskConical;
    case "BIO": return Dna;
    case "STA": return BarChart3;
    case "CMP": return Cpu;
    case "GST": return Languages;
    case "AGR": return Sprout;
    default: return BookOpen;
  }
};

export default function CBTPage() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft("EXPIRED");
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
    <div className="min-h-screen bg-black text-gray-100 px-4 sm:px-8 py-12 lg:px-16">
      {/* Hero Section */}
      <section className="text-left mb-16 border-l-4 border-blue-600 pl-6">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-blue-500 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block"
        >
          Examination Terminal
        </motion.span>
        <motion.h1
          className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Computer Based <span className="text-gray-800">Testing</span>
        </motion.h1>
        <motion.p
          className="text-gray-500 max-w-2xl text-sm font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Access timed practice simulations for all 100L and 200L modules. 
          Select your course code below to initialize the testing environment.
        </motion.p>
      </section>

      {/* Courses Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {allCourses.map((course, idx) => {
          const Icon = getIcon(course.code);
          return (
            <motion.div
              key={course.code}
              whileHover={{ y: -5 }}
              className="group relative rounded-[2rem] bg-gray-900/20 border border-gray-800 p-8 hover:border-blue-600/50 hover:bg-blue-600/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-black border border-gray-800 rounded-2xl flex items-center justify-center text-gray-600 group-hover:text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-500">
                  <Icon size={28} />
                </div>
                <span className="text-[10px] font-black px-3 py-1 rounded-full bg-gray-800 text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {course.level}
                </span>
              </div>

              <h3 className="font-black text-xl text-white uppercase tracking-tight mb-2">
                {course.title}
              </h3>
              <p className="text-[10px] font-black text-[#035b77] uppercase tracking-widest mb-6">
                CODE: {course.code}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 flex items-center gap-1">
                    System Time
                  </span>
                  <span className="text-[10px] font-bold text-gray-300">{timeLeft}</span>
                </div>
                
                <Link
                  href={`/students/courses/cbt/${course.code.toLowerCase()}`}
                  className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-xl"
                >
                  Initialize Test
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}