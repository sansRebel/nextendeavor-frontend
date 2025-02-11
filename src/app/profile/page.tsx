"use client";

import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";
import SignupForm from "@/components/SignupForm";
import ProfileDashboard from "@/components/ProfileDashboard";
import { getUserFromToken } from "@/utils/token";

const ProfilePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);


  useEffect(() => {
    if (getUserFromToken()) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const switchToLogin = () => {
    setShowSignup(false);
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {!isAuthenticated ? (
        <div className="w-full max-w-md">
          {showSignup ? <SignupForm onAuthSuccess={switchToLogin} /> : <LoginForm onAuthSuccess={handleAuthSuccess} />}
          <p className="text-center mt-4">
            {showSignup ? "Already have an account?" : "Don't have an account?"}
            <button
              className="link link-primary ml-2"
              onClick={() => setShowSignup(!showSignup)}
            >
              {showSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      ) : (
        <ProfileDashboard />
      )}
    </div>
  );
};

export default ProfilePage;
