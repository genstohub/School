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
  X,
  Loader2
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

    // --- PLACEHOLDER FLOW START ---
    // Simulating a REST API call to your backend
    setTimeout(() => {
      const mockBackendResponse = {
        success: true,
        notifiedCount: Math.floor(Math.random() * 100) + 50 // Simulates inviting 50-150 students
      };

      if (mockBackendResponse.success) {
        setInvitedCount(mockBackendResponse.notifiedCount);
        setShowSuccess(true);
        setLoading(false);
        
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
    }, 2000); 
    // --- PLACEHOLDER FLOW END ---

    /* REAL API CODE (Uncomment when ready):
    try {
      const response = await fetch("/api/instructor/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setInvitedCount(data.notifiedCount);
        setShowSuccess(true);
        // ... clear form logic
      }
    } catch (error) { ... }
    */
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative">
      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Animated Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowSuccess(false)}
          />
          
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-[2.5rem] p-8 text-center relative shadow-2xl shadow-blue-500/20 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setShowSuccess(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">
              Broadcast <span className="text-blue-500">Live!</span>
            </h2>
            <p className="text-zinc-400 text-sm font-medium mb-6">
              The session is locked in. Students have been notified via dashboard and email.
            </p>
            
            <div className="bg-black/40 border border-zinc-800 rounded-2xl p-4 mb-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">
                Student Notifications Sent
              </p>
              <p className="text-3xl font-black text-white tabular-nums">
                {invitedCount}
              </p>
            </div>

            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all active:scale-[0.98]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3">
            <Video className="text-blue-500" size={32} />
            Schedule <span className="text-blue-500">Live Session</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2">
            Real-time synchronization engine
          </p>
        </div>
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
                  placeholder="e.g. Mastering Server Components"
                  className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-zinc-800"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                    <input 
                      required
                      type="date" 
                      value={formData.date}
                      className="w-full bg-black border border-zinc-800 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-blue-500 transition-all text-white appearance-none color-scheme-dark"
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
                  Agenda & Key Takeaways
                </label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  placeholder="Outline the main goals of this session..."
                  className="w-full bg-black border border-zinc-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-zinc-800 resize-none"
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <button 
                disabled={loading}
                type="submit"
                className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>Broadcast Schedule <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          <div className="bg-blue-600/5 border border-blue-500/20 rounded-4xl p-6 relative overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
              <Info size={14} /> Student Live Preview
            </h3>

            <div className="bg-black border border-zinc-800 rounded-2xl p-5 relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-red-500 w-2 h-2 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Live Event</span>
              </div>
              <h4 className="font-black text-lg leading-tight uppercase italic truncate text-zinc-200">
                {formData.title || "Untitled Session"}
              </h4>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold">
                  <Calendar size={12} /> {formData.date || "YY-MM-DD"}
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold">
                  <Clock size={12} /> {formData.time || "00:00"}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                    U
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-blue-600 flex items-center justify-center text-[8px] font-bold">
                  +120
                </div>
              </div>
              <span className="text-[9px] font-black text-zinc-600 uppercase">Invited</span>
            </div>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Automation rules</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Globe size={16} className="text-zinc-700 shrink-0" />
                <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase tracking-tight">Timezone auto-detect enabled for global students</p>
              </div>
              <div className="flex gap-3">
                <Bell size={16} className="text-zinc-700 shrink-0" />
                <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase tracking-tight">Push notifications scheduled for 15m prior</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}