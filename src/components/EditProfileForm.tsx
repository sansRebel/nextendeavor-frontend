"use client";

import { useState } from "react";
import { editAccount } from "@/services/userServices";

interface EditProfileFormProps {
  user: { name: string; email: string };
  onUpdateSuccess: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ user, onUpdateSuccess }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await editAccount(name, email, password);
      setSuccess("Profile updated successfully!");
      setPassword(""); // Clear password field after success
      onUpdateSuccess(); // Refresh user data in ProfileDashboard
    } catch  {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password (Optional)"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfileForm;
