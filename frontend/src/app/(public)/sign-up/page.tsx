"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { allCourses, countryCode, REST_API } from "@/constants";
import { useLoggedIn, useUser, useUserType } from "@/hooks";
import { countries, schools } from "@/constants";

export default function SignupPage() {
  const router = useRouter();

  const { setUser } = useUser();
  const { setUserType } = useUserType();
  const { setLoggedIn } = useLoggedIn();

  const [firstName, setFirstName] = useState(""),
    [lastName, setLastName] = useState(""),
    [sex, setSex] = useState(""),
    [country, setCountry] = useState(countries[0].code),
    [school, setSchool] = useState(schools[0].name),
    [department, setDepartment] = useState(allCourses[0]),
    [phoneNumber, setPhoneNumber] = useState(""),
    [phoneCode, setPhoneCode] = useState(countryCode[0].phoneCode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "sending" | "sent" | "verified"
  >("idle");
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  const [password1, setPassword1] = useState(""),
    [password2, setPassword2] = useState(""),
    [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);

  const [loading, setLoading] = useState(false),
    [pushError, setPushError] = useState({ status: false, message: "" });

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);

  // Password validation dynamically
  useEffect(() => {
    setValidations({
      length: password1.length >= 8,
      uppercase: /[A-Z]/.test(password1),
      number: /\d/.test(password1),
    });
  }, [password1]);

  useEffect(() => {
    if (password1 && !password2) return;
    if (password2 && !password1) {
      setPasswordNotMatch(true);
      return;
    }

    if (password1 !== password2) {
      setPasswordNotMatch(true);
      return;
    }

    if (
      password1 === password2 &&
      (!validations.length || !validations.number || !validations.uppercase)
    ) {
      setPasswordNotMatch(false);
      return;
    }
    if (
      password1 === password2 &&
      validations.length &&
      validations.number &&
      validations.uppercase
    ) {
      setPassword(password1);
      setPasswordNotMatch(false);
    } else {
      setPassword("");
    }
  }, [password1, password2, validations]);

  useEffect(() => {
    let countdown: NodeJS.Timeout;
    if (showModal && verificationStatus === "sent" && timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [showModal, verificationStatus, timer]);

  useEffect(() => {
    if (showModal && verificationStatus === "sent") {
      setTimeout(() => {
        inputsRef.current[0]?.focus();
      }, 300);
    }
  }, [showModal, verificationStatus]);

  const isAllCredentialsVerified = () => {
    if (
      firstName.length < 3 ||
      lastName.length < 3 ||
      email.length < 7 ||
      !email.includes("@") ||
      !email.includes(".") ||
      !password ||
      !phoneNumber
    ) {
      return false;
    } else return true;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      firstName,
      lastName,
      email,
      password,
      sex,
      country,
      school,
      department,
      phoneNumber: phoneCode + phoneNumber,
    };

    if (isAllCredentialsVerified())
      fetch(`${REST_API}/auth_create/create_account`, {
        method: "post",
        headers: { "content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.user?.user_id) {
            setUser(res.user);
            setUserType(res.user.role);
            setLoggedIn(true);
            router.replace(`/${res.user.role}s`);
            setLoading(false);
          } else {
            setLoading(false);
            setPushError({
              status: true,
              message: "There is an error creating account",
            });
          }
        });
    else {
      setPushError({
        status: true,
        message: "please make sure to fill all box correctly",
      });
      setLoading(false);
    }
  };

  const onPhoneNumberInput = (no: string) => {
    const isNumber = typeof Number(no) === "number" && !isNaN(Number(no));
    if (isNumber) setPhoneNumber(no);
  };

  const onPhoneCodeSelect = (e: string) => {
    setPhoneCode(e);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }

      if (newOtp.join("").length === 6) {
        setVerificationStatus("verified");
        setTimeout(() => {
          router.push("/dashboards/students");
        }, 1000);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    setOtp(Array(6).fill(""));
    alert("Verification code resent to your email!");
    inputsRef.current[0]?.focus();
  };

  /* OAuth handlers */
  const handleGoogleSignup = () => { window.location.href = `${REST_API}/auth/google`; };
  const handleAppleSignup = () => { window.location.href = `${REST_API}/auth/apple`; };

  return (
    <section className="min-h-screen pt-24 pb-12 w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col lg:flex-row justify-center items-stretch bg-white shadow-2xl rounded-3xl overflow-hidden max-w-6xl w-full">
        
        {/* LEFT SIDE (Hidden on small mobile if needed, but here styled for all) */}
        <div className="bg-sky-700 text-white flex flex-col justify-center items-center w-full lg:w-5/12 p-10">
          <h1 className="text-4xl font-black mb-4 tracking-tighter">BASE</h1>
          <p className="text-xl font-medium mb-2 text-center">Learn. Practice. Apply</p>
          <p className="text-center text-sky-100 mt-4 max-w-xs text-sm leading-relaxed opacity-90">
            “BASE provides all your learning needs from resources to mentorship. Begin your success journey to your mastery.”
          </p>
          <div className="mt-8 flex flex-col items-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl shadow-inner text-3xl">
              📘
            </div>
            <p className="mt-4 text-sky-100 text-xs font-semibold uppercase tracking-widest">
              Start Your Journey
            </p>
          </div>
        </div>
        
        {/* RIGHT SIDE */}
        <div className="w-full lg:w-7/12 p-6 md:p-12 bg-white">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-500 mb-8 text-sm">Join thousands of students globally</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="First name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Last name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sex</label>
              <div className="flex items-center gap-6 px-2">
                {["male", "female", "custom"].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      onChange={(e) => setSex(e.target.value)}
                      value={option}
                      type="radio"
                      required
                      name="sexSelection"
                      className="w-4 h-4 accent-sky-600"
                    />
                    <span className="text-sm font-medium text-gray-600 capitalize group-hover:text-sky-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">School</label>
                <select
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                >
                  {schools.map((e, i) => (
                    <option key={i} value={JSON.stringify(e)}>{e.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                <select
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none bg-white"
                >
                  {countries.map((country, i) => (
                    <option key={i} value={country.code}>{country.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
              <select
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none bg-white"
              >
                {allCourses.map((e, i) => (
                  <option key={i} value={e}>{e}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <div className="flex gap-2 border border-gray-300 rounded-xl px-2 overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 transition-all">
                <select
                  onChange={(e) => onPhoneCodeSelect(e.target.value)}
                  className="w-24 border-none py-3 outline-none bg-transparent font-medium text-sm"
                >
                  {countryCode.map((e, i) => (
                    <option key={i} value={e.phoneCode}>{e.code} ({e.phoneCode})</option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phoneNumber}
                  maxLength={15}
                  onChange={(e) => onPhoneNumberInput(e.target.value)}
                  required
                  placeholder="0099028899"
                  className="w-full py-3 outline-none font-normal"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Secure Password</label>
              <div className="space-y-3">
                <input
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  required
                  placeholder="Create password"
                  className={`w-full border rounded-xl px-4 py-3 outline-none transition-all ${passwordNotMatch ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-sky-500'}`}
                />
                <input
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                  placeholder="Confirm password"
                  className={`w-full border rounded-xl px-4 py-3 outline-none transition-all ${passwordNotMatch ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-sky-500'}`}
                />
              </div>
              
              {passwordNotMatch && <p className="text-xs text-red-600 mt-1 font-bold">Passwords do not match</p>}
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
                {[
                  { label: "8+ characters", met: validations.length },
                  { label: "Uppercase", met: validations.uppercase },
                  { label: "One number", met: validations.number }
                ].map((rule, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs font-medium ${rule.met ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${rule.met ? 'bg-green-100 border-green-500' : 'border-gray-300'}`}>
                      {rule.met && "✓"}
                    </div>
                    {rule.label}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full bg-sky-700 hover:bg-sky-800 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold tracking-widest">or continue with</span></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex items-center justify-center gap-3 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm"
              >
                <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width={18} height={18} />
                Google
              </button>
              <button
                type="button"
                onClick={handleAppleSignup}
                className="flex items-center justify-center gap-3 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm"
              >
                <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" width={16} height={16} />
                Apple
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 mt-10">
            Already have an account?{" "}
            <button onClick={() => router.push("/signin")} className="text-sky-700 font-bold hover:underline">Login</button>
          </p>
        </div>
      </div>

      {/* 🔵 EMAIL VERIFICATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-300">
            {verificationStatus === "sending" && (
              <div className="py-4">
                <p className="text-gray-900 text-xl font-bold">Verifying Details...</p>
                <div className="mt-6 animate-spin border-4 border-sky-600 border-t-transparent w-12 h-12 rounded-full mx-auto"></div>
              </div>
            )}

            {verificationStatus === "sent" && (
              <>
                <div className="text-4xl mb-4">📧</div>
                <p className="text-gray-900 text-xl font-bold">Check your email</p>
                <p className="text-gray-500 text-sm mt-2 mb-6">Enter the 6-digit code sent to your inbox</p>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputsRef.current[index] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-11 h-12 border border-gray-300 text-center text-xl font-bold rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                    />
                  ))}
                </div>
                <div className="mt-6">
                  {timer > 0 ? (
                    <p className="text-xs text-gray-400">Resend code in <span className="text-sky-600 font-bold">{timer}s</span></p>
                  ) : (
                    <button onClick={handleResend} className="text-sky-700 font-bold text-sm hover:underline">Resend Code</button>
                  )}
                </div>
              </>
            )}

            {verificationStatus === "verified" && (
              <div className="py-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">✓</div>
                <p className="text-gray-900 text-2xl font-bold">Verified!</p>
                <p className="text-gray-500 mt-2">Redirecting you to dashboard...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}