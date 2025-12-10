"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  PlayCircle,
  ArrowLeft,
  X,
  Expand,
  Minimize,
  FileQuestion,
  ClipboardCheck,
  BookOpen,
} from "lucide-react";

// Course Topics & Timed Captions
const courseTopics: Record<
  string,
  {
    title: string;
    description: string;
    videoUrl: string;
    captions: { text: string; time: number }[];
  }[]
> = {
  MTH101: [
    {
      title: "Introduction to Algebra",
      description: "Understand the fundamentals of algebraic expressions and equations.",
      videoUrl: "https://www.youtube.com/embed/Zx3S4J-fQ54",
      captions: [
        { text: "Welcome to Introduction to Algebra.", time: 2 },
        { text: "We’ll explore algebraic expressions and variables.", time: 6 },
        { text: "Let’s simplify and solve some basic equations.", time: 12 },
      ],
    },
    {
      title: "Linear Equations and Graphs",
      description: "Learn how to solve linear equations and represent them graphically.",
      videoUrl: "https://www.youtube.com/embed/lZB9FJpD2Ks",
      captions: [
        { text: "Understanding slope and intercepts.", time: 3 },
        { text: "Graphical representation of equations.", time: 8 },
      ],
    },
  ],

  PHY101: [
    {
      title: "Introduction to Mechanics",
      description: "Discover the foundation of physics — motion, force, and energy.",
      videoUrl: "https://www.youtube.com/embed/Y4Y6VxVjFh4",
      captions: [
        { text: "Welcome to Mechanics.", time: 2 },
        { text: "We’ll explore motion and Newton’s laws.", time: 8 },
      ],
    },
    {
      title: "Kinematics and Dynamics",
      description: "Study how objects move and what causes their motion.",
      videoUrl: "https://www.youtube.com/embed/UC8E7j4JQwY",
      captions: [
        { text: "Velocity, acceleration, and forces.", time: 5 },
        { text: "Equations of motion and examples.", time: 12 },
      ],
    },
  ],

  STA101: [
    {
      title: "Introduction to Statistics",
      description: "Learn the basics of data collection and organization.",
      videoUrl: "https://www.youtube.com/embed/xxpc-HPKN28",
      captions: [
        { text: "Welcome to Statistics 101.", time: 3 },
        { text: "Data, frequency tables, and graphs.", time: 9 },
      ],
    },
    {
      title: "Measures of Central Tendency",
      description: "Understand mean, median, and mode with real-world examples.",
      videoUrl: "https://www.youtube.com/embed/T2uCw7G-j6w",
      captions: [
        { text: "Defining mean, median, and mode.", time: 4 },
        { text: "Examples and interpretation.", time: 10 },
      ],
    },
  ],

  BIO101: [
    {
      title: "Introduction to Biology",
      description: "Explore life and living organisms at the cellular level.",
      videoUrl: "https://www.youtube.com/embed/EJxwWpaGojs",
      captions: [
        { text: "Welcome to Biology 101.", time: 2 },
        { text: "The cell: structure and function.", time: 7 },
      ],
    },
    {
      title: "Cell Structure and Function",
      description: "Understand the components of the cell and their functions.",
      videoUrl: "https://www.youtube.com/embed/URUJD5NEXC8",
      captions: [
        { text: "Cell membrane and organelles.", time: 5 },
        { text: "Cell processes and reproduction.", time: 11 },
      ],
    },
  ],

  GEO101: [
    {
      title: "Introduction to Geography",
      description: "Learn about the Earth, its features, and spatial relationships.",
      videoUrl: "https://www.youtube.com/embed/74dC5t6gVyo",
      captions: [
        { text: "Welcome to Geography 101.", time: 3 },
        { text: "Earth and its spatial characteristics.", time: 9 },
      ],
    },
    {
      title: "Physical and Human Geography",
      description: "Understand the physical features and human interactions with the environment.",
      videoUrl: "https://www.youtube.com/embed/xoF1vG3JHpE",
      captions: [
        { text: "Mountains, rivers, and population distribution.", time: 4 },
        { text: "How humans shape their environment.", time: 11 },
      ],
    },
  ],
};

