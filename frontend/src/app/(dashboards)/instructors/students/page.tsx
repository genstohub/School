"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  ExternalLink,
  Circle
} from "lucide-react";
import { useActiveStudents } from "@/hooks";

// Mock Data - Replace with your actual API fetch
const MOCK_ACTIVE_STUDENTS = [
  { id: "1", name: "Alex Rivera", email: "alex@example.com", course: "Advanced React", progress: 85, lastActive: "2 mins ago", status: "online" },
  { id: "2", name: "Sarah Chen", email: "sarah.c@example.com", course: "UI/UX Mastery", progress: 42, lastActive: "15 mins ago", status: "online" },
  { id: "3", name: "Jordan Smith", email: "j.smith@example.com", course: "Backend Node.js", progress: 12, lastActive: "1 hour ago", status: "away" },
  { id: "4", name: "Elena Rodriguez", email: "elena@example.com", course: "Advanced React", progress: 98, lastActive: "5 mins ago", status: "online" },
];

export default function ActiveStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const activeStudents = useActiveStudents();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-2">
            <Users className="text-blue-500" />
            Active <span className="text-blue-500">Students</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">
            Real-time engagement tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search students..."
              className="bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-colors w-full md:w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-zinc-900 p-2 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors">
            <Filter size={20} className="text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Stats Summary Area */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Currently Online</p>
          <p className="text-2xl font-black mt-1">24</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Avg. Course Completion</p>
          <p className="text-2xl font-black mt-1 text-emerald-500">68%</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Daily Active Users</p>
          <p className="text-2xl font-black mt-1 text-blue-500">142</p>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Active Course</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {MOCK_ACTIVE_STUDENTS.map((student) => (
                <tr key={student.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-400">
                          {student.name[0]}
                        </div>
                        <Circle 
                          size={12} 
                          className={`absolute bottom-0 right-0 fill-current border-2 border-zinc-900 ${
                            student.status === 'online' ? 'text-emerald-500' : 'text-yellow-500'
                          }`} 
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-100">{student.name}</p>
                        <p className="text-[10px] text-zinc-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-zinc-300 bg-zinc-800 px-2 py-1 rounded-md">
                      {student.course}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-48">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-400 italic">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <ExternalLink size={16} />
                      </button>
                      <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}