"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Sun, Moon, Maximize2, Minimize2, Sparkles, Loader2 } from "lucide-react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { REST_API } from "@/constants";

export default function ReadingMaterialPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(115);

  const material = searchParams.get("material") ? JSON.parse(searchParams.get("material")!) : null;

  useEffect(() => {
    async function fetchContent() {
      if (!material?.content_uri) return;
      try {
        const res = await fetch(`${REST_API}/courses/materials/get-material-content?contentUri=${material.content_uri}`);
        const data = await res.json();
        // Remove contenteditable so students can't type in captions
        setHtmlContent(data.replace(/contenteditable="true"/g, 'contenteditable="false"'));
      } catch (err) {
        console.error("Fetch Error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [material?.content_uri]);

  if (loading) return <div className="fixed inset-0 bg-[#0a0a0b] flex items-center justify-center"><Loader2 className="animate-spin text-[#035b77]" size={40}/></div>;

  return (
    <section className={`min-h-screen ${isDarkMode ? "bg-[#0a0a0b] text-white" : "bg-white text-black"}`}>
      {/* HUD CONTROLS */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-4 p-3 rounded-full bg-black/90 border border-white/10 shadow-2xl">
        <button onClick={() => setFontSize(f => Math.max(f - 10, 80))} className="p-2 text-white/50"><Minimize2 size={18}/></button>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-white">{isDarkMode ? <Sun size={20}/> : <Moon size={20}/>}</button>
        <button onClick={() => setFontSize(f => Math.min(f + 10, 180))} className="p-2 text-white/50"><Maximize2 size={18}/></button>
      </div>

      <main className="max-w-6xl mx-auto pt-10 px-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-zinc-500 mb-10 uppercase text-[10px] tracking-widest font-black">
          <ArrowLeft size={16}/> Go Back
        </button>

        <article 
          className="omni-reader-canvas relative pb-40"
          style={{ fontSize: `${fontSize}%` }}
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </main>
    </section>
  );
}