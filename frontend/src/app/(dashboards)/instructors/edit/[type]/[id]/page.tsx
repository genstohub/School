"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Save, Trash2, AlertTriangle, 
  Check, X, Loader2, 
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function UniversalEditorPage({ params }: { params: Promise<{ type: string, id: string }> }) {
    const resolvedParams = use(params);
    const { type, id } = resolvedParams;
    const router = useRouter();

    // UI States
    const [isDeleting, setIsDeleting] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    // ACTION: Publish/Save Changes
    const handlePublish = async () => {
        setIsProcessing(true);
        // Simulate API Call: await fetch(`/api/content/${id}`, { method: 'PATCH', ... })
        await new Promise(r => setTimeout(r, 1000));
        setIsProcessing(false);
        router.push("/instructors/review-queue");
    };

    // ACTION: Permanent Deletion
    const handleDelete = async () => {
        setIsProcessing(true);
        // Simulate API Call: await fetch(`/api/content/${id}`, { method: 'DELETE' })
        await new Promise(r => setTimeout(r, 1200));
        setIsProcessing(false);
        router.push("/instructors/review-queue");
    };

    const renderEditor = () => {
        const placeholderClasses = "p-20 border-2 border-dashed border-zinc-800 rounded-3xl text-center text-zinc-600 font-medium italic";
        switch (type.toLowerCase()) {
            case "video":
                return <div className={placeholderClasses}>[ Video Editor Timeline & Subtitle Console for ID: {id} ]</div>;
            case "material":
                return <div className={placeholderClasses}>[ PDF Document Markup & Page Manager for ID: {id} ]</div>;
            case "quiz":
                return <div className={placeholderClasses}>[ Question Logic & Answer Key Editor for ID: {id} ]</div>;
            default:
                return <div className="p-12 text-red-500 font-black uppercase">Critical Error: Unknown Path</div>;
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden">
            
            {/* Overlay Loader for API Actions */}
            {isProcessing && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <Loader2 className="text-cyan-500 animate-spin mb-4" size={40} />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">Syncing Registry...</p>
                </div>
            )}

            <div className="max-w-5xl mx-auto">
                {/* Navigation & Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <Link href="/instructors/review-queue" className="flex items-center gap-2 text-zinc-500 hover:text-white transition group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Return to Queue</span>
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        {/* THE DELETE FLOW */}
                        {!isDeleting ? (
                            <button 
                                onClick={() => setIsDeleting(true)}
                                className="bg-zinc-900 text-red-500 px-4 py-2 rounded-xl font-bold text-xs uppercase border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                            >
                                <Trash2 size={14} /> Remove
                            </button>
                        ) : (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 p-1 rounded-xl animate-in fade-in zoom-in duration-200">
                                <span className="text-[9px] font-black uppercase px-3 text-red-500">Confirm Wipe?</span>
                                <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><Check size={14}/></button>
                                <button onClick={() => setIsDeleting(false)} className="p-2 bg-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-700"><X size={14}/></button>
                            </div>
                        )}

                        <div className="h-6 w-[1px] bg-zinc-800 mx-2" />

                        <button 
                            onClick={handlePublish}
                            className="bg-cyan-500 text-black px-6 py-2 rounded-xl font-bold text-xs uppercase hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                        >
                            <Save size={14} /> Publish Changes
                        </button>
                    </div>
                </div>

                {/* Header Context */}
                <header className="mb-10 relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cyan-500" />
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none">
                        Correction <span className="text-cyan-500">Console</span>
                    </h1>
                    <div className="flex items-center gap-4 mt-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Target: {type}</span>
                        <span className="text-zinc-700 text-xs">/</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">UID: {id}</span>
                    </div>
                </header>

                {/* Editor Content Box */}
                <div className="bg-[#0A0A0B] border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                        <AlertTriangle className="text-yellow-500" size={24} />
                    </div>
                    {renderEditor()}
                </div>

                {/* Footer Warning */}
                <footer className="mt-8 flex items-center gap-4 border-t border-zinc-900 pt-8">
                    <ShieldCheck className="text-zinc-700" size={20} />
                    <p className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest leading-relaxed">
                        Notice: Any changes published here will overwrite the live production version across all student dashboards. 
                        Deletions are <span className="text-red-500 font-black">Permanent</span> and cannot be undone.
                    </p>
                </footer>
            </div>
        </main>
    );
}