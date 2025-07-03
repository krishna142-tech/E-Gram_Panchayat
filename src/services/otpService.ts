import { sendOTPEmail } from './emailService';

// Generate a 6-digit OTP
export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP in localStorage with expiration (5 minutes)
export const storeOTP = (email: string, otp: string): void => {
  const otpData = {
    otp,
    email,
    timestamp: Date.now(),
    expiresIn: 5 * 60 * 1000, // 5 minutes
  };
  localStorage.setItem(`otp_${email}`, JSON.stringify(otpData));
};

// Verify OTP
export const verifyOTP = (email: string, enteredOTP: string): boolean => {
  const storedData = localStorage.getItem(`otp_${email}`);
  
  if (!storedData) {
    return false;
  }

  try {
    const otpData = JSON.parse(storedData);
    const now = Date.now();
    
    // Check if OTP has expired
    if (now - otpData.timestamp > otpData.expiresIn) {
      localStorage.removeItem(`otp_${email}`);
      return false;
    }

    // Check if OTP matches
    if (otpData.otp === enteredOTP && otpData.email === email) {
      localStorage.removeItem(`otp_${email}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return false;
  }
};

// Send OTP via email
export const sendOTP = async (email: string, name: string): Promise<void> => {
  const otp = generateOTP();
  
  try {
    await sendOTPEmail({
      to_email: email,
      to_name: name,
      otp_code: otp,
    });
    
    storeOTP(email, otp);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP. Please try again.');
  }
};

// Check if OTP is still valid
export const isOTPValid = (email: string): boolean => {
  const storedData = localStorage.getItem(`otp_${email}`);
  
  if (!storedData) {
    return false;
  }

  try {
    const otpData = JSON.parse(storedData);
    const now = Date.now();
    
    return now - otpData.timestamp < otpData.expiresIn;
  } catch (error) {
    return false;
  }
};

// Get remaining time for OTP
export const getOTPRemainingTime = (email: string): number => {
  const storedData = localStorage.getItem(`otp_${email}`);
  
  if (!storedData) {
    return 0;
  }

  try {
    const otpData = JSON.parse(storedData);
    const now = Date.now();
    const elapsed = now - otpData.timestamp;
    const remaining = otpData.expiresIn - elapsed;
    
    return Math.max(0, Math.ceil(remaining / 1000)); // Return seconds
  } catch (error) {
    return 0;
  }
};