"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/token";

const Navbar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    setUser(getUserFromToken()); // Extract user info from localStorage
  }, []);

  return (
    <nav className="navbar bg-base-200 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          NextEndeavor
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <Link href="/" className="btn btn-ghost">Home</Link>
          <Link href="/about" className="btn btn-ghost">About</Link>
          {user ? (
            <Link href="/profile" className="btn btn-primary">{user.name}</Link>
          ) : (
            <Link href="/profile" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
