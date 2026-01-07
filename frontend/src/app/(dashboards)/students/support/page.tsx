"use client";

import React, { useState } from 'react';
import { LifeBuoy, ArrowLeft, MessageCircle, Mail, HelpCircle, Send, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface TicketForm {
  subject: string;
  category: string;
  message: string;
}

const SupportPage = () => {
  const [form, setForm] = useState<TicketForm>({ subject: '', category: 'Technical Issue', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to send email/ticket to backend
      const res = await fetch('/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSuccess(true);
    } catch (error) {
      console.error("Ticket submission failed", error);
    } finally {
      setLoading(false);
    }
  };

  const openLiveChat = () => {
    // This function would initialize your WebSocket or Chat Provider 
    // which alerts the Workers Dashboard
    console.log("Connecting to Worker Dashboard...");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Link href="/students" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-all mb-8">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <header className="mb-12 border-l-4 border-red-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter flex items-center gap-4">
            HELP <span className="text-red-600">&</span> SUPPORT
          </h1>
          <p className="text-gray-500 text-sm mt-2 max-w-lg">
            Connect with our support team or browse our resources.
          </p>
        </header>

        {/* Support Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {[
            { 
              icon: <MessageCircle size={32} />, 
              title: "Live Chat", 
              desc: "Talk to an agent now", 
              action: openLiveChat,
              color: "hover:border-blue-500/50"
            },
            { 
              icon: <Mail size={32} />, 
              title: "Email Support", 
              desc: "Response in 24h", 
              action: () => document.getElementById('ticket-form')?.scrollIntoView({ behavior: 'smooth' }),
              color: "hover:border-red-500/50"
            },
            { 
              icon: <HelpCircle size={32} />, 
              title: "FAQ Center", 
              desc: "Search answers", 
              href: "/students/support/faq",
              color: "hover:border-purple-500/50"
            },
          ].map((box, i) => (
            box.href ? (
              <Link href={box.href} key={i} className={`bg-gray-900/40 border border-gray-800 p-8 rounded-[2rem] text-center transition-all group ${box.color}`}>
                <div className="text-gray-600 group-hover:text-white group-hover:scale-110 transition-all flex justify-center mb-4">{box.icon}</div>
                <h3 className="font-black uppercase tracking-widest text-sm">{box.title}</h3>
                <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">{box.desc}</p>
              </Link>
            ) : (
              <button key={i} onClick={box.action} className={`bg-gray-900/40 border border-gray-800 p-8 rounded-[2rem] text-center transition-all group ${box.color}`}>
                <div className="text-gray-600 group-hover:text-white group-hover:scale-110 transition-all flex justify-center mb-4">{box.icon}</div>
                <h3 className="font-black uppercase tracking-widest text-sm">{box.title}</h3>
                <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">{box.desc}</p>
              </button>
            )
          ))}
        </div>

        {/* Ticket Form */}
        <div id="ticket-form" className="bg-gray-900/20 border border-gray-800 p-8 md:p-12 rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <LifeBuoy size={200} />
          </div>

          <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Open a Support Ticket</h2>
          
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onSubmit={handleSubmit} className="space-y-6 relative z-10"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Subject</label>
                    <input 
                      required
                      type="text" 
                      value={form.subject}
                      onChange={(e) => setForm({...form, subject: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-2xl p-4 focus:outline-none focus:border-red-600 transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Category</label>
                    <select 
                      value={form.category}
                      onChange={(e) => setForm({...form, category: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-2xl p-4 focus:outline-none focus:border-red-600 transition-all appearance-none"
                    >
                      <option>Technical Issue</option>
                      <option>Billing</option>
                      <option>Course Content</option>
                      <option>Account Access</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Message</label>
                  <textarea 
                    required
                    rows={5} 
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="Provide as much detail as possible..."
                    className="w-full bg-black border border-gray-800 rounded-[2rem] p-6 focus:outline-none focus:border-red-600 transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black uppercase tracking-[0.2em] py-5 px-12 rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-red-600/20"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                  Submit Ticket
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500" size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase">Ticket Received</h3>
                <p className="text-gray-500 mt-2">We have sent a confirmation to your email. Our team will respond shortly.</p>
                <button onClick={() => setSuccess(false)} className="mt-8 text-red-500 font-black uppercase text-[10px] tracking-widest">Send another message</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;