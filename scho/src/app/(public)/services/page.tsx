"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { Users, User, Building2, CheckCircle } from "lucide-react";
import { Dialog } from "@headlessui/react";

type ServicePlan = {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: JSX.Element;
  benefits: string[];
  dynamicField: string; // added for dynamic registration field
};

const services: ServicePlan[] = [
  {
    id: "1",
    title: "Group Classes (5 Students)",
    price: "₦15,000",
    description: "Learn together in a small group of 5 students.",
    icon: <Users className="w-10 h-10 text-blue-500" />,
    benefits: [
      "Covers up to 3 courses per semester",
      "Interactive group discussions",
      "Affordable pricing per student",
    ],
    dynamicField: "Number of Students: 5",
  },
  {
    id: "2",
    title: "Group Classes (10 Students)",
    price: "₦30,000",
    description: "Larger group learning for up to 10 students.",
    icon: <Users className="w-10 h-10 text-green-500" />,
    benefits: [
      "Covers up to 5 courses per semester",
      "Collaborative learning sessions",
      "Great for friends/classmates",
    ],
    dynamicField: "Number of Students: 10",
  },
  {
    id: "3",
    title: "Private Classes",
    price: "₦20,000 / month",
    description: "One-on-one learning with personalized attention.",
    icon: <User className="w-10 h-10 text-purple-500" />,
    benefits: [
      "Covers all semester courses",
      "Personalized learning path",
      "Flexible schedule",
      "Direct access to tutor",
    ],
    dynamicField: "Covers all semester courses",
  },
  {
    id: "4",
    title: "Department Classes",
    price: "₦50,000 / month",
    description: "Comprehensive department-wide learning package.",
    icon: <Building2 className="w-10 h-10 text-orange-500" />,
    benefits: [
      "Covers all courses for the department",
      "Large-scale interactive sessions",
      "Exclusive materials & resources",
      "Best value for institutions",
    ],
    dynamicField: "Department-wide package",
  },
];

export default function Services() {
  const [openReg, setOpenReg] = useState<string | null>(null);
  const [openPay, setOpenPay] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const selectedPlan = services.find((s) => s.id === openReg || s.id === openPay);

  return (
    <section className="w-full mt-13 max-w-7xl mx-auto px-6 py-12">
      {/* Intro Paragraph */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Our Services & Pricing</h2>
        <p className="text-gray-600 text-lg">
          Choose the learning style that best fits your needs. Whether you’re joining with 
          friends, studying one-on-one, or taking full department classes, our flexible 
          plans give you access to professional instructors, interactive sessions, and 
          complete academic support. Click a card below to register and start your journey.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-xl hover:scale-105 transition cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.3, duration: 0.6 }}
            onClick={() => setOpenReg(service.id)}
          >
            <div className="flex justify-center mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-2xl font-bold text-indigo-600 mb-6">
              {service.price}
            </p>
            <ul className="text-gray-700 space-y-3 text-left">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Registration Modal */}
      <Dialog open={!!openReg} onClose={() => setOpenReg(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <Dialog.Panel className="bg-white p-6 rounded-2xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">
              Register for {selectedPlan?.title}
            </h3>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
              <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
              <input type="tel" placeholder="Phone Number" className="w-full border p-2 rounded" />
              {/* Dynamic Field */}
              <input
                type="text"
                value={selectedPlan?.dynamicField || ""}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />
              <button
                type="button"
                onClick={() => {
                  setOpenReg(null);
                  setOpenPay(openReg);
                }}
                className="w-full bg-indigo-600 text-white py-2 rounded"
              >
                Continue to Payment
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={!!openPay} onClose={() => setOpenPay(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <Dialog.Panel className="bg-white p-6 rounded-2xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Payment Request</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Username" className="w-full border p-2 rounded" />
              <input type="text" placeholder="User ID" className="w-full border p-2 rounded" />
              <input type="text" placeholder="Purpose" className="w-full border p-2 rounded" />
              <select className="w-full border p-2 rounded">
                <option>Select Bank</option>
                <option>Access Bank</option>
                <option>GTBank</option>
                <option>UBA</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setOpenPay(null);
                  setSuccess(true);
                }}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Submit Request
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={success} onClose={() => setSuccess(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6">
          <Dialog.Panel className="bg-white p-6 rounded-2xl max-w-md w-full text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Request Successful!</h3>
            <p className="text-gray-600">Check your email to complete your registration.</p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}