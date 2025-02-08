"use client";
import { Recommendation } from "@/types";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DemandGrowthChartProps {
  recommendation: Recommendation;
}

const DemandGrowthChart: React.FC<DemandGrowthChartProps> = ({ recommendation }) => {
  if (!recommendation.demand || !recommendation.growthPotential) return null;

  const data = [{ demand: recommendation.demand, growth: recommendation.growthPotential }];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-bold mb-2">{recommendation.title} - Demand vs Growth</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ScatterChart>
          <XAxis type="number" dataKey="demand" name="Demand" />
          <YAxis type="number" dataKey="growth" name="Growth Potential" />
          <Tooltip />
          <Scatter name={recommendation.title} data={data} fill="#FF5733" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemandGrowthChart;
