// src/components/Navbar.tsx
"use client";

import Link from "next/link";
// import { useState, useEffect } from "react";

const Navbar = () => {



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
          <Link href="/profile" className="btn btn-primary">Login</Link>
        </div>

        {/* Dark Mode Toggle */}

      </div>
    </nav>
  );
};

export default Navbar;
