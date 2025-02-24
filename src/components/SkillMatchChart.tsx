"use client";

import { Recommendation } from "@/types";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface SkillMatchChartProps {
  recommendation: Recommendation;
}

const SkillMatchChart: React.FC<SkillMatchChartProps> = ({ recommendation }) => {
  if (!recommendation || !recommendation.requiredSkills || recommendation.requiredSkills.length === 0) {
    return (
      <div className="p-6 bg-gray-900 shadow-lg rounded-xl text-white text-center">
        <p className="text-gray-400">Skill data not available.</p>
      </div>
    );
  }

  const data = recommendation.requiredSkills.map((skill) => ({
    skill,
    value: Math.floor(Math.random() * 5) + 5, 
  }));

  return (
    <motion.div
      className="p-6 bg-gray-900 shadow-lg rounded-xl text-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-lg font-bold mb-4 text-primary">{recommendation.title} - Skill Match</h3>

      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={data}>
          <PolarGrid stroke="gray" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "white", fontSize: 12 }} />
          <PolarRadiusAxis tick={{ fill: "gray" }} domain={[0, 10]} />
          <Tooltip />
          
          <Radar name="Skill Coverage" dataKey="value" stroke="#36a35e" fill="#36a35e" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SkillMatchChart;
