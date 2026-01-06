"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, ClipboardList, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

// --- Interfaces ---
interface TopicContent {
  id: string;
  title: string;
  tasks: number;
  dueDate?: string;
  description?: string;
}

interface CourseData {
  courseName: string;
  topics: TopicContent[];
}

export default function TestPage() {
  const params = useParams();
  const courseId = params.course as string;

  // --- States ---
  const [data, setData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourseContent() {
      try {
        setLoading(true);
        setError(null);

        // --- REST API CALL ---
        // Replace with your actual endpoint: e.g., `/api/students/courses/${courseId}/assignments`
        const response = await fetch(`/api/students/courses/test/${courseId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch topics for this course.");
        }

        const result: CourseData = await response.json();
        setData(result);
      } catch (err) {
        // Fallback data for testing/UI development
        console.error("Fetch error:", err);
        setError("Unable to load assignments. Please check your connection.");
        
        // Mock fallback if API is not ready
        setData({
          courseName: courseId.toUpperCase(),
          topics: [
            { id: "1", title: "Module 1 Assessment", tasks: 5, description: "Covering introductory concepts." },
            { id: "2", title: "Mid-Semester Quiz", tasks: 20, description: "Comprehensive test on all weeks 1-6." },
          ]
        });
      } finally {
        setLoading(false);
      }
    }

    if (courseId) {
      fetchCourseContent();
    }
  }, [courseId]);

  return (
    <main className="min-h-screen bg-gray-950 p-4 sm:p-6 md:p-10 text-gray-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <Link 
          href="/students/courses/test" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#035b77] transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Course Selection
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#035b77] text-xs font-black uppercase tracking-widest mb-2 block">
            Available Assessments
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">
            {data?.courseName || courseId.toUpperCase()}
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Select a specific module or assignment below to begin your test or view submission requirements.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-[#035b77]" size={40} />
            <p className="text-gray-500 animate-pulse font-medium">Fetching contents from server...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-500 mb-10 max-w-md mx-auto">
            <AlertCircle size={20} />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        {/* Topics Grid */}
        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/students/courses/test/${courseId}/topics/${topic.id}`}
                  className="block group bg-gray-900 border border-gray-800 rounded-[2rem] p-6 hover:border-[#035b77]/50 hover:bg-gray-900/50 transition-all shadow-xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#035b77]/5 rounded-full -mr-8 -mt-8 blur-2xl group-hover:bg-[#035b77]/10 transition-all" />
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#035b77]/10 p-3 rounded-2xl text-[#035b77] group-hover:bg-[#035b77] group-hover:text-white transition-all">
                      <FileText size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {topic.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                    {topic.description || "Click to view detailed content and tasks for this module."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#035b77]">
                      {topic.tasks} Questions/Tasks
                    </span>
                    <span className="text-[10px] font-bold text-gray-600 italic">
                      Due: {topic.dueDate || "N/A"}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && data?.topics.length === 0 && (
          <div className="text-center py-20 bg-gray-900/50 rounded-[3rem] border border-dashed border-gray-800">
            <ClipboardList className="w-12 h-12 mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500 font-medium">No active assignments found for this course.</p>
          </div>
        )}
      </div>
    </main>
  );
}