"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  MessageCircle, 
  Filter, 
  Loader2, 
  ArrowLeft, 
  User, 
  CornerDownRight,
  AlertCircle
} from "lucide-react";

// --- Types ---
interface Reply {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface Discussion {
  id: string;
  author: string;
  question: string;
  replies: Reply[];
  createdAt: string;
}

export default function QnaDiscussionPage() {
  const { course, topic } = useParams();
  const router = useRouter();

  // API State
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Input State
  const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({});
  const [showReplyBox, setShowReplyBox] = useState<{ [key: string]: boolean }>({});
  const [newQuestion, setNewQuestion] = useState("");
  const [filter, setFilter] = useState("all");
  const [isPosting, setIsPosting] = useState(false);

  // 1. Fetch Discussions
  const fetchDiscussions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/students/qna/discussions?course=${course}&topic=${topic}`);
      if (!res.ok) throw new Error("Failed to load discussion thread.");
      const data = await res.json();
      setDiscussions(data);
    } catch (err) {
      setError("Unable to sync with discussion server.");
    } finally {
      setLoading(false);
    }
  }, [course, topic]);

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  // 2. Post New Question
  const handlePostQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || isPosting) return;

    setIsPosting(true);
    try {
      const res = await fetch(`/api/students/qna/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course, topic, text: newQuestion }),
      });

      if (res.ok) {
        setNewQuestion("");
        fetchDiscussions(); // Refresh list
      }
    } catch (err) {
      console.error("Post failed");
    } finally {
      setIsPosting(false);
    }
  };

  // 3. Post Reply
  const handleReplySubmit = async (questionId: string, e: React.FormEvent) => {
    e.preventDefault();
    const replyText = replyInputs[questionId];
    if (!replyText?.trim()) return;

    try {
      const res = await fetch(`/api/students/qna/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, text: replyText }),
      });

      if (res.ok) {
        setReplyInputs(prev => ({ ...prev, [questionId]: "" }));
        setShowReplyBox(prev => ({ ...prev, [questionId]: false }));
        fetchDiscussions(); // Refresh to show new reply
      }
    } catch (err) {
      console.error("Reply failed");
    }
  };

  const filteredDiscussions = discussions.filter((d) => {
    if (filter === "answered") return d.replies.length > 0;
    if (filter === "unanswered") return d.replies.length === 0;
    return true;
  });

  return (
    <main className="min-h-screen bg-black text-gray-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-[#035b77] mb-10 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Modules
        </button>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-4">
            {typeof topic === 'string' ? topic.replace(/-/g, " ") : "Discussion"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="bg-[#035b77] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest">
              {course}
            </span>
            <div className="h-[1px] flex-grow bg-gray-900" />
          </div>
        </header>

        {/* Post Question Form */}
        <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-[2.5rem] mb-12 shadow-2xl">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#035b77] mb-4">Initiate New Thread</h2>
          <form onSubmit={handlePostQuestion} className="space-y-4">
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What is your technical query?"
              className="w-full bg-black/50 border border-gray-800 rounded-2xl p-5 text-sm focus:outline-none focus:border-[#035b77] transition-all resize-none min-h-[100px]"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPosting || !newQuestion.trim()}
                className="bg-[#035b77] hover:bg-[#047293] disabled:opacity-30 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all"
              >
                {isPosting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} 
                BroadCast Question
              </button>
            </div>
          </form>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-8 px-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-600">Active Stream</h3>
          <div className="flex items-center gap-3 bg-gray-900/50 p-1.5 rounded-xl border border-gray-800">
            <Filter size={14} className="ml-2 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-[10px] font-black uppercase tracking-widest focus:outline-none pr-4 cursor-pointer"
            >
              <option value="all">View All</option>
              <option value="answered">Answered</option>
              <option value="unanswered">Waiting</option>
            </select>
          </div>
        </div>

        {/* Discussion List */}
        <div className="space-y-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center">
              <Loader2 className="animate-spin text-[#035b77] mb-4" size={32} />
              <p className="text-[10px] font-black text-gray-700 tracking-[0.4em] uppercase">Fetching Threads...</p>
            </div>
          ) : error ? (
            <div className="bg-red-950/20 border border-red-900/50 p-8 rounded-3xl flex items-center gap-4 text-red-500">
              <AlertCircle size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
            </div>
          ) : filteredDiscussions.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-900 rounded-[3rem]">
              <p className="text-[10px] font-black text-gray-700 tracking-widest uppercase">No data found in this stream</p>
            </div>
          ) : (
            filteredDiscussions.map((discussion, idx) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-900/20 border border-gray-800/60 rounded-[2.5rem] overflow-hidden"
              >
                {/* Question Block */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#035b77]/20 border border-[#035b77]/40 flex items-center justify-center text-[#035b77]">
                        <User size={14} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{discussion.author}</span>
                    </div>
                    <button 
                      onClick={() => setShowReplyBox(prev => ({ ...prev, [discussion.id]: !prev[discussion.id] }))}
                      className="text-[9px] font-black uppercase tracking-widest text-[#035b77] hover:text-white transition-colors"
                    >
                      {showReplyBox[discussion.id] ? "Cancel" : "Post Answer"}
                    </button>
                  </div>
                  <p className="text-white font-medium leading-relaxed">{discussion.question}</p>

                  {/* Reply Area */}
                  <div className="mt-8 space-y-4">
                    {discussion.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-4 group">
                        <CornerDownRight size={16} className="text-gray-800 group-hover:text-[#035b77] transition-colors mt-1" />
                        <div className="flex-grow bg-black/40 border border-gray-900 p-4 rounded-2xl">
                          <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 mb-1">{reply.author}</p>
                          <p className="text-[13px] text-gray-400 leading-relaxed">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Reply Input Box */}
                    <AnimatePresence>
                      {showReplyBox[discussion.id] && (
                        <motion.form 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          onSubmit={(e) => handleReplySubmit(discussion.id, e)}
                          className="pl-8 pt-4"
                        >
                          <textarea
                            value={replyInputs[discussion.id] || ""}
                            onChange={(e) => setReplyInputs(prev => ({ ...prev, [discussion.id]: e.target.value }))}
                            placeholder="Input your response..."
                            className="w-full bg-black border border-gray-800 rounded-xl p-4 text-xs focus:outline-none focus:border-[#035b77] min-h-[80px]"
                          />
                          <div className="flex justify-end mt-2">
                            <button className="bg-white text-black text-[9px] font-black uppercase tracking-widest px-6 py-2 rounded-lg hover:bg-[#035b77] hover:text-white transition-all">
                              Transmit Reply
                            </button>
                          </div>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}