"use client";
import { motion } from "framer-motion";
import { Sunrise, Sun, Moon } from "lucide-react";




export default function FlexibleLearning() {
  const features = [
    {
      icon: <Sunrise className="w-12 h-12 text-yellow-300" />,
      title: "Morning Sessions",
      desc: "Start your day with productive learning.",
    },
    {
      icon: <Sun className="w-12 h-12 text-orange-400" />,
      title: "Afternoon Flex",
      desc: "Balance work, study, and personal life.",
    },
    {
      icon: <Moon className="w-12 h-12 text-blue-300" />,
      title: "Evening Study",
      desc: "Learn comfortably after your daily activities.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-r from-[#036c73] to-[#014d61] text-white px-6 lg:px-20 py-20 overflow-hidden rounded-2xl shadow-2xl mt-16">
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Flexible Learning, Anytime Anywhere
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Whether you’re an early bird or a night owl, our courses are designed
          to fit into your schedule. Study at your pace, from anywhere, at any
          time.
        </motion.p>

        {/* Features row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:bg-white/20 transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-200 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-4 bg-white text-[#014d61] font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Start Learning Now
          </button>
        </motion.div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
}