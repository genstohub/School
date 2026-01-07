"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  { 
    q: "How do I access my assignment feedback?", 
    a: "Navigate to the Assignments page, select your course, and click on 'View Tasks'. If a teacher has graded it, a 'Graded' badge will appear with a comment section."
  },
  { 
    q: "I can't log in to the Live Exam portal.", 
    a: "Ensure your browser is updated to the latest version and cleared of cache. If the issue persists, contact Technical Support via Live Chat immediately."
  },
  { 
    q: "What is the deadline for course registration?", 
    a: "Registration usually closes two weeks after the semester starts. Check the Academic Calendar in your dashboard for specific dates."
  }
];

const FAQPage = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqData.filter(item => 
    item.q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/students/support" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all mb-8">
          <ArrowLeft size={16} /> Back to Support
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter flex items-center gap-4">
            FREQUENTLY <span className="text-red-600">ASKED</span>
          </h1>
        </header>

        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
          <input 
            type="text" 
            placeholder="Search keywords (exams, billing, courses)..." 
            className="w-full bg-gray-900/40 border border-gray-800 rounded-[2rem] py-6 pl-16 pr-6 focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((item, i) => (
            <div key={i} className="border border-gray-800 rounded-[2rem] overflow-hidden bg-gray-900/20">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-8 flex items-center justify-between text-left hover:bg-gray-900/40 transition-all"
              >
                <span className="font-black uppercase tracking-tight text-sm pr-4">{item.q}</span>
                {openIndex === i ? <ChevronUp className="text-red-600" /> : <ChevronDown className="text-gray-600" />}
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-gray-500 text-sm leading-relaxed border-t border-gray-800 pt-6">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-20 opacity-20">
            <HelpCircle size={60} className="mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;