"use client";

import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  Globe, 
  ArrowRight,
  Info,
  Bell,
  CheckCircle2,
  X
} from "lucide-react";

export default function ScheduleLivePage() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invitedCount, setInvitedCount] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: "60",
    description: "",
    isPublic: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/instructor/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your backend returns the count of active students notified
        setInvitedCount(data.notifiedCount || 42); 
        setShowSuccess(true);
        
        // Clear the form on success
        setFormData({
          title: "",
          date: "",
          time: "",
          duration: "60",
          description: "",
          isPublic: true
        });
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to schedule session. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-[2.5rem] p-8 text-center relative shadow-2xl shadow-blue-500/10">
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">
              Broadcast <span className="text-blue-500">Live!</span>
            </h2>
            <p className="text-zinc-400 text-sm font-medium mb-6">
              Your live session has been scheduled and added to the student calendars.
            </p>
            
            <div className="bg-zinc-800/50 rounded-2xl p-4 mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">
                Invitations Dispatched
              </p>
              <p className="text-2xl font-black text-white">{invitedCount} Students</p>
            </div>

            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3">
          <Video className="text-blue-500" size={32} />
          Schedule <span className="text-blue-500">Live Session</span>
        </h1>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">
          Sync with your students in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-4xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                  Session Title
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.title}
                  placeholder="e.g. Advanced React Patterns Deep Dive"
                  className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-zinc-700"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 text-nowrap">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                    <input 
                      required
                      type="date" 
                      value={formData.date}
                      className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-blue-500 transition-all text-white appearance-none"
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                    <input 
                      required
                      type="time" 
                      value={formData.time}
                      className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-blue-500 transition-all text-white appearance-none"
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                  Things To Learn...
                </label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  placeholder="What will students learn in this session?"
                  className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-zinc-700 resize-none"
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all active:scale-[0.98] shadow-lg shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Syncing with Students..." : (
                  <>Broadcast Schedule <ArrowRight size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          <div className="bg-blue-600/10 border border-blue-500/20 rounded-4xl p-6 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 blur-[60px] opacity-20"></div>
            
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
              <Info size={14} /> Student Preview
            </h3>

            <div className="space-y-4">
              <div className="bg-black/60 rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-red-500 w-2 h-2 rounded-full animate-pulse"></span>
                  <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Live Event</span>
                </div>
                <h4 className="font-black text-lg leading-tight uppercase italic truncate">
                  {formData.title || "Untitled Session"}
                </h4>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold">
                    <Calendar size={12} /> {formData.date || "Set Date"}
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold">
                    <Clock size={12} /> {formData.time || "Set Time"} (GMT+1)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800"></div>
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white">+42</div>
                </div>
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">Students Invited</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Platform Auto-Sync</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                <Globe size={14} className="text-zinc-600 shrink-0" /> Automatically adjust to student timezones
              </li>
              <li className="flex items-start gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-tight">
                <Bell size={14} className="text-zinc-600 shrink-0" /> Send push notification 15m before start
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}