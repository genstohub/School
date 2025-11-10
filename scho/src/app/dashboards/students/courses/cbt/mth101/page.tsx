"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, X } from "lucide-react";
import { useRouter } from "next/navigation";

const mockQuestions = [
  {
    id: 1,
    question: "What is the derivative of x²?",
    options: ["2x", "x", "x²", "1"],
    answer: "2x",
    explanation: "The derivative of xⁿ is n·xⁿ⁻¹. For n = 2, it becomes 2x.",
    reference: "Differentiation — Basic Rules",
  },
  {
    id: 2,
    question: "Evaluate ∫ x dx.",
    options: ["x² + C", "x²/2 + C", "x + C", "2x + C"],
    answer: "x²/2 + C",
    explanation: "∫x dx = (x²/2) + C according to power rule of integration.",
    reference: "Integration — Power Rule",
  },
  {
    id: 3,
    question: "Simplify: (2x + 3x).",
    options: ["6x", "5x", "4x", "2x²"],
    answer: "5x",
    explanation: "Combine like terms: 2x + 3x = 5x.",
    reference: "Algebra — Simplification",
  },
  {
    id: 4,
    question: "What is the slope of y = 5x + 2?",
    options: ["2", "5", "-2", "0"],
    answer: "5",
    explanation: "In y = mx + c, slope m = 5.",
    reference: "Linear Equations",
  },
  {
    id: 5,
    question: "If sin θ = 1/2, then θ = ?",
    options: ["30°", "60°", "90°", "45°"],
    answer: "30°",
    explanation: "sin(30°) = 1/2 by trigonometric ratios.",
    reference: "Trigonometry — Basic Angles",
  },
];

export default function MTH101CBTPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showCorrectionsModal, setShowCorrectionsModal] = useState(false);
  const [completed, setCompleted] = useState(false);

  // ⏰ Check if user has completed the CBT in the last 7 days
  useEffect(() => {
    const data = localStorage.getItem("mth101_cbt_status");
    if (data) {
      const { completedAt } = JSON.parse(data);
      const diff = Date.now() - completedAt;
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (diff < sevenDays) {
        setCompleted(true);
      } else {
        // Reset after 7 days
        localStorage.removeItem("mth101_cbt_status");
      }
    }
  }, []);

  const handleSelect = (id: number, option: string) => {
    setAnswers({ ...answers, [id]: option });
  };

  const handleSubmit = () => {
    let total = 0;
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.answer) total++;
    });
    setScore(total);
    setSubmitted(true);
    setShowResultModal(true);
    setCompleted(true);

    // 🧠 Save completion timestamp
    localStorage.setItem(
      "mth101_cbt_status",
      JSON.stringify({ completedAt: Date.now() })
    );
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    router.push("/dashboards/students/courses/cbt");
  };

  const handleOpenCorrections = () => setShowCorrectionsModal(true);
  const handleCloseCorrections = () => setShowCorrectionsModal(false);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
          Mathematics 101 — CBT
        </h1>
        <p className="text-gray-600 text-sm max-w-xl mx-auto">
          Answer all questions carefully. You can review the corrections after submission.
        </p>
        <div className="flex justify-center items-center gap-2 text-blue-600 mt-4">
          <Timer size={18} />
          <p>
            {completed ? (
              <span className="text-green-600 font-semibold">
                ✅ Done — Check Next Week
              </span>
            ) : (
              "Countdown: 7 Days"
            )}
          </p>
        </div>
      </motion.div>

      {/* Questions Section */}
      {!submitted && !completed ? (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {mockQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
            >
              <h3 className="font-semibold text-gray-800 mb-3">
                {q.id}. {q.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(q.id, opt)}
                    className={`border rounded-lg py-2 px-3 text-left transition ${
                      answers[q.id] === opt
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 px-8 rounded-lg transition"
            >
              Submit
            </button>
          </div>
        </motion.div>
      ) : completed ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            ✅ Test Completed
          </h2>
          <p className="text-gray-700">
            You can retake this test next week.
          </p>
        </div>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Test Submitted!
          </h2>
          <p className="text-gray-700">
            Your Score: {score} / {mockQuestions.length}
          </p>
        </div>
      )}

      {/* Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-[90%] sm:w-[70%] md:w-[50%] rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-blue-700">
                📘 MTH101 — Test Summary
              </h2>
              <button
                onClick={handleCloseResultModal}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={22} />
              </button>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700 mb-2">
                You scored <span className="text-blue-700">{score}</span> out of{" "}
                {mockQuestions.length}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Review your answers or return to CBT dashboard.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleOpenCorrections}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                >
                  View Corrections
                </button>
                <button
                  onClick={handleCloseResultModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Corrections Modal */}
      {showCorrectionsModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-[95%] sm:w-[80%] md:w-[60%] rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[85vh]"
          >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-blue-700">
                View Corrections — MTH101
              </h2>
              <button
                onClick={handleCloseCorrections}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-6">
              {mockQuestions.map((q) => {
                const userAnswer = answers[q.id];
                const correct = userAnswer === q.answer;
                return (
                  <div key={q.id} className="border p-4 rounded-lg bg-gray-50">
                    <p className="font-semibold text-gray-800">
                      {q.id}. {q.question}
                    </p>
                    <div className="mt-2 space-y-1">
                      {q.options.map((opt) => (
                        <p
                          key={opt}
                          className={`text-sm px-2 py-1 rounded ${
                            opt === q.answer
                              ? "bg-green-100 text-green-700 font-semibold"
                              : opt === userAnswer
                              ? "bg-red-100 text-red-700"
                              : "text-gray-700"
                          }`}
                        >
                          {opt}
                        </p>
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      <strong>Explanation:</strong> {q.explanation}
                    </p>
                    <p className="text-sm text-blue-600">
                      <strong>Topic Reference:</strong> {q.reference}
                    </p>
                    <p
                      className={`mt-1 text-sm font-semibold ${
                        correct ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {correct ? "Correct" : "❌ Incorrect"}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-6">
              <button
                onClick={handleCloseCorrections}
                className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-lg"
              >
                Close Corrections
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}