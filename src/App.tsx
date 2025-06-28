import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/Common/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Apply from './pages/Apply';
import Profile from './pages/Profile';
import UserDashboard from './pages/dashboard/UserDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-secondary-900 transition-colors duration-300">
          <Header />
          
          <AnimatePresence mode="wait">
            <motion.main 
              className="flex-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/services" element={<Services />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Routes */}
                <Route
                  path="/apply/:serviceId"
                  element={
                    <ProtectedRoute allowedRoles={['citizen', 'staff', 'admin']}>
                      <Apply />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute allowedRoles={['citizen', 'staff', 'admin']}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Dashboard Routes */}
                <Route
                  path="/dashboard/user"
                  element={
                    <ProtectedRoute allowedRoles={['citizen']}>
                      <UserDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/staff"
                  element={
                    <ProtectedRoute allowedRoles={['staff']}>
                      <StaffDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.main>
          </AnimatePresence>

          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                borderRadius: '12px',
                border: '1px solid var(--toast-border)',
                boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#ffffff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;