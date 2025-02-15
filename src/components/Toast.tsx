"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number; // Default auto-dismiss time (ms)
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Delay to match exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-4 px-5 py-4 rounded-lg shadow-xl w-80 text-white 
            ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {/* ✅ Icon */}
          {type === "success" ? (
            <CheckCircleIcon className="w-7 h-7 text-white" />
          ) : (
            <ExclamationTriangleIcon className="w-7 h-7 text-white" />
          )}

          {/* ✅ Message */}
          <span className="flex-1 text-base font-medium">{message}</span>

          {/* ✅ Close Button */}
          <button onClick={() => setVisible(false)} className="focus:outline-none">
            <XMarkIcon className="w-6 h-6 text-white opacity-70 hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
