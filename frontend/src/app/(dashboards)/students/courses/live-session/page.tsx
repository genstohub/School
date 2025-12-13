"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const liveSessions = [
  {
    id: 1,
    title: "Advanced JavaScript Techniques",
    code: "JS302",
    viewers: 245,
    description:
      "Join this live coding session to explore modern JavaScript patterns and real-world use cases.",
    thumbnail:
      "https://images.unsplash.com/photo-1581091012184-5c1f3b0a8b4b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Machine Learning with Python",
    code: "ML210",
    viewers: 378,
    description:
      "Discover how to build, train, and evaluate machine learning models in real time.",
    thumbnail:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Blockchain in Modern Systems",
    code: "BC401",
    viewers: 192,
    description:
      "Understand blockchain fundamentals and how they impact decentralized applications.",
    thumbnail:
      "https://images.unsplash.com/photo-1623794369195-7ffb8a03a0a4?auto=format&fit=crop&w=1000&q=80",
  },
];

const LiveSessionsPage = () => {
  return (
    <section className="min-h-screen bg-gray-900 pb-16">
      {/* Hero Section */}
      <div className="bg-[#035b77] text-white py-16 px-6 text-center rounded-b-3xl shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          Course Live Sessions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
        >
          Watch and learn from expert instructors in real time. Join the session,
          ask questions, and interact with other learners.
        </motion.p>
      </div>

      {/* Live Sessions List */}
      <div className="px-6 mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {liveSessions.map((session) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={session.thumbnail}
              alt={session.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800">
                {session.title}
              </h2>
              <p className="text-gray-500 text-sm mb-2">{session.code}</p>
              <p className="text-gray-600 mb-4">{session.description}</p>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-500">
                  <Eye className="w-5 h-5 mr-2" />
                  <span>{session.viewers} watching</span>
                </div>

                <Link href={`/dashboards/students/courses/live-session/${session.id}`}>
                  <Button className="bg-[#035b77] text-white hover:bg-[#02475c] transition">
                    Join Live
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LiveSessionsPage;
