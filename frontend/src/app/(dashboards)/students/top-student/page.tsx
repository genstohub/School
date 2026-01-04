import React from 'react';
import { Users, ArrowLeft, Trophy, Medal } from 'lucide-react';
import Link from 'next/link';

const TopStudentsPage = () => {
  const students = [
    { rank: 1, name: "Sarah Jenkins", points: 2850, badge: "Gold", color: "text-yellow-400" },
    { rank: 2, name: "Michael Chen", points: 2720, badge: "Silver", color: "text-gray-300" },
    { rank: 3, name: "Amara Okafor", points: 2600, badge: "Bronze", color: "text-orange-400" },
    { rank: 4, name: "David Miller", points: 2450, badge: "Elite", color: "text-purple-400" },
    { rank: 5, name: "Elena Rodriguez", points: 2310, badge: "Elite", color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <Link href="/students" className="flex items-center gap-2 text-gray-400 hover:text-white mb-8">
        <ArrowLeft size={20} /> Back to Dashboard
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Trophy className="mx-auto text-yellow-400 mb-4" size={48} />
          <h1 className="text-4xl font-bold">Weekly Leaderboard</h1>
          <p className="text-gray-400 mt-2">Recognizing the top achievers from the past 7 days</p>
        </div>

        <div className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Badge</th>
                <th className="px-6 py-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {students.map((student) => (
                <tr key={student.rank} className="hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 font-bold">#{student.rank}</td>
                  <td className="px-6 py-4 font-medium">{student.name}</td>
                  <td className={`px-6 py-4 flex items-center gap-2 ${student.color}`}>
                    <Medal size={16} /> {student.badge}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-green-400">
                    {student.points.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopStudentsPage;