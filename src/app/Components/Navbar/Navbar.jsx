"use client";
import Link from "next/link";
import { FiBell, FiGlobe, FiEdit3, FiUsers } from "react-icons/fi";
import { BsChevronDown, BsPlusCircle } from "react-icons/bs";
import { HiOutlineHome, HiOutlineSearch, HiOutlineArrowLeft } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ButtonAsChild } from "../ButtonAsChild/ButtonAsChild";

const Navbar = () => {
    const pathName = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const isActive = (path) => pathName === path;

    const session = useSession();
    // console.dir(session)
    console.log(session);

    return (
        <nav>
            {/* Mobile Navbar Section */}
            <div className="lg:hidden">
                {/* Mobile Top Bar */}
                <div className="bg-red-600 h-12 flex items-center justify-between px-4">
                    {/* Search Section */}
                    <div className="flex items-center text-white space-x-2">
                        <button onClick={() => setIsSearchOpen(true)} className="flex items-center space-x-2">
                            <HiOutlineSearch className="w-5 h-5" />
                            <span className="font-medium">Search</span>
                        </button>
                    </div>

                    {/* Logo Section */}
                    <div>
                        <Link href="/" className="text-2xl font-bold text-white">
                            Queora
                        </Link>
                    </div>

                    {/* Add Section */}
                    <div className="flex items-center text-white space-x-2">
                        <BsPlusCircle className="w-5 h-5" />
                        <span className="font-medium">Add</span>
                    </div>
                </div>

                {/* Mobile Full-Width Search Bar */}
                {isSearchOpen && (
                    <div className="absolute top-0 left-0 w-full h-12 bg-red-700 flex items-center px-4 shadow-md z-50">
                        <button onClick={() => setIsSearchOpen(false)} className="text-white">
                            <HiOutlineArrowLeft className="w-6 h-6" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search Quora"
                            className="flex-1 ml-2 py-1 px-4 bg-red-800 text-white rounded-md border-none outline-none"
                        />
                    </div>
                )}

                {/* Mobile Bottom Icon Bar */}
                <div className="flex justify-around bg-white border-t border-gray-200 py-2">
                    {/* Home Icon */}
                    <Link href="/">
                        <div className={`cursor-pointer ${isActive("/") ? "text-red-600" : "text-gray-600"}`}>
                            <HiOutlineHome className="w-6 h-6" />
                        </div>
                    </Link>

                    {/* Users Icon */}
                    <Link href="/users">
                        <div className={`cursor-pointer ${isActive("/users") ? "text-red-600" : "text-gray-600"}`}>
                            <FiUsers className="w-6 h-6" />
                        </div>
                    </Link>

                    {/* Edit Icon */}
                    <Link href="/edit">
                        <div className={`cursor-pointer ${isActive("/edit") ? "text-red-600" : "text-gray-600"}`}>
                            <FiEdit3 className="w-6 h-6" />
                        </div>
                    </Link>

                    {/* Bell Icon */}
                    <Link href="/notifications">
                        <div className={`cursor-pointer ${isActive("/notifications") ? "text-red-600" : "text-gray-600"}`}>
                            <FiBell className="w-6 h-6" />
                        </div>
                    </Link>

                    {/* Globe Icon */}
                    <Link href="/world">
                        <div className={`cursor-pointer ${isActive("/world") ? "text-red-600" : "text-gray-600"}`}>
                            <FiGlobe className="w-6 h-6" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Desktop Navbar Section */}
            <div className="hidden lg:flex">
                <div className="flex items-center h-16 max-w-7xl mx-auto">
                    {/* Left Section - Logo and Routes */}
                    <div className="flex-1 flex items-center">
                        {/* Logo */}
                        <Link href="/" className="text-3xl font-bold text-red-600 mr-10">
                            Queora
                        </Link>

                        {/* Routes */}
                        <Link
                            href="/"
                            className={`py-3 px-5 hover:bg-gray-200 cursor-pointer ${isActive("/") ? "border-b-2 border-red-500" : "border-0"}`}
                        >
                            <HiOutlineHome className={`w-6 h-6 ${isActive("/") ? "text-red-600" : "text-gray-600"}`} />
                        </Link>
                        <Link
                            href="/hello"
                            className={`py-3 px-5 hover:bg-gray-200 cursor-pointer ${isActive("/hello") ? "border-b-2 border-red-500" : "border-0"}`}
                        >
                            <FiUsers className={`w-6 h-6 ${isActive("/hello") ? "text-red-600" : "text-gray-600"}`} />
                        </Link>
                        <Link
                            href="/i"
                            className={`py-3 px-5 hover:bg-gray-200 cursor-pointer ${isActive("/i") ? "border-b-2 border-red-500" : "border-0"}`}
                        >
                            <FiEdit3 className={`w-6 h-6 ${isActive("/i") ? "text-red-600" : "text-gray-600"}`} />
                        </Link>
                        <Link
                            href="/d"
                            className={`py-3 px-5 hover:bg-gray-200 cursor-pointer ${isActive("/d") ? "border-b-2 border-red-500" : "border-0"}`}
                        >
                            <FiBell className={`w-6 h-6 ${isActive("/d") ? "text-red-600" : "text-gray-600"}`} />
                        </Link>
                    </div>

                    {/* Right Section - Search, Actions, Profile, and Add Question */}
                    <div className="flex items-center gap-3">
                        {/* Search Bar */}
                        <div className="relative flex items-center">
                            <HiOutlineSearch className="absolute left-3 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search Queora"
                                className="pl-10 pr-4 py-2 border rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        {/* Try Queora+ Button */}
                        <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
                            Try Queora+
                        </button>

                        {/* Profile Icon Placeholder */}
                        {/* <div className="w-8 h-8 bg-gray-300 rounded-full"></div> */}
                        {session?.data?.user?.image_url || session?.data?.user?.image && <img className="w-10 h-10 rounded-full border-gray-600 border-2" src={`${session?.data?.user?.image_url || session?.data?.user?.image}`} alt="profile image"/>}

                        {/* Add Question Button */}
                        {session?.status === 'authenticated' &&
                            <div className="relative">
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span>Add question</span>
                                    <BsChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        }
                        {/* Login button */}
                        <ButtonAsChild />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;