"use client";

import { useState } from "react";
import SalaryChart from "./SalaryChart";
import DemandGrowthChart from "./DemandGrowthChart";
import { Recommendation } from "@/types";
import { saveRecommendation } from "@/services/recServices";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { BookmarkIcon } from "@heroicons/react/24/solid";

interface CareerChartsProps {
  recommendations: Recommendation[];
}

const CareerCharts: React.FC<CareerChartsProps> = ({ recommendations }) => {
  const { user } = useAuth();
  console.log("Auth User:", user); // 🛠️ Debugging - Check the user state

  return (
    <div className="space-y-12 mt-8">
      {recommendations.map((recommendation) => (
        <CareerChartCard key={recommendation.id} recommendation={recommendation} user={user} />
      ))}
    </div>
  );
};

const CareerChartCard = ({ recommendation, user }: { recommendation: Recommendation; user: unknown }) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSave = async () => {
    if (!user) return; // ✅ Ensure user is authenticated

    setSaving(true);
    try {
      await saveRecommendation(recommendation.id);
      setSaved(true);
    } catch (error) {
      console.error("Error saving recommendation:", error);
    }
    setSaving(false);
  };

  return (
    <motion.div
      className="p-8 bg-gray-200 dark:bg-gray-900 shadow-lg rounded-xl relative text-black dark:text-white flex flex-col items-center text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 🔹 Career Title & Description - Fully Centered */}
      <div className="mb-6 w-full">
        <h2 className="text-2xl font-bold text-primary">{recommendation.title}</h2>
        <p className="text-black dark:text-gray-300 mt-2">{recommendation.description}</p>
      </div>

      {/* 📊 Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <SalaryChart recommendation={recommendation} />
        <DemandGrowthChart recommendation={recommendation} />
      </div>

      {/* ✅ Save Button with Tooltip */}
      <div className="mt-6 flex justify-center relative">
        <button
          onClick={handleSave}
          disabled={!user || saving || saved} // ✅ Ensures button is disabled if user is null
          onMouseEnter={() => !user && setShowTooltip(true)} // ✅ Show tooltip if not authenticated
          onMouseLeave={() => setShowTooltip(false)}
          className={`px-5 py-2 flex items-center gap-2 text-white rounded-md transition-all ${
            saved
              ? "bg-green-500 cursor-not-allowed"
              : !user
              ? "bg-gray-500 cursor-not-allowed opacity-50"
              : "bg-[#36a35e] hover:bg-[#2d8f52] transform hover:scale-105"
          }`}
        >
          <BookmarkIcon className="w-5 h-5" />
          {saved ? "Saved" : saving ? "Saving..." : "Save Recommendation"}
        </button>

        {/* ✅ Tooltip (Only visible when user is not authenticated) */}
        {showTooltip && !user && (
          <div className="absolute bottom-12 bg-black text-white text-sm px-3 py-1 rounded shadow-md">
            You must log in to save this recommendation.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CareerCharts;
