"use client";

import React, { useState } from "react";
import { 
  Video, Calendar, Clock, User, ArrowRight, 
  PlayCircle, Search, Filter 
} from "lucide-react";
import Link from "next/link";

interface LiveSession {
  id: string;
  title: string;
  tutor: string;
  time: string;
  status: "live" | "scheduled";
  studentsJoined?: number;
}

export default function LiveSessionsDashboard() {
  const [sessions] = useState<LiveSession[]>([
    { id: "chm-101", title: "Organic Chemistry: Carbon Bonds", tutor: "Dr. Sarah", time: "Now", status: "live", studentsJoined: 142 },
    { id: "mth-102", title: "Advanced Calculus II", tutor: "Prof. Benson", time: "2:00 PM", status: "scheduled" },
    { id: "phy-101", title: "Quantum Physics Introduction", tutor: "Dr. Ojo", time: "4:30 PM", status: "scheduled" },
  ]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight">Virtual Classrooms</h1>
          <p className="text-gray-500 font-medium">Join ongoing live classes or set reminders for upcoming ones.</p>
        </header>

        {/* Section: Live Now */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-500 w-2 h-2 rounded-full animate-pulse" />
            <h2 className="text-xs font-black uppercase tracking-widest text-red-500">Happening Now</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sessions.filter(s => s.status === "live").map(session => (
              <div key={session.id} className="bg-gray-900 border border-white/10 rounded-[2rem] p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6">
                    <Video className="text-red-500/20 group-hover:text-red-500/40 transition-colors" size={80} />
                </div>
                
                <div className="relative z-10">
                  <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Live</span>
                  <h3 className="text-2xl font-bold mt-4 mb-2">{session.title}</h3>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                    <span className="flex items-center gap-1"><User size={14}/> {session.tutor}</span>
                    <span className="flex items-center gap-1 font-bold text-blue-500">{session.studentsJoined} Students joined</span>
                  </div>
                  
                  <Link href={`/students/live/${session.id}`} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-blue-900/20">
                    Join Classroom <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Schedule */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-gray-500" size={18} />
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-500">Upcoming Schedule</h2>
          </div>

          <div className="space-y-3">
            {sessions.filter(s => s.status === "scheduled").map(session => (
              <div key={session.id} className="bg-gray-900/50 border border-gray-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold">{session.title}</h4>
                    <p className="text-xs text-gray-500">{session.tutor} • Starts at {session.time}</p>
                  </div>
                </div>
                <button className="bg-gray-800 hover:bg-gray-700 text-xs font-bold px-6 py-3 rounded-lg transition-colors uppercase tracking-widest">
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