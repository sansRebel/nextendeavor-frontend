"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/token";
import { HomeIcon, UserIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    setUser(getUserFromToken());
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
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 btn btn-primary px-4 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:bg-secondary"
            >
              <UserIcon className="w-5 h-5" />
              {user.name}
            </Link>
          ) : (
            <Link
              href="/profile"
              className="btn btn-primary px-4 py-2 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:bg-secondary"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
