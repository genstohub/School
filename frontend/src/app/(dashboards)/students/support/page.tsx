import React from 'react';
import { LifeBuoy, ArrowLeft, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link href="/students" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-8">
          <LifeBuoy className="text-red-400" /> Help & Support
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <MessageCircle />, title: "Live Chat", desc: "Available 9am-5pm" },
            { icon: <Mail />, title: "Email Support", desc: "Response in 24h" },
            { icon: <HelpCircle />, title: "FAQ", desc: "Instant answers" },
          ].map((box, i) => (
            <div key={i} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center hover:bg-gray-700 transition cursor-pointer">
              <div className="text-red-400 flex justify-center mb-3">{box.icon}</div>
              <h3 className="font-semibold">{box.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{box.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
          <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Subject" className="bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-red-400" />
              <select className="bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-red-400">
                <option>Technical Issue</option>
                <option>Billing</option>
                <option>Course Content</option>
              </select>
            </div>
            <textarea rows={4} placeholder="Describe your problem..." className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 focus:outline-none focus:border-red-400"></textarea>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl transition">
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;