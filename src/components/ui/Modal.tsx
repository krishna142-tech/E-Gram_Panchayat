import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                'relative w-full bg-white dark:bg-secondary-800 rounded-2xl shadow-large',
                sizeClasses[size]
              )}
            >
              {title && (
                <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
                  <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                    {title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;