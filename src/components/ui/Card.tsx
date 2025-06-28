import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -2, boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)' } : {}}
      className={cn(
        'bg-white dark:bg-secondary-800 rounded-2xl shadow-soft border border-secondary-200 dark:border-secondary-700',
        paddingClasses[padding],
        hover && 'transition-all duration-300 cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;