"use client";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import GoogleAndGithub from "../Components/LoginButton/GoogleAndGithub";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
    
        const { full_name, user_name, email, password, image } = data;
    
        // Validate password length
        if (password.length < 6) {
            toast('Password must be at least 6 characters long.', {
                icon: '⚠️'
            });
            setLoading(false);
            return;
        }
    
        let imageUrl = '';
    
        // Upload image if provided
        if (image && image[0]) {
            const formData = new FormData();
            formData.append('image', image[0]); // React Hook Form uses array for file inputs
            try {
                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    formData
                );
                imageUrl = response?.data?.data?.display_url;
            } catch (error) {
                toast.error("Error uploading image.", { duration: 3000 });
                setLoading(false);
                return;
            }
        }
    
        // Prepare user data
        const userInfo = {
            full_name,
            user_name,
            email,
            password,
            image_url: imageUrl,
        };
    
        // Submit user info
        try {
            const response = await axios.post(`http://localhost:3000/sign-up/api`, userInfo);
            if (response?.data?.status === 200) {
                setLoading(false);
                reset();
                signOut()
                router.push('/sign-in');
                // console.log('redirect');
                toast.success(response?.data?.message, { duration: 3000 });
            } else if (response?.data?.status === 400) {
                setLoading(false);
                toast(response?.data?.message, {
                    icon: '⚠️',
                    duration: 3000,
                });
            }
        } catch (error) {
            toast.error('Something went wrong, please try again later.', { duration: 3000 });
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
                        By signing up you agree to Quora&apos;s{" "}
                        <span className="text-blue-500 cursor-pointer">Terms of Use</span> and{" "}
                        <span className="text-blue-500 cursor-pointer">Privacy Policy</span>.
                    </p>

                    {/* Google and Github Sign-Up Button */}
                    <GoogleAndGithub />

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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Sign Up</h2>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                            name="full_name"
                            {...register("full_name", { required: "Full name is required" })}
                        />
                        {errors.full_name && (
                            <span className="text-red-500 text-sm pt-1">
                                {errors.full_name.message}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Choose a username"
                            name="user_name"
                            {...register("user_name", { required: "Username is required" })}
                        />
                        {errors.user_name && (
                            <span className="text-red-500 text-sm pt-1">
                                {errors.user_name.message}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">E-mail</label>
                        <input
                            type="email"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your e-mail"
                            name="email"
                            {...register("email", { required: "E-mail is required" })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm pt-1">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Create a password"
                            name="password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm pt-1">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Image Input Field */}
                    <div className="flex flex-col space-y-2 mb-4">
                        <label className="text-sm font-medium text-gray-600">Profile Photo</label>
                        <div className="flex flex-col justify-start items-start space-x-2 border border-gray-300 rounded-md px-3 py-2 bg-gray-50">
                            <input
                                id="file-upload"
                                name="image"
                                type="file"
                                {...register("image", { required: "Image is required" })}
                            />
                            {errors.image && (
                                <span style={{ marginLeft: "0px" }} className="text-red-500 text-sm pt-1">
                                    {errors.image.message}
                                </span>
                            )}
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