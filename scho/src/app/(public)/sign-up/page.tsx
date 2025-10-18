"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showModal, setShowModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "sending" | "sent" | "verified"
  >("idle");
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);

  // Password validation dynamically
  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
  }, [password]);

  // ⏱ Countdown timer for resend
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (showModal && verificationStatus === "sent" && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [showModal, verificationStatus, timer]);

  // Auto-focus first OTP box when modal opens
  useEffect(() => {
    if (showModal && verificationStatus === "sent") {
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 300);
    }
  }, [showModal, verificationStatus]);

  // Simulate signup + email send
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validations.length || !validations.uppercase || !validations.number) {
      alert("Password does not meet all requirements.");
      return;
    }

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      alert("This email already exists. Please log in instead.");
      return;
    }

    // Save user locally
    const user = { name, email, role };
    localStorage.setItem(email, JSON.stringify(user));

    // Simulate sending email
    setShowModal(true);
    setVerificationStatus("sending");

    setTimeout(() => {
      setVerificationStatus("sent");
      setTimer(60);
    }, 2000);
  };

  // Handle OTP input + backspace navigation + auto verification
  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }

      // Auto verify when full
      if (newOtp.join("").length === 6) {
        setVerificationStatus("verified");
        setTimeout(() => {
          switch (role) {
            case "student":
              router.push("/dashboard/students");
              break;
            case "instructor":
              router.push("/dashboard/instructors");
              break;
            case "worker":
              router.push("/dashboard/workers");
              break;
            case "admin":
              router.push("/dashboard/admin");
              break;
          }
        }, 1000);
      }
    }
  };

  //Handle backspace to move focus backward
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Resend logic
  const handleResend = () => {
    setTimer(60);
    setOtp(Array(6).fill(""));
    alert("Verification code resent to your email!");
    inputsRef.current[0]?.focus();
  };

  return (
    <section className="min-h-screen mt-16 w-full flex items-center justify-center bg-gray-50 px-6">
      <div className="flex flex-row justify-center items-center bg-white shadow-xl rounded-2xl overflow-hidden max-w-6xl w-full flex-wrap lg:flex-nowrap">
        {/* LEFT SIDE */}
        <div className="bg-[#073B4C] text-white flex flex-col justify-center items-center w-full lg:w-1/2 min-h-[500px] p-8">
          <h1 className="text-3xl font-bold mb-4">PREP CENTER</h1>
          <p className="text-xl font-semibold mb-2 text-center">
            Learn, Unlearn & Relearn!
          </p>
          <p className="text-center text-gray-200 mt-4 max-w-md text-sm leading-relaxed">
            “Prep Center provides all your learning needs — from resources to
            mentorship. Begin your success journey today.”
          </p>
          <div className="mt-6 flex flex-col items-center">
            <div className="flex items-center justify-center w-14 h-14 bg-white text-[#073B4C] rounded-full font-bold text-2xl">
              📘
            </div>
            <p className="mt-3 text-gray-200 text-sm">
              Your Learning Journey Starts Here
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 8 chars, one capital & number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <ul className="mt-2 text-sm space-y-1">
                <li
                  className={
                    validations.length ? "text-green-600" : "text-gray-500"
                  }
                >
                  ✔ At least 8 characters
                </li>
                <li
                  className={
                    validations.uppercase ? "text-green-600" : "text-gray-500"
                  }
                >
                  ✔ One uppercase letter
                </li>
                <li
                  className={
                    validations.number ? "text-green-600" : "text-gray-500"
                  }
                >
                  ✔ One number
                </li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="worker">Worker</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
            >
              Sign Up
            </button>

            <div className="text-center mt-4 text-gray-600 text-sm">
              or sign up with
              <div className="flex justify-center gap-4 mt-2">
                <button
                  type="button"
                  className="border px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaGoogle className="text-red-500" />
                </button>
                <button
                  type="button"
                  className="border px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaXTwitter className="text-gray-800" /> 
                </button>
              </div>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/signin")}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* 🔵 EMAIL VERIFICATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center">
            {verificationStatus === "sending" && (
              <>
                <p className="text-gray-700 text-lg font-semibold">
                  Sending Verification Email...
                </p>
                <div className="mt-4 animate-spin border-4 border-blue-500 border-t-transparent w-10 h-10 rounded-full mx-auto"></div>
              </>
            )}

            {verificationStatus === "sent" && (
              <>
                <p className="text-gray-700 text-lg font-semibold">
                  Enter 6-digit verification code
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-10 h-10 border text-center text-lg rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {timer > 0 ? (
                    `Resend available in ${timer}s`
                  ) : (
                    <button
                      onClick={handleResend}
                      className="text-blue-600 font-medium"
                    >
                      Resend Code
                    </button>
                  )}
                </p>
              </>
            )}

            {verificationStatus === "verified" && (
              <>
                <p className="text-green-600 text-lg font-semibold">
                  Email Verified Successfully!
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Redirecting to your dashboard...
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}