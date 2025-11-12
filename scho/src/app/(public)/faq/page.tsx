"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

// FAQ Data with Categories
const faqs = [
  {
    category: "General",
    question: "What is this platform about?",
    answer:
      "Our platform is designed to provide seamless access to resources, connections, and tools that empower users across different sectors.",
  },
  {
    category: "General",
    question: "Is my data safe?",
    answer:
      "Yes. We use modern security practices to ensure your data is encrypted, protected, and handled with strict privacy standards.",
  },
  {
    category: "General",
    question: "Can I access this platform on mobile?",
    answer:
      "Absolutely! Our platform is fully responsive, optimized for mobile, tablet, and desktop experiences.",
  },
  {
    category: "Support",
    question: "How can I contact support?",
    answer:
      "You can reach our support team anytime via the contact form, WhatsApp link, or email provided on our contact page.",
  },
  {
    category: "Students",
    question: "How does this support university students?",
    answer:
      "We provide academic support, tutorials, and resources that complement university studies, making learning easier and more effective.",
  },
  {
    category: "Students",
    question: "Do students get mentorship?",
    answer:
      "Yes, mentorship is a key part of our services. Students can connect with mentors for guidance in academics and career development.",
  },
  {
    category: "Students",
    question: "What if I miss a class?",
    answer:
      "You can catch up with recorded sessions and access class notes, so you never fall behind.",
  },
  {
    category: "Learning",
    question: "What kind of courses are offered?",
    answer:
      "We offer a variety of academic and skill-based courses that are relevant to your university journey and career growth.",
  },
  {
    category: "Learning",
    question: "Who are the instructors?",
    answer:
      "Our instructors are experienced professionals, lecturers, and mentors dedicated to providing practical and quality education.",
  },
  {
    category: "Learning",
    question: "How flexible is the learning method?",
    answer:
      "Learning is flexible with options for group classes, private classes, and recorded sessions to suit your schedule.",
  },
  {
    category: "Learning",
    question: "Can I practice after classes?",
    answer:
      "Definitely. We provide hands-on projects, practice resources, and assignments so students can apply what they learn.",
  },
  {
    category: "General",
    question: "What are the benefits of joining Prep Center?",
    answer:
      "Students gain access to affordable courses, mentorship, academic resources, practicals, and networking opportunities.",
  },
];

const categories = ["General", "Students", "Learning", "Support"];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("General");

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="min-h-screen mt-14 bg-gray-50 py-12 px-6 md:px-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <HelpCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mt-2">
          Find answers to the most common questions about our services, learning, and support.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-8 space-x-1 flex-row">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setOpenIndex(null); // reset open state when switching category
            }}
            className={`px-3 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === category
                ? "bg-gray-600 text-white shadow-md"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left"
            >
              <span className="font-medium text-gray-800 text-lg">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-green-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-500" />
              )}
            </button>

            {/* Animated Answer */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 border-t bg-gray-50 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Still Have Questions Card */}
      <div className="max-w-3xl mx-auto mt-12">
        <Link href="/contact">
          <div className="cursor-pointer bg-gray-600 hover:bg-zinc-700 transition text-white rounded-2xl shadow-lg p-6 flex items-center justify-center space-x-3">
            <MessageCircle className="w-6 h-6" />
            <span className="font-medium text-lg">Still have a question? Contact Us</span>
          </div>
        </Link>
      </div>
    </div>
  );
}