"use client";

import React, { useEffect, useState } from "react";

export default function DateDisplay() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setDate(formatted);
  }, []);

  return (
    <div className="text-gray-600 mt-16 text-sm font-medium">
      {date}
    </div>
  );
}