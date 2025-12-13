"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

type Question =
  | {
      id: number;
      type: "mcq";
      text: string;
      options: { key: string; text: string }[];
      answer: string;
    }
  | {
      id: number;
      type: "tf";
      text: string;
      answer: "True" | "False";
    };
    

// --- Type guard for MCQ questions ---
function isMCQ(q: Question): q is Extract<Question, { type: "mcq" }> {
  return q.type === "mcq";
}

const TOTAL_QUESTIONS = 20;
const QUIZ_DURATION_SECONDS = 5 * 60;
const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "mcq",
    text: "Simplify: 2x + 3x",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "5x" },
      { key: "C", text: "6x" },
      { key: "D", text: "2x + 3" },
    ],
    answer: "B",
  },
  {
    id: 2,
    type: "mcq",
    text: "Solve for x: 2x = 8",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "6" },
    ],
    answer: "C",
  },
  {
    id: 3,
    type: "tf",
    text: "x + x + x equals 2x.",
    answer: "False",
  },
  {
    id: 4,
    type: "mcq",
    text: "Simplify: 4x – 2x",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "2x" },
      { key: "C", text: "6x" },
      { key: "D", text: "8x" },
    ],
    answer: "B",
  },
  {
    id: 5,
    type: "mcq",
    text: "If x = 3, find the value of 2x + 1.",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "6" },
      { key: "C", text: "7" },
      { key: "D", text: "8" },
    ],
    answer: "C",
  },
  {
    id: 6,
    type: "tf",
    text: "2(x + 3) = 2x + 6.",
    answer: "True",
  },
  {
    id: 7,
    type: "mcq",
    text: "Simplify: 3a + 4b – 2a",
    options: [
      { key: "A", text: "a + 4b" },
      { key: "B", text: "a + b" },
      { key: "C", text: "5a + 4b" },
      { key: "D", text: "a + 2b" },
    ],
    answer: "A",
  },
  {
    id: 8,
    type: "mcq",
    text: "Solve for x: x – 4 = 10",
    options: [
      { key: "A", text: "14" },
      { key: "B", text: "6" },
      { key: "C", text: "16" },
      { key: "D", text: "8" },
    ],
    answer: "A",
  },
  {
    id: 9,
    type: "tf",
    text: "If x = 2, then x² = 4.",
    answer: "True",
  },
  {
    id: 10,
    type: "mcq",
    text: "Simplify: (x²)(x³)",
    options: [
      { key: "A", text: "x⁵" },
      { key: "B", text: "x⁶" },
      { key: "C", text: "x⁴" },
      { key: "D", text: "x³" },
    ],
    answer: "A",
  },
  {
    id: 11,
    type: "mcq",
    text: "Expand: (x + 2)(x + 3)",
    options: [
      { key: "A", text: "x² + 6" },
      { key: "B", text: "x² + 5x + 6" },
      { key: "C", text: "x² + 3x + 5" },
      { key: "D", text: "x² + 2x + 3" },
    ],
    answer: "B",
  },
  {
    id: 12,
    type: "tf",
    text: "The solution of 3x = 12 is x = 4.",
    answer: "True",
  },
  {
    id: 13,
    type: "mcq",
    text: "Simplify: 5x – 2x + 7",
    options: [
      { key: "A", text: "3x + 7" },
      { key: "B", text: "7x + 7" },
      { key: "C", text: "x + 7" },
      { key: "D", text: "5x + 7" },
    ],
    answer: "A",
  },
  {
    id: 14,
    type: "mcq",
    text: "If y = 2, find the value of 3y².",
    options: [
      { key: "A", text: "12" },
      { key: "B", text: "6" },
      { key: "C", text: "8" },
      { key: "D", text: "10" },
    ],
    answer: "A",
  },
  {
    id: 15,
    type: "tf",
    text: "x² – x² = 2x².",
    answer: "False",
  },
  {
    id: 16,
    type: "mcq",
    text: "Simplify: 4a × 3a",
    options: [
      { key: "A", text: "7a" },
      { key: "B", text: "12a²" },
      { key: "C", text: "12a" },
      { key: "D", text: "a⁷" },
    ],
    answer: "B",
  },
  {
    id: 17,
    type: "mcq",
    text: "Factorize: x² + 5x + 6",
    options: [
      { key: "A", text: "(x + 2)(x + 3)" },
      { key: "B", text: "(x + 1)(x + 6)" },
      { key: "C", text: "(x + 3)(x + 4)" },
      { key: "D", text: "(x + 2)(x + 2)" },
    ],
    answer: "A",
  },
  {
    id: 18,
    type: "tf",
    text: "The coefficient of x in 7x + 2 is 7.",
    answer: "True",
  },
  {
    id: 19,
    type: "mcq",
    text: "Simplify: (2x²)(3x³)",
    options: [
      { key: "A", text: "5x⁵" },
      { key: "B", text: "6x⁵" },
      { key: "C", text: "x⁶" },
      { key: "D", text: "x⁵" },
    ],
    answer: "B",
  },
  {
    id: 20,
    type: "mcq",
    text: "If x = 1, find the value of 4x² + 2x + 1.",
    options: [
      { key: "A", text: "7" },
      { key: "B", text: "8" },
      { key: "C", text: "6" },
      { key: "D", text: "5" },
    ],
    answer: "A",
  },
];


