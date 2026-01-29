"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Users, Mic, MicOff, Hand, ArrowLeft, 
  Loader2, Settings, Timer, Video, MessageSquare 
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- Types & Interfaces ---
interface SessionData {
  title: string;
  tutor: string;
  startTime: string; // ISO String from Backend
  description: string;
}

interface Message {
  id: string;
  user: string;
  text: string;
  isSystem?: boolean;
  timestamp: Date;
}

interface TimeLeft {
  minutes: string;
  seconds: string;
  ms: string;
}

export default function LiveClassroom() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- States ---
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ minutes: "00", seconds: "00", ms: "00" });
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", user: "System", text: "Welcome! Syncing stream...", isSystem: true, timestamp: new Date() }
  ]);

  // --- 1. Fetch Session Data ---
  useEffect(() => {
    const fetchSession = async () => {
      // Simulation of fetching the instructor's scheduled session
      setTimeout(() => {
        setSessionData({
          title: "Advanced React Patterns",
          tutor: "Dr. Sarah",
          startTime: new Date(Date.now() + 1000 * 60 * 5).toISOString(), // Starts in 5 mins
          description: "Mastering server actions and concurrent mode."
        });
        setLoading(false);
      }, 800);
    };
    fetchSession();
  }, [sessionId]);

  // --- 2. Countdown Timer Logic ---
  useEffect(() => {
    if (!sessionData || isLive) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(sessionData.startTime).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsLive(true); // Automatically go live when time hits zero
        return;
      }

      setTimeLeft({
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
        seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'),
        ms: Math.floor((distance % 1000) / 10).toString().padStart(2, '0')
      });
    }, 50);

    return () => clearInterval(timer);
  }, [sessionData, isLive]);

  // --- 3. Chat Logic ---
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      user: "Me",
      text: messageInput,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, msg]);
    setMessageInput("");
  };

  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500" size={32} />
    </div>
  );

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden font-sans">
      
      {/* Header */}
      <header className="bg-zinc-900/50 border-b border-zinc-800 p-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <Link href="/students/live" className="p-2 hover:bg-zinc-800 rounded-xl transition-colors text-zinc-400 hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="font-black text-xs uppercase tracking-widest italic text-blue-500">{sessionData?.title}</h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase">{sessionData?.tutor}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-full">
                <Users size={14} className="text-blue-500" />
                <span className="text-[10px] font-black tabular-nums">2,481</span>
            </div>
            <Settings size={18} className="text-zinc-600 cursor-pointer hover:text-white" />
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* Main Viewport (Video or Countdown) */}
        <div className="flex-1 bg-black relative flex items-center justify-center p-4 lg:p-8">
          {!isLive ? (
            <div className="text-center space-y-8 max-w-md animate-in fade-in zoom-in duration-1000">
              <div className="w-24 h-24 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-blue-500/20 shadow-2xl shadow-blue-500/10">
                <Timer className="text-blue-500 animate-pulse" size={42} />
              </div>
              <div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">
                    Syncing <span className="text-blue-500">Live...</span>
                </h3>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
                    Class starts in
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: timeLeft.minutes, label: "Min" },
                  { val: timeLeft.seconds, label: "Sec" },
                  { val: timeLeft.ms, label: "Ms" }
                ].map((item) => (
                  <div key={item.label} className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl">
                    <div className="text-3xl font-black tabular-nums tracking-tighter">{item.val}</div>
                    <div className="text-[9px] font-black uppercase text-zinc-600 tracking-widest mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-zinc-600 text-[10px] font-bold uppercase italic max-w-[250px] mx-auto leading-relaxed">
                Agenda: {sessionData?.description}
              </p>
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-900/40 rounded-[2.5rem] border border-zinc-800 flex items-center justify-center overflow-hidden relative group">
                <div className="text-center space-y-4">
                    <Video size={48} className="text-zinc-800 mx-auto mb-2 group-hover:text-blue-500/20 transition-colors" />
                    <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">Broadcast Encrypted</p>
                </div>
                {/* Simulated Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-zinc-900/95 backdrop-blur-xl p-3 rounded-3xl border border-white/5 shadow-2xl">
                    <button className="p-4 bg-zinc-800 rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition-all"><MicOff size={20} /></button>
                    <button className="flex items-center gap-3 px-8 py-4 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
                        <Hand size={18} /> Raise Hand
                    </button>
                </div>
            </div>
          )}
        </div>

        {/* Sidebar (Live Chat) */}
        <aside className="w-full lg:w-[400px] bg-zinc-950 border-t lg:border-t-0 lg:border-l border-zinc-900 flex flex-col h-[45vh] lg:h-auto">
          <div className="p-4 border-b border-zinc-900 flex items-center gap-2">
            <MessageSquare size={16} className="text-blue-500" />
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Classroom Chats</h4>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`animate-in slide-in-from-bottom-2 duration-300 ${msg.isSystem ? 'text-center py-2' : ''}`}>
                {msg.isSystem ? (
                  <span className="text-[9px] font-black uppercase text-zinc-600 tracking-widest bg-zinc-900/50 px-3 py-1 rounded-full">
                    {msg.text}
                  </span>
                ) : (
                  <div className="space-y-1">
                    <span className={`text-[10px] font-black uppercase tracking-tight ${msg.user === "Me" ? 'text-blue-500' : 'text-zinc-500'}`}>
                        {msg.user}
                    </span>
                    <p className="text-sm text-zinc-200 bg-zinc-900/50 p-3 rounded-2xl rounded-tl-none border border-white/5">
                        {msg.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-zinc-900/30 border-t border-zinc-900">
            <div className="flex gap-2">
              <input 
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-black border border-zinc-800 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-zinc-700"
              />
              <button 
                type="submit"
                disabled={!messageInput.trim()}
                className="bg-white text-black p-3 rounded-2xl hover:bg-blue-500 hover:text-white transition-all disabled:opacity-20"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </aside>
      </div>
    </div>
  );
}