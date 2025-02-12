"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp, fadeInLeft, fadeInRight, fadeOutDown, fadeOutLeft, fadeOutRight } from "@/utils/animations";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) setScrollDirection("down");
      else setScrollDirection("up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[160vh] flex flex-col items-center justify-center text-foreground overflow-hidden">
      {/* 🎥 Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero_video.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* 🔥 Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* 🌟 Main Hero Content */}
      <motion.div
        className="text-center px-6 z-10 max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* 1️⃣ Typing Effect */}
        <h1 className="text-5xl md:text-6xl font-bold font-poppins leading-tight text-white">
          <TypeAnimation
            sequence={[
              "Discover Your Next Career Move",
              2000,
              "Let AI Guide Your Career Path",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h1>

        <p className="py-4 text-lg md:text-xl text-gray-300">
          Let AI guide you towards the perfect career path based on your skills and interests.
        </p>

        {/* 🚀 2️⃣ Call-to-Action Button with Glow & Ripple Effect */}
        <Link href="/profile">
          <motion.button
            className="relative overflow-hidden px-6 py-3 rounded-lg bg-[#22c55e] hover:bg-green-500 text-white text-lg shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            whileHover={{ scale: 1.05 }}
          >
            Get Started →
            <span className="absolute inset-0 bg-white opacity-20 scale-0 transition-transform duration-500 rounded-full hover:scale-150"></span>
          </motion.button>
        </Link>
      </motion.div>

      {/* 3️⃣ Extra Animated Content Appearing as You Scroll */}
      <div className="absolute bottom-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "AI-Powered Guidance",
            description: "Personalized career recommendations based on your skills.",
            animation: fadeInLeft,
            reverseAnimation: fadeOutLeft,
          },
          {
            title: "Industry Insights",
            description: "Data-driven insights into career demand & growth.",
            animation: fadeInUp,
            reverseAnimation: fadeOutDown,
          },
          {
            title: "Seamless User Experience",
            description: "A smooth and easy-to-use platform for quick, accurate suggestions.",
            animation: fadeInRight,
            reverseAnimation: fadeOutRight,
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="w-72 p-6 bg-base-200 bg-opacity-50 backdrop-blur-md rounded-xl shadow-lg text-center border border-gray-600"
            initial="hidden"
            animate={scrollDirection === "down" ? "visible" : "hidden"}
            variants={scrollDirection === "down" ? card.animation : card.reverseAnimation}
          >
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-sm text-gray-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
