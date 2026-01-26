"use client";

import React from "react";
import { AlertCircle, Edit3, ArrowLeft, FileText, Video } from "lucide-react";
import Link from "next/link";

export default function ReviewQueuePage() {
    const flaggedItems = [
        { id: "1", type: "Video", title: "Advanced Quantum Mechanics", reason: "Audio clarity issues in second half", date: "2026-01-25" },
        { id: "2", type: "Material", title: "Organic Chemistry PDF", reason: "Missing citations in Section 3", date: "2026-01-26" },
    ];

    return (
        <div className="min-h-screen bg-[#0F172A] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/instructors" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition">
                    <ArrowLeft size={20} /> <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
                </Link>

                <h1 className="text-4xl font-black mb-2 italic">REVIEW <span className="text-yellow-500">QUEUE</span></h1>
                <p className="text-slate-400 text-sm mb-10">Items below have been flagged by QA. Please apply corrections to proceed to approval.</p>

                <div className="space-y-4">
                    {flaggedItems.map((item) => (
                        <div key={item.id} className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex justify-between items-center group">
                            <div className="flex gap-5 items-center">
                                <div className="p-4 bg-slate-900 rounded-2xl text-yellow-500">
                                    {item.type === "Video" ? <Video size={24} /> : <FileText size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-none">{item.title}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <AlertCircle size={14} className="text-red-400" />
                                        <p className="text-red-400 text-xs font-semibold uppercase">{item.reason}</p>
                                    </div>
                                </div>
                            </div>
                            <Link 
                                href={`/instructors/${item.type.toLowerCase()}/edit/${item.id}`}
                                className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-yellow-400 transition"
                            >
                                <Edit3 size={16} /> Edit
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}