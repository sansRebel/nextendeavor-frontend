"use client";
import { useState } from "react";
import Chatbot from "@/components/Chatbot";
import Hero from "@/components/Hero";
import WhyNextEndeavor from "@/components/WhyNextCards";
import CareerCharts from "@/components/CareerCharts";
import { Recommendation } from "@/types";

export default function Home() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]); // ✅ Fix: Ensure array type

  return (
    <div>
      <Hero />
      <WhyNextEndeavor />
      <Chatbot setRecommendations={setRecommendations} />
      
      {recommendations.length > 0 && <CareerCharts recommendations={recommendations} />}
    </div>
  );
}
