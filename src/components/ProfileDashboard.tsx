"use client";

import { useEffect, useState } from "react";
import { getUserFromToken, removeToken } from "@/utils/token";
import { deleteAccount } from "@/services/userServices";
import { fetchSavedRecommendations, clearSavedRecommendations } from "@/services/recServices";
import EditProfileForm from "@/components/EditProfileForm";
import { Recommendation } from "@/types";

const ProfileDashboard = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [savedRecommendations, setSavedRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch latest user info from token
  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  // Fetch saved recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recommendations = await fetchSavedRecommendations();
        setSavedRecommendations(recommendations);
      } catch (err) {
        console.error("Failed to fetch recommendations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
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
    } catch {
      setError("Failed to delete account. Please try again.");
    }
  };

  // After a successful update, refresh the user info
  const handleUpdateSuccess = () => {
    setUser(getUserFromToken()); // Refresh user data from updated localStorage
    setShowEditForm(false); // Hide the edit form
  };

  const handleClearRecommendations = async () => {
    if(savedRecommendations.length === 0) {
      return;
    }

    setLoading(true);

    try {
      await clearSavedRecommendations();
      setSavedRecommendations([]);
    } catch (error) {
      console.error("Failed to clear saved recommendations", error)
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md text-center mx-auto">
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

      {/* ✅ Saved Recommendations Section */}
      <div className="mt-12">
        <h3 className="text-3xl font-bold text-center mb-6">Saved Career Recommendations</h3>

        {loading ? (
          <p className="text-center text-gray-500">Loading saved recommendations...</p>
        ) : savedRecommendations.length === 0 ? (
          <p className="text-center text-gray-500">No saved recommendations found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecommendations.map((rec) => (
              <div key={rec.id} className="p-6 bg-gray-100 shadow-md rounded-lg">
                <h3 className="text-xl font-bold">{rec.title}</h3>
                <p className="text-gray-700">{rec.description}</p>
                <p className="text-sm text-gray-500 ">Skills: {rec.requiredSkills.join(", ")}</p>
                <p className="text-sm text-gray-500">Salary: {rec.salaryMax}</p>
                <p className="text-sm text-gray-500">Demand: {rec.demand} /10</p>
                <p className="text-sm text-gray-400 mt-2">Saved on: {new Date(rec.savedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {savedRecommendations.length > 0 && (
      <div className="text-center mt-6">
        <button
          className="btn btn-warning"
          onClick={handleClearRecommendations}
          disabled={loading}
        >
          {loading ? "Clearing..." : "Clear All Saved Recommendations"}
        </button>
      </div>
    )}
    </div>
  );
};

export default ProfileDashboard;
