"use client";
import { Recommendation } from "@/types";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface SkillMatchChartProps {
  recommendation: Recommendation;
}

const SkillMatchChart: React.FC<SkillMatchChartProps> = ({ recommendation }) => {
  if (!recommendation.requiredSkills || recommendation.requiredSkills.length === 0) return null;

  const data = recommendation.requiredSkills.map((skill) => ({
    skill,
    value: Math.floor(Math.random() * 10) + 1, // Mock value for now
  }));

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-bold mb-2">{recommendation.title} - Required Skills</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <Radar name="Skills" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillMatchChart;
