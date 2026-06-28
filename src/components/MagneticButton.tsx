import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  onClick,
  strength = 40 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useSpring(0, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 15 });

  const x = useTransform(mouseX, (val) => val * strength);
  const y = useTransform(mouseY, (val) => val * strength);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const relX = (clientX - centerX) / (width / 2);
    const relY = (clientY - centerY) / (height / 2);
    
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className={`relative inline-block ${className}`}
    >
      {children}
      {isHovered && (
        <motion.div
          layoutId="magnetic-glow"
          className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
        />
      )}
    </motion.div>
  );
};
