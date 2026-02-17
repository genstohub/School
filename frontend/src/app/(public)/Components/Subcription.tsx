"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, CreditCard, Landmark, GraduationCap, X, RefreshCw, ChevronLeft, ChevronRight, Copy, Clock } from "lucide-react";
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
  { id: "half-yearly", title: "Half-Year", price: "₦26,000", duration: "/6 months", icon: <StarIcon />, benefits: ["Internship Referrals", "Project Reviews", "No Ads"] },
  { id: "yearly", title: "Yearly", price: "₦48,000", duration: "/year", icon: <Landmark className="w-8 h-8 text-purple-600" />, benefits: ["Job Placement", "Personal Coach", "No Ads"] },
];

function StarIcon() { return <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>; }

const NIGERIAN_BANKS = ["Access Bank", "Zenith Bank", "GTBank", "First Bank", "UBA", "Kuda Bank", "OPay", "Moniepoint", "Stanbic IBTC", "Fidelity Bank"];

export default function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTransferDetails, setShowTransferDetails] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds

  // Timer logic for transfer
  useEffect(() => {
    if (showTransferDetails && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [showTransferDetails, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "transfer") {
      setShowTransferDetails(true);
    } else {
      setIsProcessing(true);
      setTimeout(() => { setIsProcessing(false); setSelectedPlan(null); }, 3000);
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Select a Subscription</h2>
          <p className="text-gray-600">Choose the plan that fits your learning pace.</p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          <div className="flex overflow-x-auto pb-8 gap-6 snap-x no-scrollbar px-4">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ y: -5 }}
                className="min-w-[300px] md:min-w-[350px] snap-center bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col cursor-pointer transition-all hover:border-blue-300"
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="mb-4">{plan.icon}</div>
                <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
                <div className="flex items-baseline my-4">
                  <span className="text-3xl font-black text-blue-600">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.duration}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.benefits.map((b, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">Subscribe</button>
              </motion.div>
            ))}
          </div>
          {/* Visual Hint for scroll */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
             <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
             <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
             <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
              <button onClick={() => { setSelectedPlan(null); setShowTransferDetails(false); setTimeLeft(1200); }} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"><X /></button>

              {!showTransferDetails ? (
                <>
                  <h3 className="text-xl font-bold mb-6">Payment for {selectedPlan.title}</h3>
                  <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                    <button onClick={() => setPaymentMethod("card")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${paymentMethod === "card" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>Card</button>
                    <button onClick={() => setPaymentMethod("transfer")} className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${paymentMethod === "transfer" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}>Transfer</button>
                  </div>

                  <form onSubmit={handleInitialSubmit} className="space-y-4">
                    {paymentMethod === "card" ? (
                      <div className="space-y-3">
                        <input type="text" placeholder="Card Number" className="w-full border-gray-200 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="MM/YY" className="border-gray-200 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
                          <input type="text" placeholder="CVV" className="border-gray-200 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>
                      </div>
                    ) : (
                      <select className="w-full border-gray-200 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" required>
                        <option value="">Select your Bank</option>
                        {NIGERIAN_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
                      {isProcessing ? "Processing..." : `Pay ${selectedPlan.price}`}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="bg-orange-50 text-orange-600 py-2 px-4 rounded-full inline-flex items-center text-sm font-bold mb-6">
                    <Clock className="w-4 h-4 mr-2" /> Expires in {formatTime(timeLeft)}
                  </div>
                  <h3 className="text-lg font-bold mb-2">Transfer to Account</h3>
                  <p className="text-sm text-gray-500 mb-6">Make a transfer of <b>{selectedPlan.price}</b> to the details below</p>
                  
                  <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-6 border border-dashed border-gray-300">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Bank Name</p>
                      <p className="font-bold text-gray-800">Moniepoint MFB</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-bold">Account Number</p>
                        <p className="font-mono text-xl font-black text-blue-600">8123456789</p>
                      </div>
                      <button className="p-2 bg-white rounded-lg shadow-sm border"><Copy className="w-4 h-4 text-gray-400" /></button>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Account Name</p>
                      <p className="font-bold text-gray-800">STUDENT DASHBOARD - {selectedPlan.id.toUpperCase()}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setSelectedPlan(null); setShowTransferDetails(false); }}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all"
                  >
                    I have made the transfer
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