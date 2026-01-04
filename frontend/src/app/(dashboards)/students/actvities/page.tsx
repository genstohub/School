"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { LineChart, ArrowLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActivitiesPage = () => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Activity Hours',
      data: [4, 7, 5, 8, 3, 2, 6],
      backgroundColor: '#4ade80',
      borderRadius: 8,
    }]
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link href="/students" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <div className="bg-gray-800 p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <LineChart className="text-green-400" /> Activity Analytics
        </h1>

        <div className="h-80 w-full mb-10">
          <Bar 
            data={chartData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
                x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
              }
            }} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Most Active Day</p>
            <p className="text-2xl font-bold text-green-400">Thursday</p>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Total Weekly Hours</p>
            <p className="text-2xl font-bold">35.5 Hours</p>
          </div>
          <div className="bg-gray-900 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Improvement</p>
            <p className="text-2xl font-bold flex items-center gap-2">
              +12% <TrendingUp size={20} className="text-green-400" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;