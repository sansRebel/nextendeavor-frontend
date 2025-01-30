// src/components/Hero.tsx
import Link from "next/link";

const Hero = () => {
  return (
    <section className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content text-center flex flex-col">
        <h1 className="text-4xl font-bold">
          Discover Your Next Career Move
        </h1>
        <p className="py-4 text-lg max-w-lg">
          Let AI guide you towards the perfect career path based on your skills and interests.
        </p>
        <Link href="/profile">
          <button className="btn btn-primary">Get Started</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
