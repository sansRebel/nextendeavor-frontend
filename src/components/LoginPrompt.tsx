"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function LoginPrompt() {
  const { user } = useAuth();
  const [visible, setVisible] = useState(!user); 

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }}   
      transition={{ duration: 0.8, ease: "easeOut" }} 
      className="fixed top-16 right-6 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
    >
      {}
      <div className="absolute -top-2 right-6 sm:right-20 w-4 h-4 rotate-45 bg-black bg-opacity-70"></div>

      <span className="text-sm">Login to access full features!</span>

      <button
        className="text-white hover:text-gray-400 transition"
        onClick={() => setVisible(false)}
      >
        ✖
      </button>
    </motion.div>
  );
}
