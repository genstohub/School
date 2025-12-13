"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { XCircle } from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  bio: string;
  experience: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Mr. Abah Clement",
    specialty: "Microbiologist",
    image: "/images/Clement-removebg-preview.png",
    bio: "Mr. Abah Clement  has 10+ years of experience in sustainable farming techniques and crop management. She’s passionate about mentoring the next generation of agricultural innovators.",
    experience: "Over 10 years of mentoring students in modern farming practices, irrigation systems, and climate-smart agriculture. Currently leads a research team in precision farming.",
  },
  {
    id: 2,
    name: "Prof. James Williams",
    specialty: "AgriTech & Data Analysis",
    image: "/images/mentor2.jpg",
    bio: "Professor Williams focuses on applying AI and data analytics to improve agricultural yield. He’s mentored hundreds of students globally.",
    experience: "Expert in agricultural data modeling, IoT-based soil monitoring, and AI-driven crop yield predictions. Former consultant at GreenData Labs.",
  },
  {
    id: 3,
    name: "Dr. Cynthia Parker",
    specialty: "Farm Management",
    image: "/images/mentor3.jpg",
    bio: "Dr. Parker is a certified agribusiness consultant helping young farmers transition into profitable and sustainable business models.",
    experience: "15+ years of experience managing agribusiness startups. Skilled in project financing, farm budgeting, and agro-export management.",
  },
];

export default function MentorsPage() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const handleRequest = () => {
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setSelectedMentor(null);
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-gray-900 text-gray-800 pb-16 mt-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-600 border-8 rounded-4xl to-blue-800 text-white py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
        >
          Meet Your Course Mentors
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-blue-100"
        >
          Learn directly from industry professionals who will guide and shape your success path.
        </motion.p>
      </div>

      {/* Intro Paragraph */}
      <div className="max-w-4xl mx-auto mt-10 px-4 text-center">
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          Our mentors bring years of academic excellence and real-world experience to help you grow.
          Select a mentor that aligns with your course and career interest, and send a request to start your mentorship journey.
        </p>
      </div>

      {/* Mentor Cards */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {mentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-6 border hover:border-blue-500 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedMentor(mentor)}
          >
            <div className="w-full h-60 relative rounded-xl overflow-hidden mb-4">
              <Image
                src={mentor.image}
                alt={mentor.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="font-semibold text-lg text-gray-800">{mentor.name}</h2>
            <p className="text-sm text-blue-600 mb-2">{mentor.specialty}</p>
            <p className="text-gray-600 text-sm line-clamp-3">{mentor.bio}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <motion.div
            className="fixed inset-0 bg-bure bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-[92%] sm:w-[85%] md:w-[70%] lg:w-[45%] max-h-[90vh] overflow-y-auto relative p-6"
            >
              <button
                onClick={() => setSelectedMentor(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition"
              >
                <XCircle size={30} />
              </button>

              <div className="flex flex-col items-center text-center space-y-3 mt-4">
                <div className="w-28 h-28 relative rounded-full overflow-hidden border-4 border-blue-200">
                  <Image
                    src={selectedMentor.image}
                    alt={selectedMentor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-xl font-semibold text-gray-900">{selectedMentor.name}</h2>
                <p className="text-blue-600 text-sm">{selectedMentor.specialty}</p>
              </div>

              <div className="mt-6 text-gray-700 text-sm sm:text-base space-y-3 px-2 text-left">
                <p>{selectedMentor.bio}</p>
                <p>{selectedMentor.experience}</p>
              </div>

              <div className="mt-8 flex justify-center">
                {requestSuccess ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 font-medium"
                  >
                    Request sent successfully
                  </motion.p>
                ) : (
                  <button
                    onClick={handleRequest}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition"
                  >
                    Request Mentor
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}