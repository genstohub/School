"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, ClipboardList, Loader2, AlertCircle, ArrowLeft } from "lucide-react";

// 1. Strict Type Definitions
interface AssignmentTopic {
  id: string;
  title: string;
  tasks: number;
  dueDate?: string;
}

export default function AssignmentTopicsPage() {
  const params = useParams();
  const courseId = typeof params.courseId === "string" ? params.courseId : "";

  // 2. State Management for API Data
  const [topics, setTopics] = useState<AssignmentTopic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. API Fetching Logic
  useEffect(() => {
    async function fetchTopics() {
      if (!courseId) return;
      
      try {
        setIsLoading(true);
        // Replace this URL with your actual backend endpoint later
        const response = await fetch(`/api/courses/${courseId}/assignments`);
        
        if (!response.ok) {
          throw new Error("Failed to load assignments for this course.");
        }

        const data: AssignmentTopic[] = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopics();
  }, [courseId]);

  return (
    <main className="min-h-screen bg-black text-gray-200 p-4 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation & Header */}
        <Link 
          href="/students/courses/assignments"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-500 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Courses
        </Link>

        <header className="mb-12 border-l-4 border-blue-600 pl-6">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
            {courseId} <span className="text-blue-600">Topics</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Select a specific module to view tasks and submit your work.
          </p>
        </header>

        {/* 4. API State UI: Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-600">Syncing with server...</p>
          </div>
        )}

        {/* 5. API State UI: Error */}
        {error && (
          <div className="flex items-center gap-4 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] text-red-500">
            <AlertCircle size={24} />
            <div>
              <p className="font-bold uppercase text-xs tracking-widest">Connection Error</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}

        {/* 6. Topics Grid (Only shows if not loading and no error) */}
        {!isLoading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/students/courses/assignments/${courseId}/topics/${topic.id}`}
                  className="group block bg-gray-900/30 border border-gray-800 p-8 rounded-[2.5rem] hover:border-blue-500/50 hover:bg-gray-900 transition-all"
                >
                  <div className="bg-gray-950 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                    <FileText size={28} />
                  </div>
                  
                  <h3 className="text-xl font-black text-white group-hover:text-blue-500 transition-colors uppercase tracking-tight mb-2">
                    {topic.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800/50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      {topic.tasks} Active Tasks
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-950 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                      <ChevronRight size={16} className="text-gray-700 group-hover:text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* 7. API State UI: Empty */}
        {!isLoading && !error && topics.length === 0 && (
          <div className="text-center py-20 bg-gray-900/10 border border-dashed border-gray-800 rounded-[3rem]">
            <ClipboardList className="w-12 h-12 mx-auto mb-4 text-gray-800" />
            <p className="text-gray-500 font-black text-[10px] uppercase tracking-widest">No assignments found for this course</p>
          </div>
        )}
      </div>
    </main>
  );
}

// Small helper for the arrow icon used in the list
function ChevronRight({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}