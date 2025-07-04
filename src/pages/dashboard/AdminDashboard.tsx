import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Users, FileText, Settings, Eye, BarChart3, Shield, File } from 'lucide-react';
import { getServices, createService, updateService, deleteService } from '../../services/services';
import { getAllApplications, updateApplicationStatus } from '../../services/applications';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import DocumentViewer from '../../components/ui/DocumentViewer';
import StatusBadge from '../../components/Common/StatusBadge';
import { format } from 'date-fns';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    category: '',
    requirements: '',
    processingTime: '',
    fee: '',
    isActive: true
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [servicesData, applicationsData] = await Promise.all([
        getServices(),
        getAllApplications()
      ]);
      setServices(servicesData);
      setApplications(applicationsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedService) {
        await updateService(selectedService.id, serviceForm);
      } else {
        await createService(serviceForm);
      }
      await loadData();
      setIsServiceModalOpen(false);
      resetServiceForm();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(serviceId);
        await loadData();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleStatusUpdate = async (applicationId: string, status: string) => {
    try {
      await updateApplicationStatus(applicationId, status);
      await loadData();
      setIsApplicationModalOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const resetServiceForm = () => {
    setServiceForm({
      title: '',
      description: '',
      category: '',
      requirements: '',
      processingTime: '',
      fee: '',
      isActive: true
    });
    setSelectedService(null);
  };

  const openServiceModal = (service?: any) => {
    if (service) {
      setSelectedService(service);
      setServiceForm(service);
    } else {
      resetServiceForm();
    }
    setIsServiceModalOpen(true);
  };

  const openApplicationModal = (application: any) => {
    setSelectedApplication(application);
    setIsApplicationModalOpen(true);
  };

  const tabs = [
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-secondary-600 dark:text-secondary-300 mt-2">
            Manage services, applications, and system settings
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-secondary-200 dark:border-secondary-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300 dark:text-secondary-400 dark:hover:text-secondary-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                Services Management
              </h2>
              <Button onClick={() => openServiceModal()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-secondary-800 rounded-lg shadow-soft p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">
                      {service.title}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openServiceModal(service)}
                        className="text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-secondary-400 hover:text-error-600 dark:hover:text-error-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-300 text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-secondary-500 dark:text-secondary-400">
                      {service.category}
                    </span>
                    <StatusBadge status={service.isActive ? 'active' : 'inactive'} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white">
                Applications Management
              </h2>
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
                  <thead className="bg-secondary-50 dark:bg-secondary-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900 dark:text-white">
                            {application.applicantName}
                          </div>
                          <div className="text-sm text-secondary-500 dark:text-secondary-400">
                            {application.applicantEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                          {application.serviceTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 dark:text-secondary-400">
                          {format(new Date(application.submittedAt), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={application.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => openApplicationModal(application)}
                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
              User Management
            </h3>
            <p className="text-secondary-500 dark:text-secondary-400">
              User management features coming soon
            </p>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-secondary-500 dark:text-secondary-400">
              Analytics and reporting features coming soon
            </p>
          </div>
        )}
      </div>

      {/* Service Modal */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={selectedService ? 'Edit Service' : 'Add New Service'}
      >
        <form onSubmit={handleServiceSubmit} className="space-y-4">
          <Input
            label="Service Title"
            value={serviceForm.title}
            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              Description
            </label>
            <textarea
              value={serviceForm.description}
              onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-700 dark:text-white"
              required
            />
          </div>
          <Input
            label="Category"
            value={serviceForm.category}
            onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              Requirements
            </label>
            <textarea
              value={serviceForm.requirements}
              onChange={(e) => setServiceForm({ ...serviceForm, requirements: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-secondary-700 dark:text-white"
              required
            />
          </div>
          <Input
            label="Processing Time"
            value={serviceForm.processingTime}
            onChange={(e) => setServiceForm({ ...serviceForm, processingTime: e.target.value })}
            placeholder="e.g., 3-5 business days"
            required
          />
          <Input
            label="Fee"
            value={serviceForm.fee}
            onChange={(e) => setServiceForm({ ...serviceForm, fee: e.target.value })}
            placeholder="e.g., $50 or Free"
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={serviceForm.isActive}
              onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-secondary-900 dark:text-white">
              Active Service
            </label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsServiceModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {selectedService ? 'Update' : 'Create'} Service
            </Button>
          </div>
        </form>
      </Modal>

      {/* Application Details Modal */}
      <Modal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        title="Application Details"
        size="lg"
      >
        {selectedApplication && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Applicant Information</h4>
              <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                <div className="text-sm text-secondary-600 dark:text-secondary-300 space-y-1">
                  <p><span className="font-medium">Name:</span> {selectedApplication.applicantName}</p>
                  <p><span className="font-medium">Email:</span> {selectedApplication.applicantEmail}</p>
                  <p><span className="font-medium">Service:</span> {selectedApplication.serviceTitle}</p>
                  <p><span className="font-medium">Submitted:</span> {format(new Date(selectedApplication.submittedAt), 'PPP')}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Application Details</h4>
              <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
                <div className="text-sm text-secondary-600 dark:text-secondary-300 space-y-1">
                  {Object.entries(selectedApplication.formData).map(([key, value]) => (
                    key !== 'uploadedDocuments' && (
                      <p key={key}>
                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
            
            {/* Uploaded Documents */}
            {selectedApplication.formData.uploadedDocuments && (
              <div>
                <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Uploaded Documents</h4>
                <div className="space-y-4">
                    {Object.entries(selectedApplication.formData.uploadedDocuments).map(([key, files]) => (
                      <div key={key} className="space-y-2">
                        <h5 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-3 flex items-center">
                          <File className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400" />
                          Document {parseInt(key.replace('document_', '')) + 1}
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
            
            <div>
              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Current Status</h4>
              <div className="flex items-center space-x-4">
                <StatusBadge status={selectedApplication.status} />
                <div className="flex space-x-2">
                  {selectedApplication.status !== 'approved' && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(selectedApplication.id, 'approved')}
                      className="bg-success-600 hover:bg-success-700"
                    >
                      Approve
                    </Button>
                  )}
                  {selectedApplication.status !== 'rejected' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
                      className="border-error-600 text-error-600 hover:bg-error-50"
                    >
                      Reject
                    </Button>
                  )}
                  {selectedApplication.status !== 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(selectedApplication.id, 'pending')}
                    >
                      Set Pending
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;