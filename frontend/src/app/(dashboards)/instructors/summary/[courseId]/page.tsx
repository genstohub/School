"use client";

import React, { useState, use, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import {
  ChevronLeft,
  Sparkles,
  Save,
  Trash2,
  Plus,
  Layers,
  Zap,
  Hash,
  CheckCircle2,
  ShieldCheck,
  AlignLeft,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { REST_API } from "@/constants";
import { useUser } from "@/hooks";

interface Section {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

interface CourseTopics {
  topic_id: number | string;
  topic: string;
}

export default function SummaryCreationPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  const { user } = useUser();

  // --- Content State ---
  const [topicID, setTopicID] = useState<string | number>("");
  const [title, setTitle] = useState("");
  const [sections, setSections] = useState<Section[]>([
    { id: crypto.randomUUID(), title: "", content: "" },
  ]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [publishPhase, setPublishPhase] = useState<
    "success" | "failed" | "idle"
  >("idle");
  const [isPublishing, setIsPublishing] = useState(false);

  const [topicTitleLoading, setTopicTitleLoading] = useState(false);
  const [courseTopics, setCourseTopics] = useState<CourseTopics[]>([]);

  const [topicSelectBox, setTopicSelectBox] = useState(false);

  // GETTING TOPICS TITLES CONCERNING EXACT COURSE CODE PROVIDED;
  useEffect(() => {
    const getTopicTitles = async () => {
      setTopicTitleLoading(true);
      const course_id = courseCode.toLowerCase();
      fetch(
        REST_API +
          `/courses/summaries/get-topics-title-for-summary/${course_id}`,
        {
          credentials: "include",
          method: "GET",
          headers: { "content-Type": "application/json" },
        },
      )
        .then((response) => response.json())
        .then((res) => {
          setCourseTopics(res);
          setTopicTitleLoading(false);
        })
        .catch((err) => {
          console.log(err?.message);
        });
    };

    getTopicTitles();
  }, [courseCode]);

  // --- Stats Logic ---
  const wordCount = useMemo(() => {
    return sections.reduce(
      (acc, s) => acc + s.content.trim().split(/\s+/).filter(Boolean).length,
      0,
    );
  }, [sections]);

  const readingTime = useMemo(
    () => Math.ceil(wordCount / 200) || 1,
    [wordCount],
  );

  // --- Handlers ---
  const addSection = () => {
    setSections([
      ...sections,
      { id: crypto.randomUUID(), title: "", content: "" },
    ]);
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) setSections(sections.filter((s) => s.id !== id));
  };

  const updateSection = (id: string, field: keyof Section, value: string) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    );
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim() && tags.length < 5) {
      setTags([...tags, currentTag.trim().toUpperCase()]);
      setCurrentTag("");
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      // Data matches the student view's expected array structure
      const payload = {
        course_id: courseCode.toLowerCase(),
        topic_id: topicID,
        user_id: user.user_id,
        readingTime: `${readingTime} min read`,
        tags,
        sections,
      };

      await fetch(REST_API + "/courses/summaries/new/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.summary_id) setPublishPhase("success");
          return;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      setPublishPhase("failed");
    }
  };

  const onCourseTitleClick = (topic: string, topic_id: string | number) => {
    setTopicID(topic_id);
    setTitle(topic);
    setTopicSelectBox(false);
  };

  const filteredTopics = useMemo(() => {
    return courseTopics?.filter((x) => {
      const matchSearch = x.topic
        .trim()
        .toLowerCase()
        .includes(title.trim().toLowerCase());
      return matchSearch;
    });
  }, [title, courseTopics]);

  async function continueWithSumAfterPublish() {
    setCourseTopics((prev) => prev.filter((f) => f.topic_id !== topicID));
    setTags([]);
    setSections([]);
    setCurrentTag("");
    setTitle("");
    setTopicID("");
    setPublishPhase("idle");
  }

  return (
    <main className="min-h-screen bg-[#050505] rounded-3xl text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <Link
          href="/instructors/material"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-500 mb-10 group transition-colors"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Back to Hub
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Section Builder (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <header className="border-l-4 border-cyan-500 pl-6">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                Summary <span className="text-cyan-500">Builder</span>
              </h1>
              <p className="text-gray-500 text-[10px] font-black tracking-[0.2em] mt-2 uppercase">
                Course: {courseCode} • Content will be sent for approval
              </p>
            </header>

            {/* Main Title & Description */}
            <div className="space-y-4 bg-gray-900/20 p-8 rounded-[2.5rem] border border-gray-800 relative">
              <input
                onFocus={() => setTopicSelectBox(true)}
                disabled={topicTitleLoading}
                // onBlur={() => setTopicSelectBox(false)}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Main Topic Title..."
                className="w-full bg-transparent text-3xl font-black outline-none placeholder:text-gray-800 tracking-tight"
              />

              {topicSelectBox && (
                <div className="flex  flex-col items-center gap-3 text-gray-500 border-t border-gray-800 pt-4 absolute w-9/10 p-4 bg-gray-950/90 z-10 rounded-bl-2xl rounded-br-2xl overflow-x-hidden overflow-y-auto max-h-[calc(7/10*100svh)]">
                  {filteredTopics.map(({ topic, topic_id }, index) => (
                    <div
                      key={index}
                      className="w-full flex text-sm font-medium outline-none bg-black rounded-2xl p-4 gap-2 cursor-pointer hover:bg-blue-900 hover:text-amber-200"
                      onClick={() => onCourseTitleClick(topic, topic_id)}
                    >
                      <AlignLeft size={16} />
                      <span className="text-clip">{topic}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.div
                  layout
                  key={section.id}
                  className="bg-[#0A0A0A] border border-gray-800 rounded-[2.5rem] overflow-hidden focus-within:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/20">
                    <span className="text-[10px] font-black text-gray-500 uppercase px-4">
                      Section {index + 1}
                    </span>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="p-8 space-y-4">
                    <input
                      value={section.title}
                      onChange={(e) =>
                        updateSection(section.id, "title", e.target.value)
                      }
                      placeholder="Sub-heading title..."
                      className="w-full bg-transparent text-xl font-bold outline-none placeholder:text-gray-800"
                    />
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        updateSection(section.id, "content", e.target.value)
                      }
                      placeholder="Detailed takeaways for this section..."
                      className="w-full bg-transparent text-gray-400 text-base leading-relaxed outline-none min-h-[150px] resize-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={addSection}
              className="w-full py-6 border-2 border-dashed border-gray-800 rounded-[2.5rem] text-gray-500 font-black uppercase text-[10px] tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Another Section
            </button>
          </div>

          {/* Right: Metadata & Submission (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0A0A0A] border border-gray-800 rounded-[2rem] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Hash className="text-cyan-500" size={16} />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Search Keywords
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-900 text-[10px] font-black px-3 py-1.5 rounded-lg border border-gray-800 flex items-center gap-2 uppercase"
                  >
                    {tag}{" "}
                    <button
                      onClick={() =>
                        setTags(tags.filter((_, idx) => idx !== i))
                      }
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={addTag}
                placeholder="Tag + Enter"
                className="w-full bg-black border border-gray-800 p-4 rounded-xl text-xs font-bold outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl p-6">
                <Layers className="text-cyan-500 mb-2" size={20} />
                <p className="text-[9px] font-black text-gray-500 uppercase">
                  Total Words
                </p>
                <p className="text-2xl font-black">{wordCount}</p>
              </div>
              <div className="bg-[#0A0A0A] border border-gray-800 rounded-3xl p-6">
                <Zap className="text-cyan-500 mb-2" size={20} />
                <p className="text-[9px] font-black text-gray-500 uppercase">
                  Complexity
                </p>
                <p className="text-2xl font-black">{readingTime}m</p>
              </div>
            </div>

            <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-yellow-500" size={16} />
                <h4 className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                  Workflow Notice
                </h4>
              </div>
              <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase">
                This summary will be sent to the <strong>Review Queue</strong>.
                A content manager will approve it before it goes live to
                students.
              </p>
              <ul className="space-y-3 pt-2">
                {[
                  { text: "Detailed Sections", met: sections.length >= 2 },
                  { text: "Title Selected", met: title.length > 2 },
                  { text: "Tags for Filter", met: tags.length >= 2 },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-tight"
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${item.met ? "bg-yellow-500 border-yellow-500 text-black" : "border-gray-700"}`}
                    >
                      {item.met && <CheckCircle2 size={10} />}
                    </div>
                    <span
                      className={item.met ? "text-gray-200" : "text-gray-600"}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handlePublish}
              disabled={
                isPublishing || !title || sections[0].content.length < 10
              }
              className="w-full py-6 bg-cyan-500 text-black rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPublishing ? (
                "Submitting..."
              ) : (
                <>
                  <Save size={18} /> Submit for Review
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      {publishPhase !== "idle" && (
        <AnimatePresence>
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/95 backdrop-blur-2xl p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white text-gray-950 rounded-[4rem] p-12 max-w-lg w-full text-center shadow-2xl"
            >
              {publishPhase === "success" && (
                <>
                  <div className="w-24 h-24 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShieldCheck size={48} />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none text-black">
                    Sent to <br />
                    Review
                  </h2>
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-10 leading-relaxed">
                    Topic: {title} <br />
                    Status: Pending Approval
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => continueWithSumAfterPublish()}
                      className="w-full py-5 bg-gray-950 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-black transition-all"
                    >
                      Create Another
                    </button>
                    <button
                      onClick={() => router.push("/instructors")}
                      className="w-full py-5 text-gray-500 font-black uppercase text-[10px] tracking-widest"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </>
              )}
              {publishPhase === "failed" && (
                <>
                  <div className="w-24 h-24 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XIcon size={48} color="red" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase mb-4 leading-none text-red-600">
                    Failed To <br />
                    Publish
                  </h2>
                  <p className="text-red-500 text-sm font-bold uppercase tracking-wide mb-10 leading-relaxed">
                    Check your connection <br />
                    There was an unexpected error
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setPublishPhase("idle")}
                      className="w-full py-5 bg-gray-950 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-black transition-all"
                    >
                      close
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </main>
  );
}
