"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, Send } from "lucide-react";

export default function TestDetailPage() {
  const { course, topic } = useParams();
  const router = useRouter();

  // Simulated questions
  const questions = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    question: `Question ${i + 1}: Explain briefly the concept behind topic ${topic
      ?.toString()
      .replace("-", " ")
      .toUpperCase()}.`,
  }));

  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowSuccess(true);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    router.push(`/dashboards/students/courses/assignments/${course}/topics`);
  };

  return (
    <main className="min-h-screen bg-gray-900 py-8 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 sm:p-10 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#035b77]">
            {course?.toString().toUpperCase()} –{" "}
            {topic?.toString().replace("-", " ").toUpperCase()}
          </h1>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              router.push(
                `/dashboards/students/courses/test/${course}/topics`
              )
            }
            className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Return
          </motion.button>
        </div>

        {/* Assignment Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`p-4 rounded-xl border ${
                submitted ? "bg-gray-50 border-gray-200" : "border-gray-100"
              }`}
            >
              <label
                htmlFor={`q${q.id}`}
                className="block font-medium text-gray-800 mb-2"
              >
                {q.question}
              </label>
              <textarea
                id={`q${q.id}`}
                value={answers[i]}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                disabled={submitted}
                rows={3}
                placeholder="Write your answer here..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#035b77] focus:outline-none resize-none"
              ></textarea>
            </motion.div>
          ))}

          <div className="flex justify-end gap-4 mt-8">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-[#035b77] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#024a61] transition disabled:opacity-50"
              disabled={submitted}
            >
              <Send className="w-5 h-5" /> Submit Test
            </motion.button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Test Submitted!
              </h2>
              <p className="text-gray-600 mb-6">
                Well done! Your test has been marked as{" "}
                <span className="font-semibold text-green-600">done</span>.
              </p>
              <button
                onClick={handleCloseModal}
                className="bg-[#035b77] text-white px-6 py-2 rounded-lg hover:bg-[#024a61] transition"
              >
                Mark as Done & Return
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}