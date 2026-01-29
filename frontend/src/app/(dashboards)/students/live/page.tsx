"use client";

import React, { useState, useEffect } from "react";
import { Video, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LiveSession {
  id: string;
  title: string;
  tutor: string;
  date: string; // YYYY-MM-DD from instructor
  time: string; // HH:mm from instructor
  description: string; // "Things to learn" from instructor
  status: "live" | "scheduled";
  studentsJoined?: number;
}

export default function LiveSessionsDashboard() {
  const [sessions, setSessions] = useState<LiveSession[]>([
    { 
      id: "chm-101", 
      title: "Organic Chemistry: Carbon Bonds", 
      tutor: "Dr. Sarah", 
      date: "2026-01-29",
      time: "09:00", 
      description: "Exploring covalent bonding and molecular geometry.",
      status: "live", 
      studentsJoined: 142 
    },
    { 
      id: "mth-102", 
      title: "Advanced Calculus II", 
      tutor: "Prof. Benson", 
      date: "2026-01-30",
      time: "14:00", 
      description: "Deep dive into multi-variable integration techniques.",
      status: "scheduled" 
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight uppercase italic">Virtual <span className="text-blue-500">Classrooms</span></h1>
          <p className="text-gray-500 font-medium uppercase text-xs tracking-widest">Real-time learning synchronization</p>
        </header>

        {/* Live Now */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-500 w-2 h-2 rounded-full animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-widest text-red-500">Happening Now</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.filter(s => s.status === "live").map(session => (
              <div key={session.id} className="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                <div className="relative z-10">
                  <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Live Now</span>
                  <h3 className="text-2xl font-black italic mt-4 mb-2 uppercase tracking-tighter">{session.title}</h3>
                  <p className="text-zinc-500 text-sm mb-6 line-clamp-2">{session.description}</p>
                  
                  <div className="flex items-center gap-4 text-zinc-400 text-xs font-bold mb-8">
                    <span className="flex items-center gap-1 uppercase"><User size={14} className="text-blue-500"/> {session.tutor}</span>
                    <span className="text-blue-500 uppercase">{session.studentsJoined} Watching</span>
                  </div>
                  
                  <Link href={`/students/live/${session.id}`} className="inline-flex items-center gap-2 bg-white text-black hover:bg-blue-500 hover:text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                    Enter Room <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-zinc-500" size={18} />
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500">Upcoming Schedule</h2>
          </div>

          <div className="grid gap-3">
            {sessions.filter(s => s.status === "scheduled").map(session => (
              <div key={session.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-900 transition-colors">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 border border-zinc-700">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase italic tracking-tight">{session.title}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1">
                      {session.tutor} • {session.date} @ {session.time} GMT+1
                    </p>
                  </div>
                </div>
                <button className="bg-zinc-800 hover:bg-blue-600 text-[10px] font-black px-6 py-4 rounded-xl transition-all uppercase tracking-[0.2em]">
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}