"use client";

import React, { useRef, useState, useEffect } from "react";

interface OtpVerificationProps {
  length?: number; // default 6
  onChange?: (otp: string) => void; // returns concatenated OTP
  error?: boolean;
  disabled?: boolean;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  length = 6,
  onChange,
  error = false,
  disabled = false,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (onChange) onChange(updated.join(""));

    // Move to next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasted.length !== length) return;

    const newOtp = pasted.split("");
    setOtp(newOtp);
    if (onChange) onChange(pasted);

    // Focus last input
    inputsRef.current[length - 1]?.focus();
  };

  return (
    <div className="flex justify-center gap-2" role="group" aria-label="One-time password input">
      {otp.map((digit, i) => (
        <input
          key={i}
              ref={(el) => {
                  inputsRef.current[i] = el;
              }}
          value={digit}
          maxLength={1}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          aria-label={`Digit ${i + 1}`}
          className={`w-10 h-12 text-center text-lg rounded-lg outline-none border
            focus:ring-2 focus:ring-sky-600
            ${error ? "border-red-500" : "border-gray-300"}
          `}
        />
      ))}
    </div>
  );
};

export default OtpVerification;
