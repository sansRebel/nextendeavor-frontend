// src/app/page.tsx
import Chatbot from "@/components/Chatbot";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import WhyNextEndeavor from "@/components/WhyNextCards";

export default function Home() {
  return (
    <div>
      <Hero />
      <WhyNextEndeavor />
      <Chatbot />
      <Results />
    </div>
  );
}
