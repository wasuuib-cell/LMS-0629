import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", variant = 'rect' }) => {
  const baseClass = "bg-white/5 relative overflow-hidden";
  const variantClass = variant === 'circle' ? 'rounded-full' : 'rounded-xl';

  return (
    <div className={`${baseClass} ${variantClass} ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const LessonSkeleton = () => (
  <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 space-y-4">
    <Skeleton className="w-12 h-12 rounded-2xl" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export const PostSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <Skeleton className="aspect-video lg:aspect-square rounded-[40px]" />
    <div className="space-y-6">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-6 w-32" />
    </div>
  </div>
);
