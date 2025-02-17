"use client";

import { useState } from "react";
import { signup } from "@/services/authService";
import Toast from "@/components/Toast";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

interface SignupFormProps {
  onAuthSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onAuthSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      await signup(name, email, password);
      setToast({ message: "Account created successfully!", type: "success" });
      onAuthSuccess();
    } catch {
      setToast({ message: "Signup failed. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        {/* Name Field */}
        <div className="relative">
          <UserIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full pl-10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Signup Button */}
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
