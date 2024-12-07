"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useState } from "react";

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        const form = event.target;
        const full_name = form.full_name.value;
        const user_name = form.user_name.value;
        const email = form.email.value;
        const password = form.password.value;
        const imageLink = form.image.files[0];

        if (password.length < 6) {
            toast('Password must be at least 6 characters long.', {
                icon: '⚠️'
            });
            return;
        }
        if (imageLink) {
            const formData = new FormData();
            formData.append('image', imageLink);
            try {
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, formData)
                setImage(response?.data?.data?.display_url);
                // console.log(response?.data?.data?.display_url)
            } catch (error) {
                toast.error("Error uploading image.", { duration: 3000 });
                setLoading(false);
                return;
            }
        }
        const userInfo = {
            full_name: full_name,
            user_name: user_name,
            email: email,
            password: password,
            image_url: image
        };
        // console.log(userInfo)
        try {
            const response = await axios.post(`http://localhost:3000/sign-up/api`, userInfo);
            // console.log(response?.data?.status)
            if (response?.data?.status === 200) {
                setLoading(false)
                event.target.reset();
                toast.success(response?.data?.message, {
                    duration: 3000,
                })
            } else if (response?.data?.status === 400) {
                setLoading(false)
                toast(response?.data?.message, {
                    icon: '⚠️',
                    duration: 3000,
                })
            }
        } catch (error) {
            toast.error('Something went wrong, please try again later.', { duration: 3000 });
            setLoading(false);
        }
    }


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
                <form onSubmit={handleFormSubmit} className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Sign Up</h2>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                            name="full_name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Choose a username"
                            name="user_name"
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

                    {/* Image Input Field */}
                    <div className="flex flex-col space-y-2 mb-4">
                        <label className="text-sm font-medium text-gray-600">Profile Photo</label>
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                            <input
                                id="file-upload"
                                name="image"
                                type="file"
                            />
                        </div>
                        <p className="text-xs text-gray-500">
                            Please upload a clear photo of yourself (JPG, PNG - max 2MB). This will be used as your profile image.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent mr-2"></span>
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