import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({ 
  length, 
  onComplete, 
  disabled = false,
  error = false 
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;

    const newOtp = [...otp];
    
    // Handle paste
    if (value.length > 1) {
      const pastedData = value.slice(0, length);
      for (let i = 0; i < length; i++) {
        newOtp[i] = pastedData[i] || '';
      }
      setOtp(newOtp);
      
      // Focus on the last filled input or the next empty one
      const lastFilledIndex = Math.min(pastedData.length - 1, length - 1);
      if (inputRefs.current[lastFilledIndex]) {
        inputRefs.current[lastFilledIndex].focus();
      }
      
      if (pastedData.length === length) {
        onComplete(pastedData);
      }
      return;
    }

    // Handle single character input
    if (value === '' || /^\d$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value !== '' && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Call onComplete if all fields are filled
      if (newOtp.every(digit => digit !== '') && newOtp.join('').length === length) {
        onComplete(newOtp.join(''));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    if (disabled) return;
    
    // Select all text when focusing
    if (inputRefs.current[index]) {
      inputRefs.current[index]?.select();
    }
  };

  return (
    <div className="flex justify-center space-x-3">
      {otp.map((digit, index) => (
        <motion.input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          disabled={disabled}
          className={`w-12 h-12 text-center text-xl font-semibold border-2 rounded-xl transition-all duration-200 ${
            error
              ? 'border-error-500 bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300'
              : disabled
              ? 'border-secondary-200 bg-secondary-100 dark:bg-secondary-800 text-secondary-400 cursor-not-allowed'
              : digit
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
              : 'border-secondary-300 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        />
      ))}
    </div>
  );
};

export default OTPInput;