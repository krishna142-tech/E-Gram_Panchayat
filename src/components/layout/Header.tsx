import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogOut, 
  User, 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Settings,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';
import { useNotifications } from '../../hooks/useNotifications';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const getDashboardRoute = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'staff':
        return '/dashboard/staff';
      default:
        return '/dashboard/user';
    }
  };

  const navItems = [
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 w-full border-b border-secondary-200 dark:border-secondary-800 bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-soft"
            >
              <span className="text-white font-bold text-lg">GP</span>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                Digital E-Gram Panchayat
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            {user ? (
              <>
                {/* Dashboard Link */}
                <Link
                  to={getDashboardRoute()}
                  className="hidden md:block text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                >
                  Dashboard
                </Link>

                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-error-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </motion.button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-secondary-800 rounded-xl shadow-large border border-secondary-200 dark:border-secondary-700 py-2 z-50"
                      style={{ top: '100%' }}
                    >
                      <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-secondary-900 dark:text-white">
                            Notifications
                          </h3>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                            >
                              Mark all as read
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-8 text-center">
                            <Bell className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                            <p className="text-sm text-secondary-500 dark:text-secondary-400">
                              No notifications yet
                            </p>
                          </div>
                        ) : (
                          <div className="py-2">
                            {notifications.map((notification) => (
                              <div
                                key={notification.id}
                                className={`px-4 py-3 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors cursor-pointer ${
                                  !notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                                }`}
                                onClick={() => {
                                  markAsRead(notification.id);
                                  if (notification.actionUrl) {
                                    navigate(notification.actionUrl);
                                    setIsNotificationsOpen(false);
                                  }
                                }}
                              >
                                <div className="flex items-start space-x-3">
                                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                    !notification.read ? 'bg-primary-600' : 'bg-transparent'
                                  }`} />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-secondary-900 dark:text-white">
                                      {notification.title}
                                    </p>
                                    <p className="text-xs text-secondary-600 dark:text-secondary-300 mt-1">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                                      {new Date(notification.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                      {user.displayName}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-xl shadow-large border border-secondary-200 dark:border-secondary-700 py-2"
                      >
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </Link>
                        <hr className="my-2 border-secondary-200 dark:border-secondary-700" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-secondary-200 dark:border-secondary-800"
            >
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {user ? (
                  <>
                    <Link
                      to={getDashboardRoute()}
                      className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors px-2 py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-error-600 dark:text-error-400 font-medium transition-colors px-2 py-1 text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 px-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button size="sm" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;