import React from 'react';
import { motion } from 'framer-motion';

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/50 text-foreground transition-colors hover:bg-secondary focus:outline-none"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="flex flex-col gap-1.5">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-0.5 w-6 rounded-full bg-primary"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-0.5 w-6 rounded-full bg-primary"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-0.5 w-6 rounded-full bg-primary"
        />
      </div>
    </button>
  );
};
