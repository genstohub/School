"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(true);

    // Clear the form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen mt-13 bg-gray-50 py-12 px-6 md:px-16">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-6"
      >
        Contact Us
      </motion.h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Have questions, need support, or want to collaborate?  
        Fill out the form below or reach out to us directly.
      </p>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8 mb-12"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </motion.div>

      {/* Quick Contact Options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/2348012345678"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-50 border border-green-200 p-6 rounded-xl flex flex-col items-center hover:shadow-lg transition"
        >
          <FaWhatsapp className="text-4xl text-green-600 mb-3" />
          <h3 className="font-semibold">WhatsApp</h3>
          <p className="text-gray-600 text-sm mt-1 text-center">
            Chat with us directly on WhatsApp
          </p>
        </a>

        {/* Email */}
        <a
          href="mailto:prepcenter@email.com"
          className="bg-blue-50 border border-blue-200 p-6 rounded-xl flex flex-col items-center hover:shadow-lg transition"
        >
          <FaEnvelope className="text-4xl text-blue-600 mb-3" />
          <h3 className="font-semibold">Email</h3>
          <p className="text-gray-600 text-sm mt-1 text-center">
            Send us an email and we’ll reply quickly
          </p>
        </a>

        {/* Phone (redirect to dialer) */}
        <a
          href="tel:+2348012345678"
          className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl flex flex-col items-center hover:shadow-lg transition"
        >
          <FaPhoneAlt className="text-4xl text-yellow-600 mb-3" />
          <h3 className="font-semibold">Phone</h3>
          <p className="text-gray-600 text-sm mt-1 text-center">
            Tap to call us directly
          </p>
        </a>
      </motion.div>

      {/* Success Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-6 max-w-sm text-center">
            <h2 className="text-lg font-bold text-green-600 mb-3">
              Message Sent Successfully
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for reaching out! We’ll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}