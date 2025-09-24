"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, User, Calendar, X, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

type Event = {
  id: number;
  course: string;
  topic: string;
  tutor: string;
  date: string; // ISO format
};

const events: Event[] = [
  {
    id: 1,
    course: "B.Sc Civil Engineering",
    topic: "Structural Analysis Basics",
    tutor: "Dr. John Smith",
    date: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 2,
    course: "B.Sc Computer Science",
    topic: "Intro to Machine Learning",
    tutor: "Prof. Jane Doe",
    date: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
  },
  {
    id: 3,
    course: "MBA Business Administration",
    topic: "Global Business Strategies",
    tutor: "Dr. Michael Lee",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
  },
];

function Countdown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date(date);
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Live");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <Calendar className="w-4 h-4 text-green-600" />
      <span className={timeLeft === "Live" ? "text-red-600 font-semibold" : ""}>
        {timeLeft}
      </span>
    </div>
  );
}

export default function UpcomingEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // auto-cycle every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // get 2 events on desktop/tablet, 1 on mobile
  const visibleEvents =
    typeof window !== "undefined" && window.innerWidth < 640
      ? [events[currentIndex % events.length]]
      : [
          events[currentIndex % events.length],
          events[(currentIndex + 1) % events.length],
        ];

  const openModal = (event: Event) => {
    setActiveEvent(event);
    setSubmitted(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setIsModalOpen(false), 2000);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") {
        const currentIdx = events.findIndex((ev) => ev.id === activeEvent?.id);
        setActiveEvent(events[(currentIdx + 1) % events.length]);
      }
      if (e.key === "ArrowLeft") {
        const currentIdx = events.findIndex((ev) => ev.id === activeEvent?.id);
        setActiveEvent(
          events[(currentIdx - 1 + events.length) % events.length]
        );
      }
      if (e.key === "Escape") setIsModalOpen(false);
    },
    [isModalOpen, activeEvent]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {visibleEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => openModal(event)}
                className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-lg text-gray-800">
                    {event.course}
                  </h3>
                </div>
                <p className="text-gray-600 mb-2">{event.topic}</p>
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                  <User className="w-4 h-4 text-gray-500" />
                  <span>{event.tutor}</span>
                </div>
                <Countdown date={event.date} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {isModalOpen && activeEvent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {!submitted ? (
                <>
                  <h3 className="text-xl font-bold mb-4">
                    {activeEvent.course}
                  </h3>
                  <p className="text-gray-600 mb-4">{activeEvent.topic}</p>
                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{activeEvent.tutor}</span>
                  </div>
                  <Countdown date={activeEvent.date} />

                  <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                      Reserve
                    </button>
                  </form>

                  {/* Modal Nav */}
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() =>
                        setActiveEvent(
                          events[
                            (events.findIndex((e) => e.id === activeEvent.id) -
                              1 +
                              events.length) %
                              events.length
                          ]
                        )
                      }
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft className="w-4 h-4" /> 
                    </button>
                    <button
                      onClick={() =>
                        setActiveEvent(
                          events[
                            (events.findIndex((e) => e.id === activeEvent.id) +
                              1) %
                              events.length
                          ]
                        )
                      }
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                    <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                  <p className="text-lg font-semibold text-green-700">
                    Successfully Reserved!
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}