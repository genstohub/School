"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, Send, Paperclip, ShieldCheck, 
  MessageSquare, User, Search, MoreVertical,
  CheckCircle2, Clock, Info
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "instructor" | "support";
  text: string;
  timestamp: string;
}

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  status: "open" | "resolved" | "pending";
  category: "QA" | "Admin" | "Tech";
}

export default function SupportChatPage() {
  const [activeThread, setActiveThread] = useState("1");
  const [newMessage, setNewMessage] = useState("");

  const threads: Thread[] = [
    { id: "1", title: "QA: Quantum Video Flag", lastMessage: "Please check the audio sync...", status: "pending", category: "QA" },
    { id: "2", title: "Admin: Monthly Payouts", lastMessage: "Your invoice has been approved.", status: "resolved", category: "Admin" },
    { id: "3", title: "Tech: Dashboard Bug", lastMessage: "We are investigating the loading lag.", status: "open", category: "Tech" },
  ];

  const [chatHistory, setChatHistory] = useState<Message[]>([
    { id: "101", sender: "support", text: "Hello Instructor! I'm reviewing the 'Quantum Mechanics' video you submitted.", timestamp: "10:00 AM" },
    { id: "102", sender: "instructor", text: "Great, I saw there was a flag for audio issues. Is it in the intro?", timestamp: "10:05 AM" },
    { id: "103", sender: "support", text: "Yes, exactly. Between 02:30 and 03:15, the audio drifts by about 2 seconds.", timestamp: "10:12 AM" },
  ]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      sender: "instructor",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory([...chatHistory, msg]);
    setNewMessage("");
  };

  return (
    <main className="h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
      
      {/* Top Header */}
      <header className="h-20 border-b border-zinc-900 px-8 flex items-center justify-between bg-[#0A0A0B]">
        <div className="flex items-center gap-6">
          <Link href="/instructors" className="text-zinc-500 hover:text-white transition">
            <ArrowLeft size={20} />
          </Link>
          <div className="h-8 w-[1px] bg-zinc-800" />
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              Communication Center <span className="text-[10px] bg-cyan-500/10 text-cyan-500 px-2 py-0.5 rounded border border-cyan-500/20">Active</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <ShieldCheck size={20} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">Verified Secure Channel</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar: Threads List */}
        <aside className="w-80 border-r border-zinc-900 bg-[#080809] hidden md:flex flex-col">
          <div className="p-6 border-b border-zinc-900">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input 
                placeholder="Search tickets..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-zinc-600"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {threads.map((thread) => (
              <button 
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={`w-full p-6 text-left border-b border-zinc-900/50 transition-all hover:bg-zinc-900/30 ${activeThread === thread.id ? 'bg-zinc-900/50 border-l-4 border-l-cyan-500' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                    thread.category === 'QA' ? 'bg-purple-500/10 text-purple-400' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {thread.category}
                  </span>
                  {thread.status === 'resolved' ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Clock size={12} className="text-zinc-600" />}
                </div>
                <h3 className="font-bold text-sm mb-1 truncate">{thread.title}</h3>
                <p className="text-xs text-zinc-500 truncate">{thread.lastMessage}</p>
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Window */}
        <section className="flex-1 flex flex-col bg-[#050505]">
          
          {/* Thread Status Banner */}
          <div className="px-8 py-4 bg-zinc-900/20 border-b border-zinc-900 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                  <User size={18} className="text-zinc-400" />
               </div>
               <div>
                  <h4 className="text-xs font-black uppercase">QA Support Agent #12</h4>
                  <p className="text-[10px] text-zinc-500">Typically responds in 5 mins</p>
               </div>
            </div>
            <MoreVertical size={18} className="text-zinc-700 cursor-pointer" />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'instructor' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.sender === 'instructor' ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                  <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.sender === 'instructor' 
                    ? 'bg-cyan-600 text-white rounded-tr-none shadow-lg shadow-cyan-900/20' 
                    : 'bg-zinc-900 text-zinc-300 rounded-tl-none border border-zinc-800'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-8 border-t border-zinc-900 bg-[#0A0A0B]">
            <div className="max-w-4xl mx-auto relative flex items-center gap-4">
              <button className="p-3 text-zinc-500 hover:text-white transition">
                <Paperclip size={20} />
              </button>
              <div className="flex-1 relative">
                <input 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message to Admin or QA..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-sm outline-none focus:border-cyan-500/50 transition-all shadow-inner"
                />
              </div>
              <button 
                onClick={sendMessage}
                className="bg-white text-black p-4 rounded-2xl hover:bg-cyan-400 transition-all shadow-lg active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-center text-[9px] text-zinc-700 mt-4 uppercase font-bold tracking-[0.2em]">
              Authorized Personnel Only — Privacy Encrypted
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}