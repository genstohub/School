"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, px } from "framer-motion";
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  Smile,
  Eye,
  Loader2,
  ThumbsUp,
  MessageSquare,
  X,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

/**
 * Study Mate Chat Page (per-course)
 *
 * - Params: { course: string }
 * - Real-time: BroadcastChannel (local) + optional WebSocket (swap WS_URL)
 * - Image upload: reads file as data URL and sends in message.image
 * - Reactions: small emoji set, per-message reaction counts
 *
 * Notes:
 * - Replace BroadcastChannel with your websocket server + persistence when ready.
 * - For production image uploads, replace dataURL with upload-to-server -> send URL.
 */

type ChatMessage = {
  id: string;
  author: string;
  text?: string;
  image?: string; // data URL (or remote url)
  reactions: Record<string, string[]>; // emoji -> list of userIds who reacted
  timestamp: number;
};

const EMOJIS = ["👍", "❤", "😂", "🎉", "😮"];

const WS_URL = ""; // optional: "wss://your-server.example/ws/study-mate"

export default function CourseStudyMate({
  params,
}: {
  params: { course: string };
}) {
  const course = params.course?.toUpperCase() ?? "UNKNOWN";
  const userIdRef = useRef<string>(`user_${Math.random().toString(36).slice(2, 9)}`);
  const displayName = `Student ${userIdRef.current.slice(-4)}`;

  const channelName = useMemo(() => `study-mate-${course}`, [course]);

  // messages state
  const [messages, setMessages] = useState<ChatMessage[]>(() => []);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [showEmojiPickerFor, setShowEmojiPickerFor] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<Record<string, string>>({});
  const [viewerCount, setViewerCount] = useState(1);

  const bcRef = useRef<BroadcastChannel | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const presencePingTimer = useRef<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Ensure scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // initialize BroadcastChannel & WS fallback, presence handling
  useEffect(() => {
    // BroadcastChannel setup (works same-origin & multi-tabs)
    try {
      const bc = new BroadcastChannel(channelName);
      bc.onmessage = (ev) => {
        const { type, payload } = ev.data || {};
        if (!type) return;
        if (type === "message") {
          setMessages((m) => {
            // dedupe
            if (m.some((mm) => mm.id === payload.id)) return m;
            return [...m, payload].sort((a, b) => a.timestamp - b.timestamp);
          });
        } else if (type === "reaction") {
          setMessages((m) =>
            m.map((msg) =>
              msg.id === payload.messageId ? { ...msg, reactions: payload.reactions } : msg
            )
          );
        } else if (type === "presence") {
          // payload: { userId, name, ts }
          setViewerCount((prev) => {
            // simple heuristic: presence payload will broadcast many times; use Set
            // We'll use typingUsers map to track unique users (but here just increment)
            return prev; // we'll update below via presenceSet
          });
        } else if (type === "typing") {
          const { userId, name, isTyping } = payload;
          setTypingUsers((t) => {
            const copy = { ...t };
            if (isTyping) copy[userId] = name;
            else delete copy[userId];
            return copy;
          });
        } else if (type === "presence-list") {
          // payload: array of userIds -> update viewerCount
          const unique = new Set(payload || []);
          setViewerCount(unique.size || 1);
        }
      };
      bcRef.current = bc;
    } catch (e) {
      console.warn("BroadcastChannel not available:", e);
    }

    // WebSocket optional connection (if WS_URL provided)
    if (WS_URL) {
      try {
        const ws = new WebSocket(WS_URL);
        ws.onopen = () => {
          ws.send(JSON.stringify({ type: "join", payload: { channel: channelName, userId: userIdRef.current, name: displayName } }));
        };
        ws.onmessage = (ev) => {
          // expected shape similar to bc
          try {
            const msg = JSON.parse(ev.data);
            if (!msg.type) return;
            if (msg.type === "message") {
              setMessages((m) => (m.some((mm) => mm.id === msg.payload.id) ? m : [...m, msg.payload]));
            } else if (msg.type === "reaction") {
              setMessages((m) =>
                m.map((ms) =>
                  ms.id === msg.payload.messageId ? { ...ms, reactions: msg.payload.reactions } : ms
                )
              );
            } else if (msg.type === "presence-list") {
              const unique = new Set(msg.payload || []);
              setViewerCount(unique.size || 1);
            }
          } catch (err) {
            console.warn("WS parse error", err);
          }
        };
        wsRef.current = ws;
      } catch (err) {
        console.warn("WebSocket init failed", err);
      }
    }

    // presence using BroadcastChannelSet pattern: maintain list in localStorage per channel
    const PRES_KEY = `presence_${channelName}`;
    const registerPresence = () => {
      try {
        const cur = JSON.parse(localStorage.getItem(PRES_KEY) || "[]") as string[];
        const next = [...new Set([...cur, userIdRef.current])];
        localStorage.setItem(PRES_KEY, JSON.stringify(next));
        // broadcast presence list
        bcRef.current?.postMessage({ type: "presence-list", payload: next });
        // also notify WS if exists
        wsRef.current?.send(JSON.stringify({ type: "presence-list", payload: next }));
      } catch {}
    };
    const unregisterPresence = () => {
      try {
        const cur = JSON.parse(localStorage.getItem(PRES_KEY) || "[]") as string[];
        const next = cur.filter((id) => id !== userIdRef.current);
        localStorage.setItem(PRES_KEY, JSON.stringify(next));
        bcRef.current?.postMessage({ type: "presence-list", payload: next });
        wsRef.current?.send(JSON.stringify({ type: "presence-list", payload: next }));
      } catch {}
    };

    registerPresence();
    // keep presence refreshed every 10s
    presencePingTimer.current = window.setInterval(registerPresence, 10000);

    // on unload remove presence
    const onUnload = () => {
      unregisterPresence();
    };
    window.addEventListener("beforeunload", onUnload);

    return () => {
      // cleanup
      presencePingTimer.current && clearInterval(presencePingTimer.current);
      window.removeEventListener("beforeunload", onUnload);
      try {
        // remove from list
        const cur = JSON.parse(localStorage.getItem(PRES_KEY) || "[]") as string[];
        const next = cur.filter((id) => id !== userIdRef.current);
        localStorage.setItem(PRES_KEY, JSON.stringify(next));
        bcRef.current?.close();
      } catch {}
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName]);

  // helper to broadcast to BC and WS
  const broadcast = (payload: { type: string; payload: unknown }) => {
    try {
      bcRef.current?.postMessage(payload);
    } catch (e) {
      // ignore
    }
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(payload));
      }
    } catch {}
  };

  // send message (text or image)
  const sendMessage = async (opts?: { imageDataUrl?: string }) => {
    if (!input.trim() && !opts?.imageDataUrl) return;
    setSending(true);
    const msg: ChatMessage = {
      id: uuidv4(),
      author: displayName,
      text: opts?.imageDataUrl ? input.trim() || undefined : input.trim() || undefined,
      image: opts?.imageDataUrl,
      reactions: {},
      timestamp: Date.now(),
    };

    // optimistic update
    setMessages((m) => [...m, msg]);
    broadcast({ type: "message", payload: msg });

    setInput("");
    setSending(false);
  };

  // file -> dataURL
  const handleFileInput = async (file?: File) => {
    const f = file;
    if (!f) return;
    // basic validations
    const MAX_MB = 5;
    if (f.size > MAX_MB * 1024 * 1024) {
      alert(`Image too large. Max ${MAX_MB}MB.`);
      return;
    }

    setFileUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = String(e.target?.result || "");
      // In production: upload to server and get URL; here we send dataUrl
      await sendMessage({ imageDataUrl: dataUrl });
      setFileUploading(false);
    };
    reader.readAsDataURL(f);
  };

  // reactions
  const toggleReaction = (messageId: string, emoji: string) => {
    setMessages((msgs) => {
      const updated = msgs.map((m) => {
        if (m.id !== messageId) return m;
        const users = m.reactions[emoji] || [];
        const has = users.includes(userIdRef.current);
        const nextUsers = has ? users.filter((u) => u !== userIdRef.current) : [...users, userIdRef.current];
        return {
          ...m,
          reactions: {
            ...m.reactions,
            [emoji]: nextUsers,
          },
        };
      });
      // broadcast reaction update (for the single message)
      const target = updated.find((x) => x.id === messageId);
      if (target) {
        broadcast({ type: "reaction", payload: { messageId, reactions: target.reactions } });
      }
      return updated;
    });
  };

  // typing indicator
  useEffect(() => {
    const bc = bcRef.current;
    let typingTimer: number | null = null;
    const sendTyping = (isTyping: boolean) => {
      broadcast({ type: "typing", payload: { userId: userIdRef.current, name: displayName, isTyping } });
    };

    const onInput = () => {
      sendTyping(true);
      if (typingTimer) clearTimeout(typingTimer);
      typingTimer = window.setTimeout(() => sendTyping(false), 1200);
    };

    // attach to input change effect
    // We'll listen to input state changes below via a watch
    return () => {
      if (typingTimer) clearTimeout(typingTimer);
      sendTyping(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update typing broadcast when input changes
  useEffect(() => {
    if (!bcRef.current && !wsRef.current) return;
    if (input.length > 0) {
      broadcast({ type: "typing", payload: { userId: userIdRef.current, name: displayName, isTyping: true } });
      const t = window.setTimeout(() => {
        broadcast({ type: "typing", payload: { userId: userIdRef.current, name: displayName, isTyping: false } });
      }, 1200);
      return () => clearTimeout(t);
    } else {
      broadcast({ type: "typing", payload: { userId: userIdRef.current, name: displayName, isTyping: false } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  // small UI helpers
  const renderReactions = (m: ChatMessage) => {
    const keys = Object.keys(m.reactions);
    if (keys.length === 0) return null;
    return (
      <div className="flex gap-2 items-center mt-2 flex-wrap">
        {keys.map((k) => {
          const users = m.reactions[k] || [];
          const count = users.length;
          const reacted = users.includes(userIdRef.current);
          return (
            <button
              key={k}
              onClick={() => toggleReaction(m.id, k)}
              className={`px-2 py-1 rounded-full text-sm flex items-center gap-2 border ${reacted ? "bg-blue-50 border-blue-200" : "bg-white border-gray-100"}`}
            >
              <span>{k}</span>
              <span className="text-xs text-gray-600">{count}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gray-53 p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">Study Mate — {course}</h1>
          <p className="text-sm text-gray-400 mt-1">Chat and study with classmates for this course.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-xl border">
            <Eye className="w-4 h-4 text-gray-500" />
            <span>{viewerCount} viewer{viewerCount > 1 ? "s" : ""}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            {Object.keys(typingUsers).length > 0 ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4 text-green-600" />
                <span className="text-xs">{Object.values(typingUsers).slice(0, 2).join(", ")} typing…</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: placeholder (could be course info) */}
        <div className="hidden lg:block">
          <div className="bg-white p-4 rounded-2xl shadow border text-sm">
            <h4 className="font-semibold mb-2">Course</h4>
            <p className="text-gray-600 mb-4">{course} — collaborative study area.</p>
            <h5 className="text-sm font-medium mb-1">Tips</h5>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Be respectful</li>
              <li>• Share images for clarity</li>
              <li>• React instead of repeating</li>
            </ul>
          </div>
        </div>

        {/* Middle: messages */}
        <div className="col-span-1 lg:col-span-2 flex flex-col">
          <div className="bg-white rounded-2xl shadow p-4 flex-1 overflow-auto" style={{ minHeight: 320, maxHeight: "65vh" }}>
            <div className="space-y-4">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border-b last:border-b-0 pb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-700">
                      {m.author.split(" ").map((s) => s[0]).slice(0, 2).join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-gray-800">{m.author}</div>
                          <div className="text-xs text-gray-500">{new Date(m.timestamp).toLocaleTimeString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowEmojiPickerFor((s) => (s === m.id ? null : m.id))}
                            className="p-1 rounded-md hover:bg-gray-100"
                            title="React"
                          >
                            <Smile className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {m.text ? <p className="mt-2 text-gray-900">{m.text}</p> : null}

                      {m.image ? (
                        <div className="mt-3">
                          <img src={m.image} alt="shared" className="max-w-full rounded-lg border" />
                        </div>
                      ) : null}

                      {renderReactions(m)}

                      {/* small emoji picker */}
                      <AnimatePresence>
                        {showEmojiPickerFor === m.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="mt-2 flex gap-2"
                          >
                            {EMOJIS.map((em) => (
                              <button
                                key={em}
                                onClick={() => {
                                  toggleReaction(m.id, em);
                                  setShowEmojiPickerFor(null);
                                }}
                                className="px-2 py-1 rounded-md hover:bg-gray-100"
                              >
                                {em}
                              </button>
                            ))}
                            <button onClick={() => setShowEmojiPickerFor(null)} className="px-2 py-1 rounded-md hover:bg-gray-100 text-gray-500">
                              <X className="w-4 h-4" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message composer */}
          <div className="mt-4 bg-gray-60 rounded-2xl shadow p-3 border">
            <div className="flex gap-2 items-center">
              <label className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                              <input
                                  aria-label="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileInput(f);
                    // reset input
                    e.currentTarget.value = "";
                  }}
                  className="hidden"
                />
                <Paperclip className="w-5 h-5 text-gray-600" />
              </label>

              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Write a message..."
                  className="w-full resize-none min-h-[46px] max-h-36 overflow-auto p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    // quick send image (if any uploading waiting)
                    if (fileUploading) return;
                    // if no file, just send text
                    sendMessage();
                  }}
                  disabled={sending || fileUploading}
                  className={`p-3 rounded-full ${sending ? "bg-gray-200" : "bg-blue-600 hover:bg-blue-700"} text-white`}
                >
                  {sending ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {fileUploading && (
              <div className="mt-3 text-xs text-gray-600 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Uploading images...
              </div>
            )}
          </div>
        </div>

        {/* Right: quick actions / participants */}
        <div className="hidden lg:block">
          <div className="bg-white p-4 rounded-2xl shadow border text-sm">
            <h4 className="font-semibold mb-2">Participants</h4>
            <p className="text-xs text-gray-500 mb-3">Active learners in this room</p>
            <div className="space-y-2">
              {/* For local demo we show typed users */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs">JD</div>
                  <div>
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-500">Online</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">Viewer</div>
                      </div>
      {/* dynamic typing list */}
              {Object.entries(typingUsers).map(([uid, name]) => (
                <div key={uid} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-xs">T</div>
                  <div>
                    <div className="text-sm">{name}</div>
                    <div className="text-xs text-gray-500">typing…</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}