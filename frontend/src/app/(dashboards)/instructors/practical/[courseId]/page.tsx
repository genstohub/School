"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, Beaker, ClipboardList, ShieldAlert, 
  Plus, Trash2, Microscope, 
  CheckCircle2, Play, Info, Layers
} from "lucide-react";
import Link from "next/link";

interface LabStep {
  id: string;
  instruction: string;
  expectedResult: string;
}

interface PracticalForm {
  labTitle: string;
  objective: string;
  equipment: string[];
  safetyRules: string[];
  steps: LabStep[];
}

export default function PracticalCreationPage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const courseCode = (resolvedParams?.courseId || "").toUpperCase();

  const [form, setForm] = useState<PracticalForm>({
    labTitle: "",
    objective: "",
    equipment: [""],
    safetyRules: [""],
    steps: [{ id: "1", instruction: "", expectedResult: "" }]
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // Dynamic Handlers
  const addStep = () => {
    setForm(prev => ({
      ...prev,
      steps: [...prev.steps, { id: Math.random().toString(36).substr(2, 9), instruction: "", expectedResult: "" }]
    }));
  };

  const updateStep = (id: string, field: keyof LabStep, value: string) => {
    setForm(prev => ({
      ...prev,
      steps: prev.steps.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  const updateList = (field: 'equipment' | 'safetyRules', index: number, value: string) => {
    const newList = [...form[field]];
    newList[index] = value;
    setForm(prev => ({ ...prev, [field]: newList }));
  };

  return (
    <main className="min-h-screen bg-[#050505] rounded-3xl text-[#E0E0E0] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation */}
        <Link href="/instructors" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 mb-10 group transition-colors">
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Laboratory Hub</span>
        </Link>

        {/* Header Section */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 border-l-4 border-cyan-500 pl-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Lab <span className="text-cyan-500 italic">Practical</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-black tracking-[0.2em] mt-3 uppercase">
              Experimental Design Framework for {courseCode}
            </p>
          </div>
          <Beaker className="text-cyan-500 hidden lg:block" size={48} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Lab Builder (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Core Info */}
            <div className="space-y-6">
              <input 
                value={form.labTitle}
                onChange={(e) => setForm({...form, labTitle: e.target.value})}
                placeholder="Laboratory Title (e.g., Circuit Analysis 101)"
                className="w-full bg-transparent text-3xl font-black outline-none border-b border-zinc-800 focus:border-cyan-500 pb-4 transition-all"
              />
              <textarea 
                value={form.objective}
                onChange={(e) => setForm({...form, objective: e.target.value})}
                placeholder="State the primary learning objective..."
                className="w-full bg-transparent text-sm font-medium outline-none border-b border-zinc-900 focus:border-zinc-700 py-2 resize-none"
              />
            </div>

            {/* Procedures Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="text-cyan-500" size={20} />
                <h2 className="text-xs font-black uppercase tracking-[0.2em]">Step-by-Step Procedure</h2>
              </div>
              
              <AnimatePresence mode="popLayout">
                {form.steps.map((step, idx) => (
                  <motion.div 
                    key={step.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#0A0A0B] border border-zinc-800 rounded-2xl p-6 relative group"
                  >
                    <div className="flex gap-6">
                      <span className="text-xl font-black text-zinc-800">0{idx + 1}</span>
                      <div className="flex-1 space-y-4">
                        <input 
                          value={step.instruction}
                          onChange={(e) => updateStep(step.id, 'instruction', e.target.value)}
                          placeholder="Action instruction..."
                          className="w-full bg-transparent text-sm font-bold outline-none border-b border-zinc-900 focus:border-cyan-500/50 pb-2"
                        />
                        <input 
                          value={step.expectedResult}
                          onChange={(e) => updateStep(step.id, 'expectedResult', e.target.value)}
                          placeholder="Expected observation/result..."
                          className="w-full bg-transparent text-[11px] text-zinc-500 italic outline-none"
                        />
                      </div>
                      <button 
                        onClick={() => setForm(prev => ({ ...prev, steps: prev.steps.filter(s => s.id !== step.id) }))}
                        className="text-zinc-800 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button 
                onClick={addStep}
                className="w-full py-4 rounded-xl border border-dashed border-zinc-800 text-zinc-600 text-[10px] font-black uppercase tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all"
              >
                Add Procedural Step
              </button>
            </section>
          </div>

          {/* Logistics & Safety Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Equipment Box */}
            <div className="bg-[#0A0A0B] border border-zinc-800 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Microscope size={18} className="text-cyan-500" />
                <h3 className="text-[10px] font-black uppercase tracking-widest">Required Apparatus</h3>
              </div>
              <div className="space-y-3">
                {form.equipment.map((item, idx) => (
                  <input 
                    key={idx}
                    value={item}
                    onChange={(e) => updateList('equipment', idx, e.target.value)}
                    placeholder="e.g., Voltmeter"
                    className="w-full bg-zinc-900/50 border border-zinc-800 p-3 rounded-xl text-[11px] outline-none focus:border-cyan-500"
                  />
                ))}
                <button 
                  onClick={() => setForm(prev => ({ ...prev, equipment: [...prev.equipment, ""] }))}
                  className="text-cyan-500 text-[9px] font-black uppercase tracking-widest mt-2"
                >
                  + Add Item
                </button>
              </div>
            </div>

            {/* Safety Protocol */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert size={18} className="text-red-500" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-red-500">Safety Protocols</h3>
              </div>
              <div className="space-y-3">
                {form.safetyRules.map((rule, idx) => (
                  <input 
                    key={idx}
                    value={rule}
                    onChange={(e) => updateList('safetyRules', idx, e.target.value)}
                    placeholder="e.g., Wear safety goggles"
                    className="w-full bg-black/40 border border-zinc-800 p-3 rounded-xl text-[11px] outline-none focus:border-red-500/50"
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={() => setIsSuccess(true)}
              className="w-full py-6 bg-cyan-500 text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/10"
            >
              <Play size={18} />
              Activate Practical
            </button>
          </aside>

        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#0F0F11] border border-cyan-500/30 text-white rounded-[3rem] p-12 max-w-md w-full text-center"
            >
              <div className="w-20 h-20 bg-cyan-500/10 text-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-cyan-500/20">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black tracking-tighter uppercase mb-4">Practical Live</h2>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-10 leading-relaxed">
                Logistics and procedure manuals <br/> synced to student lab portals.
              </p>
              <button 
                onClick={() => router.push('/instructors')}
                className="w-full py-5 bg-cyan-500 text-black rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform"
              >
                Exit Lab Studio
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}