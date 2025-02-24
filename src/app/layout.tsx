"use client";

import "./globals.css";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.add(storedTheme);  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/bolt.ico" type="image/x-icon" />
      </head>
      <body className="dark flex flex-col min-h-screen">
        <AuthProvider> 
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
