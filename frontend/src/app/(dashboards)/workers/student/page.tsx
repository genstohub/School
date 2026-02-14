import React from 'react';
import { Search, Filter, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  lastActive: string;
  status: 'On Track' | 'At Risk' | 'Inactive';
}

const students: Student[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', course: 'React Mastery', progress: 85, lastActive: '2 mins ago', status: 'On Track' },
  { id: '2', name: 'Sarah Smith', email: 'sarah@example.com', course: 'UI/UX Design', progress: 12, lastActive: '4 days ago', status: 'At Risk' },
];

export default function MonitorStudents() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Monitor Students</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Export Report</button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Students" value="1,284" icon={<CheckCircle className="text-green-500" />} />
        <StatCard title="At Risk" value="42" icon={<AlertCircle className="text-red-500" />} />
        <StatCard title="Avg. Progress" value="68%" icon={<Clock className="text-blue-500" />} />
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search students..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <select className="border rounded-lg px-4 py-2 outline-none">
          <option>All Statuses</option>
          <option>At Risk</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Student Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Student</th>
              <th className="p-4 font-semibold text-gray-600">Progress</th>
              <th className="p-4 font-semibold text-gray-600">Last Active</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="font-medium">{student.name}</div>
                  <div className="text-xs text-gray-500">{student.email}</div>
                </td>
                <td className="p-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 w-32">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{student.progress}%</span>
                </td>
                <td className="p-4 text-sm text-gray-600">{student.lastActive}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    student.status === 'On Track' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 hover:underline text-sm font-medium">Message</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
    </div>
  );
}