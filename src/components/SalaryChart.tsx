"use client";

import { Recommendation } from "@/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";
import { motion } from "framer-motion";

interface SalaryChartProps {
  recommendation: Recommendation;
}

// Custom Tooltip for better formatting
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
        <h4 className="text-lg font-bold text-primary">Salary Details</h4>
        <p className="text-sm text-gray-300 mt-1">💰 <strong>{data.name}:</strong> ${data.salary.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const SalaryChart: React.FC<SalaryChartProps> = ({ recommendation }) => {
  if (!recommendation?.salaryMin || !recommendation?.salaryMax) {
    return (
      <div className="p-6  bg-gray-900 shadow-lg rounded-xl text-white text-center">
        <p className="text-gray-400">Salary data not available.</p>
      </div>
    );
  }

  const data = [
    { name: "Min Salary", salary: recommendation.salaryMin },
    { name: "Max Salary", salary: recommendation.salaryMax },
  ];

  return (
    <motion.div
      className="p-6 bg-gray-400 dark:bg-gray-900 shadow-lg rounded-xl text-black dark:text-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-lg font-bold mb-4 text-green-700 dark:text-primary text-center">Salary Comparison</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart 
          data={data} 
          layout="vertical"
          margin={{ left: 50, right: 50 }} // ✅ Ensures enough spacing
        >
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />
          <XAxis 
            type="number" 
            stroke="white" 
            tickFormatter={(value) => `$${value / 1000}K`} 
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            stroke="white"
            width={50} 
            className="sm:!w-100" 
          />


          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.1)" }} />

          <Bar 
            dataKey="salary" 
            fill="#36a35e" 
            barSize={30} 
            radius={[5, 5, 5, 5]}
            className="transition-all duration-300 hover:opacity-80"
          >

            <LabelList 
              dataKey="salary" 
              position="insideRight" 
              fill="white" 
              fontSize={14} 
              formatter={(value: number) => `$${value.toLocaleString()}`} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SalaryChart;
