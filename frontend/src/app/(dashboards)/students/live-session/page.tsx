"use client";

import React, { useState, useEffect } from "react";
import { 
  Send, Users, MessageSquare, Mic, MicOff, 
  Hand, ArrowLeft, Loader2 
} from "lucide-react";
import Link from "next/link";

// --- Define the shape of your session data ---
interface SessionData {
  id: string;
  title: string;
  tutor: string;
  description?: string;
  streamUrl?: string;
}

export default function LiveClassroom() {
  const [activeTab, setActiveTab] = useState<"chat" | "qa">("chat");
  const [isMicOn, setIsMicOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [message, setMessage] = useState("");
  
  // Use the interface instead of 'any'
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveDetails() {
      try {
        setLoading(true);
        const res = await fetch("/api/students/live-sessions/current"); 
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data: SessionData = await res.json();
        setSessionData(data);
      } catch (err) {
        // Fallback for your FE development
        setSessionData({ 
          id: "curr-01",
          title: "Organic Chemistry: Carbon Bonds", 
          tutor: "Dr. Sarah" 
        });
      } finally {
        setLoading(false);
      }
    }
    fetchLiveDetails();
  }, []);

  const handleRaiseHand = () => {
    setHandRaised(!handRaised);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
        <Link href="/students/live-session" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> 
          <span className="text-sm">Leave Class</span>
        </Link>
        
        <h2 className="font-bold truncate px-4">{sessionData?.title}</h2>
        
        <div className="flex items-center gap-3">
           <div className="bg-red-500 w-2 h-2 rounded-full animate-pulse" />
           <span className="text-xs font-bold uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Player Section */}
        <div className="flex-1 flex flex-col relative bg-black">
          <div className="flex-1 flex items-center justify-center">
            {/* VIDEO STREAM CONTAINER */}
            <div className="text-center">
              <p className="text-gray-600 italic">Streaming Interface Connected...</p>
              <p className="text-gray-800 text-xs mt-2 uppercase tracking-tighter">
                Session ID: {sessionData?.id}
              </p>
            </div>
          </div>

          {/* Instructor Interaction Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-gray-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-4 rounded-xl transition-all ${isMicOn ? 'bg-green-600 shadow-[0_0_15px_rgba(22,163,74,0.4)]' : 'bg-gray-700 hover:bg-gray-600'}`}
              title={isMicOn ? "Mute Microphone" : "Unmute to Talk"}
            >
              {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>

            <button 
              onClick={handleRaiseHand}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold transition-all ${handRaised ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
            >
              <Hand size={20} />
              {handRaised ? "Hand Raised" : "Ask to Speak"}
            </button>
          </div>
        </div>

        {/* Sidebar: Chat & Questions */}
        <div className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col shadow-2xl">
          <div className="flex border-b border-gray-800">
            <button 
              onClick={() => setActiveTab("chat")}
              className={`flex-1 p-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'chat' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Live Chat
            </button>
            <button 
              onClick={() => setActiveTab("qa")}
              className={`flex-1 p-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'qa' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Q&A
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === "chat" ? (
              <div className="space-y-4">
                <div className="text-sm bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                  <span className="text-blue-400 font-bold block mb-1">Student John</span>
                  <p className="text-gray-300">Hello everyone!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                 <p className="text-[10px] text-gray-500 uppercase font-bold text-center tracking-widest">Formal Question Queue</p>
                 <div className="bg-blue-600/10 border border-blue-500/20 p-3 rounded-lg">
                    <span className="text-xs text-blue-400 font-bold">Question from Sarah:</span>
                    <p className="text-sm mt-1 italic text-gray-200">
                      &quot;How does the catalyst affect the carbon bond?&quot;
                    </p>
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 bg-gray-900">
            <div className="relative">
              <input 
                type="text" 
                placeholder={activeTab === "chat" ? "Type a message..." : "Ask a formal question..."}
                className="w-full bg-gray-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent transition-all"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 p-2 hover:text-blue-400 transition-colors"
                aria-label="Send message"
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