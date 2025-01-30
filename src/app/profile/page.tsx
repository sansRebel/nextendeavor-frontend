// src/app/profile/page.tsx
"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import ProfileDashboard from "@/components/ProfileDashboard";

const ProfilePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulating authentication
  const [showSignup, setShowSignup] = useState(false); // Toggle between login/signup

  // Simulate login/signup success
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {!isAuthenticated ? (
        <div className="w-full max-w-md">
          {showSignup ? <SignupForm /> : <LoginForm />}
          <p className="text-center mt-4">
            {showSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              className="link link-primary ml-2"
              onClick={() => setShowSignup(!showSignup)}
            >
              {showSignup ? "Login" : "Sign Up"}
            </button>
          </p>
          <button
            className="btn btn-outline w-full mt-4"
            onClick={handleAuthSuccess} // Simulate authentication
          >
            Simulate Login (Temporary)
          </button>
        </div>
      ) : (
        <ProfileDashboard />
      )}
    </div>
  );
};

export default ProfilePage;
