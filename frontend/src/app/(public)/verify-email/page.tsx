"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { REST_API } from "@/constants";
import OtpVerification from "@/components/OtpVerification";

interface VerifyEmailPageProps {
  emailProp?: string;
}

export default function VerifyEmailPage({ emailProp }: VerifyEmailPageProps) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>([]);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [verified, setVerified] = useState(false);

  const email = emailProp || "";

  // Mask email safely
  const maskedEmail = email ? email.replace(/^(.).+(@.+)$/, "$1***$2") : "";

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Submit OTP
  const submitOtp = async (code: string) => {
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch(`${REST_API}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        setVerified(true);
        setTimeout(() => router.push("/signin"), 1500);
      } else {
        setError("Invalid verification code");
        setShake(true);
        setOtp([]);
        setTimeout(() => setShake(false), 400);
      }
    } catch {
      setError("Network error, please try again");
      setShake(true);
      setTimeout(() => setShake(false), 400);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!email) return;

    setTimer(60);
    setOtp([]);
    setError("");
    try {
      await fetch(`${REST_API}/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      setError("Failed to resend OTP, try again later");
    }
  };

  // Early return if email is missing
  if (!emailProp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <p className="text-red-600 text-center">
          Email not provided. Please go back and enter your email.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
        {!verified ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Verify Your Email
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter the 6-digit code sent to <br />
              <span className="font-medium">{maskedEmail}</span>
            </p>

            <div className={`${shake ? "animate-shake" : ""} mb-2`}>
              <OtpVerification
                length={6}
                error={!!error}
                onChange={(value) => {
                  setOtp(value.split(""));
                  setError("");
                  if (value.length === 6) submitOtp(value);
                }}
                disabled={loading}
              />
            </div>

            {error && <p className="text-sm text-red-600 mb-2" role="alert">{error}</p>}

            {timer > 0 ? (
              <p className="text-sm text-gray-500">Resend code in {timer}s</p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-sky-600 hover:underline"
                disabled={loading}
              >
                Resend code
              </button>
            )}
          </>
        ) : (
          <div className="p-6 bg-green-100 rounded-lg">
            <p className="text-sky-600 font-semibold text-lg mb-2">
              Email verified successfully ✔
            </p>
            <p className="text-gray-700 text-sm">
              Redirecting to login page...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
