"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  ArrowLeft,
  X,
  Expand,
  Minimize,
  FileQuestion,
  ClipboardCheck,
  BookOpen,
  Loader2,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";

// --- Interfaces ---
interface Caption {
  text: string;
  time: number;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  captions: Caption[];
}

export default function CourseVideoList() {
  const { courseCode } = useParams();
  const router = useRouter();
  
  // State Management
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedVideo, setSelectedVideo] = useState<Topic | null>(null);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [currentCaption, setCurrentCaption] = useState("");
  const [videoTime, setVideoTime] = useState(0);
  const videoRef = useRef<HTMLIFrameElement | null>(null);

  // --- API Fetching ---
  const fetchCourseTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your actual endpoint e.g., `/api/courses/${courseCode}/videos`
      const response = await fetch(`/api/video-lessons?course=${courseCode}`);
      
      if (!response.ok) throw new Error("Failed to load course topics");
      
      const data = await response.json();
      setTopics(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A connection error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseCode) fetchCourseTopics();
  }, [courseCode]);

  // Simulate video progress for captions
  useEffect(() => {
    if (!selectedVideo) return;
    const interval = setInterval(() => {
      setVideoTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedVideo]);

  // Handle caption logic
  useEffect(() => {
    if (!selectedVideo || !showCaptions) return;
    const activeCaption = [...selectedVideo.captions]
      .reverse()
      .find((c) => c.time <= videoTime);
    
    setCurrentCaption(activeCaption ? activeCaption.text : "Playing...");
  }, [videoTime, selectedVideo, showCaptions]);

  return (
    <div className="min-h-screen bg-gray-950 px-4 sm:px-8 py-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-400 hover:text-blue-300 transition group"
        >
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <h1 className="text-2xl font-bold uppercase tracking-tight">
          {courseCode} <span className="text-gray-500 mx-2">»</span> Video Lessons
        </h1>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-10">
        <h2 className="text-xl font-semibold text-blue-500">Watch & Learn from Expert Tutors</h2>
        <p className="text-gray-400 mt-2 max-w-xl mx-auto">Select a topic to begin your visual learning journey.</p>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
          <p className="text-gray-400">Loading lesson modules...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-900 rounded-2xl border border-red-900/50">
          <AlertCircle className="text-red-500 mb-4" size={40} />
          <p className="text-gray-200 font-medium">{error}</p>
          <button 
            onClick={fetchCourseTopics}
            className="mt-4 flex items-center gap-2 bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCcw size={16} /> Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.length > 0 ? (
            topics.map((topic) => (
              <motion.div
                key={topic.id}
                whileHover={{ y: -5 }}
                className="bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedVideo(topic);
                  setVideoTime(0);
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors">
                    {topic.title}
                  </h3>
                  <PlayCircle className="text-blue-500 group-hover:scale-110 transition-transform" size={28} />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {topic.description}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-gray-900 rounded-2xl border border-dashed border-gray-700">
              <p className="text-gray-500">No video topics found for {courseCode} yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden transition-all duration-300 ${
                isFullWidth ? "w-full h-full rounded-none" : "max-w-4xl w-full"
              }`}
            >
              {/* Modal Controls */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button onClick={() => setIsFullWidth(!isFullWidth)} className="p-2 bg-black/50 rounded-full hover:bg-black/80 text-white transition">
                  {isFullWidth ? <Minimize size={20} /> : <Expand size={20} />}
                </button>
                <button onClick={() => setSelectedVideo(null)} className="p-2 bg-red-600/20 rounded-full hover:bg-red-600 text-white transition">
                  <X size={20} />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  ref={videoRef}
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-none"
                ></iframe>
              </div>

              {/* Caption Overlay */}
              {showCaptions && (
                <div className="bg-blue-600/90 text-white text-center py-3 px-6 font-medium text-sm sm:text-base">
                  <motion.p key={currentCaption} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {currentCaption}
                  </motion.p>
                </div>
              )}

              {/* Details & Action Bar */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedVideo.title}</h2>
                    <button 
                      onClick={() => setShowCaptions(!showCaptions)}
                      className="text-blue-400 text-xs mt-1 hover:underline"
                    >
                      {showCaptions ? "Disable Captions" : "Enable Captions"}
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => router.push(`/students/courses/quiz/${courseCode}`)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-xl hover:bg-blue-600 transition text-sm">
                      <FileQuestion size={16} /> Quiz
                    </button>
                    <button onClick={() => router.push(`/students/courses/exam/${courseCode}`)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition text-sm">
                      <BookOpen size={16} /> Exam
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}