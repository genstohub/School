"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  X,
  Clock,
  FileQuestion,
  Edit3,
  ClipboardList,
} from "lucide-react";

interface Topic {
  id: number;
  title: string;
  content: string;
  duration: string;
}

export default function MTH101Page() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  // Simulate loading for demonstration (3 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 600); 
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch topics from backend (example placeholder)
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("https://your-backend-api.com/api/mth101/topics");
        if (!res.ok) throw new Error("poor network connection");
        const data = await res.json();
        setTopics(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unexpected error occurred");
      }
    };
    fetchTopics();
  }, []);

  const filteredTopics = topics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen bg-gray-900 text-white px-4 sm:px-6 py-6 lg:px-8 relative overflow-hidden transition-transform duration-500 ${
        selectedTopic ? "scale-95" : "scale-100"
      }`}
    >
      {/* Animated Loading Spinner */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900/95 z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              animate={{
                rotate: 360,
                opacity: [0.3, 1, 0.3],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
              }}
              className="border-4 border-blue-500 border-t-transparent rounded-full w-16 h-16 mb-6 shadow-lg"
            />
            <motion.p
              className="text-gray-300 text-lg font-medium"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Loading topics...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="text-center mb-10">
        <div className="flex justify-center mb-3">
          <BookOpen size={40} className="text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-blue-400">MTH101 - Calculus I</h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          Welcome to Calculus I! Explore key topics such as differentiation,
          integration, and their real-world applications in mathematics and science.
        </p>
      </section>

      {/* Search Bar */}
      <div className="max-w-lg mx-auto mb-8">
        <input
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 404-style Error */}
      {error && (
        <motion.div
          className="flex flex-col items-center justify-center mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-2">Oops! Something went wrong.</p>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* Topics List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {filteredTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic);
                setFeedback("");
              }}
              className="p-5 rounded-2xl text-left transition duration-200 bg-gray-800 hover:bg-blue-700 hover:text-white shadow-md"
            >
              <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Clock size={14} /> {topic.duration}
              </div>
              <p className="text-sm text-gray-400 line-clamp-2">{topic.content}</p>
            </button>
          ))}

          {filteredTopics.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">
              No topics found.
            </p>
          )}
        </div>
      )}

      {/* Animated Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 w-[90%] max-w-3xl rounded-2xl p-6 relative shadow-2xl"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button
                onClick={() => setSelectedTopic(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">
                {selectedTopic.title}
              </h2>

              <div className="flex justify-center items-center gap-2 mb-6 text-gray-400">
                <Clock size={16} /> <span>{selectedTopic.duration}</span>
              </div>

              <p className="text-gray-300 leading-relaxed mb-8">
                {selectedTopic.content}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setFeedback("up")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    feedback === "up"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <ThumbsUp size={20} /> Helpful
                </button>

                <button
                  onClick={() => setFeedback("down")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    feedback === "down"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <ThumbsDown size={20} /> Not Helpful
                </button>

                <button
                  onClick={() => router.push("/dashboard/students/course/cbt")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white"
                >
                  <Edit3 size={20} /> CBT
                </button>

                <button
                  onClick={() => router.push("/dashboard/students/course/quiz")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white"
                >
                  <FileQuestion size={20} /> Quiz
                </button>

                <button
                  onClick={() => router.push("/dashboard/students/course/exam")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 transition text-white"
                >
                  <ClipboardList size={20} /> Exam
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}