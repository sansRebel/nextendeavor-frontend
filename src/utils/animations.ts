import { Variants } from "framer-motion";

// src/utils/animations.ts
export const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

export const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
};

export const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } }
};
  
export const fadeOutDown: Variants = {
  hidden: { opacity: 0, y: 40, transition: { duration: 0.6, ease: "easeIn" } },
  visible: { opacity: 1, y: 0 },
};

export const fadeOutLeft: Variants = {
  hidden: { opacity: 0, x: -40, transition: { duration: 0.6, ease: "easeIn" } },
  visible: { opacity: 1, x: 0 },
};

export const fadeOutRight: Variants = {
  hidden: { opacity: 0, x: 40, transition: { duration: 0.6, ease: "easeIn" } },
  visible: { opacity: 1, x: 0 },
};

export const radialProgress = {
    hidden: { strokeDasharray: "0 113", strokeDashoffset: "113" }, // ✅ Fixes gap
    visible: {
      strokeDasharray: "87 113", // ✅ Ensures full animation up to 87%
      strokeDashoffset: "0",
      transition: { duration: 2, ease: "easeOut" },
    },
  };
  
export const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delays each child animation
      delayChildren: 0.1, // Adds a slight delay before stagger starts
    },
  },
};
  