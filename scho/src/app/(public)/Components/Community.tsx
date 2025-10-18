"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const departments = [
 "Fisheries",
"Animal science",
"Biochemistry",
"Botany",
"Zoology",
"Soil science",
"Crop and environmental protection",
"Crop production",
"Forestry",
"Agricultural business management",
"Agricultural economic extension",
"Agricultural science and education",
"Agriculture",
"Veterinary medicine",
"Agricultural engineering",
"Civil engineering",
"B.Sc industrial physics",
"B.Sc physics",
"B.Sc Mathematics",
"B.Sc Chemistry",
"B.Sc Statistics",
"B.Sc Computer science",
"Computer science education",
"Physics education",
"Integrated science education",
"Chemistry education",
"Biology education",
"Mathematics education",
"Statistics education",
"Food science and technology",
"Home science and management",
"Nutrition and Dietetics",
"Mechanical engineering",
"Electrical & electronic egineering",
];

export default function JoinCommunity() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(false);

  const filteredDepartments = departments.filter((dept) =>
    dept.toLowerCase().includes(search.toLowerCase())
  );

  const handleJoinRequest = () => {
    setSuccess(true);

    // Close modal after 2.5 seconds
    setTimeout(() => {
      setSuccess(false);
      setSelectedDept(null);
      setIsOpen(false);
    }, 2500);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Our Community</h2>
        <p className="text-gray-600 mb-8">
          Connect with peers, instructors, and professionals from your department.
        </p>

        {/* Trigger Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(true)}
          className="mx-auto w-72 p-6 bg-white shadow-md rounded-2xl cursor-pointer border hover:border-blue-500 transition"
        >
          <h3 className="text-xl font-semibold text-blue-600">Find Your Department</h3>
          <p className="text-gray-500 mt-2">Click to explore communities</p>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>

              {!selectedDept ? (
                <>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Choose Your Department
                  </h3>
                  <input
                    type="text"
                    placeholder="Search department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border rounded-lg mb-4"
                  />
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {filteredDepartments.map((dept) => (
                      <div
                        key={dept}
                        onClick={() => setSelectedDept(dept)}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-blue-50"
                      >
                        {dept}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Request to Join {selectedDept}
                  </h3>
                  <button
                    onClick={handleJoinRequest}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send Request
                  </button>

                  {/* Success Popup */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center"
                      >
                        Request Sent Successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}