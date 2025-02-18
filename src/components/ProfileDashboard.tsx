"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserFromToken, removeToken } from "@/utils/token";
import { deleteAccount } from "@/services/userServices";
import { fetchSavedRecommendations, clearSavedRecommendations } from "@/services/recServices";
import EditProfileForm from "@/components/EditProfileForm";
import { Recommendation } from "@/types";
import { motion } from "framer-motion";
import {
  TrashIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  XCircleIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import Toast from "@/components/Toast"; // ✅ Import Toast for notifications

const ProfileDashboard = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [savedRecommendations, setSavedRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recommendations = await fetchSavedRecommendations();
        setSavedRecommendations(recommendations);
      } catch  {

      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const handleLogout = () => {
    removeToken();
    setToast({ message: "Logged out successfully!", type: "success" });
    setTimeout(() => window.location.reload(), 1500);
  };

  const handleDeleteAccount = async () => {
    setError("");
    try {
      await deleteAccount();
      setToast({ message: "Account deleted successfully!", type: "success" });
      setTimeout(() => handleLogout(), 1500);
    } catch {
      setToast({ message: "Failed to delete account. Please try again.", type: "error" });
    }
  };

  const handleUpdateSuccess = () => {
    setUser(getUserFromToken());
    setShowEditForm(false);
    setToast({ message: "Profile updated successfully!", type: "success" });
    setTimeout(() => window.location.reload(), 1500);

  };

  const handleClearRecommendations = async () => {
    if (savedRecommendations.length === 0) return;

    setLoading(true);
    try {
      await clearSavedRecommendations();
      setSavedRecommendations([]);
      setToast({ message: "Cleared saved recommendations!", type: "success" });
    } catch (error) {
      console.error("Failed to clear saved recommendations", error);
      setToast({ message: "Failed to clear recommendations.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      {/* ✅ Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* ✅ Profile Section */}
      <motion.div
        className="bg-base-200 p-8 rounded-xl shadow-lg max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }} // ⏩ Reduced duration & smoother easing
      >
        {user ? (
          <>
            <h2 className="text-3xl font-bold text-primary">{user.name}</h2>
            <p className="flex items-center justify-center gap-2 text-gray-600 text-lg font-semibold  py-2 px-4 rounded-md mt-2">
              <EnvelopeIcon className="w-5 h-5 text-gray-700" />
              {user.email}
            </p>
            {error && <p className="text-red-500">{error}</p>}

            {/* 🔥 Circular Action Buttons */}
            <div className="flex justify-center gap-8 mt-6">
              {/* 📝 Edit Profile */}
              <motion.button
                className="flex flex-col justify-center items-center w-16 h-16 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowEditForm(!showEditForm)}
              >
                <PencilIcon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Edit</span>
              </motion.button>

              {/* ❌ Delete Account */}
              <motion.button
                className="flex flex-col justify-center items-center w-16 h-16 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDeleteAccount}
              >
                <TrashIcon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Delete</span>
              </motion.button>

              {/* 🔄 Logout */}
              <motion.button
                className="flex flex-col justify-center items-center w-16 h-16 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Logout</span>
              </motion.button>
              </div>


            {/* Edit Profile Form */}
            {showEditForm && user && <EditProfileForm user={user} onUpdateSuccess={handleUpdateSuccess} />}
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </motion.div>

      {/* ✅ Saved Recommendations Section */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold text-center mb-6">Saved Career Recommendations</h3>

        {loading ? (
          <p className="text-center text-gray-500">Loading saved recommendations...</p>
        ) : savedRecommendations.length === 0 ? (
          <p className="text-center text-gray-500">Saved recommendations from the AI will be displayed here.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedRecommendations.map((rec) => (
              <motion.div
                key={rec.careerId}
                onClick={() => router.push(`/career/${rec.careerId}`)} 
                className="p-6 bg-slate-200 dark:bg-gray-900 text-black dark:text-white shadow-md rounded-lg relative transition-transform cursor-pointer"
                whileHover={{ scale: 1.08 }} 
                whileTap={{ scale: 0.95 }}   
                transition={{ duration: 0.2, ease: "easeOut" }} 
              >


                <h3 className="text-xl font-bold">{rec.title}</h3>
                <p className="text-gray-900 dark:text-gray-400">{rec.description}</p>
                <p className="text-sm  text-gray-800 dark:text-gray-400">Skills: {rec.requiredSkills.join(", ")}</p>
                <p className="text-sm  text-gray-700 dark:text-gray-400">Salary: {rec.salaryRange.toLocaleString()}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Demand: {rec.demand} /10</p>
                <p className="text-xs text-gray-500 mt-2">Saved on: {new Date(rec.savedAt).toLocaleDateString()}</p>

                {/* 📌 Save Icon */}
                <BookmarkIcon className="w-6 h-6 absolute top-3 right-3 text-primary" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* 🚀 Clear All Recommendations Button (Centered & Improved) */}
      {savedRecommendations.length > 0 && (
        <div className="flex justify-center mt-8">
          <motion.button
            className="btn  bg-red-600 text-white px-6 py-3 font-semibold text-lg flex items-center gap-2 shadow-md hover:bg-red-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearRecommendations}
            disabled={loading}
          >
            <XCircleIcon className="w-5 h-5" />
            {loading ? "Clearing..." : "Clear All Recommendations"}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
