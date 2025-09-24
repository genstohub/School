"use client";

import React, { useState } from "react";
import { CheckCircle, Star, GraduationCap, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Plan = {
  id: string;
  title: string;
  price: string;
  icon: React.ReactNode;
  benefits: string[];
};

const plans: Plan[] = [
  {
    id: "2000",
    title: "₦2000 Plan",
    price: "₦2000",
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    benefits: [
      "Access to selected courses",
      "Fewer ads during learning",
      "Limited live class participation",
      "Email support only",
      "Valid for 1 month",
    ],
  },
  {
    id: "3000",
    title: "₦3000 Plan",
    price: "₦3000",
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    benefits: [
      "Full access to all courses",
      "No ads during learning",
      "Unlimited live class participation",
      "Priority support (Email + Chat)",
      "Downloadable resources",
      "Valid for 1 month",
    ],
  },
];

export default function SubscriptionSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setSelectedPlan(null);
    }, 2500);
  };

  return (
    <section className="py-16 px-6 lg:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Suitable Subscription for you
      </h2>

      {/* Subscription Plans */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {plan.icon}
                <h3 className="text-xl font-semibold">{plan.title}</h3>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setSelectedPlan(plan)}
              className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              {!showSuccess ? (
                <>
                  <h3 className="text-xl font-semibold mb-4">
                    Complete Subscription - {selectedPlan.title}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="User ID"
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Course ID"
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                    <select
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    >
                      <option value="">Select Bank</option>
                      <option>First Bank</option>
                      <option>UBA</option>
                      <option>GTBank</option>
                      <option>Access Bank</option>
                      <option>Zenith Bank</option>
                    </select>
                    <p className="text-sm text-gray-600">
                      Requesting account details → Check your email for account
                      details to complete subscription.
                    </p>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Submit
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold">
                    Subscription Request Sent!
                  </h4>
                  <p className="text-sm text-gray-600">
                    Please check your email for account details to complete
                    payment.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}