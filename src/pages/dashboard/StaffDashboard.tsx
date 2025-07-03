import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, Users, Eye, RefreshCw, Filter } from 'lucide-react';
import { getAllApplications, updateApplicationStatus } from '../../services/applications';
import { useAuth } from '../../context/AuthContext';
import { Application } from '../../types';
import StatusBadge from '../../components/Common/StatusBadge';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [updating, setUpdating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async (showRefreshToast = false) => {
    try {
      if (showRefreshToast) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const data = await getAllApplications();
      setApplications(data);
      
      if (showRefreshToast) {
        toast.success('Applications refreshed successfully');
      }
    } catch (error: any) {
      console.error('Error loading applications:', error);
      toast.error(error.message || 'Failed to load applications');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, status: Application['status']) => {
    if (!user) return;

    setUpdating(true);
    try {
      await updateApplicationStatus(applicationId, status, remarks, user.uid);
      toast.success('Application status updated successfully');
      setSelectedApplication(null);
      setRemarks('');
      loadApplications();
    } catch (error: any) {
      console.error('Error updating application status:', error);
      toast.error(error.message || 'Failed to update application status');
    } finally {
      setUpdating(false);
    }
  };

  const getFilteredApplications = () => {
    if (statusFilter === 'all') return applications;
    return applications.filter(app => app.status === statusFilter);
  };

  const getStats = () => {
    const pending = applications.filter(app => app.status === 'pending').length;
    const underReview = applications.filter(app => app.status === 'under-review').length;
    const approved = applications.filter(app => app.status === 'approved').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    
    return {
      total: applications.length,
      pending,
      underReview,
      approved,
      rejected,
    };
  };

  const stats = getStats();
  const filteredApplications = getFilteredApplications();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      {/* Header */}
      <section className="bg-white dark:bg-secondary-800 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
                Staff Dashboard
              </h1>
              <p className="text-secondary-600 dark:text-secondary-300 mt-1">
                Review and process citizen applications
              </p>
            </div>
            <Button
              onClick={() => loadApplications(true)}
              loading={refreshing}
              variant="outline"
              className="group"
            >
              <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
              Refresh
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { icon: FileText, label: 'Total', value: stats.total, color: 'from-blue-500 to-blue-600' },
            { icon: Clock, label: 'Pending', value: stats.pending, color: 'from-gray-500 to-gray-600' },
            { icon: Users, label: 'Under Review', value: stats.underReview, color: 'from-yellow-500 to-yellow-600' },
            { icon: FileText, label: 'Approved', value: stats.approved, color: 'from-green-500 to-green-600' },
            { icon: FileText, label: 'Rejected', value: stats.rejected, color: 'from-red-500 to-red-600' },
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

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Applications</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-secondary-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1 border border-secondary-300 dark:border-secondary-600 rounded-lg text-sm bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100"
                  >
                    <option value="all">All Applications</option>
                    <option value="pending">Pending</option>
                    <option value="under-review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredApplications.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="mx-auto h-16 w-16 text-secondary-400 mb-6" />
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">No Applications Found</h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {statusFilter === 'all' 
                    ? 'No applications have been submitted yet.' 
                    : `No ${statusFilter.replace('-', ' ')} applications found.`
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
                  <thead className="bg-secondary-50 dark:bg-secondary-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Applicant
                      </th>
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
                    {filteredApplications.map((application, index) => (
                      <motion.tr
                        key={application.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900 dark:text-white">
                            {application.userName}
                          </div>
                          <div className="text-sm text-secondary-500 dark:text-secondary-400">
                            {application.userEmail}
                          </div>
                        </td>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Review Modal */}
      {selectedApplication && (
        <Modal
          isOpen={!!selectedApplication}
          onClose={() => {
            setSelectedApplication(null);
            setRemarks('');
          }}
          title="Review Application"
          size="lg"
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Applicant Information</h4>
              <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                <p className="text-sm text-secondary-600 dark:text-secondary-300">
                  <strong>Name:</strong> {selectedApplication.userName}<br />
                  <strong>Email:</strong> {selectedApplication.userEmail}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Service</h4>
              <p className="text-sm text-secondary-600 dark:text-secondary-300">{selectedApplication.serviceName}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Application Details</h4>
              <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                <div className="text-sm text-secondary-600 dark:text-secondary-300 space-y-1">
                  {Object.entries(selectedApplication.formData).map(([key, value]) => (
                    <p key={key}>
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Current Status</h4>
              <StatusBadge status={selectedApplication.status} />
              {selectedApplication.remarks && (
                <p className="text-sm text-secondary-600 dark:text-secondary-300 mt-2">
                  <strong>Previous Remarks:</strong> {selectedApplication.remarks}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Remarks (Optional)
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-4 py-3 border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
                placeholder="Add remarks about this application..."
              />
            </div>
            
            <div className="flex flex-col space-y-4">
              <div>
                <h5 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
                  Update Status
                </h5>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'under-review')}
                    loading={updating}
                    variant="outline"
                    className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                  >
                    Under Review
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'approved')}
                    loading={updating}
                    variant="outline"
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
                    loading={updating}
                    variant="outline"
                    className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                  >
                    Reject
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedApplication(null);
                    setRemarks('');
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StaffDashboard;