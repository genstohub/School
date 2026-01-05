"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Binary, 
  Languages, 
  Sprout, 
  BarChart3, 
  Dna, 
  Zap 
} from "lucide-react";
import { motion } from "framer-motion";

// Defined the Course interface for type safety
interface Course {
  code: string;
  title: string;
}

const courses: Course[] = [
  // 100 Level Courses
  { code: "MTH101", title: "General Mathematics I" },
  { code: "MTH102", title: "General Mathematics II" },
  { code: "STA101", title: "Introduction to Statistics" },
  { code: "CMP101", title: "Introduction to Computer Science" },
  { code: "CMP102", title: "Computer Programming I" },
  { code: "GST109", title: "Information & Digital Literacy" },
  { code: "BIO101", title: "General Biology I" },
  { code: "BIO102", title: "General Biology II" },
  { code: "CHM101", title: "General Chemistry I" },
  { code: "CHM102", title: "General Chemistry II" },
  { code: "PHY101", title: "General Physics I" },
  { code: "PHY102", title: "General Physics II" },
  { code: "BIO107", title: "Practical Biology I" },
  { code: "CHM107", title: "Practical Chemistry I" },
  { code: "GST101", title: "Use of English I" },
  { code: "GST102", title: "Use of English II" },
  { code: "GST103", title: "Nigerian Peoples and Culture" },
  { code: "GST104", title: "Study Skills & ICT" },
  { code: "GST105", title: "History & Philosophy of Science" },
  { code: "GST106", title: "Logic & Human Existence" },
  { code: "GST107", title: "Peace & Conflict Studies" },
  { code: "GST108", title: "Entrepreneurship Studies I" },
  { code: "AGR101", title: "Introduction to Agriculture" },
  { code: "AGR102", title: "Principles of Crop Production" },
  { code: "AGR103", title: "Principles of Animal Production" },
  { code: "AGR104", title: "Introduction to Soil Science" },
  { code: "AGR105", title: "Agric Economics & Extension" },
  { code: "AGR106", title: "Forestry & Wildlife" },
  { code: "AGR107", title: "Practical Agriculture I" },
  { code: "AGR108", title: "Agricultural Biochemistry" },

  // 200 Level Courses
  { code: "MTH201", title: "Mathematical Methods I" },
  { code: "MTH202", title: "Mathematical Methods II" },
  { code: "STA201", title: "Probability Theory" },
  { code: "CMP201", title: "Computer Programming II (OOP)" },
  { code: "CMP202", title: "Data Structures & Algorithms" },
  { code: "BIO201", title: "Cell Biology & Genetics" },
  { code: "BIO202", title: "Ecology & Environmental Biology" },
  { code: "BIO207", title: "Biological Techniques" },
  { code: "CHM201", title: "Organic Chemistry I" },
  { code: "CHM202", title: "Physical Chemistry II" },
  { code: "PHY201", title: "Electricity & Modern Physics" },
  { code: "PHY202", title: "Waves, Optics & Thermo" },
  { code: "CHM207", title: "Practical Chemistry II" },
];

// Helper to get Departmental Icons
const getCourseIcon = (code: string) => {
  const prefix = code.substring(0, 3).toUpperCase();
  switch (prefix) {
    case "MTH": return Calculator;
    case "PHY": return Zap;
    case "CHM": return FlaskConical;
    case "BIO": return Dna;
    case "STA": return BarChart3;
    case "CMP": return Binary;
    case "GST": return Languages;
    case "AGR": return Sprout;
    default: return BookOpen;
  }
};

export default function QuizCoursesPage() {
  const router = useRouter();

  const handleNavigate = (courseCode: string) => {
    // Navigates to the topics list for the specific quiz
    router.push(`/students/courses/quiz/${courseCode.toLowerCase()}/topics`);
  };

  return (
    <main className="min-h-screen bg-gray-950 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Quiz Central
          </h1>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Test your knowledge across all 100L and 200L modules. 
            Select a course to view topics and start your assessment.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {courses.map((course, index) => {
            const Icon = getCourseIcon(course.code);
            return (
              <motion.div
                key={course.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05, translateY: -5 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-blue-500 hover:bg-gray-800/50 transition-all duration-300 shadow-xl group"
                onClick={() => handleNavigate(course.code)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gray-800 p-4 rounded-xl mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <Icon className="text-blue-400 group-hover:text-white w-7 h-7" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-100 mb-1">
                    {course.code}
                  </h2>
                  <p className="text-xs text-gray-500 leading-tight line-clamp-2">
                    {course.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-gray-900 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            All quizzes are timed and follow the official curriculum.
          </p>
        </div>
      </div>
    </main>
  );
}