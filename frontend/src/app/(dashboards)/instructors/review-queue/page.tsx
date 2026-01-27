"use client";

import React from "react";
import { AlertCircle, Edit3, ArrowLeft, FileText, Video, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ReviewQueuePage() {
    const flaggedItems = [
        { id: "v101", type: "video", title: "Quantum Entanglement", reason: "Audio sync error", date: "Jan 25" },
        { id: "m202", type: "material", title: "Thermodynamics Notes", reason: "Broken diagrams on page 4", date: "Jan 26" },
        { id: "q303", type: "quiz", title: "Mid-Term Mock", reason: "Question 5 has no correct answer", date: "Jan 27" },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/instructors" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-10 transition">
                    <ArrowLeft size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
                </Link>

                <h1 className="text-5xl font-black mb-12 tracking-tighter italic uppercase">
                   Review <span className="text-yellow-500 underline decoration-2 underline-offset-8">Queue</span>
                </h1>

                <div className="grid gap-4">
                    {flaggedItems.map((item) => (
                        <div key={item.id} className="bg-[#0A0A0B] border border-zinc-900 rounded-3xl p-6 flex justify-between items-center group hover:border-zinc-700 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-yellow-500 transition-colors">
                                    {item.type === "video" && <Video size={24} />}
                                    {item.type === "material" && <FileText size={24} />}
                                    {item.type === "quiz" && <HelpCircle size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <AlertCircle size={12} className="text-red-500" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-red-500/80">{item.reason}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Universal Link Logic */}
                            <Link 
                                href={`/instructors/edit/${item.type}/${item.id}`}
                                className="bg-zinc-900 hover:bg-yellow-500 hover:text-black p-4 rounded-2xl transition-all"
                            >
                                <Edit3 size={20} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}