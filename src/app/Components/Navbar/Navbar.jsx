"use client"; // Ensure client-side rendering in Next.js 13

import { useState } from 'react';
import Link from 'next/link';
import { FiHome, FiBell, FiGlobe, FiEdit3, FiUsers } from 'react-icons/fi'; 
import { BsPlus } from 'react-icons/bs'; // Plus icon for "Add" button
import { HiOutlineSearch } from 'react-icons/hi';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
        {/* website logo  */}
        <Link href='/' className="text-2xl font-bold text-red-600">Queora</Link>
        {/* website logo  */}
        
        {/* Routes  */}
        {/* Routes  */}
    </nav>
  );
}