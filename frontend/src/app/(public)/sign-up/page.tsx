"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";
import { allCourses, countryCode, REST_API } from "@/constants";
import { useLoggedIn, useUser, useUserType } from "@/hooks";
import { countries, schools } from "@/constants";
import { SignEmptyFillOut, SignError, SignLoading } from "@/components";

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
    [signError, setSignError] = useState(false),
    [emptBlackErr, setEmptyBlankErr] = useState(false);

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

  // Validating all credential to insure none is null
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

  // Simulate signup + email send
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (isAllCredentialsVerified()) {
      setLoading(true);
      await fetch(`${REST_API}/auth_create/create_account`, {
        method: "post",
        headers: { "content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((res) => {
          if (
            res.user.user_id
            // && res.emailVerification.status === "sent"
          ) {
            setUser(res.user);
            setUserType(res.user.role);
            // setShowModal(true);
            // setVerificationStatus("sent");
            setLoggedIn(true)
            router.replace(`/${res.user.role}s`);
            setLoading(false);
          }
          // else if (
          //   res.user.user_id &&
          //   res.emailVerification.status === "notsent"
          // ) {
          //   setSignError(true);
          //   setLoading(false);
          // }
          else {
            setLoading(false);
            setSignError(true);
          }
        })
        .catch(() => {
          setLoading(false);
          setSignError(true);
        });
    } else {
      setLoading(false);
      setEmptyBlankErr(true);
    }

    // setTimeout(() => {
    //   setVerificationStatus("sent");
    //   setTimer(60);
    // }, 2000);
  };

  const onPhoneNumberInput = (no: string) => {
    const isNumber = typeof Number(no) === "number" && !isNaN(Number(no));
    if (isNumber) setPhoneNumber(no);
  };

  const onPhoneCodeSelect = (e: string) => {
    setPhoneCode(e);
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
          router.push("/dashboards/students");
        }, 1000);
      }
    }
  };

  const onSignErrorRetryClick = (e: React.FormEvent) => {
    setLoading(false);
    setSignError(false)
    handleSignup(e);
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
      <div className="flex flex-row justify-center items-start bg-white shadow-xl rounded-2xl overflow-hidden max-w-6xl w-full flex-wrap lg:flex-nowrap">
        {/* LEFT SIDE */}
        <div className="bg-[#073B4C] text-white flex flex-col justify-center items-center w-full lg:w-1/2 min-h-[500px] p-8 lg:mt-16">
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

          <form
            // onSubmit={handleSignup}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="first name"
                className="w-1/2 m-2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="last name"
                className="w-1/2 m-2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@gmail.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="p-4">
              <label className="block text-sm font-medium mb-1">Sex</label>

              <div className="flex flex-row gap-5 ml-10">
                <div className="flex items-center gap-1">
                  <label className="font-medium text-xs" htmlFor="male">
                    Male
                  </label>
                  <input
                    onChange={(e) => setSex(e.target.value)}
                    value={"male"}
                    type="radio"
                    required
                    name="sexSelection"
                    id="male"
                    className="w-5 h-5 accent-emerald-500"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <label className="font-medium text-xs" htmlFor="female">
                    Female
                  </label>
                  <input
                    onChange={(e) => setSex(e.target.value)}
                    value={"female"}
                    type="radio"
                    name="sexSelection"
                    id="female"
                    required
                    className="w-5 h-5 accent-emerald-500"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <label className="font-medium text-xs" htmlFor="custom">
                    Custom
                  </label>
                  <input
                    onChange={(e) => setSex(e.target.value)}
                    value={"custom"}
                    type="radio"
                    name="sexSelection"
                    id="custom"
                    required
                    className="w-5 h-5 accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-1">
              <div className="p-4 w-8/12">
                <label className="block text-sm font-medium mb-1">
                  Select School
                </label>
                <select
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full  border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {schools.map((e, i) => (
                    <option key={i - 1} value={JSON.stringify(e)}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 w-6/12">
                <label className="block text-sm font-medium mb-1">
                  Select Country
                </label>
                <select
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {countries.map((country, i) => (
                    <option key={i - 1} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4">
              <label className="block text-sm font-medium mb-1">
                Select Department
              </label>
              <select
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {allCourses.map((e, i) => (
                  <option key={i - 1} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone number
              </label>
              <div className="border border-gray-300 outline-none rounded-md w-8/12 flex flex-nowrap">
                <select
                  onChange={(e) => onPhoneCodeSelect(e.target.value)}
                  className="w-28 border-none px-1 py-2 outline-none"
                >
                  {countryCode.map((e, i) => (
                    <option key={i - 1} value={e.phoneCode}>
                      {e.code}
                      {`(${e.phoneCode})`}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={phoneNumber}
                  maxLength={15}
                  onChange={(e) => onPhoneNumberInput(e.target.value)}
                  required
                  placeholder="0099028899"
                  className="w-11/12 gray-300 rounded-lg px-3 py-2 outline-none font-normal "
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
                placeholder="At least 8 chars, one capital & number"
                className={
                  passwordNotMatch
                    ? "w-full border border-red-600 rounded-lg px-3 py-2  outline-none"
                    : "w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                }
              />
              <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                placeholder="confirm password"
                className={
                  passwordNotMatch
                    ? "w-full border border-red-600 rounded-lg px-3 py-2  outline-none mt-2"
                    : "w-full border border-gray-300 rounded-lg px-3 py-2 outline-none mt-2"
                }
              />
              {passwordNotMatch && (
                <p className="font-black text-xs text-red-600 p-2">
                  password not matched
                </p>
              )}
              <ul className="mt-2 text-sm space-y-1">
                <li
                  className={
                    validations.length
                      ? "text-green-600 flex gap-2"
                      : "text-gray-500 flex gap-2"
                  }
                >
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    name="lengthValidation"
                    id="lengthValidation"
                    checked={validations.length}
                    className="passwordVerificationCheckbox"
                  />
                  {/* ✔ */}
                  At least 8 characters
                </li>
                <li
                  className={
                    validations.uppercase
                      ? "text-green-600 flex gap-2"
                      : "text-gray-500 flex gap-2"
                  }
                >
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    name="lengthValidation"
                    id="lengthValidation"
                    checked={validations.uppercase}
                    className="passwordVerificationCheckbox"
                  />
                  {/* ✔ */}
                  One uppercase letter
                </li>
                <li
                  className={
                    validations.number
                      ? "text-green-600 flex gap-2"
                      : "text-gray-500 flex gap-2"
                  }
                >
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    name="lengthValidation"
                    id="lengthValidation"
                    checked={validations.number}
                    className="passwordVerificationCheckbox"
                  />
                  {/* ✔ */}
                  One number
                </li>
              </ul>
            </div>

            <button
              // type="submit"
              onClick={handleSignup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
            >
              {loading ? <SignLoading /> : "Sign Up"}
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

      {signError && (
        <SignError
          err={"unable to connect"}
          solution={"check connection"}
          onEditClick={() => setSignError(false)}
          onRetryClick={onSignErrorRetryClick}
        />
      )}

      {emptBlackErr && (
        <SignEmptyFillOut onNoted={() => setEmptyBlankErr(false)} />
      )}

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
                      className="text-blue-600 font-medium text-xs"
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
