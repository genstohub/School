"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔐 Backend hook goes here later
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email for this account and we’ll send you a reset link
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full border border-gray-300 rounded-lg px-3 py-3 bg-transparent outline-none focus:ring-2 focus:ring-sky-600"
                placeholder=" "
              />
              <label className="absolute left-3 top-3 text-sm text-gray-500 transition-all
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-gray-400
                peer-focus:-top-2
                peer-focus:text-xs
                peer-focus:text-sky-600
                bg-white px-1">
                Email address
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-700 text-white py-3 rounded-lg font-semibold hover:bg-sky-800 transition"
            >
              Send Reset Link
            </button>

            <button
              type="button"
              onClick={() => router.push("/signin")}
              className="w-full text-sm text-sky-600 hover:underline"
            >
              Back to Sign in
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-sky-800 font-medium">
              Reset link sent successfully
            </p>
            <p className="text-sm text-gray-600">
              Check your email and follow the instructions to reset your password.
            </p>
            <button
              onClick={() => router.push("/signin")}
              className="text-sky-600 hover:underline text-sm"
            >
              Return to Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
