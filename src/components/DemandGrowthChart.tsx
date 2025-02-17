"use client";

import { Recommendation } from "@/types";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ZAxis, Label } from "recharts";
import { motion } from "framer-motion";

interface DemandGrowthChartProps {
  recommendation: Recommendation;
}

// Custom tooltip for better readability
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Extract data

    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border border-gray-600">
        <h4 className="text-lg font-bold text-primary">{data.title}</h4>
        <p className="text-sm text-gray-300 mt-1">📈 <strong>Demand Level:</strong> {data.demand} / 10</p>
        <p className="text-sm text-gray-300">🚀 <strong>Growth Potential:</strong> {data.growth} / 10</p>
      </div>
    );
  }
  return null;
};

// Custom bubble shape
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBubble = (props: any) => {
  const { cx, cy, payload } = props;
  const size = payload.size || 50;

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={size / 10}
      fill="url(#bubbleGradient)"
      style={{
        transition: "all 0.3s ease",
        filter: "drop-shadow(0px 0px 8px rgba(255, 64, 129, 0.8))",
        cursor: "pointer",
      }}
      whileHover={{ scale: 1.2 }}
    />
  );
};

const DemandGrowthChart: React.FC<DemandGrowthChartProps> = ({ recommendation }) => {
  if (!recommendation?.demand || !recommendation?.growthPotential) {
    return (
      <div className="p-6 bg-gray-900 shadow-lg rounded-xl text-white text-center">
        <p className="text-gray-400">Demand & growth data not available.</p>
      </div>
    );
  }

  const data = [
    {
      demand: recommendation.demand,
      growth: recommendation.growthPotential,
      size: Math.max(recommendation.demand * 15, 40),
      title: recommendation.title,
    },
  ];

  return (
    <motion.div
      className="p-6 bg-gray-400 dark:bg-gray-900 shadow-lg rounded-xl text-black dark:text-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-lg font-bold mb-4 text-green-700 dark:text-primary">  Demand vs Growth</h3>

      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />

          {/* 🟢 X-Axis (Demand) */}
          <XAxis 
            type="number" 
            dataKey="demand" 
            name="Demand Level" 
            stroke="white" 
            tick={{ fill: "white" }} 
            tickSize={8}
            domain={[0, 10]} 
          >
            <Label value="Career Demand" position="insideBottom" offset={-5} fill="white" />
          </XAxis>

          {/* 🔵 Y-Axis (Growth) */}
          <YAxis 
            type="number" 
            dataKey="growth" 
            name="Growth Potential" 
            stroke="white" 
            tick={{ fill: "white" }} 
            tickSize={8}
            domain={[0, 10]} 
          >
            <Label value="Growth Potential" angle={-90} position="insideLeft" fill="white" />
          </YAxis>

          {/* 🔴 Bubble Size Scaling */}
          <ZAxis dataKey="size" range={[50, 300]} />

          {/* 🟡 Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />

          {/* 🔵 Demand-Growth Bubble Scatter */}
          <Scatter name="Career" data={data} fill="url(#bubbleGradient)" shape={CustomBubble} />

          {/* 🟠 Gradient for Bubble Effect */}
          <defs>
            <radialGradient id="bubbleGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff4081" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#ff4081" stopOpacity={0.4} />
            </radialGradient>
          </defs>
        </ScatterChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default DemandGrowthChart;
