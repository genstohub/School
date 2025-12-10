"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaUsers, FaLightbulb, FaChalkboardTeacher } from "react-icons/fa";

const collaborators = [
  {
    id: 1,
    name: "HarvardX",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Harvard_shield_wreath.svg",
  },
  {
    id: 2,
    name: "MIT OpenCourseWare",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/MIT_logo.svg",
  },
  {
    id: 3,
    name: "Coursera",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Coursera_logo_2020.svg",
  },
];

export default function AboutPage() {
  const [current, setCurrent] = useState(0);

  // Cycle collaborators
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % collaborators.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-12 w-full min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden">
      {/* Header */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Prep Center
      </motion.h1>

      {/* Challenges */}
      <motion.p
        className="max-w-3xl text-gray-700 leading-relaxed mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Students today face challenges such as limited access to the right learning resources, lack of mentorship, and difficulty balancing academics with personal development. Many struggle with practical application after school, which affects their academic performance and overall growth.
      </motion.p>

      {/* Vision, Mission, Objectives, Benefits */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }} // 👈 Animate again on scroll up/down
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.3, // cards load one after another
            },
          },
        }}
      >
        {/* Vision */}
        <motion.div
          className="p-6 bg-white rounded-2xl shadow-md text-left"
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <FaLightbulb className="text-yellow-500 w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold mb-2">Vision</h2>
          <p className="text-gray-600">
            To empower every student with accessible, practical, and guided learning experiences that prepare them for academic success and real-world application.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          className="p-6 bg-white rounded-2xl shadow-md text-left"
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <FaChalkboardTeacher className="text-indigo-500 w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold mb-2">Mission</h2>
          <p className="text-gray-600">
            To provide high-quality mentorship, structured resources, and academic support systems that enable students to thrive both in their studies and beyond.
          </p>
        </motion.div>

        {/* Objectives */}
        <motion.div
          className="p-6 bg-white rounded-2xl shadow-md text-left"
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <FaUsers className="text-green-500 w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold mb-2">Objectives</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Enhance access to mentorship and academic guidance.</li>
            <li>Bridge the gap between theory and practice.</li>
            <li>Promote balanced academic and personal growth.</li>
          </ul>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="p-6 bg-white rounded-2xl shadow-md text-left"
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <FaCheckCircle className="text-blue-500 w-8 h-8 mb-3" />
          <h2 className="text-xl font-bold mb-2">Benefits</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Access to curated resources.</li>
            <li>Personalized mentorship programs.</li>
            <li>Academic support and practice sessions.</li>
            <li>Opportunities for collaboration and networking.</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Collaborators */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Collaborators</h2>
        <div className="relative w-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={collaborators[current].id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <Image
                src={collaborators[current].logo}
                alt={collaborators[current].name}
                width={100}
                height={100}
                className="h-16 md:h-24 mb-4"
              />
              <p className="text-lg font-semibold text-gray-700">
                {collaborators[current].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}