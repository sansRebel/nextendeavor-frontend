"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveRecommendation } from "@/services/recServices";
import SalaryChart from "@/components/SalaryChart";
import DemandGrowthChart from "@/components/DemandGrowthChart";
import { Recommendation } from "@/types";
import { BookmarkIcon, ChartBarSquareIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/utils/animations";
import Toast from "@/components/Toast"; // ✅ Toast Notification Component

interface CareerClientProps {
  career: Recommendation;
}

export default function CareerClient({ career }: CareerClientProps) {
  const { user } = useAuth();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await saveRecommendation(career.id);
      setSaved(true);
      setToast({ message: "Recommendation saved successfully!", type: "success" });
    } catch (error) {
      console.error("Error saving recommendation:", error);
      setToast({ message: "Failed to save recommendation.", type: "error" });
    }
    setSaving(false);
  };

  return (
    <motion.section
      className="container mx-auto py-12 px-6 space-y-12"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Title & Description */}
      <motion.div
        className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 
                    p-10 rounded-xl shadow-xl text-center border border-gray-300 dark:border-gray-700"
        variants={fadeInUp}
      >
        <h1 className="text-5xl font-extrabold text-primary tracking-wide drop-shadow-md">
          {career.title}
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          {career.description}
        </p>
      </motion.div>

      {/* Save Recommendation Button */}
      <motion.div className="flex justify-center" variants={fadeInUp}>
        <button
          onClick={handleSave}
          disabled={!user || saving || saved}
          onMouseEnter={() => !user && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`px-5 py-2 flex items-center gap-2 text-white rounded-md transition-all ${
            saved
              ? "bg-green-500 cursor-not-allowed"
              : !user
              ? "bg-gray-500 cursor-not-allowed opacity-50"
              : "bg-[#36a35e] hover:bg-[#2d8f52] transform hover:scale-105"
          }`}
        >
          <BookmarkIcon className="w-6 h-6" />
          {saved ? "Saved" : saving ? "Saving..." : "Save Recommendation"}
        </button>

        {/* Tooltip for unauthenticated users */}
        {showTooltip && !user && (
          <div className="absolute mt-10 bg-black text-white text-sm px-3 py-1 rounded shadow-md">
            You must log in to save this recommendation.
          </div>
        )}
      </motion.div>

      {/* Career Stats */}
      <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center" variants={staggerContainer}>
        {[
          { icon: <BriefcaseIcon className="w-10 h-10 text-blue-500" />, label: "Industry", value: career.industry },
          { icon: <ArrowTrendingUpIcon className="w-10 h-10 text-green-500" />, label: "Demand", value: `${career.demand}/10` },
          { icon: <ChartBarSquareIcon className="w-10 h-10 text-purple-500" />, label: "Growth Potential", value: `${career.growthPotential}/10` },
          { icon: <CurrencyDollarIcon className="w-10 h-10 text-yellow-500" />, label: "Salary", value: career.salaryRange },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl shadow-lg flex flex-col items-center
                        bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900
                        transition-all duration-300 hover:scale-105 hover:shadow-xl"
            variants={fadeInUp}
          >
            <motion.div
              className="flex justify-center items-center p-3 rounded-full bg-white shadow-md dark:bg-gray-700"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {item.icon}
            </motion.div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 uppercase tracking-wide">{item.label}</p>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mt-2">{item.value}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills */}
      <motion.div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 
                    rounded-xl shadow-lg text-center" variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-primary">Required Skills</h2>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {career.requiredSkills.map((skill, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 text-sm font-semibold bg-primary text-black dark:text-white rounded-full 
                        shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              variants={fadeInUp}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Career Overview */}
      <motion.div className="mt-12 p-8 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 
                    backdrop-blur-lg rounded-xl shadow-xl" variants={fadeInUp}>
        <h2 className="text-3xl font-extrabold text-primary text-center tracking-wide">
          Career Overview
        </h2>

        <div className="text-gray-700 dark:text-gray-300 mt-6 leading-loose space-y-6 text-lg">
          {career.longDescription.split("\n\n").map((paragraph, index) => (
            <motion.p key={index} className="opacity-80 transition-opacity duration-500 hover:opacity-100" variants={fadeInUp}>
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div variants={fadeInLeft}>
          <SalaryChart recommendation={career} />
        </motion.div>
        <motion.div variants={fadeInRight}>
          <DemandGrowthChart recommendation={career} />
        </motion.div>
      </div>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </motion.section>
  );
}
