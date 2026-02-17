"use client";

import React, { useState } from "react";
import { CheckCircle, CreditCard, Landmark, GraduationCap, X, RefreshCw } from "lucide-react";
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
  {
    id: "weekly",
    title: "Weekly Access",
    price: "₦2,000",
    duration: "/week",
    icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
    benefits: [
      "Full access to Dashboard",
      "All course materials",
      "Weekly live sessions",
      "No advertisement interruptions",
      "Instant certificate access",
    ],
  },
  {
    id: "monthly",
    title: "Monthly Saver",
    price: "₦5,000",
    duration: "/month",
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    benefits: [
      "Full access to Dashboard",
      "Priority student support",
      "Offline resource downloads",
      "No advertisement interruptions",
      "Save ₦3,000 vs weekly",
    ],
  },
  {
    id: "yearly",
    title: "Yearly Unlimited",
    price: "₦48,000",
    duration: "/year",
    icon: <Landmark className="w-8 h-8 text-purple-600" />,
    benefits: [
      "Full access to Dashboard",
      "Personalized mentorship",
      "Career placement assistance",
      "No advertisement interruptions",
      "Best value for serious students",
    ],
  },
];

const NIGERIAN_BANKS = [
  "Access Bank", "Zenith Bank", "GTBank", "First Bank", "UBA", 
  "Kuda Bank", "OPay", "Moniepoint", "Stanbic IBTC", "Fidelity Bank"
];

export default function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [autoRenew, setAutoRenew] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    // Simulate API call and redirect to dashboard
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedPlan(null);
      // window.location.href = "/dashboard"; 
    }, 3000);
  };

  return (
    <section className="py-16 px-6 lg:px-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Choose Your Path</h2>
          <p className="text-gray-600">Subscribe to unlock your student dashboard and start learning.</p>
        </div>

        {/* Subscription Cards */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col cursor-pointer"
              onClick={() => setSelectedPlan(plan)}
            >
              <div className="mb-6">{plan.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-black text-blue-600">{plan.price}</span>
                <span className="text-gray-500 ml-1">{plan.duration}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
            >
              <button onClick={() => setSelectedPlan(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>

              {!showSuccess ? (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Secure Checkout</span>
                    <h3 className="text-2xl font-bold mt-2 text-gray-900">Payment for {selectedPlan.title}</h3>
                  </div>

                  {/* Payment Method Toggle */}
                  <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                    <button 
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 flex items-center justify-center py-2 rounded-lg transition ${paymentMethod === "card" ? "bg-white shadow-sm text-blue-600" : "text-gray-500"}`}
                    >
                      <CreditCard className="w-4 h-4 mr-2" /> Card
                    </button>
                    <button 
                      onClick={() => setPaymentMethod("transfer")}
                      className={`flex-1 flex items-center justify-center py-2 rounded-lg transition ${paymentMethod === "transfer" ? "bg-white shadow-sm text-blue-600" : "text-gray-500"}`}
                    >
                      <Landmark className="w-4 h-4 mr-2" /> Transfer
                    </button>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-4">
                    {paymentMethod === "card" ? (
                      <div className="space-y-4">
                        <input type="text" placeholder="Card Number" className="w-full border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="MM/YY" className="border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
                          <input type="text" placeholder="CVV" className="border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" required />
                        </div>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={autoRenew}
                            onChange={(e) => setAutoRenew(e.target.checked)}
                          />
                          <div className="flex items-center text-sm text-gray-600 group-hover:text-blue-600 transition">
                            <RefreshCw className={`w-4 h-4 mr-2 ${autoRenew ? 'animate-spin-slow' : ''}`} />
                            Enable automatic renewal
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <select className="w-full border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none" required>
                          <option value="">Choose your Bank</option>
                          {NIGERIAN_BANKS.map(bank => <option key={bank} value={bank}>{bank}</option>)}
                        </select>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                          <p className="text-xs text-blue-800 font-medium mb-1">How to pay:</p>
                          <p className="text-sm text-blue-700">A dedicated account number will be generated for this transaction on the next screen.</p>
                        </div>
                      </div>
                    )}
                    
                    <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all mt-4">
                      Pay {selectedPlan.price}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Payment Successful!</h4>
                  <p className="text-gray-600 mt-2">Welcome aboard. We&apos;re redirecting you to your student dashboard now...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}