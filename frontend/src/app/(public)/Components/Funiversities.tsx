"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const universities = [
  { id: 1, name: "Federal University, Lokoja", logo: "/images/ful-logo_1694711452.png" },
  { id: 2, name: "Bauchi State University", logo: "/images/Bauchi_state_university_logo.jpg" },
  { id: 3, name: "Ahmadu Bello University, Zaria", logo: "/images/abu-logo.jpg" },
  { id: 4, name: "Federal University, Lokoja", logo: "/images/ful-logo_1694711452.png" },
  { id: 5, name: "Bauchi State University", logo: "/images/Bauchi_state_university_logo.jpg" },
  { id: 6, name: "Ahmadu Bello University, Zaria", logo: "/images/abu-logo.jpg" },
];

const dropIn = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function FeaturedUniversities() {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const screenSize = window.innerWidth;
      const batchSize = screenSize < 640 ? 1 : 3; // 2 for mobile, 3 for tablet/desktop

      const newIndexes: number[] = [];
      for (let i = 0; i < batchSize; i++) {
        newIndexes.push((index + i) % universities.length);
      }
      setVisibleIndexes(newIndexes);

      index = (index + batchSize) % universities.length;
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white py-10 flex justify-center">
      <div className="flex gap-60">
        <AnimatePresence mode="wait">
          {visibleIndexes.map((idx, i) => (
            <motion.div
              key={universities[idx].id}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropIn}
              transition={{
                duration: 0.9,
                delay: i * 0.8, // stagger effect
                ease: "easeOut",
              }}
              className="min-w-[200px] sm:min-w-[240px] md:min-w-[240px] flex flex-col items-center justify-center bg-gray-100 rounded-2xl shadow-lg p-6"
            >
              <Image
                src={universities[idx].logo}
                alt={universities[idx].name}
                width={100}
                height={100}
                className="object-contain"
              />
              <p className="mt-3 text-base sm:text-lg font-semibold text-center">
                {universities[idx].name}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}