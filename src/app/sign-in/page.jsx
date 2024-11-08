import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 sm:px-6 lg:px-8">
            {/* Container */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md md:max-w-4xl flex flex-col md:flex-row">
                {/* Left Section */}
                <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
                    <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">Quora</h1>
                    <p className="text-gray-700 mb-4 text-sm sm:text-base">
                        A place to share knowledge and know the world better
                    </p>
                    <p className="text-gray-500 mb-6 text-xs sm:text-sm">
                        By continuing you agree to Quora's{" "}
                        <span className="text-blue-500 cursor-pointer">Terms of Use</span> and{" "}
                        <span className="text-blue-500 cursor-pointer">Privacy Policy</span>.
                    </p>

                    {/* Google Sign-Up Button */}
                    <button className="flex items-center justify-center w-full border rounded-md py-2 mb-4 text-gray-700 hover:bg-gray-100 transition duration-150">
                        <FcGoogle className="w-5 h-5 mr-2" />
                        <span className="text-sm sm:text-base">Continue with Google</span>
                    </button>

                    {/* GitHub Sign-Up Button */}
                    <button className="flex items-center justify-center w-full border rounded-md py-2 mb-4 text-gray-700 hover:bg-gray-100 transition duration-150">
                        <FaGithub className="w-5 h-5 mr-2 text-black" />
                        <span className="text-sm sm:text-base">Continue with GitHub</span>
                    </button>

                    {/* Signup with Email */}
                    <p className="text-gray-600 mt-4 text-center text-xs sm:text-sm">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="text-blue-500 cursor-pointer font-medium hover:underline">
                            Sign up with email
                        </Link>
                    </p>
                </div>

                {/* Divider */}
                <div className="hidden md:block border-l border-gray-300 mx-4"></div>

                {/* Right Section */}
                <form className="md:w-1/2">
                    <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Login</h2>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border rounded-md py-2 px-3 outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your password"
                        />
                    </div>
                    <p className="text-sm text-blue-500 cursor-pointer mb-4 hover:underline text-center md:text-left">
                        Forgot password?
                    </p>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150">
                        Login
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

export default LoginPage;