"use client";

import { useState } from "react";

const Results = () => {
  const [results, setResults] = useState<string[] | null>(null);

  // Simulate fetching recommendations
  const generateResults = () => {
    setResults([
      "Software Engineer",
      "Data Scientist",
      "Product Manager",
      "Cybersecurity Analyst",
    ]);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        {/* Button to simulate results (This will be removed once backend is integrated) */}
        {!results && (
          <button onClick={generateResults} className="btn btn-primary mb-6">
            Generate Recommendations (Placeholder)
          </button>
        )}

        {/* Results Section (Hidden until results exist) */}
        {results && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Your Career Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
              {results.map((career, index) => (
                <div key={index} className="card bg-base-200 shadow-md p-6 text-center">
                  <h3 className="text-xl font-semibold">{career}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Results;
