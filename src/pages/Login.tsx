import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { signInUser } from '../services/auth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInUser(formData.email, formData.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
              Welcome Back
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-2 text-secondary-600 dark:text-secondary-300"
            >
              Sign in to access your account
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
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-secondary-600 dark:text-secondary-300">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full group"
              size="lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
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
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
              >
                Create one now
              </Link>
            </p>
          </motion.div>

          {/* Demo Accounts */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 p-4 bg-secondary-50 dark:bg-secondary-700 rounded-xl"
          >
            <p className="text-xs text-secondary-600 dark:text-secondary-300 text-center mb-2">
              Demo Accounts (for testing):
            </p>
            <div className="text-xs text-secondary-500 dark:text-secondary-400 space-y-1">
              <div>Admin: admin@demo.com / password</div>
              <div>Staff: staff@demo.com / password</div>
              <div>Citizen: citizen@demo.com / password</div>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;