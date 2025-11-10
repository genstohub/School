"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  LineChart,
  Users,
  Clock,
  Video,
  FlaskConical,
  UsersRound,
  ClipboardList,
  PenLine,
  FileText,
  MonitorPlay,
  GraduationCap,
  MessageSquare,
  CircleCheck,
  SquareCheck,
} from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StudentDashboard() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const chartData = {
    labels: ["Quiz", "Courses", "Study Mate", "Live", "Community", "Tests"],
    datasets: [
      {
        label: "Activities This Week",
        data: [3, 5, 2, 4, 3, 1],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const courseItems = [
    { name: "Course Material", icon: BookOpen, href: "/dashboards/students/courses/material" },
    { name: "Course Video", icon: MonitorPlay, href: "/dashboards/students/courses/video" },
    { name: "Course Practical", icon: FlaskConical, href: "/dashboards/students/courses/practical" },
    { name: "Course Live Session", icon: Video, href: "/dashboards/students/courses/live" },
    { name: "Course Mentor", icon: UsersRound, href: "/dashboards/students/courses/mentor" },
    { name: "Course Quiz", icon: ClipboardList, href: "/dashboards/students/courses/quiz" },
    { name: "Course Test", icon: PenLine, href: "/dashboards/students/courses/test" },
    { name: "Course Assignments", icon: FileText, href: "/dashboards/students/courses/assignments" },
    { name: "Course CBT", icon: SquareCheck, href: "/dashboards/students/courses/cbt" },
    { name: "Course Summary", icon: CircleCheck, href: "/dashboards/students/courses/summary" },
    { name: "Course Exam", icon: GraduationCap, href: "/dashboards/students/courses/exam" },
    { name: "Course Q&A", icon: MessageSquare, href: "/dashboards/students/courses/qna" },
  ];

  return (
    <div className="p-4 w-full sm:p-6 lg:p-8 bg-gray-900 min-h-screen text-white space-y-6">
      {/* Greeting Card */}
      <div className="bg-gray-800 rounded-2xl p-5 shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{greeting}, Wasem!</h2>
        <p className="text-gray-400 mt-1">Welcome back to your learning space</p>
      </div>

      {/* Core Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Learning Progress */}
        <Link
          href="/dashboards/students/progress"
          className="bg-gray-800 rounded-2xl p-5 flex flex-col items-start hover:bg-gray-700 transition shadow-md"
        >
          <Clock size={28} className="text-yellow-400 mb-3" />
          <h3 className="font-semibold text-lg">Learning Progress</h3>
          <p className="text-gray-400 text-sm mt-1">
            Track your course completion over the last 7 days.
          </p>
        </Link>

        {/* Activities Chart */}
        <Link
          href="/dashboards/students/activities"
          className="bg-gray-800 rounded-2xl p-5 hover:bg-gray-700 transition shadow-md"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <LineChart size={22} className="text-green-400" /> Weekly Activities
          </h3>
          <div className="h-40">
            <Bar
              data={chartData}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        </Link>

        {/* Top Students */}
        <Link
          href="/dashboards/students/top-students"
          className="bg-gray-800 rounded-2xl p-5 flex flex-col items-start hover:bg-gray-700 transition shadow-md"
        >
          <Users size={28} className="text-purple-400 mb-3" />
          <h3 className="font-semibold text-lg">Top Students of the Week</h3>
          <p className="text-gray-400 text-sm mt-1">
            See this week’s highest achievers.
          </p>
        </Link>
      </div>

      {/* All Course Features */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Courses</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {courseItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition flex flex-col items-start shadow-md"
              >
                <Icon size={26} className="mb-3 text-blue-400" />
                <h4 className="font-semibold text-sm sm:text-base">{item.name}</h4>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}