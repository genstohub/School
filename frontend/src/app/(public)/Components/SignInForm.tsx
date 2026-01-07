"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Added for high-quality icons
import { login } from "@/api/auth";
import { useLoggedIn, useUser, useUserType } from "@/hooks";
import { SignError, SignLoading } from "@/components";
import { REST_API } from "@/constants"; // Ensure REST_API is imported

const SignInForm: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [signError, setSignError] = useState({
        status: false,
        message: "",
        solution: ""
    });

    const { setUser } = useUser();
    const { setUserType } = useUserType();
    const { setLoggedIn } = useLoggedIn();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        login(formData)
            .then(res => {
                if (res.user_id) {
                    setUser(res);
                    setUserType(res.role);
                    setLoggedIn(true);
                    setLoading(false);
                    router.push("/students");
                } else if (res.err === "wrong credentials") {
                    setLoading(false);
                    setSignError({
                        status: true,
                        message: "Wrong Credentials",
                        solution:
                            "Please provide valid login credentials and try again"
                    });
                }
            })
            .catch(() => {
                setLoading(false);
                setSignError({
                    status: true,
                    message: "Unable to Sign In",
                    solution:
                        "Please check your internet connection as we can't reach the server"
                });
            });
    };

    /* OAuth handlers */
    const handleGoogleSignIn = () => {
        window.location.href = `${REST_API}/auth/google`;
    };

    const handleAppleSignIn = () => {
        window.location.href = `${REST_API}/auth/apple`;
    };

    const onRetryClick = (e: React.FormEvent) => {
        setLoading(false);
        setSignError({ status: false, message: "", solution: "" });
        handleSubmit(e);
    };

    return (
        <>
            <div className="flex justify-center mt-12 items-center min-h-screen bg-gray-50 px-4 py-10">
                <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Welcome Back 👋
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            Please enter your details
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                aria-label="email"
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                onChange={handleChange}
                                value={formData.email}
                                required
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                aria-label="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                value={formData.password}
                                required
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-600 transition-all"
                            />
                        </div>

                        <div className="text-right w-full">
                            <button
                                type="button"
                                onClick={() => router.push("/forgot-password")}
                                className="text-sky-700 text-sm font-bold hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center bg-sky-700 text-white p-4 rounded-xl font-bold hover:bg-sky-800 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
                        >
                            {loading ? <SignLoading /> : "Sign In"}
                        </button>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">
                                    or continue with
                                </span>
                            </div>
                        </div>

                        {/* Social Buttons Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="flex items-center justify-center gap-3 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm"
                            >
                                <Image
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                    alt="Google"
                                    width={18}
                                    height={18}
                                />
                                Google
                            </button>

                            <button
                                type="button"
                                onClick={handleAppleSignIn}
                                className="flex items-center justify-center gap-3 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all font-semibold text-gray-700 shadow-sm"
                            >
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                                    alt="Apple"
                                    width={16}
                                    height={16}
                                />
                                Apple
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-10">
                        Don’t have an account?{" "}
                        <button
                            onClick={() => router.push("/sign-up")}
                            className="text-sky-700 font-bold hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>

            {signError.status && (
                <SignError
                    err={signError.message}
                    solution={signError.solution}
                    onEditClick={() =>
                        setSignError({
                            status: false,
                            message: "",
                            solution: ""
                        })
                    }
                    onRetryClick={(e: React.FormEvent) => onRetryClick(e)}
                />
            )}
        </>
    );
};

export default SignInForm;
