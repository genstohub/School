import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';

const tasks = [
  { id: '1', title: 'Verify Instructor ID', assignedBy: 'Admin Sarah', priority: 'High', status: 'Todo', due: 'Feb 15' },
  { id: '2', title: 'Moderate Community Post #42', assignedBy: 'Admin Mike', priority: 'Medium', status: 'In Progress', due: 'Feb 14' },
];

export default function TasksPage() {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Assigned Tasks</h1>
          <p className="text-gray-500">You have 3 tasks pending for today.</p>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="group bg-white border p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`mt-1 w-3 h-3 rounded-full ${task.priority === 'High' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
              <div>
                <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition">{task.title}</h4>
                <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><User size={12}/> {task.assignedBy}</span>
                  <span className="flex items-center gap-1"><Calendar size={12}/> Due {task.due}</span>
                  <span className="flex items-center gap-1 italic"><Tag size={12}/> {task.priority} Priority</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select className="text-sm bg-gray-50 border rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500">
                <option>Todo</option>
                <option selected>In Progress</option>
                <option>Completed</option>
              </select>
              <button className="bg-white border text-gray-700 px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-50">View Context</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}