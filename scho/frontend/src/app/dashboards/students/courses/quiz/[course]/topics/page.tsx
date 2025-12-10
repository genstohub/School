"use client";

import Link from "next/link";

const TopicsPage = () => {
  // You can later get this dynamically from the route
  const course = "mth101";

  const topics = [
    { id: "algebra", title: "Algebra Basics" },
    { id: "geometry", title: "Geometry Essentials" },
    { id: "calculus", title: "Introduction to Calculus" },
    { id: "statistics", title: "Basic Statistics" },
  ];

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-200 mb-6">
          Mathematics 101 – Course Topics
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t) => (
            <Link
              key={t.id}
              href={`/dashboards/students/courses/quiz/${course}/topics/${t.id}`}
              className="block bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-md hover:border-blue-400 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {t.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2">
                20 Questions • 5 Minutes
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicsPage;