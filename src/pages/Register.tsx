import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, CheckCircle, Clock, RefreshCw, AlertTriangle } from 'lucide-react';
import { registerUser } from '../services/auth';
import { sendOTP, verifyOTP, getOTPRemainingTime } from '../services/otpService';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import OTPInput from '../components/ui/OTPInput';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'otp' | 'success'>('form');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    role: 'citizen' as 'citizen' | 'staff' | 'admin',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const navigate = useNavigate();

  // Timer for OTP expiration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentStep === 'otp' && remainingTime > 0) {
      interval = setInterval(() => {
        const newTime = getOTPRemainingTime(formData.email);
        setRemainingTime(newTime);
        
        if (newTime === 0) {
          setCanResendOTP(true);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentStep, remainingTime, formData.email]);

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      toast.error('Full name is required');
      return false;
    }

    if (!formData.email.trim()) {
      toast.error('Email address is required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if user selected staff or admin role
    if (formData.role === 'staff' || formData.role === 'admin') {
      toast.error('Please contact support for staff or admin access');
      return;
    }

    setLoading(true);

    try {
      // Send OTP to email
      await sendOTP(formData.email, formData.displayName);
      setCurrentStep('otp');
      setRemainingTime(300); // 5 minutes
      setCanResendOTP(false);
      toast.success('Verification code sent to your email!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPComplete = async (otp: string) => {
    setLoading(true);
    setOtpError(false);

    try {
      const isValid = verifyOTP(formData.email, otp);
      
      if (!isValid) {
        setOtpError(true);
        toast.error('Invalid or expired verification code');
        setLoading(false);
        return;
      }

      // Register user after OTP verification
      await registerUser({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
        role: formData.role,
      });

      setCurrentStep('success');
      toast.success('Account created successfully!');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      setOtpError(true);
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResendOTP) return;

    setLoading(true);
    try {
      await sendOTP(formData.email, formData.displayName);
      setRemainingTime(300); // 5 minutes
      setCanResendOTP(false);
      setOtpError(false);
      toast.success('New verification code sent!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const roleOptions = [
    { value: 'citizen', label: 'Citizen', description: 'Apply for services and track applications' },
    { value: 'staff', label: 'Staff Member', description: 'Contact support for access' },
    { value: 'admin', label: 'Administrator', description: 'Contact support for access' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-900 dark:to-secondary-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200 dark:bg-accent-800 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full relative z-10"
      >
        <Card className="backdrop-blur-sm bg-white/80 dark:bg-secondary-800/80">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto h-16 w-16 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mb-6 shadow-glow"
            >
              <span className="text-white font-bold text-2xl">GP</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl font-bold text-secondary-900 dark:text-white"
            >
              {currentStep === 'form' && 'Create Account'}
              {currentStep === 'otp' && 'Verify Email'}
              {currentStep === 'success' && 'Welcome!'}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2 text-secondary-600 dark:text-secondary-300"
            >
              {currentStep === 'form' && 'Join our digital governance platform'}
              {currentStep === 'otp' && 'Enter the verification code sent to your email'}
              {currentStep === 'success' && 'Your account has been created successfully'}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {/* Registration Form */}
            {currentStep === 'form' && (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <Input
                  label="Full Name"
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  icon={<User className="h-5 w-5 text-secondary-400" />}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  icon={<Mail className="h-5 w-5 text-secondary-400" />}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                    Account Type
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary-400" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
                    >
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">
                    {roleOptions.find(opt => opt.value === formData.role)?.description}
                  </p>
                  
                  {/* Contact Support Message for Staff/Admin */}
                  {(formData.role === 'staff' || formData.role === 'admin') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-3 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg"
                    >
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-warning-600 dark:text-warning-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-warning-800 dark:text-warning-200">
                            Contact Support Required
                          </p>
                          <p className="text-xs text-warning-700 dark:text-warning-300 mt-1">
                            For {formData.role} access, please contact our support team at{' '}
                            <Link 
                              to="/contact" 
                              className="underline hover:no-underline font-medium"
                            >
                              support@grampanchayat.gov.in
                            </Link>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    icon={<Lock className="h-5 w-5 text-secondary-400" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
                    style={{ marginTop: '1.5rem' }}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    icon={<Lock className="h-5 w-5 text-secondary-400" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
                    style={{ marginTop: '1.5rem' }}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
                  />
                  <span className="ml-2 text-sm text-secondary-600 dark:text-secondary-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full group"
                  size="lg"
                  disabled={formData.role === 'staff' || formData.role === 'admin'}
                >
                  {loading ? 'Sending Code...' : 
                   (formData.role === 'staff' || formData.role === 'admin') ? 'Contact Support Required' : 'Send Verification Code'}
                  {!(formData.role === 'staff' || formData.role === 'admin') && (
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </motion.form>
            )}

            {/* OTP Verification */}
            {currentStep === 'otp' && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-6">
                    We've sent a 6-digit verification code to<br />
                    <span className="font-medium text-secondary-900 dark:text-white">{formData.email}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <OTPInput
                    length={6}
                    onComplete={handleOTPComplete}
                    disabled={loading}
                    error={otpError}
                  />

                  {otpError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-error-600 dark:text-error-400 text-center"
                    >
                      Invalid or expired verification code
                    </motion.p>
                  )}

                  <div className="text-center">
                    {remainingTime > 0 ? (
                      <div className="flex items-center justify-center space-x-2 text-sm text-secondary-600 dark:text-secondary-300">
                        <Clock className="w-4 h-4" />
                        <span>Code expires in {formatTime(remainingTime)}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-secondary-600 dark:text-secondary-300">
                          Didn't receive the code?
                        </p>
                        <button
                          onClick={handleResendOTP}
                          disabled={loading || !canResendOTP}
                          className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Resend Code</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('form')}
                    className="flex-1"
                    disabled={loading}
                  >
                    Back
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Success */}
            {currentStep === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-success-100 dark:bg-success-900/40 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-success-600 dark:text-success-400" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                    Account Created Successfully!
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300">
                    Welcome to Digital E-Gram Panchayat. You will be redirected to the homepage shortly.
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-secondary-500 dark:text-secondary-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                  <span>Redirecting...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          {currentStep === 'form' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-secondary-600 dark:text-secondary-300">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;