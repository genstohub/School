"use client";

import React, { useState, useEffect } from "react";
import { Bookmark, FileText, Trash2, ExternalLink, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";

interface SavedItem {
  id: string;
  type: "course" | "document";
  title: string;
  category: string;
  savedAt: string;
}

export default function BookmarkPage() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBookmarks() {
      try {
        setLoading(true);
        const res = await fetch("/api/students/bookmarks");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        setItems([
          { id: "b1", type: "course", title: "General Chemistry I", category: "Course", savedAt: "2 days ago" },
          { id: "b2", type: "document", title: "Organic Chemistry Notes.pdf", category: "Resource", savedAt: "5 hours ago" },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchBookmarks();
  }, []);

  const removeBookmark = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    // In production, call DELETE /api/students/bookmarks/${id}
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Bookmark size={24} fill="white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Bookmarks</h1>
          </div>
          <p className="text-gray-500">Your saved courses and study materials.</p>
        </header>

        {loading ? (
          <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>
        ) : items.length === 0 ? (
          <div className="bg-gray-900 border border-dashed border-gray-800 rounded-[2rem] p-20 text-center">
            <p className="text-gray-500 font-medium">No bookmarks found. Save items to see them here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-gray-900 border border-gray-800 p-6 rounded-3xl flex items-center justify-between group hover:border-gray-700 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-blue-500">
                    {item.type === "course" ? <BookOpen size={20} /> : <FileText size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                      {item.category} • Saved {item.savedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => removeBookmark(item.id)}
                    className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Remove Bookmark"
                  >
                    <Trash2 size={20} />
                  </button>
                  <Link 
                    href={item.type === "course" ? `/students/courses/${item.id}` : "#"} 
                    className="p-3 text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-all"
                  >
                    <ExternalLink size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}