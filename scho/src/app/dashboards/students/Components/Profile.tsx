"use client";

import React from "react";

export default function Profile() {
  const studentName = "James Kuty"; // fetch from user data later

  return (
    <div className="flex flex-col  items-center bg-white shadow rounded-2xl p-4 w-full md:w-48">
      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
        Profile
      </div>
      <p className="text-gray-700 font-medium text-sm text-center">{studentName}</p>
    </div>
  );
}