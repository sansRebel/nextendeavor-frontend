"use client";

import { useState } from "react";
import { signup } from "@/services/authService";

interface SignupFormProps {
  onAuthSuccess: () => void; // ✅ Ensure prop is defined
}

const SignupForm: React.FC<SignupFormProps> = ({ onAuthSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signup(name, email, password);
      onAuthSuccess(); // ✅ Trigger success callback after signup
    } catch {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input type="text" placeholder="Name" className="input input-bordered w-full" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-full">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
