"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Send, 
  Users, 
  ArrowLeft, 
  FileText, 
  Zap,
  MoreVertical,
  Smile,
  LucideIcon // Added this for icon typing
} from "lucide-react";
import { useUser } from "@/hooks";

// --- Types & Interfaces ---
interface User {
  id: string;
  first_name: string;
  last_name?: string;
  email?: string;
}

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  avatarColor: string;
}

interface SidebarItemProps {
  icon: React.ReactNode; // Changed from any to ReactNode
  label: string;
  count?: number;
  isLive?: boolean;
}

export default function CourseChatRoom() {
  const params = useParams();
  const router = useRouter();
  
  // Explicitly typing the useUser hook return
  const { user } = useUser() as { user: User | null };
  
  // Ensuring course-code (or courseId) is handled safely
  const courseCode = (params["course-code"] as string) || "Course";
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      { id: "1", user: "Amina", text: "Has anyone solved the second problem in the CHM 101 assignment?", timestamp: "12:01 PM", isMe: false, avatarColor: "bg-purple-500" },
      { id: "2", user: "John Doe", text: "I'm still stuck on the thermodynamics part. Mind sharing a hint?", timestamp: "12:05 PM", isMe: false, avatarColor: "bg-orange-500" },
      { id: "3", user: "System", text: "Dr. Ojo joined the room.", timestamp: "12:10 PM", isMe: false, avatarColor: "bg-gray-700" },
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: user?.first_name || "Me",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
      avatarColor: "bg-blue-600"
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-800 rounded-xl text-gray-400 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              {courseCode.replace("-", " ")} <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Live Discussion Group</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                U{i}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold">
              +12
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-white"><MoreVertical size={20} /></button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-gray-800 flex-col p-4 bg-gray-950/50">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Study Tools</h3>
          <nav className="space-y-2">
            <SidebarItem icon={<FileText size={18}/>} label="Shared PDF Notes" count={12} />
            <SidebarItem icon={<Zap size={18}/>} label="Flashcards" count={5} />
            <SidebarItem icon={<Users size={18}/>} label="Voice Channel" isLive />
          </nav>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col relative">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg shrink-0 ${msg.avatarColor} flex items-center justify-center text-[10px] font-bold shadow-lg`}>
                    {msg.user[0]}
                  </div>
                  <div>
                    {!msg.isMe && <p className="text-[10px] font-bold text-gray-500 mb-1 ml-1">{msg.user}</p>}
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.isMe 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-gray-900 border border-gray-800 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <p className={`text-[9px] text-gray-600 mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>{msg.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-900/50 backdrop-blur-md border-t border-gray-800">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-2 bg-gray-950 border border-gray-800 p-2 rounded-2xl">
              <button type="button" className="p-2 text-gray-500 hover:text-blue-500"><Smile size={20}/></button>
              <input 
                type="text" 
                placeholder={`Message in ${courseCode.replace("-", " ")}...`}
                className="flex-1 bg-transparent border-none outline-none text-sm p-2"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="bg-blue-600 p-2.5 rounded-xl text-white">
                <Send size={18} />
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- Helper Components ---
function SidebarItem({ icon, label, count, isLive }: SidebarItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-900 cursor-pointer group transition-all">
      <div className="flex items-center gap-3 text-gray-400 group-hover:text-white">
        {icon}
        <span className="text-xs font-bold">{label}</span>
      </div>
      {count !== undefined && <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded-md text-gray-500 font-bold">{count}</span>}
      {isLive && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
    </div>
  );
}