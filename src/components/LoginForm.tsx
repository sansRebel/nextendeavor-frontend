"use client";

import { useState } from "react";
import { login } from "@/services/authService";
import Toast from "@/components/Toast";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";

interface LoginFormProps {
  onAuthSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      await login(email, password);
      setToast({ message: "Login successful!", type: "success" });
      onAuthSuccess();
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setToast({ message: "Invalid email or password.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

        {/* Login Button */}
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
