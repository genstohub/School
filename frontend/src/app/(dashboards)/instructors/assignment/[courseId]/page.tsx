"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Calendar,
  AlertCircle,
  UploadCloud,
  Link as LinkIcon,
  Send,
  Briefcase,
  BarChart,
  ClipboardCheck,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { REST_API } from "@/constants";
import { useUser } from "@/hooks";

interface AssignmentData {
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  weightage: number;
  submissionType: "File Upload" | "External Link" | "Text Entry";
}

export default function AssignmentCreationPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  // Declaring user details;
  const { user } = useUser();

  const [form, setForm] = useState<AssignmentData>({
    title: "",
    description: "",
    dueDate: "",
    maxPoints: 100,
    weightage: 10,
    submissionType: "File Upload",
  });

  const [publishingPhase, setPublishingPhase] = useState<
      "success" | "failed" | "idle"
    >("idle"),
    [publishing, setPublishing] = useState(false);

  const updateField = <K extends keyof AssignmentData>(
    field: K,
    value: AssignmentData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const uploadAssignment = async () => {
    setPublishing(true);
    await fetch(REST_API + "/courses/assignments/set-assignment", {
      credentials: "include",
      headers: { "content-Type": "application/json" },
      method: "post",
      body: JSON.stringify({
        course_id: courseCode.toLowerCase(),
        user_id: user.user_id,
        ...form,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.assignment_id) {
          setPublishingPhase("success");
          setPublishing(false);
        } else {
          setPublishingPhase("failed");
          setPublishing(false);
        }
      })
      .catch(() => setPublishingPhase("failed"));
    setPublishing(false);
  };

  function continueEditing() {
    setForm({
      title: "",
      description: "",
      dueDate: "",
      maxPoints: 100,
      weightage: 10,
      submissionType: "File Upload",
    });
    setPublishingPhase("idle");
  }

  return (
    <main className="min-h-screen bg-[#040605] rounded-3xl text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <Link
          href="/instructors"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-500 mb-10 group transition-colors"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Instructor Hub
          </span>
        </Link>

        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-l-4 border-emerald-600 pl-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Assignment <span className="text-emerald-600">Architect</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] mt-3 uppercase">
              Deploy Project-based learning for {courseCode}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-emerald-600/10 border border-emerald-500/20 px-6 py-3 rounded-2xl flex items-center gap-3 text-emerald-500">
              <BarChart size={18} />
              <span className="text-lg font-black">
                {form.weightage}% Grade Weight
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-8 space-y-10">
            <section>
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4 block">
                Project Title
              </label>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g., Final Case Study: Market Analysis"
                className="w-full bg-transparent text-3xl font-black outline-none border-b-2 border-gray-900 focus:border-emerald-600 py-4 transition-all placeholder:text-gray-800"
              />
            </section>

            <section>
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4 block">
                Detailed Instructions
              </label>
              <div className="bg-[#0A0C0B] border border-gray-800 rounded-[2rem] p-6 focus-within:border-emerald-600/50 transition-all">
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Outline the goals, requirements, and grading criteria..."
                  className="w-full bg-transparent min-h-[300px] outline-none resize-none leading-relaxed text-gray-300"
                />
                <div className="flex gap-4 pt-4 border-t border-gray-900">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <LinkIcon size={18} />
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    <UploadCloud size={18} />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Configuration Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0A0C0B] border border-gray-800 rounded-[2.5rem] p-8 space-y-8">
              {/* Due Date */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-emerald-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Submission Deadline
                  </span>
                </div>
                <input
                  type="datetime-local"
                  value={form.dueDate}
                  onChange={(e) => updateField("dueDate", e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all color-scheme-dark"
                />
              </div>

              {/* Submission Type */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-4">
                  Submission Format
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {(
                    ["File Upload", "External Link", "Text Entry"] as const
                  ).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField("submissionType", type)}
                      className={`p-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center justify-between ${
                        form.submissionType === type
                          ? "bg-emerald-500 text-black border-emerald-500"
                          : "bg-transparent border-gray-800 text-gray-500 hover:border-gray-700"
                      }`}
                    >
                      {type}
                      {form.submissionType === type && (
                        <ClipboardCheck size={14} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scoring */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">
                    Max Points
                  </span>
                  <input
                    type="number"
                    value={form.maxPoints}
                    onChange={(e) =>
                      updateField("maxPoints", parseInt(e.target.value) || 0)
                    }
                    className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl text-sm font-black outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">
                    Weight %
                  </span>
                  <input
                    type="number"
                    value={form.weightage}
                    onChange={(e) =>
                      updateField("weightage", parseInt(e.target.value) || 0)
                    }
                    className="w-full bg-gray-950 border border-gray-800 p-4 rounded-xl text-sm font-black outline-none focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Warning Note */}
            <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-3xl flex gap-4">
              <AlertCircle className="text-amber-500 shrink-0" size={20} />
              <p className="text-[9px] font-bold uppercase text-amber-500/80 leading-relaxed">
                Once deployed, changing the grade weightage may affect existing
                student cumulative records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => uploadAssignment()}
              disabled={
                !form.title || !form.description || !form.dueDate || publishing
              }
              className="w-full py-6 bg-emerald-500 text-black rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {publishing ? "Publishing" : "Publish Assignment"}
            </button>
          </aside>
        </div>
      </div>

      {/* Publish Modal */}
      <AnimatePresence>
        {publishingPhase !== "idle" && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/95 backdrop-blur-2xl p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white text-gray-950 rounded-[4rem] p-12 max-w-md w-full text-center shadow-2xl"
            >
              {publishingPhase === "success" && (
                <>
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Briefcase size={32} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">
                    Deployed
                  </h2>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-10">
                    Assignment is live for all {courseCode} students.
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => continueEditing()}
                      className="w-full py-5 bg-black text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                    >
                      Continue
                    </button>

                    <button
                      type="button"
                      onClick={() => router.push("/instructors")}
                      className="w-full py-5  text-blue-700 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </>
              )}
              {publishingPhase === "failed" && (
                <>
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XIcon size={32} color="red" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">
                    Failed to upload assignment
                  </h2>
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-10">
                    An unexpected error, we are on it, please try again
                  </p>
                  <button
                    type="button"
                    onClick={() => setPublishingPhase("idle")}
                    className="w-full py-5 bg-black text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
                  >
                    close
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
