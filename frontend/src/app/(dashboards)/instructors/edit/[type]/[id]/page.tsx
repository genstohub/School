"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import Link from "next/link";

// Import your specific editor components (we'll assume these exist)
// import VideoEditor from "@/components/editors/VideoEditor";
// import MaterialEditor from "@/components/editors/MaterialEditor";

export default function UniversalEditorPage({ params }: { params: Promise<{ type: string, id: string }> }) {
    const resolvedParams = use(params);
    const { type, id } = resolvedParams;

    // This is where the magic happens: 
    // We return a different UI based on the "type" in the URL
    const renderEditor = () => {
        switch (type.toLowerCase()) {
            case "video":
                return <div className="p-12 border-2 border-dashed border-zinc-800 rounded-3xl text-center">Video Editor Component for ID: {id}</div>;
            case "material":
                return <div className="p-12 border-2 border-dashed border-zinc-800 rounded-3xl text-center">Material/PDF Editor Component for ID: {id}</div>;
            case "quiz":
                return <div className="p-12 border-2 border-dashed border-zinc-800 rounded-3xl text-center">Quiz Editor Component for ID: {id}</div>;
            default:
                return <div className="p-12 text-red-500">Unknown Content Type</div>;
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-12">
                    <Link href="/instructors/review-queue" className="flex items-center gap-2 text-zinc-500 hover:text-white transition">
                        <ArrowLeft size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Return to Queue</span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                            Correction Mode
                        </span>
                        <button className="bg-white text-black px-6 py-2 rounded-xl font-bold text-xs uppercase hover:bg-cyan-400 transition">
                            Publish Changes
                        </button>
                    </div>
                </div>

                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        Edit <span className="text-cyan-500">{type}</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">Document ID: {id}</p>
                </header>

                {/* The Conditional Editor Area */}
                <div className="bg-[#0A0A0B] border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl">
                    {renderEditor()}
                </div>
            </div>
        </main>
    );
}