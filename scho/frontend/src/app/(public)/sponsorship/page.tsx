"use client";

import { useState } from "react";
import { FaUser, FaUsers, FaUniversity, FaBuilding } from "react-icons/fa";

export default function SponsorshipPage() {
  const [sponsorshipType, setSponsorshipType] = useState<string | null>(null);
  const [numPeople, setNumPeople] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const prices: Record<string, number> = {
    Individual: 3000,
    Group: 20000,
    Department: 100000,
    Institution: 1.500000,
  };

  const descriptions: Record<string, string> = {
    Individual:
      "Sponsor a single learner and make a direct, life-changing impact on their education and future.",
    Group:
      "Support a group of learners together, helping them access training, resources, and mentorship.",
    Department:
      "Fund a department’s growth, ensuring a wide range of students benefit from modern tools and knowledge.",
    Institution:
      "Sponsor an entire institution, creating long-term impact and improving opportunities for a large community.",
  };

  const calculateAmount = () => {
    if (sponsorshipType) {
      const base = prices[sponsorshipType] || 0;
      return base * numPeople;
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAmount(calculateAmount());
    setShowModal(false);
    setSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b mt-20 from-white to-gray-100 p-6 relative">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
        Sponsorship Opportunities
      </h1>

      {/* Comprehensive Note */}
      <p className="text-center text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
        Sponsorship is more than financial support — it is a commitment to
        shaping lives, building futures, and creating lasting impact. By
        sponsoring, you directly contribute to providing access to education,
        skill development, and growth opportunities for learners, institutions,
        and communities.
        <br />
        <br />
        Please take a moment to review the categories below and select the
        option that best represents your intended sponsorship. Once selected,
        you will be able to indicate the number of people, choose your preferred
        currency, and view the estimated sponsorship amount.
      </p>

      {/* Quick Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-3xl mx-auto mb-10 shadow-sm">
        <h2 className="text-xl font-semibold text-blue-700 mb-3">
          Quick Guide to Sponsorship
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            Select a sponsorship category below (Individual, Group, Department,
            or Institution).
          </li>
          <li>Indicate the number of people or scale of sponsorship.</li>
          <li>Choose your preferred currency from the dropdown.</li>
          <li>Review the estimated amount displayed automatically.</li>
          <li>Proceed to confirm your sponsorship details.</li>
        </ul>
      </div>

      {/* Sponsorship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { type: "Individual", icon: <FaUser size={30} /> },
          { type: "Group", icon: <FaUsers size={30} /> },
          { type: "Department", icon: <FaBuilding size={30} /> },
          { type: "Institution", icon: <FaUniversity size={30} /> },
        ].map((item) => (
          <div
            key={item.type}
            onClick={() => {
              setSponsorshipType(item.type);
              setShowModal(true);
            }}
            className={`cursor-pointer rounded-2xl shadow-md p-6 flex flex-col items-center justify-center transition transform hover:scale-105 ${
              sponsorshipType === item.type && showModal
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {item.icon}
            <h2 className="text-lg font-semibold mt-2">{item.type}</h2>
            <p className="text-sm text-center mt-2 opacity-80">
              {descriptions[item.type]}
            </p>
          </div>
        ))}
      </div>

      {/* Sponsorship Modal */}
      {showModal && sponsorshipType && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
              {sponsorshipType} Sponsorship
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {descriptions[sponsorshipType]}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">
                  Number of People
                </label>
                <input
                  type="number"
                  min="1"
                  value={numPeople}
                  onChange={(e) => setNumPeople(Number(e.target.value))}
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border p-3 rounded-lg"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="NGN">NGN (₦)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Estimated Amount
                </label>
                <p className="text-lg font-bold text-blue-700">
                  {currency} {calculateAmount().toLocaleString()}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Confirm Sponsorship
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Sponsorship Confirmed!
            </h2>
            <p className="text-gray-700 mb-4">
              Thank you for sponsoring <b>{numPeople}</b>{" "}
              {sponsorshipType?.toLowerCase()}(s).
            </p>
            <p className="text-lg font-semibold mb-6">
              Total: {currency} {amount.toLocaleString()}
            </p>
            <button
              onClick={() => setSuccessModal(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}