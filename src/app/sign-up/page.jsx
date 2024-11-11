"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useState } from "react";

const SignUpPage = () => {
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        try {
            setLoading(true);
            if (form.password.value.length < 6) {
                toast.error("Password must be at least 6 characters long.");
                setLoading(false);
                return;
            }

            const user = {
                name: form.name.value,
                userName: form.username.value,
                email: form.email.value,
                password: form.password.value
            };

            const response = await axios.post("http://localhost:3000/sign-up/api", user);
            if (response.status === 200) {
                event.target.reset();
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            {/* Container */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md md:max-w-4xl flex flex-col md:flex-row">
                {/* Left Section */}
                <div className="md:w-1/2 pr-8 mb-6 md:mb-0">
                    <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">Quora</h1>
                    <p className="text-gray-700 mb-4 text-sm sm:text-base">
                        Join Quora and share your knowledge with the world.
                    </p>
                    <p className="text-gray-500 mb-6 text-xs sm:text-sm">
                        By signing up you agree to Quora's{" "}
                        <span className="text-blue-500 cursor-pointer">Terms of Use</span> and{" "}
                        <span className="text-blue-500 cursor-pointer">Privacy Policy</span>.
                    </p>

                    {/* Google Sign-Up Button */}
                    <button className="flex items-center justify-center w-full border rounded-md py-2 mb-4 text-gray-700 hover:bg-gray-100 transition duration-150">
                        <FcGoogle className="w-5 h-5 mr-2" />
                        <span className="text-sm sm:text-base">Sign up with Google</span>
                    </button>

                    {/* GitHub Sign-Up Button */}
                    <button className="flex items-center justify-center w-full border rounded-md py-2 mb-4 text-gray-700 hover:bg-gray-100 transition duration-150">
                        <FaGithub className="w-5 h-5 mr-2 text-black" />
                        <span className="text-sm sm:text-base">Sign up with GitHub</span>
                    </button>

                    {/* Login Link */}
                    <p className="text-gray-600 mt-4 text-center text-xs sm:text-sm">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-blue-500 cursor-pointer font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Divider */}
                <div className="hidden md:block border-l border-gray-300 mx-4"></div>

                {/* Right Section */}
                <form onSubmit={handleSubmit} className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Sign Up</h2>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                            name="name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Choose a username"
                            name="username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your email"
                            name="email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                            name="password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                {/* SVG Spinner */}
                                <svg
                                    className="animate-spin h-5 w-5 text-white mr-2" // Changed color to white
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    ></path>
                                </svg>
                                Signing Up...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>
            </div>

            {/* Footer */}
            <div className="text-sm text-gray-500 mt-6">
                <p className="text-center">
                    About Us • Career Opportunities • Privacy • Terms • Contact • Languages • Press • © Quora, Inc. 2024
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;