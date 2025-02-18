"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/token";
import {
  HomeIcon,
  UserIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  BoltIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import LoginPrompt from "./LoginPrompt";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isClient, setIsClient] = useState(false); // ✅ Ensure hydration works correctly
  const [isOpen, setIsOpen] = useState(false); // ✅ Track if mobile menu is open

  useEffect(() => {
    setIsClient(true); // ✅ Indicate that the component is now running on the client
    setUser(getUserFromToken()); // ✅ Fetch user data only on the client
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-opacity-80 backdrop-blur-lg shadow-lg p-3 transition-all">
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* 🚀 Logo with Bolt Icon - Always #36A35E, Neon Glow on Hover */}
        <Link
          href="/"
          className="flex items-center gap-2 text-3xl font-bold text-primary hover:neon-text transition-transform hover:scale-105"
        >
          NextEndeavor
          <BoltIcon className="w-7 h-7 text-[#36A35E]" />

        </Link>

        {/* 🌎 Desktop Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary transition duration-300 transform hover:scale-105 hover:text-secondary"
          >
            <HomeIcon className="w-5 h-5 text-primary transition duration-300 transform hover:rotate-12" />
            Home
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 text-primary transition duration-300 transform hover:scale-105 hover:text-secondary"
          >
            <InformationCircleIcon className="w-5 h-5 text-primary transition duration-300 transform hover:rotate-12" />
            About
          </Link>

          {/* ✅ Ensure it only renders once we know we're on the client */}
          {isClient && (
            user ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 text-primary transition duration-300 transform hover:scale-105 hover:text-secondary"
              >
                <UserIcon className="w-5 h-5 text-primary transition duration-300 transform hover:rotate-12" />
                {user.name}
              </Link>
            ) : (
              /* ✅ Regular Styled Login Button with Green Background */
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-[#36A35E] text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:bg-[#2d8f52]"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                Login
              </Link>
            )
          )}
        </div>

        {/* 🍔 Mobile Hamburger Menu Button (Visible on Small Screens) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary focus:outline-none"
        >
          {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
        </button>
      </div>

      {/* 📱 Mobile Navigation Menu (Toggles Open/Closed) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white bg-opacity-95 shadow-md transition-all">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary transition duration-300 transform hover:scale-105 hover:text-secondary"
              onClick={() => setIsOpen(false)}
            >
              <HomeIcon className="w-5 h-5 text-primary" />
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 text-primary transition duration-300 transform hover:scale-105 hover:text-secondary"
              onClick={() => setIsOpen(false)}
            >
              <InformationCircleIcon className="w-5 h-5 text-primary" />
              About
            </Link>

            {isClient && (
              user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-primary transition duration-300 transform hover:scale-105 hover:text-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  <UserIcon className="w-5 h-5 text-primary" />
                  {user.name}
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 bg-[#36A35E] text-white font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:bg-[#2d8f52]"
                  onClick={() => setIsOpen(false)}
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      )}
          {!user && <LoginPrompt />}

    </nav>    
  );
};

export default Navbar;
