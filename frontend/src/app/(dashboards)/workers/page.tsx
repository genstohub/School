"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  Users,
  BarChart3,
  FileText,
  User,
  CheckCircle,
  XCircle,
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

type Stat = { title: string; value: number; icon: React.ReactNode; colorClass: string };
type ActivityItem = { id: number; text: string; time: string; type: "login" | "logout" | "upload" | "task" };
type Resource = { id: number; title: string; instructor: string; submittedAt: string; status: "pending" | "approved" };
type UserRequest = { id: number; name: string; avatar?: string; reason: string; time: string };

export default function Dashboard() {
  // Stats
  const stats: Stat[] = [
    { title: "Active Students", value: 124, icon: <Users size={22} />, colorClass: "bg-green-50 text-green-800" },
    { title: "Active Instructors", value: 18, icon: <Activity size={22} />, colorClass: "bg-blue-50 text-blue-800" },
    { title: "Pending Resources", value: 7, icon: <FileText size={22} />, colorClass: "bg-yellow-50 text-yellow-800" },
    { title: "Reports Generated", value: 42, icon: <BarChart3 size={22} />, colorClass: "bg-purple-50 text-purple-800" },
  ];

  // Recent activities (includes login/logout)
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 1, text: "Mary logged in", time: "2m ago", type: "login" },
    { id: 2, text: "James uploaded 'Crop Protection' resource", time: "12m ago", type: "upload" },
    { id: 3, text: "Aisha logged out", time: "30m ago", type: "logout" },
    { id: 4, text: "Admin assigned task 'Review resources'", time: "1h ago", type: "task" },
  ]);

  // Pending resources for workers to inspect
  const [resources, setResources] = useState<Resource[]>([
    { id: 1, title: "Crop Protection - Lecture 3", instructor: "James Okon", submittedAt: "2025-10-12 10:15", status: "pending" },
    { id: 2, title: "Irrigation Lab Notes", instructor: "Sarah Ali", submittedAt: "2025-10-11 14:20", status: "pending" },
    { id: 3, title: "Soil Management - PDF", instructor: "Mary Johnson", submittedAt: "2025-10-10 09:05", status: "approved" },
  ]);

  // User requests (join community, sponsorship, etc.)
  const [requests, setRequests] = useState<UserRequest[]>([
    { id: 1, name: "Chidi Eze", avatar: "", reason: "Request to join Microbiology community", time: "10m ago" },
    { id: 2, name: "Blessing Musa", avatar: "", reason: "Sponsorship request for group training", time: "1h ago" },
  ]);

  // chart data
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Logins",
        data: [12, 18, 9, 15, 22, 8, 14],
        backgroundColor: "#60A5FA",
      },
      {
        label: "Uploads",
        data: [3, 5, 2, 4, 3, 2, 5],
        backgroundColor: "#34D399",
      },
    ],
  };

  // modal state for details
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  // quick helper to open centered modal
  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  // Simulate clicking a stat card -> details
  const handleStatDetails = (stat: Stat) => {
    openModal(
      <div>
        <h3 className="text-lg font-semibold mb-2">{stat.title} Details</h3>
        <p className="text-sm text-gray-600 mb-4">
          Overview and actionable items for <strong>{stat.title}</strong>.
        </p>
        <ul className="space-y-2 text-sm">
          <li>• Total: <strong>{stat.value}</strong></li>
          <li>• Active in last 24h: <strong>{Math.floor(stat.value * 0.6)}</strong></li>
          <li>• New today: <strong>{Math.floor(stat.value * 0.05)}</strong></li>
        </ul>
      </div>
    );
  };

  // Resource detail view
  const handleViewResource = (r: Resource) => {
    openModal(
      <div>
        <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Submitted by <strong>{r.instructor}</strong> — {r.submittedAt}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          Short description: This resource contains lecture notes and examples that require review for community guidelines and quality.
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              // approve simulated
              setResources((prev) => prev.map(x => x.id === r.id ? { ...x, status: "approved" } : x));
              closeModal();
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Approve
          </button>
          <button
            onClick={() => {
              // reject simulated
              setResources((prev) => prev.filter(x => x.id !== r.id));
              closeModal();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Reject
          </button>
        </div>
      </div>
    );
  };

  // Request detail view
  const handleViewRequest = (req: UserRequest) => {
    openModal(
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
            <User size={18} />
          </div>
          <div>
            <h3 className="font-semibold">{req.name}</h3>
            <p className="text-xs text-gray-500">{req.time}</p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4">{req.reason}</p>

        <div className="flex gap-3">
          <button
            onClick={() => {
              // mark as handled (demo)
              setRequests((prev) => prev.filter(r => r.id !== req.id));
              closeModal();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Mark handled
          </button>
          <button
            onClick={() => closeModal()}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  // Recent Activity detail (clickable)
  const handleActivityDetails = (a: ActivityItem) => {
    openModal(
      <div>
        <h3 className="text-lg font-semibold mb-2">Activity Details</h3>
        <p className="text-sm text-gray-700 mb-4">{a.text}</p>
        <p className="text-xs text-gray-500">Occurred: {a.time}</p>
      </div>
    );
  };

  // click to view students overview with chart
  const handleViewStudentsOverview = () => {
    openModal(
      <div>
        <h3 className="text-lg font-semibold mb-2">Students Activity Overview</h3>
        <div className="mt-3">
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
        </div>
      </div>
    );
  };

  // basic simulated realtime: append a login every 30s (for dev)
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => [
        { id: Date.now(), text: `User${Math.floor(Math.random() * 90) + 10} logged in`, time: "just now", type: "login" },
        ...prev.slice(0, 6),
      ]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 lg:p-10">
      <div className="max-w-full mx-auto space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Workers Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Monitor students & instructors activity — review pending resources and user requests.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleViewStudentsOverview}
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              <Activity size={16} /> View Overview
            </button>
          </div>
        </header>

        {/* Top stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <button
              key={i}
              onClick={() => handleStatDetails(s)}
              className={`flex items-center justify-between p-4 rounded-2xl shadow-sm transition hover:shadow-md ${s.colorClass}`}
            >
              <div>
                <p className="text-sm text-gray-700">{s.title}</p>
                <h2 className="text-2xl font-bold text-gray-900">{s.value}</h2>
              </div>
              <div className="p-3 rounded-md bg-white/80 text-gray-800">
                {s.icon}
              </div>
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Recent activities & chart */}
          <div className="space-y-6 lg:col-span-2">
            {/* Activity Chart */}
            <div className="bg-gray-800 rounded-2xl p-5 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Weekly Activity</h3>
                <div className="text-sm text-gray-400">Logins & uploads</div>
              </div>
              <div className="h-48">
                <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
              </div>
            </div>

            {/* Recent Activities (clickable) */}
            <div className="bg-gray-800 rounded-2xl p-5 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Recent Activities</h3>
                <span className="text-sm text-gray-400">Live feed</span>
              </div>
              <ul className="space-y-3 max-h-64 overflow-auto pr-2">
                {activities.map((a) => (
                  <li
                    key={a.id}
                    onClick={() => handleActivityDetails(a)}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                      {a.type === "login" ? "→" : a.type === "logout" ? "←" : "·"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-100">{a.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                    </div>
                    <div>
                      {a.type === "login" ? <CheckCircle className="text-green-400" /> : <XCircle className="text-red-400" />}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Pending resources & User requests */}
          <div className="space-y-6">
            {/* Pending resources */}
            <div className="bg-gray-800 rounded-2xl p-5 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Pending Resources</h3>
                <span className="text-sm text-gray-400">{resources.filter(r => r.status === "pending").length} pending</span>
              </div>

              <ul className="space-y-3">
                {resources.map((r) => (
                  <li key={r.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <FileText />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{r.title}</p>
                      <p className="text-xs text-gray-400">{r.instructor} • {r.submittedAt}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${r.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                        {r.status}
                      </span>
                      <button onClick={() => handleViewResource(r)} className="text-sm text-blue-400 hover:underline">View</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requests */}
            <div className="bg-gray-800 rounded-2xl p-5 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">User Requests</h3>
                <span className="text-sm text-gray-400">{requests.length} new</span>
              </div>

              <ul className="space-y-3">
                {requests.map((req) => (
                  <li key={req.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-700 transition">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <User />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{req.name}</p>
                      <p className="text-xs text-gray-400">{req.reason}</p>
                      <p className="text-xs text-gray-500 mt-1">{req.time}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => handleViewRequest(req)} className="text-sm bg-blue-600 px-3 py-1 rounded-md">View</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick action */}
            <div className="bg-gray-800 rounded-2xl p-4 shadow flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Quick Review</p>
                <h4 className="font-semibold">Inspect pending resources</h4>
              </div>
              <button onClick={() => openModal(<div><h3 className="font-semibold">Batch Review</h3><p className="text-sm text-gray-600 mt-2">This would launch a bulk review modal for pending resources.</p></div>)} className="px-4 py-2 bg-blue-600 rounded-md">Start</button>
            </div>
          </div>
        </div>
      </div>

      {/* Center modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeModal} />
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 w-[min(920px,95%)] max-h-[85vh] overflow-auto border border-white/10">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-300 hover:text-white">✕</button>
            <div className="text-gray-100">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}