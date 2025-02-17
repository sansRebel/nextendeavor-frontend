"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/animations";
import { BriefcaseIcon, LightBulbIcon, ChartBarIcon, UsersIcon } from "@heroicons/react/24/solid";
import { FaEnvelope, FaLinkedin, FaInstagram } from "react-icons/fa";


export default function About() {
  return (
    <main className="container mx-auto px-6 py-16 max-w-4xl">
      
      <motion.section
        className="text-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-bold text-primary mt-10">About NextEndeavor</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          The job market is evolving faster than ever, and making <strong>informed career decisions</strong> has become more challenging.
          <span className="block mt-2">
            <strong>NextEndeavor</strong> is an AI-powered platform designed to bridge the gap between <strong>individual aspirations</strong> and <strong>real-world job opportunities</strong>. 
            Our technology analyzes your <strong>skills, interests, and industry trends</strong> to generate <strong>personalized career pathways</strong>, 
            helping you find fulfilling opportunities that align with <strong>your strengths and goals</strong>.
          </span>
        </p>
      </motion.section>

      <motion.section
        className="mt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="text-3xl font-semibold text-secondary" variants={fadeIn}>
          <LightBulbIcon className="w-8 h-8 inline-block mr-2 text-primary hover:text-[#5be440c7] transition duration-300 transform hover:scale-110" /> Mission
        </motion.h2>
        <motion.p className="text-gray-600 dark:text-gray-300 mt-4" variants={fadeIn}>
          Choosing a career isn’t just about getting a job—it’s about <strong>finding purpose, fulfillment, and stability</strong>. 
          We are committed to <strong>empowering individuals</strong> by providing <strong>data-driven career insights</strong> that make the decision-making process <strong>clear, simple, and effective</strong>.
          <span className="block mt-2">
            With so many career paths to choose from, it’s easy to feel <strong>lost or uncertain</strong>. Our goal is to <strong>simplify the journey</strong>, 
            giving you <strong>accurate, up-to-date insights</strong> that help you <strong>confidently</strong> navigate the job market and <strong>secure long-term success</strong>.
          </span>
        </motion.p>
      </motion.section>

      {/* 📊 How It Works */}
      <motion.section
        className="mt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="text-3xl font-semibold text-primary" variants={fadeIn}>
          <ChartBarIcon className="w-8 h-8 inline-block mr-2 text-secondary hover:text-[#5be440c7] transition duration-300 transform hover:scale-110" /> How It Works
        </motion.h2>
        <motion.p className="text-gray-600 dark:text-gray-300 mt-4" variants={fadeIn}>
          <strong>NextEndeavor</strong> uses a combination of <strong>machine learning, career analytics, and real-time job market data</strong> 
          to deliver <strong>precise and personalized</strong> career recommendations. 
          We take into account <strong>your skills, personality traits, market demand, and future industry trends</strong> to suggest career paths that maximize <strong>your success and satisfaction</strong>.
          <span className="block mt-2">
            Unlike traditional career tests that rely on <strong>static, outdated models</strong>, our AI continuously <strong>adapts and evolves</strong>, ensuring that your recommendations are 
            <strong>relevant, practical, and aligned with real-world opportunities</strong>.
          </span>
        </motion.p>
      </motion.section>

      {/* 👥 Who We Help */}
      <motion.section
        className="mt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="text-3xl font-semibold text-accent" variants={fadeIn}>
          <UsersIcon className="w-8 h-8 inline-block mr-2 text-primary hover:text-[#5be440c7] transition duration-300 transform hover:scale-110" /> Who It Helps
        </motion.h2>
        <motion.p className="text-gray-600 dark:text-gray-300 mt-4" variants={fadeIn}>
          <strong>NextEndeavor</strong> is designed for <strong>anyone looking for clarity in their career path</strong>. 
          Whether you are a <strong>student trying to decide on a major, a professional considering a career switch, or an experienced worker looking for better opportunities</strong>,
          our platform helps <strong>guide your next move with confidence</strong>.
          <span className="block mt-2">
            By integrating <strong>job market insights, required skills, and salary expectations</strong>, we provide a <strong>holistic career roadmap</strong> tailored to <strong>your unique strengths</strong>.
          </span>
        </motion.p>
      </motion.section>

      {/* 💼 Why Choose Us? */}
      <motion.section
        className="mt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="text-3xl font-semibold text-secondary" variants={fadeIn}>
          <BriefcaseIcon className="w-8 h-8 inline-block mr-2 text-accent hover:text-[#5be440c7] transition duration-300 transform hover:scale-110" /> Why Choose NextEndeavor?
        </motion.h2>
        <motion.p className="text-gray-600 dark:text-gray-300 mt-4" variants={fadeIn}>
          <strong>What makes us different?</strong> We provide <strong>real-time, data-driven career insights</strong> rather than relying on <strong>static, outdated career models</strong>. 
          Our approach is built on <strong>intelligent AI-based analysis</strong>, offering career guidance that is <strong>accurate, customized, and actionable</strong>.
          <span className="block mt-2">
            While traditional career tools <strong>assume</strong> job markets remain stable, we understand that industries change rapidly. 
            With our <strong>adaptive AI engine</strong>, you’ll always receive <strong>up-to-date</strong> career recommendations based on <strong>current</strong> labor trends.
          </span>
        </motion.p>
      </motion.section>

      {/* 📩 Get in Touch */}
      <motion.section
        className="mt-16 text-center"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Have questions or want to collaborate? Feel free to reach out!
        </p>
        <div className="flex justify-center gap-8">
          <a href="mailto:khaledalsinafi101@gmail.com" className="text-red-700 hover:text-red-500 transition duration-300 transform hover:scale-110">
            <FaEnvelope className="w-8 h-8" />
          </a>
          <a href="https://linkedin.com/in/khaled-al-sanafi-0251232a0" className="text-blue-700 hover:text-[#008bb5] transition duration-300 transform hover:scale-110">
            <FaLinkedin className="w-8 h-8" />
          </a>
          <a href="https://instagram.com/khaledalsanafi" className="text-pink-800 hover:text-[#E4405F] transition duration-300 transform hover:scale-110">
            <FaInstagram className="w-8 h-8" />
          </a>
        </div>
      </motion.section>
      
    </main>
  );
}
