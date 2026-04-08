"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  ChevronRight,
  Database,
  AlertCircle,
  RefreshCcw,
  SearchCode,
  FileText,
} from "lucide-react";
import { BaseApi } from "@/api";
import { FullMaterialTopicType } from "@/types";

export default function CourseMaterialTopicsPage() {
  const params = useParams();
  const courseCode = (params.course as string).toUpperCase();

  const router = useRouter();

  const [topics, setTopics] = useState<FullMaterialTopicType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const res =
        await BaseApi.Courses.Materials.GetAllCourseMaterialsWithCourseCode(
          courseCode,
        );

      if (!res.ok) {
        throw new Error(
          res.status === 404
            ? "The instructor hasn't uploaded any materials for this course yet."
            : "Server synchronization failed. Check your connection.",
        );
      }

      const data: FullMaterialTopicType[] = await res.json();
      setTopics(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to retrieve course data from the server.");
      }
    } finally {
      // Small artificial delay to ensure the "Scanning" UI is visible and smooth
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    if (params.course) {
      fetchTopics();
    }
  }, [courseCode]);

  const openTargetMaterialTopic = (material: FullMaterialTopicType) => {
    const paramToPass = new URLSearchParams();
    // You must stringify objects to pass them as a single query param
    paramToPass.set("material", JSON.stringify(material));
    router.push(`/students/courses/material/${params.course}/topics/${material.topic_id}?${paramToPass.toString()}`);
  };

  return (
    <section className="min-h-screen bg-gray-950 p-4 sm:p-6 md:p-10 text-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link
          href="/students/courses/material"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Course Catalog
        </Link>

        {/* --- 1. SCANNING / LOADING STATE --- */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#035b77]/20 blur-3xl rounded-full animate-pulse" />
                <Loader2
                  className="animate-spin text-[#035b77] relative z-10"
                  size={50}
                />
              </div>
              <h2 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-2">
                Scanning Curriculum
              </h2>
              <p className="text-gray-600 text-[10px] font-medium uppercase tracking-widest animate-pulse">
                Accessing {courseCode} Database...
              </p>
            </motion.div>
          ) : error ? (
            /* --- 2. ERROR STATE --- */
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-red-500/5 rounded-[3rem] border border-red-900/10 px-6"
            >
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500/50" />
              <h3 className="text-white font-bold mb-2">Fetch Error</h3>
              <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
                {error}
              </p>
              <button
                onClick={fetchTopics}
                className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 hover:bg-gray-800 text-white px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all"
              >
                <RefreshCcw size={14} /> RE-SCAN DATABASE
              </button>
            </motion.div>
          ) : topics.length > 0 ? (
            /* --- 3. SUCCESS STATE: TOPICS LIST --- */
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <header className="mb-12">
                <span className="text-[#035b77] font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">
                  Resources Found
                </span>
                <h1 className="text-4xl font-black text-white mb-2">
                  {courseCode}
                </h1>
                <p className="text-gray-500 text-sm">
                  Select a specific topic to begin your study session.
                </p>
              </header>

              <div className="grid grid-cols-1 gap-4">
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.topic_id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      onClick={() => openTargetMaterialTopic(topic)}
                      className="group flex items-center justify-between bg-gray-900/50 border border-gray-800 p-6 rounded-[2rem] hover:border-[#035b77]/50 hover:bg-gray-900 transition-all shadow-xl"
                    >
                      <div className="flex items-center gap-6">
                        <div className="bg-gray-950 p-4 rounded-2xl text-gray-700 group-hover:text-[#035b77] group-hover:bg-[#035b77]/5 transition-all">
                          <FileText size={22} />
                        </div>
                        <div>
                          {/* <div className="flex items-center gap-3 mb-1">
                            {topic.moduleNumber && (
                              <span className="text-[9px] font-black text-[#035b77] uppercase bg-[#035b77]/10 px-2 py-0.5 rounded-md tracking-tighter">
                                Module {topic.moduleNumber}
                              </span>
                            )}
                          </div> */}
                          <h2 className="font-bold text-white text-lg group-hover:text-white transition-colors">
                            {topic.topic}
                          </h2>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-1 font-medium italic">
                            {/* {topic.shortDescription} */}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gray-950 w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[#035b77] transition-all">
                        <ChevronRight
                          size={20}
                          className="text-gray-700 group-hover:text-white"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* --- 4. EMPTY STATE --- */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-gray-900/30 rounded-[3rem] border border-dashed border-gray-800"
            >
              <SearchCode className="w-14 h-14 mx-auto mb-4 text-gray-800" />
              <h3 className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                Curriculum Empty
              </h3>
              <p className="text-gray-600 text-xs mt-2 max-w-xs mx-auto">
                No materials have been detected for this course. Please contact
                your instructor.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
