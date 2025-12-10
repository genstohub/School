/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Instructor {
  id: number;
  name: string;
  course: string;
  image: string;
  bio: string;
}

export default function VerifiedInstructors() {
  const instructors: Instructor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      course: "Computer Science",
      image: "https://via.placeholder.com/400x250",
      bio: "Dr. Sarah Johnson is a senior lecturer in computer science with 10+ years of experience in AI, algorithms, and software engineering.",
    },
    {
      id: 2,
      name: "Prof. James Williams",
      course: "Business Administration",
      image: "/images/pre.png",
      bio: "Prof. James Williams has worked extensively in entrepreneurship, finance, and leadership training for global businesses.",
    },
    {
      id: 3,
      name: "Mr. ABAH CLEMENT",
      course: "Biology Instructor ",
      image: "/images/Clement-removebg-preview.png",
      bio: "A Microbiologist with indusrty experince covering different sectors, including office of Mentorship, Instructoor/Tutor and Graphics Designe",
    },
    {
      id: 4,
      name: "Mr Emmanuel Benson",
      course: "Mechanical Engineering",
      image: "/images/Instructor_Benson-removebg-preview.png",
      bio: "Mr. Emmanuel Benson is a mechanical engineer focusing on robotics and sustainable engineering solutions for the future.",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) setCardsPerView(1); // mobile
      else if (window.innerWidth < 1024) setCardsPerView(2); // tablet
      else setCardsPerView(3); //  ;
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + cardsPerView) % instructors.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [cardsPerView, instructors.length]);

  // Visible cards
  const visibleCards = [];
  for (let i = 0; i < cardsPerView; i++) {
    visibleCards.push(instructors[(currentIndex + i) % instructors.length]);
  }

  // Random angles for animation
  const randomAngle = () => ({
    rotateX: Math.floor(Math.random() * 90 - 45),
    rotateY: Math.floor(Math.random() * 90 - 45),
    rotateZ: Math.floor(Math.random() * 30 - 15),
  });

  return (
    <section className="relative bg-white py-16 px-6 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Verified Instructors
      </h1>

      {/* Instructor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {visibleCards.map((instructor, idx) => {
            const initialAngles = randomAngle();
            const exitAngles = {
              rotateX: initialAngles.rotateX * -1,
              rotateY: initialAngles.rotateY * -1,
              rotateZ: initialAngles.rotateZ * -1,
            };
            const delay = idx * 0.3;

            return (
              <motion.div
                key={instructor.id}
                initial={{ opacity: 0, scale: 0.85, ...initialAngles }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                }}
                exit={{ opacity: 0, scale: 0.85, ...exitAngles }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                  delay,
                }}
                className="bg-gray-50 shadow-lg rounded-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-transform transform-gpu max-w-md mx-auto"
                onClick={() => setSelectedIndex(instructor.id - 1)}
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800">
                    {instructor.name}
                  </h2>
                  <p className="text-sky-700 font-medium text-base">
                    {instructor.course}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div
            key={instructors[selectedIndex].id}
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-xl shadow-2xl max-w-md md:max-w-lg w-full p-6 relative"
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <img
              src={instructors[selectedIndex].image}
              alt={instructors[selectedIndex].name}
              className="w-full max-h-72 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {instructors[selectedIndex].name}
            </h2>
            <p className="text-sky-700 font-medium mb-4">
              {instructors[selectedIndex].course}
            </p>
            <p className="text-gray-600">{instructors[selectedIndex].bio}</p>

            <div className="flex justify-between mt-6">
              <button
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + instructors.length) %
                      instructors.length
                  )
                }
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                «
              </button>
              <button
                onClick={() =>
                  setSelectedIndex((selectedIndex + 1) % instructors.length)
                }
                className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                »
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}