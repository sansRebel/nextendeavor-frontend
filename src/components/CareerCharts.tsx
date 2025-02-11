"use client";
import { useState } from "react";
import SalaryChart from "./SalaryChart";
import DemandGrowthChart from "./DemandGrowthChart";
import SkillMatchChart from "./SkillMatchChart";
import { Recommendation } from "@/types";
import { saveRecommendation } from "@/services/recServices";
import { useAuth } from "@/context/AuthContext"; // ✅ Import auth context

interface CareerChartsProps {
  recommendations: Recommendation[]; // ✅ Expect an array of recommendations
}

const CareerCharts: React.FC<CareerChartsProps> = ({ recommendations }) => {
  const { user } = useAuth(); // ✅ Check if user is authenticated

  console.log("Current user in CareerCharts:", user);


  return (
    <div className="space-y-8 mt-6">
      {recommendations.map((recommendation) => (
        <CareerChartCard key={recommendation.id} recommendation={recommendation} user={user} />
      ))}
    </div>
  );
};

// ✅ Separate CareerChartCard component for better modularity
const CareerChartCard = ({ recommendation, user }: { recommendation: Recommendation; user: unknown }) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // ✅ Tooltip state

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
    <div className="p-6 bg-gray-100 shadow-md rounded-lg relative">
      <h2 className="text-xl font-bold mb-4">{recommendation.title} - Career Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SalaryChart recommendation={recommendation} />
        <DemandGrowthChart recommendation={recommendation} />
        <SkillMatchChart recommendation={recommendation} />
      </div>

      {/* ✅ Save Button with Tooltip */}
      <div className="mt-4 flex justify-end relative">
        <button
          onClick={handleSave}
          disabled={user === null || saving || saved}
          onMouseEnter={() => !user && setShowTooltip(true)} // ✅ Show tooltip if not authenticated
          onMouseLeave={() => setShowTooltip(false)}
          className={`px-4 py-2 text-white rounded-md transition ${
            saved
              ? "bg-green-500 cursor-not-allowed"
              : !user
              ? "bg-gray-400 cursor-not-allowed" // ✅ Different color for disabled
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {saved ? "Saved" : saving ? "Saving..." : "Save Recommendation"}
        </button>

        {/* ✅ Tooltip (Only visible when user is not authenticated) */}
        {showTooltip && (
          <div className="absolute bottom-12 bg-black text-white text-sm px-3 py-1 rounded shadow-md">
            You need to be logged in to save recommendations.
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerCharts;
