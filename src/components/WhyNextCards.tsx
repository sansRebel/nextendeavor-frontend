const WhyNextEndeavor = () => {
    return (
      <section className="py-12 bg-base-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Why Choose Next Endeavor?</h2>
          <p className="text-lg text-gray-500">Unlock your potential with AI-driven career guidance.</p>
        </div>
  
        {/* Cards Section */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {/* Card 1 */}
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold">AI-Powered Recommendations</h3>
            <p className="mt-2">Find career matches based on your skills, interests, and industry trends.</p>
          </div>
  
          {/* Card 2 */}
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold">Personalized Insights</h3>
            <p className="mt-2">Understand career growth, skill requirements, and long-term prospects.</p>
          </div>
  
          {/* Card 3 */}
          <div className="card bg-base-200 shadow-md p-6 text-center">
            <h3 className="text-xl font-semibold">Seamless User Experience</h3>
            <p className="mt-2">A smooth and easy-to-use platform for quick, accurate suggestions.</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default WhyNextEndeavor;
  