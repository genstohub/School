"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Users, Mic, MicOff, Hand, ArrowLeft, 
  Loader2, Timer, Video, MessageSquare 
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface SessionData {
  title: string;
  tutor: string;
  startTime: string;
  description: string;
}

interface Message {
  id: string;
  user: string;
  text: string;
  isSystem?: boolean;
}

export default function LiveClassroom() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Audio handling
  const [isMicActive, setIsMicActive] = useState(false);
  const audioStream = useRef<MediaStream | null>(null);

  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [timeLeft, setTimeLeft] = useState({ min: "00", sec: "00" });
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", user: "System", text: "Microphone access requested for live interaction.", isSystem: true }
  ]);

  // 1. Fetch Session (Set to 30s countdown for immediate feel)
  useEffect(() => {
    const fetchSession = async () => {
      setTimeout(() => {
        setSessionData({
          title: "Advanced React Patterns",
          tutor: "Dr. Sarah",
          startTime: new Date(Date.now() + 1000 * 30).toISOString(), // 30 Seconds Countdown
          description: "Mastering server actions and concurrent mode."
        });
        setLoading(false);
      }, 500);
    };
    fetchSession();
  }, [sessionId]);

  // 2. Countdown Logic
  useEffect(() => {
    if (!sessionData || isLive) return;
    const timer = setInterval(() => {
      const distance = new Date(sessionData.startTime).getTime() - new Date().getTime();
      if (distance < 0) {
        setIsLive(true);
        clearInterval(timer);
      } else {
        setTimeLeft({
          min: Math.floor((distance / 1000 / 60) % 60).toString().padStart(2, '0'),
          sec: Math.floor((distance / 1000) % 60).toString().padStart(2, '0')
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [sessionData, isLive]);

  // 3. Microphone Toggle Logic
  const toggleMic = async () => {
    try {
      if (!isMicActive) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStream.current = stream;
        setIsMicActive(true);
      } else {
        audioStream.current?.getTracks().forEach(track => track.stop());
        setIsMicActive(false);
      }
    } catch (err) {
      alert("Please allow microphone access to speak.");
    }
  };

  // 4. Chat Messaging
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), user: "Me", text: messageInput }]);
    setMessageInput("");
    setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (loading) return (
    <div className="h-screen bg-black flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500" size={32} />
    </div>
  );

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden font-sans italic">
      
      {/* Header - Optimized */}
      <header className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 p-5 flex justify-between items-center z-20">
        <div className="flex items-center gap-6">
          <Link href="/students/live" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="border-l border-zinc-700 pl-6">
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 line-clamp-1">
              {sessionData?.title}
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
              Host: {sessionData?.tutor}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">Live Session</span>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        
        {/* Main Viewport */}
        <div className="flex-1 bg-zinc-950 relative flex items-center justify-center p-6">
          {!isLive ? (
            <div className="text-center space-y-6 animate-in fade-in duration-700">
              <Timer className="text-blue-500 mx-auto animate-bounce" size={48} />
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter italic">Joining <span className="text-blue-500 text-5xl">Room</span></h3>
                <div className="flex justify-center gap-2 mt-4 tabular-nums text-2xl font-black">
                  <span className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800">{timeLeft.min}</span>
                  <span className="text-zinc-700 self-center">:</span>
                  <span className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-800">{timeLeft.sec}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-zinc-900 rounded-[3rem] border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
                <Video size={64} className="text-zinc-800 group-hover:text-blue-500/20 transition-all duration-700" />
                
                {/* Fixed Interactive Controls */}
                <div className="absolute bottom-10 flex items-center gap-4 bg-zinc-950/90 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/10 shadow-2xl">
                    <button 
                      onClick={toggleMic}
                      className={`p-5 rounded-[1.5rem] transition-all duration-300 ${isMicActive ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                    >
                      {isMicActive ? <Mic size={24} /> : <MicOff size={24} />}
                    </button>
                    <button className="flex items-center gap-3 px-10 py-5 bg-blue-600 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-blue-500 shadow-xl shadow-blue-500/20 transition-all active:scale-95">
                        <Hand size={20} /> Ask To Speak
                    </button>
                </div>
            </div>
          )}
        </div>

        {/* Sidebar Chat - Enter Key Functional */}
        <aside className="w-full lg:w-[420px] bg-zinc-950 border-l border-zinc-900 flex flex-col h-[40vh] lg:h-full">
          <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-500" />
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">Live Chat</h4>
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
               <Users size={14} />
               <span className="text-[10px] font-bold">1,240</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`${msg.isSystem ? 'bg-zinc-900/50 p-3 rounded-xl text-center' : 'space-y-1'} animate-in slide-in-from-right-4`}>
                <span className={`text-[10px] font-black uppercase ${msg.user === "Me" ? 'text-blue-500' : 'text-zinc-500'}`}>
                    {msg.user}
                </span>
                <p className={`text-sm ${msg.isSystem ? 'text-zinc-500 text-xs italic' : 'text-zinc-200'}`}>
                    {msg.text}
                </p>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-6 bg-zinc-900/20 border-t border-zinc-900">
            <div className="relative group">
              <input 
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Say something..."
                className="w-full bg-black border border-zinc-800 rounded-2xl pl-5 pr-14 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 bg-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:bg-blue-600 transition-all disabled:opacity-0"
                disabled={!messageInput.trim()}
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