"use client";

import React, { useEffect, useState } from "react";
import { Users, BookOpen, UserCog, ClipboardList, BarChart3, Settings } from "lucide-react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const barData = {
    labels: ["Students", "Instructors", "Workers"],
    datasets: [
      {
        label: "Active Users",
        data: [120, 45, 10],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const pieData = {
    labels: ["Students", "Instructors", "Workers"],
    datasets: [
      {
        data: [75, 20, 5],
        backgroundColor: ["#60A5FA", "#F87171", "#34D399"],
      },
    ],
  };

  const cards = [
    { title: "Students", count: "1,200", icon: Users, color: "text-blue-400" },
    { title: "Instructors", count: "85", icon: UserCog, color: "text-red-400" },
    { title: "Workers", count: "12", icon: ClipboardList, color: "text-green-400" },
    { title: "Courses", count: "340", icon: BookOpen, color: "text-yellow-400" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-900 min-h-screen text-white space-y-8">
      <div className="bg-gray-800 rounded-2xl p-5 shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{greeting}, Admin 👋</h2>
        <p className="text-gray-400 mt-1">Here’s what’s happening across the platform.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-gray-800 rounded-xl p-5 flex flex-col items-start hover:bg-gray-700 transition shadow-md"
            >
              <Icon size={26} className={`mb-2 ${card.color}`} />
              <h3 className="font-semibold text-base">{card.title}</h3>
              <p className="text-gray-300 text-lg font-bold">{card.count}</p>
            </div>
          );
        })}
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="text-blue-400" /> Weekly User Activity
          </h3>
          <Bar
            data={barData}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="text-green-400" /> Role Distribution
          </h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}