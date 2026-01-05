"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LineChart, Loader2, AlertCircle } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Interfaces for Strict Typing ---
interface ActivityDataset {
  label: string;
  data: number[]; // Expecting exactly 7 numbers for 7 days
  backgroundColor: string;
}

interface WeeklyActivityData extends ChartData<"bar"> {
  labels: string[];
  datasets: ActivityDataset[];
}

export default function WeeklyActivityChart() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<WeeklyActivityData | null>(null);

  useEffect(() => {
    async function fetchActivityData() {
      try {
        setLoading(true);
        setError(null);

        // API Call to your REST endpoint
        const res = await fetch("/api/students/analytics/weekly");
        
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Failed to fetch activity data`);
        }

        const data: WeeklyActivityData = await res.json();
        
        // Basic validation to ensure we have data to display
        if (!data.datasets || data.datasets.length === 0) {
          throw new Error("No activity data found for this week");
        }

        setChartData(data);
      } catch (err) {
        console.error("Chart Fetch Error:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchActivityData();
  }, []);

  // Chart Configuration
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hidden to keep the dashboard card clean
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#9ca3af",
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        stacked: true, // Merges categories into one bar per day
        grid: { display: false },
        ticks: { color: "#9ca3af", font: { size: 11 } },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: { color: "rgba(75, 85, 99, 0.1)" },
        ticks: { 
            color: "#9ca3af", 
            stepSize: 5,
            font: { size: 11 }
        },
      },
    },
  };

  return (
    <Link
      href="/students/activities"
      className="bg-gray-800 rounded-2xl p-5 hover:bg-gray-700 transition shadow-md block border border-gray-700/50 min-h-[240px]"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-100">
          <LineChart size={22} className="text-green-400" /> Weekly Activities
        </h3>
        {!loading && !error && (
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter px-2 py-1 bg-gray-900/50 rounded-md border border-gray-700">
                Last 7 Days
            </span>
        )}
      </div>

      <div className="h-40 relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Loader2 className="animate-spin text-blue-500" size={24} />
            <p className="text-xs text-gray-500 font-medium tracking-wide">Syncing activities...</p>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
            <AlertCircle size={24} className="text-red-500/50 mb-2" />
            <p className="text-xs text-gray-400 leading-tight">{error}</p>
            <button 
                onClick={(e) => { e.preventDefault(); window.location.reload(); }}
                className="mt-3 text-[10px] font-bold text-blue-400 uppercase hover:underline"
            >
                Retry
            </button>
          </div>
        ) : chartData ? (
          <Bar data={chartData} options={options} />
        ) : null}
      </div>

      {/* Dynamic Legend Summary - Generated from API response */}
      {!loading && !error && chartData && (
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-gray-700/50 pt-4">
          {chartData.datasets.map((set) => (
            <div key={set.label} className="flex items-center gap-1.5">
              <div 
                className="w-1.5 h-1.5 rounded-full shadow-sm" 
                style={{ backgroundColor: set.backgroundColor }} 
              />
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
                {set.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </Link>
  );
}