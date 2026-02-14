import React from 'react';
import { Star, MessageSquare, BookOpen, MoreVertical } from 'lucide-react';

export default function MonitorInstructors() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Monitor Instructors</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instructor Card Example */}
        {[1, 2].map((i) => (
          <div key={i} className="bg-white border rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">DR</div>
                <div>
                  <h3 className="font-bold text-lg">Dr. Robert Fox</h3>
                  <p className="text-sm text-gray-500">Advanced Mathematics</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition"><MoreVertical size={20}/></button>
            </div>

            <div className="grid grid-cols-3 gap-2 py-4 border-y text-center">
              <div>
                <div className="text-sm text-gray-500">Rating</div>
                <div className="font-bold flex items-center justify-center gap-1">4.8 <Star size={14} className="fill-yellow-400 text-yellow-400" /></div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Students</div>
                <div className="font-bold">842</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Response</div>
                <div className="font-bold text-green-600">&lt; 2h</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                <MessageSquare size={16} /> Chat
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                <BookOpen size={16} /> Review Lessons
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}