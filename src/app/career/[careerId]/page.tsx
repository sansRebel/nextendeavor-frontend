"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Extract dynamic params correctly
import { fetchCareerDetails } from "@/services/recServices";
import { Recommendation } from "@/types";
import CareerClient from "@/components/CareerClient"; // ✅ Import Client Component
import Spinner from "@/components/Spinner"; // ✅ Loading indicator

export default function CareerPage() {
  const { careerId } = useParams(); // ✅ Extract careerId safely
  const [career, setCareer] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!careerId) {
      setError("Invalid career ID.");
      setLoading(false);
      return;
    }

    const fetchCareer = async () => {
      try {
        const data = await fetchCareerDetails(careerId as string);
        
        // ✅ Extract salary values before setting state
        const { salaryMin, salaryMax } = extractSalaries(data.salaryRange);
        
        setCareer({ ...data, salaryMin, salaryMax });
      } catch (err) {
        console.error("Error fetching career:", err);
        setError("Career not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [careerId]);

  if (loading) return <Spinner />; // ✅ Show loading indicator

  if (error) return <p className="text-center text-red-500">{error}</p>; // ✅ Show error

  return <CareerClient career={career!} />;
}

const extractSalaries = (salaryRange: string) => {
  const match = salaryRange.match(/\$([\d,]+) - \$([\d,]+)/);
  if (match) {
    return {
      salaryMin: parseInt(match[1].replace(/,/g, ""), 10),
      salaryMax: parseInt(match[2].replace(/,/g, ""), 10),
    };
  }
  return { salaryMin: null, salaryMax: null };
};
