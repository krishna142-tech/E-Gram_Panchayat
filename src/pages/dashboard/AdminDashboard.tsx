import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAllApplications, updateApplicationStatus, deleteApplication } from '../../services/applications';
import { Application } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import StatusBadge from '../../components/Common/StatusBadge';
import LoadingSpinner from '../../components/Common/LoadingSpinner';
import Modal from '../../components/ui/Modal';
import DocumentViewer from '../../components/ui/DocumentViewer';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

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
      const allApplications = await getAllApplications();
      setApplications(allApplications);
      setFilteredApplications(allApplications);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: string, remarks?: string) => {
    setUpdating(applicationId);
    try {
      await updateApplicationStatus(applicationId, newStatus, remarks);
      await loadApplications(true);
      setShowDetailsModal(false);
    } catch (error) {
      console.error('Error updating application status:', error);
    } finally {
      setUpdating(null);
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(applicationId, user?.uid || '');
        await loadApplications(true);
        setShowDetailsModal(false);
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, statusFilter, applications]);

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
              Admin Dashboard
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Manage applications, review submissions, and oversee the entire system.
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
                Refresh Data
              </Button>
              <Button className="group">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Search by service, email, or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search className="w-5 h-5 text-secondary-400" />}
                  />
                </div>
                <div className="md:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                All Applications ({filteredApplications.length})
              </h2>
            </div>

            {filteredApplications.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="mx-auto h-16 w-16 text-secondary-400 mb-6" />
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                  No Applications Found
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300">
                  {applications.length === 0 
                    ? "No applications have been submitted yet."
                    : "No applications match your current filters."
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
                  <thead className="bg-secondary-50 dark:bg-secondary-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Application
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        User
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
                        transition={{ duration: 0.5, delay: index * 0.05 }}
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
                          <div className="text-sm text-secondary-900 dark:text-white">
                            {application.userEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={application.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-300">
                          {format(application.submittedAt, 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowDetailsModal(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteApplication(application.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
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

      {/* Application Details Modal */}
      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="Application Details"
        size="lg"
      >
        {selectedApplication && (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Service
                </label>
                <p className="text-secondary-900 dark:text-white">{selectedApplication.serviceName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  User Email
                </label>
                <p className="text-secondary-900 dark:text-white">{selectedApplication.userEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Status
                </label>
                <StatusBadge status={selectedApplication.status} />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Submitted
                </label>
                <p className="text-secondary-900 dark:text-white">
                  {format(selectedApplication.submittedAt, 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            </div>

            {/* Form Data */}
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Form Data</h4>
              <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                <pre className="text-sm text-secondary-700 dark:text-secondary-300 whitespace-pre-wrap">
                  {JSON.stringify(selectedApplication.formData, null, 2)}
                </pre>
              </div>
            </div>

            {/* Uploaded Documents */}
            {selectedApplication.formData.uploadedDocuments && (
              <div>
                <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Uploaded Documents</h4>
                <div className="space-y-3">
                  {Object.entries(selectedApplication.formData.uploadedDocuments).map(([key, files]) => (
                    <div key={key}>
                      <h5 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
                        Required Document {parseInt(key.replace('document_', '')) + 1}
                      </h5>
                      <div className="space-y-2">
                        {files.map((file: any, index: number) => (
                          <DocumentViewer
                            key={index}
                            fileId={file.url}
                            fileName={file.name}
                            fileSize={file.size}
                            fileType={file.type}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remarks */}
            {selectedApplication.remarks && (
              <div>
                <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Remarks</h4>
                <p className="text-secondary-700 dark:text-secondary-300 bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                  {selectedApplication.remarks}
                </p>
              </div>
            )}

            {/* Status Update Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-secondary-200 dark:border-secondary-700">
              <Button
                onClick={() => handleStatusUpdate(selectedApplication.id, 'under_review')}
                loading={updating === selectedApplication.id}
                disabled={selectedApplication.status === 'under_review'}
                variant="outline"
                size="sm"
              >
                Mark Under Review
              </Button>
              <Button
                onClick={() => handleStatusUpdate(selectedApplication.id, 'approved')}
                loading={updating === selectedApplication.id}
                disabled={selectedApplication.status === 'approved'}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected', 'Application rejected by admin')}
                loading={updating === selectedApplication.id}
                disabled={selectedApplication.status === 'rejected'}
                className="bg-red-600 hover:bg-red-700"
                size="sm"
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;