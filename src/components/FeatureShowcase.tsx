"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { radialProgress, fadeInUp } from "@/utils/animations";

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
    <section className="relative py-16 bg-background">
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
            <h3 className="text-2xl font-semibold text-primary">AI-Powered Career Matching</h3>
            <p className="text-gray-400">
              Our AI model analyzes <strong>your skills, interests, and job market data</strong> to generate the best career recommendations.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li>✔ Matches <strong>your top skills</strong> with high-demand careers</li>
              <li>✔ Analyzes <strong>interest compatibility</strong></li>
              <li>✔ Considers <strong>industry growth projections</strong></li>
            </ul>
          </motion.div>

          {/* 🔹 Animated Circular Progress Loader */}
          <motion.div className="relative flex flex-col items-center">
            <svg width="140" height="140" viewBox="0 0 100 100" className="transform -rotate-90">
              {/* 🟢 Background Circle (Static Gray) */}
              <circle cx="50" cy="50" r="45" stroke="gray" strokeWidth="6" fill="none" />

              {/* ✅ Animated Progress Circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="var(--primary)" // 🟢 Green Stroke
                strokeWidth="6"
                fill="none"
                strokeDasharray="113" // 🔥 Full circle length
                strokeDashoffset="113" // 🔥 Controls animation (starts empty)
                variants={radialProgress} // ✅ Animates dynamically
                initial="hidden"
                animate="visible"
                className="circular-progress"
              />
            </svg>

            {/* 🔥 Percentage Text (Now Counts Up!) */}
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-black">
              {count}%
            </span>

            {/* ✅ Text Below Circle (Clarifies What 87% Means) */}
            <p className="text-center text-gray-400 mt-2">
              AI Confidence Score: <strong>87% match</strong> based on your skills & interests.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DynamicInfographic;
