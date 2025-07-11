import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus, 
  RefreshCw,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserApplications } from '../../services/applications';
import { Application } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/Common/StatusBadge';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    underReview: applications.filter(app => app.status === 'under_review').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  const loadApplications = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      if (user?.uid) {
        const userApplications = await getUserApplications(user.uid);
        setApplications(userApplications);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-secondary-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welcome back, {user?.displayName || 'User'}!
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Track your applications, manage your profile, and access government services all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => loadApplications(true)}
                loading={refreshing}
                className="group"
              >
                <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Refresh
              </Button>
              <Link to="/services">
                <Button className="group">
                  <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  New Application
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { icon: FileText, label: 'Total', value: stats.total, color: 'from-blue-500 to-blue-600' },
            { icon: Clock, label: 'Pending', value: stats.pending, color: 'from-gray-500 to-gray-600' },
            { icon: Clock, label: 'Under Review', value: stats.underReview, color: 'from-yellow-500 to-yellow-600' },
            { icon: CheckCircle, label: 'Approved', value: stats.approved, color: 'from-green-500 to-green-600' },
            { icon: XCircle, label: 'Rejected', value: stats.rejected, color: 'from-red-500 to-red-600' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-soft`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {stat.label}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Applications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">My Applications</h2>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-16">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="mx-auto h-16 w-16 text-secondary-400 mb-6" />
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    No Applications Yet
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-8 max-w-md mx-auto">
                    You haven't submitted any applications yet. Start by browsing our available 
                    government services and submit your first application.
                  </p>
                  <Link to="/services">
                    <Button size="lg" className="group">
                      <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Browse Services
                    </Button>
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
                  <thead className="bg-secondary-50 dark:bg-secondary-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Remarks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Documents
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
                    {applications.map((application, index) => (
                      <motion.tr
                        key={application.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900 dark:text-white">
                            {application.serviceName}
                          </div>
                          <div className="text-sm text-secondary-500 dark:text-secondary-400">
                            ID: {application.id.slice(-8)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={application.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-300">
                          {format(application.submittedAt, 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-300">
                          {format(application.updatedAt, 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-300">
                          {application.remarks ? (
                            <span className="max-w-xs truncate block" title={application.remarks}>
                              {application.remarks}
                            </span>
                          ) : (
                            <span className="text-secondary-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-300">
                          {application.formData.uploadedDocuments ? (
                            <span className="text-success-600 dark:text-success-400">
                              {Object.keys(application.formData.uploadedDocuments).length} files
                            </span>
                          ) : (
                            <span className="text-secondary-400">No files</span>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Quick Actions */}
        {applications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <Card>
              <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">Quick Actions</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/services">
                    <Button variant="outline" className="w-full justify-start group">
                      <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Apply for New Service
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => loadApplications(true)}
                    loading={refreshing}
                    className="w-full justify-start group"
                  >
                    <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                    Refresh Status
                  </Button>
                  <Link to="/profile">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Update Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;