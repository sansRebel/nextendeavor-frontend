"use client";
import SalaryChart from "./SalaryChart";
import DemandGrowthChart from "./DemandGrowthChart";
import SkillMatchChart from "./SkillMatchChart";
import { Recommendation } from "@/types";

interface CareerChartsProps {
  recommendations: Recommendation[]; 
}

const CareerCharts: React.FC<CareerChartsProps> = ({ recommendations }) => {
  if (!recommendations || recommendations.length === 0) return null; // Prevent rendering if empty

  return (
    <div className="mt-6">
      {recommendations.map((recommendation) => (
        <div key={recommendation.id} className="p-6 bg-gray-100 shadow-md rounded-lg mb-6">
          <h2 className="text-xl font-bold mb-4 ">{recommendation.title} - Career Insights</h2>
          <h3 className="text-xl font-bold mb-4">{recommendation.description} </h3>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SalaryChart recommendation={recommendation} />
            <DemandGrowthChart recommendation={recommendation} />
            <SkillMatchChart recommendation={recommendation} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareerCharts;
