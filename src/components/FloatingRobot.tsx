import React from 'react';
import { motion } from 'motion/react';

interface FloatingRobotProps {
  className?: string;
}

export const FloatingRobot: React.FC<FloatingRobotProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 2, -2, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={`relative pointer-events-none select-none ${className || "w-32 h-32 md:w-48 md:h-48 mx-auto mb-8"}`}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
        {/* Antenna */}
        <motion.path
          d="M100 40V20"
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.circle
          cx="100"
          cy="15"
          r="5"
          fill="#ef4444"
          animate={{ scale: [1, 1.2, 1], fill: ["#ef4444", "#fca5a5", "#ef4444"] }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Head */}
        <rect x="60" y="40" width="80" height="60" rx="20" fill="white" stroke="#ef4444" strokeWidth="4" />
        
        {/* Face/Screen */}
        <rect x="70" y="50" width="60" height="40" rx="10" fill="#1a1a1a" />
        
        {/* Eyes */}
        <motion.circle
          cx="85"
          cy="65"
          r="4"
          fill="#ef4444"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.circle
          cx="115"
          cy="65"
          r="4"
          fill="#ef4444"
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />

        {/* Body */}
        <rect x="70" y="105" width="60" height="50" rx="15" fill="white" stroke="#ef4444" strokeWidth="4" />
        
        {/* Chest Detail */}
        <rect x="85" y="115" width="30" height="10" rx="5" fill="#ef4444" opacity="0.2" />
        <circle cx="90" cy="135" r="3" fill="#ef4444" />
        <circle cx="100" cy="135" r="3" fill="#ef4444" />
        <circle cx="110" cy="135" r="3" fill="#ef4444" />

        {/* Arms */}
        <motion.path
          d="M60 115L40 130"
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M140 115L160 130"
          stroke="#ef4444"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Glow */}
        <motion.ellipse
          cx="100"
          cy="180"
          rx="30"
          ry="5"
          fill="#ef4444"
          opacity="0.1"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
};
