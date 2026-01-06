"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageSquare, ArrowLeft, Loader2, AlertCircle, ChevronRight } from "lucide-react";

// --- Interfaces ---
interface Topic {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
}

interface CourseDetails {
  code: string;
  title: string;
}

export default function QnaTopicsPage({ params }: { params: { course: string } }) {
  const courseCode = params.course.toUpperCase();
  
  // States
  const [topics, setTopics] = useState<Topic[]>([]);
  const [courseInfo, setCourseInfo] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true);
        setError(null);
        
        // --- API INTEGRATION POINT ---
        // Replace with your actual endpoint: e.g., `/api/courses/${params.course}/topics`
        const response = await fetch(`/api/students/qna/topics?course=${params.course}`);
        
        if (!response.ok) {
          throw new Error("Could not find topics for this course.");
        }
        
        const data = await response.json();
        setTopics(data.topics);
        setCourseInfo(data.course);
      } catch (err) {
        // Fallback for development if API is not yet live
        setTopics([
          { id: "topic1", title: "Introduction & Overview", description: "Foundational concepts and course roadmap.", questionsCount: 12 },
          { id: "topic2", title: "Key Concepts and Definitions", description: "Deep dive into core terminology.", questionsCount: 28 },
          { id: "topic3", title: "Practical Applications", description: "How to apply theories in real-world scenarios.", questionsCount: 15 },
          { id: "topic4", title: "Challenges and FAQs", description: "Common pain points and troubleshooting.", questionsCount: 42 },
          { id: "topic5", title: "Final Review & Summary", description: "Exam prep and key takeaway discussion.", questionsCount: 9 },
        ]);
        setCourseInfo({ code: courseCode, title: "Course Materials" });
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [params.course, courseCode]);

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-6 sm:p-8 md:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumbs / Back Navigation */}
        <Link 
          href="/students/courses/qna" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to all courses
        </Link>

        {/* Header */}
        <div className="mb-12">
          <span className="text-[#035b77] font-black text-xs uppercase tracking-[0.2em] mb-2 block">
            Discussion Forum
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {courseInfo?.code}: {courseInfo?.title}
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Join a specific module discussion below. Connect with tutors and students to solve problems in real-time.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#035b77]" size={40} />
            <p className="text-gray-500 font-medium animate-pulse">Loading discussion modules...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl flex items-center gap-4 text-red-500">
            <AlertCircle size={24} />
            <p className="font-bold">{error}</p>
          </div>
        )}

        {/* Topics List */}
        {!loading && !error && (
          <div className="grid gap-4">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/students/courses/qna/${params.course}/topics/${topic.id}`}
                  className="group flex items-center justify-between bg-gray-900 border border-gray-800 p-6 rounded-[2rem] hover:border-[#035b77]/50 hover:bg-gray-900/50 transition-all shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex bg-[#035b77]/10 w-14 h-14 rounded-2xl items-center justify-center text-[#035b77] group-hover:bg-[#035b77] group-hover:text-white transition-all">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#035b77] transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{topic.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-gray-950 px-2 py-1 rounded border border-gray-800 text-gray-400">
                          {topic.questionsCount} Questions
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && topics.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-800 rounded-[3rem]">
            <p className="text-gray-500">No discussion topics found for this course yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}