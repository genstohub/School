"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Send, Users, MessageSquare, Mic, MicOff, 
  Hand, ArrowLeft, Loader2, Maximize2, Settings 
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- Interfaces ---
interface Message {
  id: string;
  user: string;
  text: string;
  isSystem?: boolean;
  timestamp: Date;
}

interface SessionData {
  id: string;
  title: string;
  tutor: string;
  description?: string;
  streamUrl?: string;
}

export default function LiveClassroom() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<"chat" | "qa">("chat");
  const [isMicOn, setIsMicOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State for live messages
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", user: "System", text: "Welcome to the live session! Please be respectful in the chat.", isSystem: true, timestamp: new Date() },
    { id: "2", user: "John Doe", text: "Will the slides be available after the class?", timestamp: new Date() },
    { id: "3", user: "Amina", text: "Yes John, check the resources tab later.", timestamp: new Date() },
  ]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  useEffect(() => {
    async function fetchLiveDetails() {
      try {
        setLoading(true);
        const res = await fetch(`/api/students/live-sessions/${sessionId}`); 
        if (!res.ok) throw new Error("Failed to fetch");
        const data: SessionData = await res.json();
        setSessionData(data);
      } catch (err) {
        setSessionData({ 
          id: sessionId,
          title: sessionId.replace("-", " ").toUpperCase(), 
          tutor: "Assigned Tutor" 
        });
      } finally {
        setLoading(false);
      }
    }
    fetchLiveDetails();
  }, [sessionId]);

  // --- Handlers ---
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: "Me", // This would ideally come from your auth context/user hook
      text: messageInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleRaiseHand = () => setHandRaised(!handRaised);

  if (loading) {
    return (
      <div className="h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/students/live" className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors">
            <ArrowLeft size={20} /> 
          </Link>
          <div className="hidden sm:block">
            <h2 className="font-black text-sm uppercase tracking-tight truncate max-w-[200px]">
              {sessionData?.title}
            </h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase">{sessionData?.tutor}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              <div className="bg-red-500 w-1.5 h-1.5 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase text-red-500 tracking-widest">Live Now</span>
           </div>
           <button className="text-gray-500 hover:text-white"><Settings size={18}/></button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Main Video Section */}
        <div className="flex-1 flex flex-col relative bg-black group">
          <div className="flex-1 flex items-center justify-center border-b lg:border-b-0 border-gray-800">
             <div className="text-center p-6">
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                   <Users className="text-blue-500" size={32} />
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-tighter text-sm">Waiting for Video Stream...</p>
                <p className="text-gray-600 text-[10px] mt-1">ID: {sessionId}</p>
             </div>
             
             <button className="absolute top-4 right-4 p-2 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={20} />
             </button>
          </div>

          {/* Floating Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-900/90 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl z-10">
            <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3 sm:p-4 rounded-xl transition-all ${isMicOn ? 'bg-green-600' : 'bg-gray-800 hover:bg-gray-700'}`}
            >
              {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button 
              onClick={handleRaiseHand}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-black text-xs transition-all uppercase tracking-widest ${handRaised ? 'bg-yellow-500 text-black' : 'bg-blue-600 text-white'}`}
            >
              <Hand size={18} className={handRaised ? "animate-bounce" : ""} />
              <span className="hidden sm:inline">{handRaised ? "Hand Raised" : "Ask to Speak"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Sidebar */}
        <div className="w-full lg:w-96 bg-gray-900 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col h-[40vh] lg:h-full">
          <div className="flex border-b border-gray-800 shrink-0">
            {(["chat", "qa"] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 p-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                  activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500 bg-blue-500/5' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === "chat" ? "Live Chat" : "Q&A Queue"}
              </button>
            ))}
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {activeTab === "chat" ? (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} user={msg.user} text={msg.text} isSystem={msg.isSystem} />
                ))}
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                 <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl">
                    <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Active Question</span>
                    <p className="text-sm mt-2 font-medium italic text-gray-200">
                      &quot;Could you explain the difference between covalent and ionic bonds once more?&quot;
                    </p>
                 </div>
              </div>
            )}
          </div>

          {/* Functional Input Area */}
          <div className="p-4 bg-gray-900/80 border-t border-gray-800">
            <div className="relative flex items-center gap-2">
              <input 
                type="text" 
                placeholder={activeTab === "chat" ? "Message classmates..." : "Ask the tutor..."}
                className="flex-1 bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="bg-blue-600 p-3 rounded-xl text-white hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ user, text, isSystem = false }: { user: string, text: string, isSystem?: boolean }) {
  return (
    <div className={`p-3 rounded-xl border animate-in fade-in slide-in-from-bottom-1 duration-300 ${isSystem ? 'bg-gray-800/30 border-gray-700/50' : 'bg-gray-800/50 border-transparent'}`}>
      <span className={`text-[10px] font-black uppercase tracking-tighter block mb-1 ${isSystem ? 'text-gray-500' : 'text-blue-500'}`}>
        {user}
      </span>
      <p className={`text-xs leading-relaxed ${isSystem ? 'text-gray-400 italic' : 'text-gray-200'}`}>{text}</p>
    </div>
  );
}