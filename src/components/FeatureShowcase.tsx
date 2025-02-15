"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { radialProgress, fadeInUp } from "@/utils/animations";
import { AcademicCapIcon, ChartBarIcon, LightBulbIcon } from "@heroicons/react/24/solid"; // ✅ Heroicons added

const DynamicInfographic = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");

      // ✅ Animate percentage count from 0% to 87%
      let start = 0;
      const end = 87;
      const duration = 2000; // 2 seconds
      const intervalTime = Math.floor(duration / end);

      const counter = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(counter);
      }, intervalTime);
    }
  }, [isInView, controls]);

  return (
    <section className="relative py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* ✅ Dynamically Adapts to Light/Dark Mode */}
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-12"
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          ref={ref}
        >
          {/* 🔹 AI-Powered Career Matching Text */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-bold text-primary flex items-center gap-2">
              <LightBulbIcon className="w-8 h-8 text-primary" /> AI-Powered Career Matching
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              Our AI model analyzes <strong className="text-black dark:text-white">your skills, interests, and job market data</strong> to generate the best career recommendations.
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-lg">
              <li className="flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6 text-primary" />
                Matches <strong className="text-black dark:text-white">your top skills</strong> with high-demand careers
              </li>
              <li className="flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-primary" />
                Analyzes <strong className="text-black dark:text-white">interest compatibility</strong>
              </li>
              <li className="flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-primary" />
                Considers <strong className="text-black dark:text-white">industry growth projections</strong>
              </li>
            </ul>
          </motion.div>

          {/* 🔹 Animated Circular Progress Loader */}
          {/* 🔹 Animated Circular Progress Loader */}
          <motion.div
            className="relative flex flex-col items-center"
            // whileHover={{ scale: 1.05 }} // ✅ Entire component scales, text stays in place
          >
            <svg width="160" height="160" viewBox="0 0 100 100" className="transform -rotate-90">
              {/* 🟢 Background Circle (Static Gray) */}
              <circle cx="50" cy="50" r="45" stroke="gray" strokeWidth="6" fill="none" />

              {/* ✅ Animated Progress Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradientStroke)" // 🟢 Gradient Stroke
                strokeWidth="6"
                fill="none"
                strokeDasharray="113" // 🔥 Full circle length
                strokeDashoffset="113" // 🔥 Starts empty
                variants={radialProgress} // ✅ Animation
                initial="hidden"
                animate="visible"
                className="circular-progress"
              />

              {/* Gradient for Stroke Effect */}
              <defs>
                <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#36D399" />
                  <stop offset="100%" stopColor="#2DB872" />
                </linearGradient>
              </defs>
            </svg>

            {/* 🔥 Perfectly Centered Percentage Text */}
            <motion.span
              className="absolute flex items-center justify-center w-full h-full top-0 left-0 text-4xl font-bold text-black dark:text-white"
            >
              {count}%
            </motion.span>

            {/* ✅ Text Below Circle */}
            <p className="text-center text-gray-700 dark:text-gray-300 mt-3 text-lg">
              AI Confidence Score: <strong className="text-black dark:text-white">87% match</strong> based on your skills & interests.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default DynamicInfographic;
