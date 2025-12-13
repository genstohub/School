"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RegisterPayload } from "@/api/auth";

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const register = auth?.register;

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Modals + verification flow
  const [showModal, setShowModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "sending" | "sent" | "verified" | "success"
  >("idle");

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(60);

  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });
  console.log("Auth:", auth);
console.log("Register function:", register);

  // Password validation
  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
    });
  }, [password]);

  // OTP countdown
  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (showModal && verificationStatus === "sent" && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [showModal, verificationStatus, timer]);

  // Auto-focus OTP
  useEffect(() => {
    if (showModal && verificationStatus === "sent") {
      setTimeout(() => inputsRef.current[0]?.focus(), 300);
    }
  }, [showModal, verificationStatus]);

  // SIGNUP HANDLER  ✅ CLEANED & FIXED
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!register) {
      setErrorModal({
        open: true,
        message: "Register function is not available. Make sure AuthProvider wraps this page.",
      });
      return;
    }

    if (!validations.length || !validations.uppercase || !validations.number) {
      setErrorModal({
        open: true,
        message: "Password does not meet all requirements.",
      });
      return;
    }

    try {
      const payload: RegisterPayload = { name, email, password };
      await register(payload);

      // Show success modal
      setShowModal(true);
      setVerificationStatus("success");

      // After 4 seconds → start verification process
      setTimeout(() => {
        setVerificationStatus("sending");
        setTimeout(() => {
          setVerificationStatus("sent");
          setTimer(60);
        }, 1000);
      }, 4000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setErrorModal({
        open: true,
        message: errorMessage,
      });
    }
  };

  // OTP handling
  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) inputsRef.current[index + 1]?.focus();

      if (newOtp.join("").length === 6) {
        setVerificationStatus("verified");
        setTimeout(() => router.push("/dashboard/students"), 1200);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(Array(6).fill(""));
    inputsRef.current[0]?.focus();
  };

  return (
    <section className="min-h-screen mt-16 w-full flex items-center justify-center bg-gray-50 px-6">
      <div className="flex flex-row justify-center items-center bg-white shadow-xl rounded-2xl overflow-hidden max-w-6xl w-full flex-wrap lg:flex-nowrap">
        
        {/* LEFT SIDE */}
        <div className="bg-[#073B4C] text-white flex flex-col justify-center items-center w-full lg:w-1/2 min-h-[500px] p-8">
          <h1 className="text-3xl font-bold mb-4">PREP CENTER</h1>
          <p className="text-xl font-semibold mb-2 text-center">Learn, Unlearn & Relearn!</p>
          <p className="text-center text-gray-200 mt-4 max-w-md text-sm leading-relaxed">
            “Prep Center provides all your learning needs — from resources to mentorship. Begin your success journey today.”
          </p>
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
                <li className={validations.length ? "text-green-600" : "text-gray-500"}>✔ At least 8 characters</li>
                <li className={validations.uppercase ? "text-green-600" : "text-gray-500"}>✔ One uppercase letter</li>
                <li className={validations.number ? "text-green-600" : "text-gray-500"}>✔ One number</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* OTP / Status Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center">
            {verificationStatus === "success" && (
              <p className="text-green-600 text-lg font-semibold">Registration Successful!</p>
            )}
            {verificationStatus === "sending" && (
              <>
                <p className="text-gray-700 text-lg font-semibold">Sending Verification Email...</p>
                <div className="mt-4 animate-spin border-4 border-blue-500 border-t-transparent w-10 h-10 rounded-full mx-auto"></div>
              </>
            )}
            {verificationStatus === "sent" && (
              <>
                <p className="text-gray-700 text-lg font-semibold">Enter 6-digit verification code</p>

                <div className="flex justify-center gap-2 mt-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputsRef.current[index] = el; }}
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
                  {timer > 0 ? `Resend available in ${timer}s` : (
                    <button onClick={handleResend} className="text-blue-600 font-medium">
                      Resend Code
                    </button>
                  )}
                </p>
              </>
            )}

            {verificationStatus === "verified" && (
              <>
                <p className="text-green-600 text-lg font-semibold">Email Verified Successfully!</p>
                <p className="text-gray-500 text-sm mt-2">Redirecting to your dashboard...</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ERROR MODAL */}
      {errorModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-sm rounded-2xl p-6 text-center shadow-xl">
            <p className="text-lg font-semibold text-red-600">Error</p>
            <p className="text-gray-700 mt-3">{errorModal.message}</p>

            <button
              onClick={() => setErrorModal({ open: false, message: "" })}
              className="mt-5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
