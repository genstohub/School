"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Lock, Timer } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
}

export default function ExamQuestionsPage() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [submitted, setSubmitted] = useState(false);
  const [viewAnswers, setViewAnswers] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);
  const [examDone, setExamDone] = useState(false);

  const examKey = "math101_exam_completed";

  const questions: Question[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    question: `Question ${i + 1}: What is ${i + 3} × 2?`,
    options: ["2", "4", `${(i + 3) * 2}`, "8"],
    correct: `${(i + 3) * 2}`,
  }));

  // Check if exam was already completed
  useEffect(() => {
    const completed = localStorage.getItem(examKey);
    if (completed === "true") {
      setExamDone(true);
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (submitted || examDone) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, examDone]);

  const handleOptionChange = (qId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    setScore(correctCount);
    setSubmitted(true);
    localStorage.setItem(examKey, "true"); // Save completion
  };

  const handleAdminReset = () => {
    localStorage.removeItem(examKey);
    setExamDone(false);
    setSubmitted(false);
    setAnswers({});
    setScore(null);
    setTimeLeft(600);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-gray-500"
        >
          Mathematics 101 – Exam
        </motion.h1>

        {!examDone && (
          <div className="flex items-center gap-2 text-red-600 font-semibold text-lg mt-3 sm:mt-0">
            <Timer className="w-5 h-5" />
            <span>
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* Already Completed Notice */}
      {examDone ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl text-center border"
        >
          <Lock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Exam Already Completed
          </h2>
          <p className="text-gray-600 mb-6">
            You’ve already completed this exam. Please wait for admin approval
            before retaking.
          </p>

          {/* Admin Reset Simulation */}
          <button
            onClick={handleAdminReset}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Reset Exam (Admin)
          </button>
        </motion.div>
      ) : (
        <>
          {/* Questions */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {questions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition"
              >
                <h2 className="font-semibold text-gray-800 mb-3">
                  {q.question}
                </h2>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 text-gray-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleOptionChange(q.id, opt)}
                        className="accent-blue-600"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submit Button */}
          {!submitted && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Submit Exam
              </button>
            </div>
          )}

          {/* Result Modal */}
          {submitted && !viewAnswers && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full"
              >
                <CheckCircle className="text-green-600 w-12 h-12 mx-auto mb-3" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Exam Submitted
                </h2>
                <p className="text-gray-700 mb-4">
                  You scored <span className="font-semibold">{score}/20</span>
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    disabled
                    className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
                  >
                    Retake Disabled
                  </button>
                  <button
                    onClick={() => setViewAnswers(true)}
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                  >
                    View Answers
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* View Answers Modal */}
          {viewAnswers && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-8 rounded-2xl shadow-2xl max-w-3xl w-full"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Correct Answers
                </h2>
                <div className="space-y-3 text-sm text-gray-700">
                  {questions.map((q) => (
                    <p key={q.id}>
                      <span className="font-semibold">{q.question}</span> —{" "}
                      <span className="text-green-600">{q.correct}</span>
                    </p>
                  ))}
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setViewAnswers(false)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Return to Results
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </section>
  );
}