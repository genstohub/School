"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SessionClasses() {
  const courses = [
    {
      title: "B.Sc Computer Science",
      about: "About",
      description:
        "Learn algorithms, programming, and cutting-edge technology to build the future of computing.",
      link: "#",
      bg: "bg-gradient-to-r from-sky-500 to-blue-700 text-white",
    },
    {
      title: "B.Sc Business Administration",
      about: "About",
      description:
        "Gain management, finance, and leadership skills to succeed in the business world.",
      link: "#",
      bg: "bg-gradient-to-r from-emerald-400 to-green-600 text-white",
    },
    {
      title: "B.A. English Literature",
      about: "About",
      description:
        "Explore classics, modern literature, and creative writing to sharpen your analytical skills.",
      link: "#",
      bg: "bg-gradient-to-r from-purple-400 to-indigo-600 text-white",
    },
    {
      title: "B.Sc Mathematics",
      about: "About",
      description:
        "Develop analytical thinking, problem-solving, and logical reasoning with advanced mathematics.",
      link: "#",
      bg: "bg-gradient-to-r from-pink-400 to-rose-600 text-white",
    },
    {
      title: "B.Sc Economics",
      about: "About",
      description:
        "Understand markets, finance, and policies with a foundation in modern economic theory.",
      link: "#",
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900",
    },
    {
      title: "B.Eng Mechanical Engineering",
      about: "About",
      description:
        "Design, build, and innovate machines and structures that power industries and societies.",
      link: "#",
      bg: "bg-gradient-to-r from-gray-700 to-black text-white",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % courses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [courses.length]);

  // Motion variants
  const container = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.3,
        staggerDirection: -1, // exit in reverse order
      },
    },
  };

  const card = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  // Detect screen size → how many cards to show
  const getCardsPerScreen = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 1;
    }
    return 1;
  };

  const [cardsPerScreen, setCardsPerScreen] = useState(getCardsPerScreen);

  useEffect(() => {
    const handleResize = () => setCardsPerScreen(getCardsPerScreen());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative bg-gray-50 py-16 px-6 lg:px-20 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Session Classes
      </h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Array.from({ length: cardsPerScreen }).map((_, i) => {
            const course = courses[(currentIndex + i) % courses.length];
            return (
              <motion.div
                key={course.title}
                variants={card}
                transition={{ duration: 0.8 }}
                className={`relative shadow-xl p-6 rounded-lg clip-path-diagonal ${course.bg}`}
              >
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                <h3 className="text-lg font-semibold mb-1">{course.about}</h3>
                <p className="text-sm leading-relaxed mb-4">
                  {course.description}
                </p>
                <a
                  href={course.link}
                  className="font-medium flex items-center gap-2 hover:underline"
                >
                  More info →
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <style jsx>{`
        .clip-path-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
      `}</style>
    </section>
  );
}