export default function CourseVideoList() {
  const { courseCode } = useParams();
  const router = useRouter();
  const topics = courseTopics[(courseCode as string).toUpperCase()] || [];

  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    videoUrl: string;
    captions: { text: string; time: number }[];
  } | null>(null);

  const [isFullWidth, setIsFullWidth] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [currentCaption, setCurrentCaption] = useState("");
  const [videoTime, setVideoTime] = useState(0);
  const videoRef = useRef<HTMLIFrameElement | null>(null);

  // Simulate video progress
  useEffect(() => {
    if (!selectedVideo) return;
    const interval = setInterval(() => {
      setVideoTime((prev) => prev + 2);
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedVideo]);

  // Handle captions
  useEffect(() => {
    if (!selectedVideo || !showCaptions) return;
    const nextCaption = selectedVideo.captions.find(
      (caption) => caption.time <= videoTime
    );
    if (nextCaption) setCurrentCaption(nextCaption.text);
  }, [videoTime, selectedVideo, showCaptions]);

  return (
    <div className="min-h-screen bg-gray-20 px-4 sm:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-white-800 uppercase">
          {courseCode} »Video Lessons
        </h1>
      </div>

      {/* Hero */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-blue-700">
          Watch & Learn from Expert Tutors
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Select any topic below to start watching.
        </p>
      </motion.div>

      {/* Topic List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.length > 0 ? (
          topics.map((topic, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition cursor-pointer"
              onClick={() =>
                setSelectedVideo({
                  title: topic.title,
                  videoUrl: topic.videoUrl,
                  captions: topic.captions,
                })
              }
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
                <PlayCircle className="text-red-600" size={24} />
              </div>
              <p className="text-gray-600 text-sm">{topic.description}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">
            No topics found for this course yet.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 border-t border-gray-200" />
      <p className="text-center text-gray-500 mt-4 text-sm">
        More video topics will be added soon.
      </p>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-blur bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div
            className={`bg-white rounded-2xl shadow-lg relative transition-all duration-300 ${
              isFullWidth ? "w-[95vw] h-[90vh]" : "max-w-3xl w-full"
            }`}
          >
            {/* Close */}
            <button
              onClick={() => {
                setSelectedVideo(null);
                setVideoTime(0);
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={22} />
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setIsFullWidth(!isFullWidth)}
              className="absolute top-3 left-3 text-gray-600 hover:text-gray-800"
            >
              {isFullWidth ? <Minimize size={22} /> : <Expand size={22} />}
            </button>

            {/* Video */}
            <div className="aspect-video w-full rounded-t-2xl overflow-hidden bg-black">
              <iframe
                ref={videoRef}
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Captions */}
            {showCaptions && (
              <div className="bg-gray-900 text-white text-sm px-4 py-3 font-medium border-t border-gray-700">
                <motion.p
                  key={currentCaption}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  {currentCaption || "Playing..."}
                </motion.p>
              </div>
            )}

            {/* Caption Controls */}
            <div className="flex justify-between px-4 py-2 text-sm text-gray-600">
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showCaptions ? "Hide Captions" : "Show Captions"}
              </button>
              <p className="text-gray-500">Time: {videoTime}s</p>
            </div>

            {/* Action Buttons */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {selectedVideo.title}
              </h2>
              <div className="flex flex-wrap gap-3 mt-3">
                <button
                  onClick={() =>
                    router.push(`/dashboards/students/courses/quiz/${courseCode}`)
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FileQuestion size={18} /> Quiz
                </button>
                <button
                  onClick={() =>
                    router.push(`/dashboards/students/courses/cbt/${courseCode}`)
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <ClipboardCheck size={18} /> CBT
                </button>
                <button
                  onClick={() =>
                    router.push(`/dashboards/students/courses/exam/${courseCode}`)
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <BookOpen size={18} /> Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}