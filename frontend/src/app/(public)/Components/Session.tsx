"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Cpu, 
  Briefcase, 
  BookOpen, 
  Binary, 
  TrendingUp, 
  Settings, 
  BarChart3, 
  ArrowRight 
} from "lucide-react";

export default function SessionClasses() {
  const courses = [
    {
      title: "B.Sc Computer Science",
      about: "About",
      icon: <Cpu size={24} />,
      description:
        "Learn algorithms, programming, and cutting-edge technology to build the future of computing.",
      href: "/computer",
      bg: "bg-gradient-to-r from-sky-500 to-blue-700 text-white",
    },
    {
      title: "B.Sc Business Administration",
      about: "About",
      icon: <Briefcase size={24} />,
      description:
        "Gain management, finance, and leadership skills to succeed in the business world.",
      href: "/business-admin",
      bg: "bg-gradient-to-r from-emerald-400 to-green-600 text-white",
    },
    {
      title: "B.A. English Literature",
      about: "About",
      icon: <BookOpen size={24} />,
      description:
        "Explore classics, modern literature, and creative writing to sharpen your analytical skills.",
      href: "/english",
      bg: "bg-gradient-to-r from-purple-400 to-indigo-600 text-white",
    },
    {
      title: "B.Sc Mathematics",
      about: "About",
      icon: <Binary size={24} />,
      description:
        "Develop analytical thinking, problem-solving, and logical reasoning with advanced mathematics.",
      href: "/mathematics",
      bg: "bg-gradient-to-r from-pink-400 to-rose-600 text-white",
    },
    {
      title: "B.Sc Economics",
      about: "About",
      icon: <TrendingUp size={24} />,
      description:
        "Understand markets, finance, and policies with a foundation in modern economic theory.",
      href: "/economics",
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900",
    },
    {
      title: "B.Eng Mechanical Engineering",
      about: "About",
      icon: <Settings size={24} />,
      description:
        "Design, build, and innovate machines and structures that power industries and societies.",
      href: "/mechanical",
      bg: "bg-gradient-to-r from-gray-700 to-black text-white",
    },
    {
      title: "B.Sc Statistics",
      about: "About",
      icon: <BarChart3 size={24} />,
      description:
        "Understand markets, finance, and policies with a foundation in modern economic theory.",
      href: "/statistics",
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % courses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [courses.length]);

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
        staggerDirection: -1,
      },
    },
  };

  const card = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Degree Programs
        </h1>
        <Link 
          href="/programs" 
          className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all uppercase text-sm tracking-widest"
        >
          View More <ArrowRight size={18} />
        </Link>
      </div>

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
              >
                <Link
                  href={course.href}
                  className={`block relative shadow-xl p-6 rounded-lg clip-path-diagonal hover:scale-105 transition-transform duration-300 ${course.bg}`}
                >
                  <div className="mb-4 opacity-80">{course.icon}</div>
                  <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                  <h3 className="text-lg font-semibold mb-1">{course.about}</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>
                  <span className="font-medium flex items-center gap-2">
                    More info →
                  </span>
                </Link>
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