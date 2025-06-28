import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { registerUser } from '../services/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';

const Register: React.FC = () => {
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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
        role: formData.role,
      });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
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

  const roleOptions = [
    { value: 'citizen', label: 'Citizen', description: 'Apply for services and track applications' },
    { value: 'staff', label: 'Staff Member', description: 'Review and process applications' },
    { value: 'admin', label: 'Administrator', description: 'Manage services and system settings' },
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
              Create Account
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2 text-secondary-600 dark:text-secondary-300"
            >
              Join our digital governance platform
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onSubmit={handleSubmit}
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
                Role
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
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.form>

          {/* Footer */}
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
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;