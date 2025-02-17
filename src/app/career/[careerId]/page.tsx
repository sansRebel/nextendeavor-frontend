import { fetchCareerDetails } from "@/services/recServices";
import { Recommendation } from "@/types";
import CareerClient from "@/components/CareerClient"; // Import the Client Component

export default async function CareerPage({ params }: { params: { careerId: string } }) {
  const { careerId } = params; // ✅ Correct way to get the careerId

  try {
    const career: Recommendation = await fetchCareerDetails(careerId);

    if (!career) {
      return <p className="text-center text-red-500">Career not found.</p>;
    }

    // Extract Salary Values
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

    const { salaryMin, salaryMax } = extractSalaries(career.salaryRange);

    return <CareerClient career={{ ...career, salaryMin, salaryMax }} />;
  } catch (error) {
    console.error("Error fetching career details:", error);
    return <p className="text-center text-red-500">Error loading career details.</p>;
  }
}
