"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="relative mt-15 flex justify-end w-full md:w-auto">
      {/* Search button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
          aria-label="Open search"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Animated search input */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="search"
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute right-0 top-0 flex items-center bg-white shadow rounded-full px-3 py-2 w-full sm:w-64 md:w-72"
          >
            <Search className="w-5 h-5 text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none flex-1 text-sm text-gray-700"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={() => setOpen(false)}
              className="ml-2 text-gray-500 hover:text-gray-700"
              aria-label="Close search"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}