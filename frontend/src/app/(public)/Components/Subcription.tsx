"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, CreditCard, Landmark, GraduationCap, X, RefreshCw, Copy, Clock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Plan = {
  id: string;
  title: string;
  price: string;
  amount: number;
  duration: string;
  icon: React.ReactNode;
  benefits: string[];
};

const plans: Plan[] = [
  { id: "weekly", title: "Weekly", price: "₦2,000", amount: 2000, duration: "/week", icon: <GraduationCap className="w-6 h-6 text-blue-500" />, benefits: ["Full Dashboard Access", "Weekly Live Classes", "No Ads"] },
  { id: "monthly", title: "Monthly", price: "₦5,000", amount: 5000, duration: "/month", icon: <CheckCircle className="w-6 h-6 text-green-500" />, benefits: ["All Weekly Benefits", "Offline Downloads", "Priority Support"] },
  { id: "quarterly", title: "Quarterly", price: "₦13,500", amount: 13500, duration: "/3 months", icon: <ShieldCheck className="w-6 h-6 text-orange-500" />, benefits: ["All Monthly Benefits", "Save 10% vs Monthly", "Exam Prep Kits"] },
  { id: "biannual", title: "Bi-Annual", price: "₦25,000", amount: 25000, duration: "/6 months", icon: <StarIcon />, benefits: ["All Quarterly Benefits", "Mentorship Access", "Internship Perks"] },
  { id: "yearly", title: "Yearly", price: "₦48,000", amount: 48000, duration: "/year", icon: <Landmark className="w-6 h-6 text-purple-600" />, benefits: ["Best Value", "Career Placement", "Certificate of Mastery"] },
];

function StarIcon() { return <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>; }

const NIGERIAN_BANKS = ["Access Bank", "Zenith Bank", "GTBank", "First Bank", "UBA", "Kuda Bank", "OPay", "Moniepoint", "Stanbic IBTC", "Fidelity Bank"];

export default function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentStep, setPaymentStep] = useState<"method" | "transfer_details" | "success">("method");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes

  useEffect(() => {
    if (paymentStep !== "transfer_details" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [paymentStep, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "transfer") {
      setPaymentStep("transfer_details");
    } else {
      setPaymentStep("success");
    }
  };

  const closePortal = () => {
    setSelectedPlan(null);
    setPaymentStep("method");
    setTimeLeft(1200);
  };

  return (
    <section className="py-16 px-6 lg:px-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Ready to Level Up?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Choose a flexible plan that fits your study schedule. All plans include full dashboard access.</p>
        </header>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col cursor-pointer hover:border-blue-500 transition-all"
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="p-2 bg-slate-50 rounded-lg w-fit mb-4">{plan.icon}</div>
              <h3 className="font-bold text-slate-800">{plan.title}</h3>
              <div className="my-4">
                <span className="text-2xl font-black text-slate-900">{plan.price}</span>
                <span className="text-xs text-slate-500 block">{plan.duration}</span>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                {plan.benefits.slice(0, 3).map((b, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2 shrink-0" /> {b}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">Select</button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <motion.div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
              <button onClick={closePortal} className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"><X /></button>

              {paymentStep === "method" && (
                <>
                  <h3 className="text-xl font-bold mb-2">Checkout</h3>
                  <p className="text-slate-500 text-sm mb-6">Subscription: <span className="text-slate-900 font-semibold">{selectedPlan.title} ({selectedPlan.price})</span></p>
                  
                  <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                    <button onClick={() => setPaymentMethod("card")} className={`flex-1 flex items-center justify-center py-2 rounded-lg text-sm transition ${paymentMethod === "card" ? "bg-white shadow text-blue-600" : "text-slate-500"}`}><CreditCard className="w-4 h-4 mr-2" /> Card</button>
                    <button onClick={() => setPaymentMethod("transfer")} className={`flex-1 flex items-center justify-center py-2 rounded-lg text-sm transition ${paymentMethod === "transfer" ? "bg-white shadow text-blue-600" : "text-slate-500"}`}><Landmark className="w-4 h-4 mr-2" /> Transfer</button>
                  </div>

                  <form onSubmit={handleInitialSubmit} className="space-y-4">
                    {paymentMethod === "card" ? (
                      <div className="space-y-3">
                        <input type="text" placeholder="Card Number" className="w-full border-slate-200 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="MM/YY" className="border-slate-200 border rounded-xl px-4 py-3 text-sm outline-none" required />
                          <input type="text" placeholder="CVV" className="border-slate-200 border rounded-xl px-4 py-3 text-sm outline-none" required />
                        </div>
                      </div>
                    ) : (
                      <select className="w-full border-slate-200 border rounded-xl px-4 py-3 text-sm outline-none" required>
                        <option value="">Select your Bank</option>
                        {NIGERIAN_BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    )}
                    <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all">
                      {paymentMethod === "card" ? `Pay ${selectedPlan.price}` : "Generate Account Details"}
                    </button>
                  </form>
                </>
              )}

              {paymentStep === "transfer_details" && (
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-orange-600 font-mono text-lg mb-6 bg-orange-50 py-2 rounded-full">
                    <Clock className="w-5 h-5 animate-pulse" />
                    <span>{formatTime(timeLeft)}</span>
                  </div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Transfer exactly</h4>
                  <p className="text-3xl font-black text-slate-900 mb-6">{selectedPlan.price}</p>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-100 mb-6 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Bank Name</span>
                      <p className="font-bold text-slate-800">Wema Bank / Providus</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">Account Number</span>
                        <p className="font-mono text-xl font-bold text-blue-600">0123456789</p>
                      </div>
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition"><Copy className="w-5 h-5" /></button>
                    </div>
                  </div>
                  
                  <button onClick={() => setPaymentStep("success")} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100">
                    I have made the transfer
                  </button>
                  <p className="mt-4 text-xs text-slate-400">System will automatically verify once transfer is received.</p>
                </div>
              )}

              {paymentStep === "success" && (
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900">Payment Received!</h4>
                  <p className="text-slate-600 mt-2">Your dashboard is now unlocked. Let&apos;s start learning!</p>
                  <button onClick={closePortal} className="mt-8 w-full py-3 bg-slate-900 text-white rounded-xl font-bold">Go to Dashboard</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}