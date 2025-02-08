"use client";
import { Recommendation } from "@/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface SalaryChartProps {
  recommendation: Recommendation;
}

const SalaryChart: React.FC<SalaryChartProps> = ({ recommendation }) => {
  if (!recommendation.salaryMin || !recommendation.salaryMax) return null;

  const data = [
    { name: recommendation.title, salary: recommendation.salaryMax, label: `Max: $${recommendation.salaryMax}` },
    { name: recommendation.title, salary: recommendation.salaryMin, label: `Min: $${recommendation.salaryMin}` },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-bold mb-2">{recommendation.title} Salary Range</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="salary" fill="#4CAF50" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalaryChart;