// ---------- Component ----------
export default function TopicQuizPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(QUIZ_DURATION_SECONDS);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number } | null>(
    null
  );
  const [showAnswersModal, setShowAnswersModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);

  const quizQuestions = useMemo(
    () => QUESTIONS.slice(0, TOTAL_QUESTIONS),
    []
  );

  useEffect(() => {
    if (submitted) return;
    const timer =
      secondsLeft > 0 &&
      setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    if (secondsLeft === 0) {
      handleAutoSubmit();
    }
    return () => clearInterval(timer as unknown as number);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, submitted]);

  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleSelect = (qid: number, value: string) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [qid]: value }));
  };

  const calculateScore = (userAnswers: Record<number, string>) => {
    let correct = 0;
    for (const q of quizQuestions) {
      const ua = userAnswers[q.id];
      if (ua === q.answer) correct++;
    }
    return { correct, total: quizQuestions.length };
  };

  const doSubmit = (auto = false) => {
    if (submitted) return;
    const sc = calculateScore(answers);
    setScore(sc);
    setSubmitted(true);
    setShowResultsModal(true);
    if (auto) {
      // future auto submit message
    }
  };

  const handleAutoSubmit = () => doSubmit(true);
  const handleManualSubmit = () => doSubmit(false);

  const handleRetake = () => {
    setAnswers({});
    setSecondsLeft(QUIZ_DURATION_SECONDS);
    setSubmitted(false);
    setScore(null);
    setShowResultsModal(false);
    setShowAnswersModal(false);
  };

  const openViewAnswers = () => {
    setShowAnswersModal(true);
    setShowResultsModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-200">
            Mathematics 101 – Algebra Basics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            20 questions — All questions on one page — 5 minutes
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-2 rounded-lg font-medium ${
              secondsLeft <= 30
                ? "bg-red-100 text-red-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            ⏱ {formatTime(secondsLeft)}
          </div>

          <button
            onClick={() => router.back()}
            className="px-3 py-2 bg-gray-900 hover:bg-gray-900 rounded-md text-sm"
          >
            Back
          </button>

          <button
            onClick={handleManualSubmit}
            disabled={submitted}
            className={`px-3 py-2 rounded-md text-sm font-semibold ${
              submitted
                ? "bg-gray-900 text-gray-100 cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-700"
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>

      {/* Questions */}
      <div className="max-w-4xl mx-auto space-y-6">
        {quizQuestions.map((q, idx) => (
          <article
            key={q.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
          >
            <header className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Question {idx + 1}
                </h3>
                <p className="mt-2 text-gray-800">{q.text}</p>
              </div>
              <div className="text-sm text-gray-500">Marks: 1</div>
            </header>

            <div className="mt-4 space-y-3">
              {isMCQ(q) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt.key;
                    const correct = submitted && opt.key === q.answer;
                    return (
                      <label
                        key={opt.key}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer ${
                          selected
                            ? "bg-blue-50 border-blue-300"
                            : "bg-white"
                        } ${
                          submitted && correct ? "border-green-300" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={opt.key}
                          checked={selected}
                          onChange={() => handleSelect(q.id, opt.key)}
                          disabled={submitted}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-gray-800">
                              {opt.key}. {opt.text}
                            </div>
                            {submitted && correct && (
                              <span className="text-green-600 text-sm font-semibold">
                                ✓
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="flex gap-3">
                  {(["True", "False"] as const).map((val) => {
                    const selected = answers[q.id] === val;
                    const correct = submitted && q.answer === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleSelect(q.id, val)}
                        disabled={submitted}
                        className={`px-4 py-2 rounded-md border w-32 text-sm font-medium transition ${
                          selected
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-gray-800"
                        } ${correct ? "ring-2 ring-green-200" : ""}`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Results Modal */}
      {showResultsModal && score && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <CheckCircle size={44} className="text-green-600" />
              <div>
                <h3 className="text-xl font-semibold">Quiz Submitted</h3>
                <p className="text-sm text-gray-600">
                  You scored{" "}
                  <span className="font-semibold">{score.correct}</span> out of{" "}
                  {score.total}.
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={handleRetake}
                className="px-4 py-2 rounded-md bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
              >
                Retake
              </button>
              <button
                onClick={openViewAnswers}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                View Answers
              </button>
              <button
                onClick={() => setShowResultsModal(false)}
                className="px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Answers Review Modal */}
      {showAnswersModal && score && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/40 p-4 overflow-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Answers Review</h3>
              <button
                onClick={() => {
                  setShowAnswersModal(false);
                  setShowResultsModal(true);
                }}
                className="px-3 py-2 rounded-md bg-gray-900 hover:bg-gray-200"
              >
                Return
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {quizQuestions.map((q, i) => {
                const user = answers[q.id];
                const isCorrect = user === q.answer;
                return (
                  <div
                    key={q.id}
                    className="border border-gray-100 rounded-lg p-3 bg-gray-50"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          Q{i + 1}. {q.text}
                        </div>
                        {isMCQ(q) ? (
                          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {q.options.map((opt) => {
                              const isAns = opt.key === q.answer;
                              const selected = answers[q.id] === opt.key;
                              return (
                                <div
                                  key={opt.key}
                                  className={`p-2 rounded-md border ${
                                    isAns
                                      ? "border-green-300 bg-green-50"
                                      : selected
                                      ? "border-blue-200 bg-blue-50"
                                      : "bg-white"
                                  }`}
                                >
                                  <div className="font-semibold">
                                    {opt.key}. {opt.text}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {isAns
                                      ? "Correct Answer"
                                      : selected
                                      ? "Your choice"
                                      : ""}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="mt-3 text-sm">
                            <div>
                              Correct:{" "}
                              <span className="font-semibold">{q.answer}</span>
                            </div>
                            <div>
                              Your answer:{" "}
                              <span
                                className={
                                  isCorrect
                                    ? "text-green-600 font-semibold"
                                    : "text-red-600 font-semibold"
                                }
                              >
                                {user ?? "No answer"}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-4">
                        {isCorrect ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle size={20} />
                            <span className="text-sm">Correct</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle size={20} />
                            <span className="text-sm">Incorrect</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowAnswersModal(false);
                  setShowResultsModal(true);
                }}
                className="px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-900"
              >
                Back to Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}