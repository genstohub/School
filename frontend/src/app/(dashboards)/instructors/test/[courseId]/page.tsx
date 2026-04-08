"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Plus,
  Trash2,
  Clock,
  CheckSquare,
  FileText,
  Send,
} from "lucide-react";
import Link from "next/link";
import { REST_API } from "@/constants";
import { useUser } from "@/hooks";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export default function TestCreationPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  const { user } = useUser();

  // Test Settings
  const [testTitle, setTestTitle] = useState("");
  const [duration, setDuration] = useState("30");
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", text: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const addQuestion = () => {
    const newQuestion: Question = {
      id: Math.random().toString(36).substr(2, 9),
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, ...updates } : q)),
    );
  };

  const updateOption = (qId: string, optIdx: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === qId) {
          const newOptions = [...q.options];
          newOptions[optIdx] = value;
          return { ...q, options: newOptions };
        }
        return q;
      }),
    );
  };

  const publishTest = async () => {
    setIsSubmitting(true);
    await fetch(REST_API + "/courses/tests/new-test", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        title: testTitle,
        questions,
        duration,
        user_id: user.user_id,
        courseId: courseCode.toString().toLowerCase(),
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.test_id) {
          setIsSubmitting(false);
          console.log(res);
        }
      });
  };

  return (
    <main className="min-h-screen bg-[#0F172A] text-white rounded-3xl  p-6 md:p-12">
      <div className="max-w-5xl rounded-2xl mx-auto">
        {/* Navigation */}
        <Link
          href="/instructors/material"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#035b77] mb-10 group transition-colors"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Return to Hub
          </span>
        </Link>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-l-4 border-amber-500 pl-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Assessment <span className="text-amber-500">Studio</span>
            </h1>
            <p className="text-gray-500 text-xs font-bold tracking-[0.2em] mt-3 uppercase">
              Drafting Examination for {courseCode}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-2xl flex items-center gap-4">
              <Clock className="text-amber-500" size={20} />
              <div>
                <p className="text-[9px] font-black text-gray-500 uppercase">
                  Duration (Mins)
                </p>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="bg-transparent border-none outline-none font-black text-xl w-12"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-12">
          <label className="text-[10px] font-black uppercase text-gray-500 ml-1 tracking-widest mb-3 block">
            Examination Title
          </label>
          <input
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
            placeholder="e.g. Mid-Semester Proficiency Test"
            className="w-full bg-gray-900/30 border-b-2 border-gray-800 py-6 text-2xl md:text-4xl font-black outline-none focus:border-amber-500 transition-colors placeholder:text-gray-800"
          />
        </div>

        {/* Question Builder */}
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {questions.map((q, idx) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0A0A0A] border border-gray-800 rounded-[2.5rem] p-8 md:p-10 relative group"
              >
                <div className="absolute -left-4 top-10 w-10 h-10 bg-amber-500 text-black flex items-center justify-center font-black rounded-xl rotate-3 shadow-xl">
                  {idx + 1}
                </div>

                <div className="flex justify-between items-start mb-8 ml-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-black uppercase text-gray-600 tracking-[0.2em] mb-4 block">
                      Question Text
                    </label>
                    <textarea
                      value={q.text}
                      onChange={(e) =>
                        updateQuestion(q.id, { text: e.target.value })
                      }
                      placeholder="Enter the question premise here..."
                      className="w-full bg-transparent text-xl font-bold outline-none resize-none h-20 placeholder:text-gray-800"
                    />
                  </div>
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="p-3 text-gray-700 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                        q.correctAnswer === optIdx
                          ? "bg-amber-500/10 border-amber-500"
                          : "bg-gray-900/30 border-gray-800"
                      }`}
                    >
                      <button
                        onClick={() =>
                          updateQuestion(q.id, { correctAnswer: optIdx })
                        }
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          q.correctAnswer === optIdx
                            ? "bg-amber-500 border-amber-500"
                            : "border-gray-700"
                        }`}
                      >
                        {q.correctAnswer === optIdx && (
                          <div className="w-2 h-2 bg-black rounded-full" />
                        )}
                      </button>
                      <input
                        value={opt}
                        onChange={(e) =>
                          updateOption(q.id, optIdx, e.target.value)
                        }
                        placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                        className="bg-transparent outline-none flex-1 font-bold text-sm"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Question Button */}
          <button
            onClick={addQuestion}
            className="w-full py-8 border-2 border-dashed border-gray-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 text-gray-600 hover:border-amber-500 hover:text-amber-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
              <Plus size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">
              Append New Question
            </span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="mt-20 pt-10 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span className="text-[10px] font-black uppercase">
                {questions.length} Questions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckSquare size={16} />
              <span className="text-[10px] font-black uppercase">
                MCQ Format
              </span>
            </div>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:px-10 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-800 transition-all border border-gray-800">
              Save Draft
            </button>
            <button
              onClick={() => publishTest()}
              disabled={!testTitle || questions.some((q) => !q.text)}
              className="flex-[2] md:px-14 py-5 bg-amber-500 text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3"
            >
              <Send size={18} />
              Publish Assessment
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/90 backdrop-blur-xl p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white text-gray-950 rounded-[3rem] p-12 max-w-md w-full text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckSquare size={40} />
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase mb-2">
              Test Live!
            </h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-8">
              {testTitle} is now accessible for {courseCode} students.
            </p>
            <button
              onClick={() => router.push("/instructors/material")}
              className="w-full py-5 bg-gray-950 text-white rounded-2xl font-black uppercase text-xs tracking-widest"
            >
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      )}
    </main>
  );
}
