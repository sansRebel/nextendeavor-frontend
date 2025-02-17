"use client";

import { useState } from "react";
import SalaryChart from "./SalaryChart";
import DemandGrowthChart from "./DemandGrowthChart";
import { Recommendation } from "@/types";
import { saveRecommendation } from "@/services/recServices";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // Import Next.js Router
import { motion } from "framer-motion";
import { BookmarkIcon, EyeIcon } from "@heroicons/react/24/solid";
import Toast from "./Toast";

interface CareerChartsProps {
  recommendations: Recommendation[];
}

const CareerCharts: React.FC<CareerChartsProps> = ({ recommendations }) => {
  const { user } = useAuth();
  const router = useRouter(); // ✅ Initialize router for navigation

  return (
    <div className="space-y-12 mt-8">
      {recommendations.map((recommendation) => (
        <CareerChartCard key={recommendation.id} recommendation={recommendation} user={user} router={router} />
      ))}
    </div>
  );
};

const CareerChartCard = ({
  recommendation,
  user,
  router,
}: {
  recommendation: Recommendation;
  user: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  router: any;
}) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);


  const handleSave = async () => {
    if (!user) return; // ✅ Ensure user is authenticated

    setSaving(true);
    try {
      await saveRecommendation(recommendation.id);
      setSaved(true);
      setToast({ message: "Recommendation saved successfully!", type: "success" });
    } catch (error) {
      console.error("Error saving recommendation:", error);
      setToast({ message: "Failed to save recommendation.", type: "error" });
    }
    setSaving(false);
  };

  const handleViewMore = () => {
    router.push(`/career/${recommendation.id}`); // ✅ Navigate to the correct page
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

      {/* ✅ Buttons Section */}
      <div className="mt-6 flex justify-center gap-4">
        <div className={`relative ${!user ? "tooltip tooltip-top" : ""}`} data-tip={!user ? "You must log in to save this recommendation." : ""}>
          <button
            onClick={handleSave}
            disabled={!user || saving || saved}
            className={`px-5 py-2 flex items-center gap-2 text-white rounded-md transition-all ${
              saved
                ? "bg-green-500 cursor-not-allowed"
                : !user
                ? "bg-gray-500 cursor-not-allowed opacity-50"
                : "bg-[#36a35e] hover:bg-[#2d8f52] transform hover:scale-105"
            }`}
          >
            <BookmarkIcon className="w-5 h-5" />
            {saved ? "Saved" : saving ? "Saving..." : "Save"}
          </button>
      </div>


        {/* View More Button */}
        <button
          onClick={handleViewMore} // ✅ Call the function before redirecting
          className="px-5 py-2 flex items-center gap-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700 transform hover:scale-105"
        >
          <EyeIcon className="w-5 h-5" />
          View More
        </button>
      </div>



      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </motion.div>
  );
};

export default CareerCharts;
