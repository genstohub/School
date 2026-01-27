"use client";

import React from "react";
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight,
  Calendar
} from "lucide-react";

export default function WeeklyActivityPage() {
  // Mock data for the activity heat-map/chart
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const activityData = [45, 52, 38, 65, 48, 24, 18]; // Percentage or count

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-[0.3em] text-[10px]">
            <Activity size={14} /> Analytics Engine
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            Weekly <span className="text-blue-500">Activity</span>
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 p-2 rounded-2xl">
          <button className="px-4 py-2 bg-zinc-800 rounded-xl text-xs font-bold text-white shadow-xl">Week</button>
          <button className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors">Month</button>
          <div className="h-4 w-[1px] bg-zinc-800 mx-1"></div>
          <Calendar size={18} className="text-zinc-500 mr-2" />
        </div>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Learners", value: "1,284", change: "+12%", up: true, icon: Users },
          { label: "Avg. Watch Time", value: "42m", change: "+5%", up: true, icon: Clock },
          { label: "Completion Rate", value: "78%", change: "-2%", up: false, icon: TrendingUp },
          { label: "Community Posts", value: "89", change: "+24%", up: true, icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[2rem] hover:border-zinc-700 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-black rounded-2xl border border-zinc-800 group-hover:border-blue-500/50 transition-colors">
                <stat.icon className="text-blue-500" size={20} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.up ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {stat.change}
              </div>
            </div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black tracking-tighter mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Engagement Visualization */}
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest">Engagement Volume</h3>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Mon, Jan 20 - Sun, Jan 26</span>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2">
            {activityData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex flex-col justify-end h-full">
                   {/* Bar with hover effect */}
                  <div 
                    className="w-full bg-blue-600/20 border-t-2 border-blue-500 rounded-t-lg group-hover:bg-blue-600/40 transition-all duration-500 cursor-pointer"
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}%
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-zinc-600 uppercase group-hover:text-white transition-colors">
                  {weekDays[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Lessons */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-widest mb-6">Top Lessons</h3>
          <div className="space-y-6 flex-1">
            {[
              { title: "Advanced React Hooks", views: "1.2k", trend: 85 },
              { title: "Next.js 14 Server Components", views: "940", trend: 62 },
              { title: "Tailwind UI Mastery", views: "812", trend: 45 },
            ].map((lesson, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-bold group-hover:text-blue-400 transition-colors">{lesson.title}</p>
                  <ChevronRight size={14} className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${lesson.trend}%` }}></div>
                </div>
                <p className="text-[9px] text-zinc-600 font-black uppercase mt-2">{lesson.views} unique viewers</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-4 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
}