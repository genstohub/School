"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Filter } from "lucide-react";

interface Reply {
  id: number;
  author: string;
  text: string;
}

interface Discussion {
  id: number;
  author: string;
  question: string;
  replies: Reply[];
}

export default function QnaDiscussionPage({
  params,
}: {
  params: { course: string; topic: string };
}) {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      author: "John Doe",
      question:
        "Can someone explain the difference between linear and quadratic equations?",
      replies: [],
    },
    {
      id: 2,
      author: "Mary Johnson",
      question:
        "Why do we need to factorize algebraic expressions before solving them?",
      replies: [],
    },
    {
      id: 3,
      author: "Peter Adams",
      question: "How do you find the area under a curve using integration?",
      replies: [
        {
          id: 1,
          author: "Sarah Lee",
          text: "You integrate the function over the given limits.",
        },
        {
          id: 2,
          author: "Mark Kelvin",
          text: "It represents the accumulation of the quantity described by the function.",
        },
      ],
    },
  ]);

  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});
  const [showReplyBox, setShowReplyBox] = useState<{ [key: number]: boolean }>({});
  const [newQuestion, setNewQuestion] = useState("");
  const [filter, setFilter] = useState("all");

  const handleReplySubmit = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    const replyText = replyInputs[id];
    if (!replyText?.trim()) return;

    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              replies: [
                ...d.replies,
                {
                  id: Date.now(),
                  author: "You",
                  text: replyText,
                },
              ],
            }
          : d
      )
    );
    setReplyInputs((prev) => ({ ...prev, [id]: "" }));
    setShowReplyBox((prev) => ({ ...prev, [id]: false }));
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setDiscussions((prev) => [
      {
        id: Date.now(),
        author: "You",
        question: newQuestion,
        replies: [],
      },
      ...prev,
    ]);
    setNewQuestion("");
  };

  const filteredDiscussions =
    filter === "answered"
      ? discussions.filter((d) => d.replies.length > 0)
      : filter === "unanswered"
      ? discussions.filter((d) => d.replies.length === 0)
      : discussions;

  return (
    <section className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 text-gray-100"
      >
        Q&A Discussion – {params.topic.replace("-", " ")}
      </motion.h1>

      {/* Post Question Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-8"
      >
        <h2 className="font-semibold text-gray-700 mb-3">Post a New Question</h2>
        <form
          onSubmit={handlePostQuestion}
          className="flex flex-col sm:flex-row gap-3"
        >
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask your question here..."
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-700"
            rows={2}
          />
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-900 text-white px-6 py-2 rounded-xl flex items-center justify-center transition-all duration-300"
          >
            <Send className="w-4 h-4 mr-1" /> Post
          </button>
        </form>
      </motion.div>

      {/* Filter */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="font-semibold text-gray-100">Recent Questions</h2>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-100 w-5 h-5" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All</option>
            <option value="answered">Answered</option>
            <option value="unanswered">Unanswered</option>
          </select>
        </div>
      </div>

      {/* Discussions */}
      <div className="max-w-3xl mx-auto bg-white p-5 sm:p-8 rounded-2xl shadow-md">
        {filteredDiscussions.map((discussion, index) => (
          <motion.div
            key={discussion.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-100 p-4 rounded-xl mb-6"
          >
            <div className="flex items-start gap-3">
              <MessageCircle className="text-blue-600 mt-1 w-6 h-6 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-gray-800 font-medium">{discussion.author}</p>
                  <button
                    onClick={() =>
                      setShowReplyBox((prev) => ({
                        ...prev,
                        [discussion.id]: !prev[discussion.id],
                      }))
                    }
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {showReplyBox[discussion.id] ? "Cancel" : "Answer"}
                  </button>
                </div>
                <p className="text-gray-700">{discussion.question}</p>

                {/* Replies */}
                <div className="space-y-2 ml-8 mt-3">
                  {discussion.replies.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">No replies yet.</p>
                  ) : (
                    discussion.replies.map((reply) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-3 rounded-lg text-gray-700 shadow-sm border"
                      >
                        <p className="font-medium text-gray-800">{reply.author}</p>
                        <p className="text-sm">{reply.text}</p>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Reply Box */}
                {showReplyBox[discussion.id] && (
                  <form
                    onSubmit={(e) => handleReplySubmit(discussion.id, e)}
                    className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ml-8"
                  >
                    <textarea
                      value={replyInputs[discussion.id] || ""}
                      onChange={(e) =>
                        setReplyInputs((prev) => ({
                          ...prev,
                          [discussion.id]: e.target.value,
                        }))
                      }
                      placeholder="Write your reply..."
                      className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-700"
                      rows={2}
                    ></textarea>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      Reply
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}