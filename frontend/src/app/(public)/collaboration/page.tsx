"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  ShieldCheck,
  Send,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function CollaborationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Collaboration Form Data:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", organization: "", role: "", message: "" });

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-14 py-12 px-6 md:px-20">
      {/* Header */}
      <div className="text-center mb-12">
        <Users className="w-14 h-14 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Collaborate with <span className="text-green-600">Prep Center</span>
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          We welcome instructors, mentors, organizations, and partners to join us in creating a world-class learning and growth experience.
        </p>
      </div>
       {/* Info Note Before Form */}
<div className="max-w-3xl mx-auto bg-green-50 border border-green-200 text-green-900 rounded-2xl p-8 mb-12 shadow-md">
  <h2 className="text-2xl font-bold mb-4">Before You Collaborate</h2>
  <p className="text-gray-700 leading-relaxed mb-4">
    We deeply value collaborations and partnerships that contribute to our vision of
    empowering students with accessible, practical, and guided learning opportunities.  
    Before filling out the form, please take a moment to review the following guidelines:
  </p>
  
  <ul className="list-disc list-inside space-y-3 text-gray-700">
    <li>
      <strong>Who Can Collaborate?</strong>  
      Instructors, mentors, universities, NGOs, training centers, and organizations 
      committed to supporting education and capacity building are welcome to join.
    </li>
    <li>
      <strong>How Collaboration Works:</strong>  
      Collaborators may contribute through mentorship, teaching, knowledge sharing, 
      curriculum development, research partnerships, sponsorships, or other aligned activities.
    </li>
    <li>
      <strong>Expectations:</strong>  
      We encourage professionalism, consistency, and a shared commitment to student success.
      Every collaborator is expected to uphold our values of integrity, inclusivity, and excellence.
    </li>
    <li>
      <strong>Review & Approval:</strong>  
      All collaboration requests are reviewed by our team. Approved collaborators will 
      be contacted via email with next steps and onboarding details.
    </li>
    <li>
      <strong>Privacy & Policy:</strong>  
      Your data and submission will be handled with strict confidentiality. By proceeding, 
      you agree to our{" "}
      <a href="/privacy-policy" className="text-green-700 underline hover:text-green-900">
        Privacy Policy
      </a>{" "}
      and{" "}
      <a href="/terms" className="text-green-700 underline hover:text-green-900">
        Terms of Collaboration
      </a>.
    </li>
  </ul>

  <p className="mt-6 text-gray-700 italic">
    Thank you for your interest in working with us. Together, we can create impactful opportunities
    and make education more accessible to students worldwide.
  </p>
          </div>
          
          <div className="text-1xl md:text-4xl text-center mt-4 font-bold text-gray-800">
              <h3 className="text-gray-800">Take A Step</h3>
          </div>
      {/* Collaboration Form */}
      <div className="max-w-3xl mx-auto bg-white mt-8 shadow-lg rounded-2xl p-8">
        {submitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <ShieldCheck className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800">
              Collaboration Request Sent!
            </h2>
            <p className="text-gray-600 mt-2">
              Thank you for reaching out. We’ll get back to you shortly.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Organization / Institution
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600"
                placeholder="Enter your organization name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Role / Position</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600"
                placeholder="e.g., Instructor, Mentor, Partner"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600"
                placeholder="Tell us more about how you’d like to collaborate"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
            >
              <Send className="w-5 h-5" /> Send Request
            </button>
          </form>
        )}
      </div>

      {/* Extra Info Section */}
      <div className="max-w-4xl mx-auto mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* WhatsApp */}
        <motion.a
          whileHover={{ scale: 1.03 }}
          href="https://wa.me/2348100000000"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition"
        >
          <MessageSquare className="w-10 h-10 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">WhatsApp</h3>
            <p className="text-gray-600">Chat with us directly on WhatsApp.</p>
          </div>
        </motion.a>

        {/* Email */}
        <motion.a
          whileHover={{ scale: 1.03 }}
          href="mailto:prepcenter@gmail.com"
          className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg transition"
        >
          <Mail className="w-10 h-10 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-600">Send us an email directly.</p>
          </div>
        </motion.a>

        {/* Policies */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-4"
        >
          <FileText className="w-10 h-10 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Policies</h3>
            <p className="text-gray-600">
              By collaborating, you agree to our{" "}
              <a href="/privacy-policy" className="text-green-600 underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-green-600 underline">
                Terms & Conditions
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}