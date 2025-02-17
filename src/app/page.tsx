"use client";
import { useState } from "react";
import Chatbot from "@/components/Chatbot";
import Hero from "@/components/Hero";
import FeatureShowcase from "@/components/FeatureShowcase";
import CareerCharts from "@/components/CareerCharts";
import { Recommendation } from "@/types";

export default function Home() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]); // ✅ Fix: Ensure array type

  return (
    <div>
      <Hero />
      <FeatureShowcase />
      <Chatbot setRecommendations={setRecommendations} />
      
      {recommendations.length > 0 && <CareerCharts recommendations={recommendations} />}
    </div>
  );
}
