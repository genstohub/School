"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle, CreditCard, Landmark, GraduationCap, X, RefreshCw, Copy, Clock, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Plan = {
  id: string;
  title: string;
  price: string;
  duration: string;
  icon: React.ReactNode;
  benefits: string[];
};

const plans: Plan[] = [
  { id: "weekly", title: "Weekly", price: "₦2,000", duration: "/week", icon: <GraduationCap className="w-8 h-8 text-blue-500" />, benefits: ["Full Dashboard Access", "Weekly Live Classes", "No Ads"] },
  { id: "monthly", title: "Monthly", price: "₦5,000", duration: "/month", icon: <CheckCircle className="w-8 h-8 text-green-500" />, benefits: ["Priority Support", "Offline Downloads", "No Ads"] },
  { id: "quarterly", title: "Quarterly", price: "₦14,000", duration: "/3 months", icon: <RefreshCw className="w-8 h-8 text-orange-500" />, benefits: ["Career Mentorship", "Exam Prep Material", "No Ads"] },
  { id: "half-yearly", title: "Half-Year", price: "₦26,000", duration: "/6 months", icon: <Star className="w-8 h-8 text-yellow-500" />, benefits: ["Internship Referrals", "Project Reviews", "No Ads"] },
  { id: "yearly", title: "Yearly", price: "₦48,000", duration: "/year", icon: <Landmark className="w-8 h-8 text-purple-600" />, benefits: ["Job Placement", "Personal Coach", "No Ads"] },
];

const NIGERIAN_BANKS = ["Access Bank", "Zenith Bank", "GTBank", "First Bank", "UBA", "Kuda Bank", "OPay", "Moniepoint"];

export default function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [showTransferDetails, setShowTransferDetails] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Custom Scroll Logic for Arrows
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showTransferDetails && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [showTransferDetails, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Choose Your Path</h2>
          <p className="text-slate-600">Secure access to your dashboard in minutes.</p>
        </div>

        {/* Industry Standard Carousel */}
        <div className="relative group px-10">
          {/* Navigation Arrows - Hidden on mobile */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border hidden md:block hover:bg-slate-50 transition"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                className="min-w-full md:min-w-[340px] snap-center bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-8 flex flex-col hover:border-blue-400 transition-colors"
              >
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{plan.title}</h3>
                <div className="flex items-baseline my-4">
                  <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-slate-500 ml-1 font-medium">{plan.duration}</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.benefits.map((b, i) => (
                    <li key={i} className="flex items-center text-slate-600 font-medium">
                      <CheckCircle className="w-5 h-5 text-blue-500 mr-3 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all transform active:scale-95"
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border hidden md:block hover:bg-slate-50 transition"
          >
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Modal - Transfer Details with Countdown */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative" initial={{ y: 50 }} animate={{ y: 0 }}>
              <button onClick={() => { setSelectedPlan(null); setShowTransferDetails(false); }} className="absolute top-6 right-6 text-slate-400"><X /></button>

              {!showTransferDetails ? (
                <>
                  <h3 className="text-2xl font-bold mb-6">Secure Payment</h3>
                  <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
                    <button onClick={() => setPaymentMethod("card")} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${paymentMethod === "card" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>Card</button>
                    <button onClick={() => setPaymentMethod("transfer")} className={`flex-1 py-3 rounded-xl text-sm font-bold transition ${paymentMethod === "transfer" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}>Transfer</button>
                  </div>
                  {/* ... rest of your card form ... */}
                  <button onClick={() => paymentMethod === "transfer" ? setShowTransferDetails(true) : null} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
                    Proceed to Pay {selectedPlan.price}
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="bg-blue-50 text-blue-700 py-2 px-6 rounded-full inline-flex items-center text-sm font-bold mb-6">
                    <Clock className="w-4 h-4 mr-2 animate-pulse" /> Finalize in {formatTime(timeLeft)}
                  </div>
                  <div className="bg-slate-50 rounded-3xl p-6 text-left border border-slate-100 mb-6">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Transfer Details</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-500">Bank Name</p>
                        <p className="font-bold text-slate-900">Moniepoint MFB</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm text-slate-500">Account Number</p>
                          <p className="text-2xl font-black text-blue-600 tracking-tighter">8123456789</p>
                        </div>
                        <button className="mb-1 p-2 bg-white rounded-lg border shadow-sm active:bg-slate-100"><Copy className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedPlan(null)} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200">
                    I Have Made the Transfer
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}