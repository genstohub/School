"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";
import { useLoggedIn, useUser, useUserType } from "@/hooks";
import { SignError, SignLoading } from "@/components";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [signError, setSignError] = useState({
    status: false,
    message: "",
    solution: "",
  });

  const { setUser } = useUser();
  const { setUserType } = useUserType();
  const { setLoggedIn } = useLoggedIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    login(formData)
      .then((res) => {
        if (res.user_id) {
          setUser(res);
          setUserType(res.role);
          setLoggedIn(true)
          setLoading(false);
          router.push("/students");
        } else if (res.err === "wrong credentials") {
          setLoading(false);
          setSignError({
            status: true,
            message: "Wrong Credentials",
            solution: "Please provide a valid login credentials and try again",
          });
        }
      })
      .catch(() => {
        setLoading(false);
        setSignError({
          status: true,
          message: "Unable to Sign In",
          solution:
            "Please check your internet connection as can't reach the server",
        });
      });
    // 🧠 Later this is where you'll integrate your backend login API
    // setTimeout(() => {
    //   setLoading(false);
    //   alert("Login successful!");
    //   router.push("/dashboard/students");
    // }, 2000);
  };

  const onRetryClick = (e: React.FormEvent) => {
    setLoading(false);
    setSignError({ status: false, message: "", solution: "" });
    handleSubmit(e);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
            Welcome Back 👋
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                aria-label="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                aria-label="password"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData.password}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              // type="submit"
              onClick={handleSubmit}
              // disabled={loading}
              className="w-full flex justify-center items-center bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
            >
              {loading ? <SignLoading /> : "sign in"}
            </button>
          </form>

          <p className="text-center text-sm mt-5">
            Don’t have an account?{" "}
            <a href="/sign-up" className="text-green-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
      {signError.status && (
        <SignError
          err={signError.message}
          solution={signError.solution}
          onEditClick={() =>
            setSignError({ status: false, message: "", solution: "" })
          }
          onRetryClick={(e:React.FormEvent)=>onRetryClick(e)}
        />
      )}
    </>
  );
};

export default SignInForm;
