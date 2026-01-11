"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { courses } from "@/constants";
import {
    Search,
    BookOpen,
    Calculator,
    Atom,
    FlaskConical,
    Binary,
    Languages,
    Sprout,
    BarChart3,
    ShieldAlert,
    X,
    Loader2,
    RefreshCcw,
    WifiOff,
    LucideIcon
} from "lucide-react";

// // --- Types & Interfaces ---
// interface Course {
//     id: string;
//     title: string;
//     desc: string;
// }

interface Topic {
    title: string;
    slug: string;
}

// --- Icons Mapping for Courses ---
const getIcon = (title: string): LucideIcon => {
    const code = title.split(" ")[0].toUpperCase();
    if (code === "MTH") return Calculator;
    if (code === "PHY") return Atom;
    if (code === "CHM") return FlaskConical;
    if (code === "BIO") return BookOpen;
    if (code === "STA") return BarChart3;
    if (code === "CMP") return Binary;
    if (code === "GST") return Languages;
    if (code === "AGR") return Sprout;
    return BookOpen;
};

export default function StudyMatePage() {
    const [search, setSearch] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTopics = async (courseId: string) => {
        setLoading(true);
        setError(null);
        setTopics([]);

        try {
            const response = await fetch(`/api/courses/${courseId}/topics`);

            if (!response.ok) throw new Error("Could not connect to server");

            const data = await response.json();
            setTopics(data.topics || []);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(
                    "Failed to fetch topics. Please check your network connection."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCourseClick = (course: Course) => {
        setSelectedCourse(course);
        fetchTopics(course.id);
    };

    const filteredCourses = courses.filter(
        course =>
            course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.desc.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="min-h-screen bg-black p-4 sm:p-6 md:p-10 relative">
            <motion.h1 className="text-3xl md:text-4xl font-bold text-center text-gray-300 mb-6">
                Study Mate
            </motion.h1>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-10">
                <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-900 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                </div>
            </div>

            {/* Course Cards Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredCourses.map((course, index) => {
                    const Icon = getIcon(course.title);
                    return (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.02 }}
                            onClick={() => handleCourseClick(course)}
                            className="cursor-pointer group bg-gray-800 rounded-2xl p-5 min-h-[160px] border border-gray-700 hover:border-blue-500 transition-all flex flex-col items-center justify-center text-center shadow-lg"
                        >
                            <Icon className="text-blue-500 group-hover:text-blue-400 w-8 h-8 mb-3 transition-colors" />
                            <h2 className="text-white font-bold text-lg">
                                {course.title}
                            </h2>
                            <p className="text-gray-400 text-xs mt-2 line-clamp-2">
                                {course.desc}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Topic Selection Modal */}
            <AnimatePresence>
                {selectedCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/50">
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {selectedCourse.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                        {selectedCourse.desc}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedCourse(null)}
                                    className="p-2 hover:bg-gray-700 rounded-full transition text-gray-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 max-h-[60vh] overflow-y-auto">
                                {loading ? (
                                    <div className="flex flex-col items-center py-10">
                                        <Loader2 className="animate-spin text-blue-500 w-10 h-10 mb-2" />
                                        <p className="text-gray-400">
                                            Fetching topics...
                                        </p>
                                    </div>
                                ) : error ? (
                                    <div className="flex flex-col items-center py-10 text-center">
                                        <WifiOff className="text-red-500 w-12 h-12 mb-4" />
                                        <p className="text-gray-300 mb-4">
                                            {error}
                                        </p>
                                        <button
                                            onClick={() =>
                                                fetchTopics(selectedCourse.id)
                                            }
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
                                        >
                                            <RefreshCcw size={18} /> Retry
                                        </button>
                                    </div>
                                ) : topics.length > 0 ? (
                                    <div className="space-y-3">
                                        {topics.map((topic, i) => (
                                            <Link
                                                key={i}
                                                href={`/students/study-mate/${selectedCourse.id}/${topic.slug}`}
                                                className="block p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 rounded-xl transition group"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-200 group-hover:text-white font-medium">
                                                        {topic.title}
                                                    </span>
                                                    <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        Study Now →
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center py-10 text-center">
                                        <ShieldAlert className="text-yellow-500 w-12 h-12 mb-4" />
                                        <p className="text-gray-300 font-medium">
                                            No topics available yet
                                        </p>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Our team is currently uploading
                                            materials for this course.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
