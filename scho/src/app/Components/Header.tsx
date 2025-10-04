'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // keeps menu mounted during fade-out

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  // Auto close after 3s
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (isOpen) {
      setIsVisible(true);
      timer = setTimeout(() => setIsOpen(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Unmount after fade-out
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (!isOpen && isVisible) {
      timer = setTimeout(() => setIsVisible(false), 300); // matches transition duration
    }
    return () => clearTimeout(timer);
  }, [isOpen, isVisible]);

  return (
    <header className="w-full bg-white flex items-center justify-between shadow-md fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex rounded items-center space-x-3 ml-2 sm:ml-4 md:ml-6">
        <Image
          src="/"
          alt="prep Logo"
          width={37}
          height={37}
          priority
        />
        <div className="ml-[-25px]">
          <h1 className="text-xl font-semibold text-gray-800 px-6 pr-30">PREP CENTER</h1>
          <p className="text-xs text-gray-500 pl-6 mb-2">Learn, Unlearn & Relearn</p>
        </div>
      </div>

      {/* Desktop Nav */}
      <nav className="mr-4">
        <ul className="hidden md:flex space-x-5 ml-2">
          <li><Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link></li>
          <li><Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link></li>
          <li><Link href="/services" className="text-gray-700 hover:text-sky-600">Services</Link></li>
          <li><Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link></li>
          <li><Link href="/faq" className="text-gray-700 hover:text-blue-600">FAQ</Link></li>
        </ul>
      </nav>

      {/* Mobile Toggle */}
      <div className="md:hidden mr-4">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isVisible && (
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg overflow-hidden
            transition-all duration-800 ease-in-out transform
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <Link href="/" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium">
            Home »
          </Link>
          <Link href="/about" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium">
            About »
          </Link>
          <Link href="/services" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium">
            Services »
          </Link>
          <Link href="/contact" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium">
            Contact »
          </Link>
          <Link href="/faq" onClick={closeMenu} className="block py-2 px-6 text-gray-800 hover:text-blue-600 font-medium">
            FAQ »
          </Link>
        </div>
      )}
    </header>
  );
}