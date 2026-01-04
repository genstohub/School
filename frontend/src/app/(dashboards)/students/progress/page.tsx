import React from 'react';
import { Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const ProgressPage = () => {
  const dailyStats = [
    { day: "Monday", progress: 85, hours: 2.5, topic: "UI Design Principles" },
    { day: "Tuesday", progress: 40, hours: 1.2, topic: "React Hooks" },
    { day: "Wednesday", progress: 95, hours: 4.0, topic: "Backend Integration" },
    { day: "Thursday", progress: 60, hours: 2.1, topic: "Database Schema" },
    { day: "Friday", progress: 20, hours: 0.5, topic: "API Authentication" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link href="/students" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Clock className="text-yellow-400" /> Learning Progress
        </h1>
        <p className="text-gray-400 mt-2">Daily breakdown of your study sessions over the last 5 days.</p>
      </header>

      <div className="grid gap-6">
        {dailyStats.map((stat, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold">{stat.day}</h3>
              <p className="text-gray-400 text-sm">{stat.topic}</p>
            </div>
            
            <div className="flex-1 max-w-md mx-4">
              <div className="flex justify-between mb-2 text-sm">
                <span>Completion</span>
                <span className="text-yellow-400">{stat.progress}%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-2.5">
                <div 
                  className="bg-yellow-400 h-2.5 rounded-full" 
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-mono">{stat.hours}h spent</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;