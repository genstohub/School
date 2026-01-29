"use client";

import React, { useState, useEffect } from "react";
import { Video, Calendar, Clock, User, ArrowRight, Bell, SpellCheck } from "lucide-react";
import Link from "next/link";

interface LiveSession {
  id: string;
  title: string;
  tutor: string;
  date: string; 
  time: string; 
  description: string;
  status: "live" | "scheduled";
  studentsJoined?: number;
}

export default function LiveSessionsDashboard() {
  const [reminders, setReminders] = useState<string[]>([]); // Track IDs of sessions with reminders

  const [sessions] = useState<LiveSession[]>([
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

  // Function to handle scheduling the notification
  const handleSetReminder = async (session: LiveSession) => {
    // 1. Request Browser Permission
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === "granted") {
      // 2. Calculate the trigger time (5 minutes before)
      const sessionDateTime = new Date(`${session.date}T${session.time}`);
      const reminderTime = sessionDateTime.getTime() - (5 * 60 * 1000); // Subtract 5 mins in ms
      const now = new Date().getTime();
      const delay = reminderTime - now;

      if (delay <= 0) {
        alert("This class is starting in less than 5 minutes or has already started!");
        return;
      }

      // 3. Set the Timeout for the notification
      setTimeout(() => {
        new Notification("Class Starting Soon!", {
          body: `${session.title} with ${session.tutor} starts in 5 minutes.`,
          icon: "/favicon.ico", // Ensure you have an icon path
        });
      }, delay);

      // 4. Update UI State
      setReminders((prev) => [...prev, session.id]);
      console.log(`Reminder set for ${session.title} in ${Math.round(delay/1000/60)} minutes.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10 font-sans italic">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black mb-2 tracking-tight uppercase italic">Virtual <span className="text-blue-500">Classrooms</span></h1>
          <p className="text-gray-500 font-medium uppercase text-[10px] tracking-[0.3em]">Real-time learning synchronization</p>
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
                    <span className="flex items-center gap-1 uppercase tracking-wider"><User size={14} className="text-blue-500"/> {session.tutor}</span>
                    <span className="text-blue-500 uppercase tracking-wider">{session.studentsJoined} Watching</span>
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
              <div key={session.id} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-900 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 border border-zinc-700 group-hover:border-blue-500/50 group-hover:text-blue-500 transition-all">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase italic tracking-tight">{session.title}</h4>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-widest">
                      {session.tutor} • {session.date} @ {session.time} GMT+1
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleSetReminder(session)}
                  disabled={reminders.includes(session.id)}
                  className={`flex items-center gap-2 text-[10px] font-black px-8 py-4 rounded-xl transition-all uppercase tracking-[0.2em] border ${
                    reminders.includes(session.id) 
                    ? "bg-blue-500/10 border-blue-500/50 text-blue-500" 
                    : "bg-zinc-800 border-zinc-700 hover:bg-blue-600 hover:border-blue-500"
                  }`}
                >
                  {reminders.includes(session.id) ? (
                    <>
                      <SpellCheck size={14} /> Reminder Set
                    </>
                  ) : (
                    <>
                      <Bell size={14} /> Set Reminder
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}