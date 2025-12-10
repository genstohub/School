"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Star,
  Globe,
  Briefcase,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type PartnershipType = "Corporate" | "Academic" | "Community" | "Technology" | "Other";

export default function PartnershipPage() {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    type: "Corporate" as PartnershipType,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("Corporate");

  const partnershipValues = [
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: "Impact",
      desc: "Contribute to shaping future-ready students through real-world projects and mentorship.",
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-500" />,
      title: "Visibility",
      desc: "Amplify your brand to a growing student community across universities and regions.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-500" />,
      title: "Innovation",
      desc: "Collaborate on curriculum, tools, and solutions that push education forward.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Sustainability",
      desc: "Build long-term programs that deliver measurable academic and social outcomes.",
    },
  ];

  const partnershipTypes: { key: PartnershipType; title: string; details: string }[] = [
    {
      key: "Corporate",
      title: "Corporate Partners",
      details:
        "Sponsorships, co-branded programs, scholarships, workplace-ready projects, and CSR partnerships. Perfect for companies seeking talent pipelines and social impact.",
    },
    {
      key: "Academic",
      title: "Academic Partners",
      details:
        "University departments, research collaborations, exchange programs, shared curriculum development, and accreditation partnerships.",
    },
    {
      key: "Community",
      title: "Community Partners",
      details:
        "NGOs, student organizations, local initiatives and bootcamps that want to co-host events, outreach programs, or community training.",
    },
    {
      key: "Technology",
      title: "Technology Partners",
      details:
        "EdTech providers, platform partners, and tools integration partners who want to enable better learning experiences through technology.",
    },
    {
      key: "Other",
      title: "Other / Custom",
      details:
        "If your partnership idea doesn’t fit the categories above, select 'Other' and describe your proposal. We love creative proposals.",
    },
  ];

  // handle form field updates
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  // submit: simulate backend, show modal, clear form
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setShowModal(true);
    // simulate API call
    setTimeout(() => {
      setSubmitted(false);
      setShowModal(true); // keep modal open until auto-close below
    }, 600);

    // auto-close modal after 3s and clear form
    setTimeout(() => {
      setShowModal(false);
      setForm({ name: "", organization: "", email: "", type: "Corporate", message: "" });
    }, 3000);
  }

  // Accordion toggle
  const toggleAccordion = (key: string) => setOpenAccordion((prev) => (prev === key ? null : key));

  // small motion variants
  const cardMotion = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <main className="min-h-screen bg-gray-50 mt-14 py-12 px-6 md:px-16">
      {/* HERO */}
      <section className="max-w-6xl mx-auto text-center mb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Users className="mx-auto w-14 h-14 text-green-600 mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Partner with Prep Center</h1>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
            Together we empower students — through training, mentorship, curriculum co-creation, research and
            community programs. Choose a partnership type below and tell us a bit about your idea.
          </p>
        </motion.div>
      </section>

      {/* Intro note */}
      <section className="max-w-4xl mx-auto mb-10">
        <motion.div
          className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-sm"
          {...cardMotion}
        >
          <h2 className="text-lg font-semibold text-green-800 mb-2">Before you submit</h2>
          <p className="text-gray-700 mb-3">
            We welcome collaborations that are ethical, measurable, and student-first. Please review the guidelines:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Who:</strong> Corporates, academic institutions, NGOs, EdTechs, training centers and experienced
              instructors/mentors.
            </li>
            <li>
              <strong>How:</strong> Typical collaborations include sponsorship, curriculum support, mentorship programs,
              internships, research, and co-created learning experiences.
            </li>
            <li>
              <strong>Expectations:</strong> Clear timelines, agreed deliverables, regular communication and alignment with
              our mission of accessible, practical learning.
            </li>
            <li>
              <strong>Review:</strong> All proposals are reviewed by our partnerships team. Approved partners will receive a
              follow-up with next steps and onboarding.
            </li>
            <li>
              <strong>Privacy & Policy:</strong> By submitting, you agree to our{" "}
              <Link href="/privacy-policy" className="text-green-700 underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-green-700 underline">
                Terms & Conditions
              </Link>
              .
            </li>
          </ul>
          <p className="mt-4 text-gray-700 italic">We evaluate every submission carefully and aim to respond within 5 business days.</p>
        </motion.div>
      </section>

      {/* Why Partner (values) */}
      <section className="max-w-6xl mx-auto mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {partnershipValues.map((v, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="mb-3">{v.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{v.title}</h3>
            <p className="text-gray-600 text-sm">{v.desc}</p>
          </motion.article>
        ))}
      </section>

      {/* Partnership Types (Accordion) + Form side by side */}
      <section className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-2 mb-12 items-start">
        {/* Accordion */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Partnership Types</h2>
          <div className="space-y-3">
            {partnershipTypes.map((p) => {
              const isOpen = openAccordion === p.key;
              return (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(p.key)}
                    aria-expanded={isOpen}
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">{p.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{p.details.slice(0, 80)}...</p>
                    </div>
                    <div className="ml-4">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-green-600" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.27 }}
                        className="p-4 border-t bg-gray-50 text-gray-700"
                      >
                        {p.details}
                        <div className="mt-3">
                          <strong>Examples:</strong>
                          <ul className="list-disc list-inside text-sm mt-2 text-gray-600">
                            <li>Program sponsorships</li>
                            <li>Curriculum co-creation</li>
                            <li>Technology integrations</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">Partnership Inquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Organization (optional)</label>
              <input
                name="organization"
                value={form.organization}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="Company / Institution"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="contact@company.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Partnership Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              >
                <option>Corporate</option>
                <option>Academic</option>
                <option>Community</option>
                <option>Technology</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="Tell us about your collaboration idea, timelines, and expected outcomes"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitted}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {submitted ? "Sending..." : "Send Inquiry"}
              </button>

              <button
                type="button"
                onClick={() => setForm({ name: "", organization: "", email: "", type: "Corporate", message: "" })}
                className="px-3 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Contact quick cards */}
      <section className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <motion.a
          whileHover={{ scale: 1.02 }}
          href="https://wa.me/2348012345678"
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4"
        >
          <MessageSquare className="w-8 h-8 text-green-600" />
          <div>
            <h4 className="font-semibold text-gray-800">WhatsApp</h4>
            <p className="text-sm text-gray-600">Start a chat with our partnerships team</p>
          </div>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.02 }}
          href="mailto:partnerships@prepcenter.com"
          className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4"
        >
          <Mail className="w-8 h-8 text-green-600" />
          <div>
            <h4 className="font-semibold text-gray-800">Email</h4>
            <p className="text-sm text-gray-600">Write to partnerships@prepcenter.com</p>
          </div>
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.02 }}
          href="tel:+2348012345678"
          className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4"
        >
          <Phone className="w-8 h-8 text-green-600" />
          <div>
            <h4 className="font-semibold text-gray-800">Call</h4>
            <p className="text-sm text-gray-600">Tap to call our partnerships line</p>
          </div>
        </motion.a>
      </section>

      {/* Footer note */}
      <section className="max-w-6xl mx-auto text-center text-gray-600">
        <p>
          By contacting or submitting this form you agree to our{" "}
          <Link href="/privacy-policy" className="text-green-700 underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-green-700 underline">
            Terms & Conditions
          </Link>
          . We review all proposals and aim to respond within 24 hours.
        </p>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center"
            >
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800">Inquiry Received</h3>
              <p className="text-gray-600 mt-2">Thanks — we received your partnership inquiry and will contact you soon.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}