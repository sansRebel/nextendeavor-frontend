// src/components/ProfileDashboard.tsx
"use client";

import { useState } from "react";

const ProfileDashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const handleLogout = () => {
    window.location.reload(); // Temporary logout (Will be replaced with real logic)
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
      <p className="text-gray-500">{user.email}</p>

      <div className="flex flex-col gap-4 mt-6">
        <button className="btn btn-outline">Edit Profile</button>
        <button className="btn btn-error">Clear Recommendations</button>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDashboard;
