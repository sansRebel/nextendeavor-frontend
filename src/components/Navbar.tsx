"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/token";
import { HomeIcon, UserIcon, InformationCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [isClient, setIsClient] = useState(false); // ✅ Ensure hydration works correctly

  useEffect(() => {
    setIsClient(true); // ✅ Indicate that the component is now running on the client
    setUser(getUserFromToken()); // ✅ Fetch user data only on the client
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-opacity-80 backdrop-blur-lg shadow-lg p-3 transition-all">
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* 🚀 Logo - Always #36A35E, Neon Glow on Hover */}
        <Link
          href="/"
          className="text-3xl font-bold text-primary hover:neon-text transition-transform hover:scale-105"
        >
          NextEndeavor
        </Link>

        {/* 🌎 Navigation Links */}
        <div className="flex items-center gap-6">
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
      </div>
    </nav>
  );
};

export default Navbar;
