"use client";

import { useEffect, useState } from "react";
import { getUserFromToken, removeToken } from "@/utils/token";
import { deleteAccount } from "@/services/userServices";
import EditProfileForm from "@/components/EditProfileForm";

const ProfileDashboard = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState("");

  // Fetch latest user info from token
  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    setError("");
    try {
      await deleteAccount();
      handleLogout(); // Logout the user after account deletion
    } catch  {
      setError("Failed to delete account. Please try again.");
    }
  };

  // After a successful update, refresh the user info
  const handleUpdateSuccess = () => {
    setUser(getUserFromToken()); // Refresh user data from updated localStorage
    setShowEditForm(false); // Hide the edit form
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
      {user ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
          <p className="text-gray-500">{user.email}</p>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col gap-4 mt-6">
            <button className="btn btn-outline" onClick={() => setShowEditForm(!showEditForm)}>
              {showEditForm ? "Cancel" : "Edit Profile"}
            </button>
            <button className="btn btn-error" onClick={handleDeleteAccount}>
              Delete Account
            </button>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>

          {showEditForm && user && (
            <EditProfileForm user={user} onUpdateSuccess={handleUpdateSuccess} />
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfileDashboard;
