"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // ✅ Ensure params are correctly extracted
import { fetchCareerDetails } from "@/services/recServices";
import { Recommendation } from "@/types";
import CareerClient from "@/components/CareerClient"; // ✅ Import Client Component
import Spinner from "@/components/Spinner"; // ✅ Optional loading spinner

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
        setCareer(data);
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
