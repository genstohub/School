"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Maximize, Minimize, Heart, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LiveSessionView({ params }: { params: { sessionId: string } }) {
  const [liked, setLiked] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [comments, setComments] = useState<
    { id: number; user: string; text: string; replies?: { user: string; text: string }[] }[]
  >([
    {
      id: 1,
      user: "Instructor",
      text: "Welcome everyone! Feel free to drop your questions below.",
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!fullscreen) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const handleComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { id: comments.length + 1, user: "Student", text: newComment, replies: [] },
      ]);
      setNewComment("");
    }
  };

  const handleReply = (commentId: number) => {
    if (replyText.trim() !== "") {
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? {
                ...c,
                replies: [...(c.replies || []), { user: "Instructor", text: replyText }],
              }
            : c
        )
      );
      setReplyTo(null);
      setReplyText("");
    }
  };

  useEffect(() => {
    const exitHandler = () => setFullscreen(false);
    document.addEventListener("fullscreenchange", exitHandler);
    return () => document.removeEventListener("fullscreenchange", exitHandler);
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-gray-200"
      >
        Live Session {params.sessionId}
      </motion.h1>

      {/* Video Player Section */}
      <div
        ref={videoRef}
        className="relative w-full bg-black rounded-2xl overflow-hidden shadow-lg aspect-video mb-10"
      >
        <img
          src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1000&q=80"
          alt="Live session"
          className="w-full h-full object-cover opacity-80"
        />

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <Button
            size="icon"
            onClick={() => setLiked(!liked)}
            className={`rounded-full p-2 ${
              liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          </Button>
          <Button
            size="icon"
            onClick={toggleFullscreen}
            className="rounded-full p-2 bg-gray-200 text-gray-700"
          >
            {fullscreen ? (
              <Minimize className="w-5 h-5" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MessageCircle className="text-[#035b77]" /> Live Chat
        </h2>

        {/* Comment input */}
        <div className="flex items-center gap-3 mb-6">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ask a question or share your thoughts..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#035b77]"
          />
          <Button
            onClick={handleComment}
            className="bg-[#035b77] text-white hover:bg-[#024b5f] transition"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Comments */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4">
              <p className="text-gray-800 font-medium">{comment.user}</p>
              <p className="text-gray-600">{comment.text}</p>

              {/* Replies */}
              <div className="ml-6 mt-2 space-y-2">
                {comment.replies?.map((reply, i) => (
                  <div key={i} className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-sm text-gray-800 font-medium">{reply.user}</p>
                    <p className="text-sm text-gray-600">{reply.text}</p>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              {replyTo === comment.id ? (
                <div className="mt-2 flex items-center gap-2">
                  <input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm"
                  />
                  <Button
                    onClick={() => handleReply(comment.id)}
                    className="bg-[#035b77] text-white hover:bg-[#024b5f] text-sm"
                  >
                    Send
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setReplyTo(comment.id)}
                  className="text-sm text-[#035b77] mt-2 hover:underline"
                >
                  Reply
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
