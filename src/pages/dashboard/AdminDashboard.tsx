import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Users, FileText, Settings, Eye, BarChart3, Shield, File } from 'lucide-react';
import { getServices, createService, updateService, deleteService } from '../../services/services';
import { getAllApplications, updateApplicationStatus } from '../../services/applications';
import DocumentViewer from '../../components/ui/DocumentViewer';
import { useAuth } from '../../context/AuthContext';
import { Service, Application } from '../../types';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import StatusBadge from '../../components/Common/StatusBadge';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [updating, setUpdating] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'applications'>('overview');
  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    category: '',
    fee: 0,
    requiredDocuments: [''],
    isActive: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [servicesData, applicationsData] = await Promise.all([
        getServices(),
        getAllApplications(),
      ]);
      setServices(servicesData);
      setApplications(applicationsData);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createService({
        ...serviceForm,
        requiredDocuments: serviceForm.requiredDocuments.filter(doc => doc.trim() !== ''),
        createdBy: user.uid,
      }, user.uid);
      
      toast.success('Service created successfully');
      setShowServiceModal(false);
      resetServiceForm();
      loadData();
    } catch (error: any) {
      console.error('Error creating service:', error);
      toast.error(error.message || 'Failed to create service');
    }
  };

  const handleUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !editingService) return;

    try {
      await updateService(editingService.id, {
        ...serviceForm,
        requiredDocuments: serviceForm.requiredDocuments.filter(doc => doc.trim() !== ''),
      }, user.uid);
      
      toast.success('Service updated successfully');
      setShowServiceModal(false);
      setEditingService(null);
      resetServiceForm();
      loadData();
    } catch (error: any) {
      console.error('Error updating service:', error);
      toast.error(error.message || 'Failed to update service');
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      try {
        await deleteService(serviceId, user.uid);
        toast.success('Service deleted successfully');
        loadData();
      } catch (error: any) {
        console.error('Error deleting service:', error);
        toast.error(error.message || 'Failed to delete service');
      }
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
      loadData();
    } catch (error: any) {
      console.error('Error updating application status:', error);
      toast.error(error.message || 'Failed to update application status');
    } finally {
      setUpdating(false);
    }
  };

  const resetServiceForm = () => {
    setServiceForm({
      title: '',
      description: '',
      category: '',
      fee: 0,
      requiredDocuments: [''],
      isActive: true,
    });
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setServiceForm({
      title: service.title,
      description: service.description,
      category: service.category,
      fee: service.fee,
      requiredDocuments: service.requiredDocuments.length > 0 ? service.requiredDocuments : [''],
      isActive: service.isActive,
    });
    setShowServiceModal(true);
  };

  const openApplicationModal = (application: Application) => {
    setSelectedApplication(application);
    setRemarks(application.remarks || '');
  };

  const addDocumentField = () => {
    setServiceForm(prev => ({
      ...prev,
      requiredDocuments: [...prev.requiredDocuments, '']
    }));
  };

  const updateDocumentField = (index: number, value: string) => {
    setServiceForm(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.map((doc, i) => i === index ? value : doc)
    }));
  };

  const removeDocumentField = (index: number) => {
    setServiceForm(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== index)
    }));
  };

  const getStats = () => {
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const approvedApplications = applications.filter(app => app.status === 'approved').length;
    const rejectedApplications = applications.filter(app => app.status === 'rejected').length;
    
    return {
      totalServices: services.length,
      activeServices: services.filter(s => s.isActive).length,
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
    };
  };

  const stats = getStats();

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
                Admin Dashboard
              </h1>
              <p className="text-secondary-600 dark:text-secondary-300 mt-1">
                Manage services and oversee all operations
              </p>
            </div>
            <Button
              onClick={() => {
                resetServiceForm();
                setEditingService(null);
                setShowServiceModal(true);
              }}
              className="group"
            >
              <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              New Service
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="border-b border-secondary-200 dark:border-secondary-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'services', label: 'Services', icon: Settings },
                { id: 'applications', label: 'Applications', icon: FileText },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300 dark:text-secondary-400 dark:hover:text-secondary-300'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Settings, label: 'Total Services', value: stats.totalServices, color: 'from-blue-500 to-blue-600' },
                { icon: Shield, label: 'Active Services', value: stats.activeServices, color: 'from-green-500 to-green-600' },
                { icon: FileText, label: 'Total Applications', value: stats.totalApplications, color: 'from-purple-500 to-purple-600' },
                { icon: Users, label: 'Pending Applications', value: stats.pendingApplications, color: 'from-yellow-500 to-yellow-600' },
                { icon: FileText, label: 'Approved Applications', value: stats.approvedApplications, color: 'from-green-500 to-green-600' },
                { icon: FileText, label: 'Rejected Applications', value: stats.rejectedApplications, color: 'from-red-500 to-red-600' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card hover>
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-soft`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">{stat.label}</p>
                        <p className="text-2xl font-semibold text-secondary-900 dark:text-white">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent Applications */}
            <Card>
              <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">Recent Applications</h3>
              </div>
              <div className="p-6">
                {applications.slice(0, 5).length === 0 ? (
                  <p className="text-secondary-600 dark:text-secondary-300 text-center py-8">
                    No applications submitted yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {applications.slice(0, 5).map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-secondary-900 dark:text-white">{application.serviceName}</h4>
                          <p className="text-sm text-secondary-600 dark:text-secondary-300">
                            by {application.userName} • {format(application.submittedAt, 'MMM dd, yyyy')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <StatusBadge status={application.status} />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openApplicationModal(application)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Services Management</h2>
                  <Button
                    onClick={() => {
                      resetServiceForm();
                      setEditingService(null);
                      setShowServiceModal(true);
                    }}
                    className="group"
                  >
                    <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add New Service
                  </Button>
                </div>
              </div>

              {services.length === 0 ? (
                <div className="text-center py-16">
                  <Settings className="mx-auto h-16 w-16 text-secondary-400 mb-6" />
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">No Services Created</h3>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-8 max-w-md mx-auto">
                    Start by creating your first government service to enable citizens to apply online.
                  </p>
                  <Button
                    onClick={() => {
                      resetServiceForm();
                      setEditingService(null);
                      setShowServiceModal(true);
                    }}
                    size="lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Service
                  </Button>
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
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          Fee
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          Documents Required
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
                      {services.map((service) => (
                        <tr key={service.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-secondary-900 dark:text-white">
                              {service.title}
                            </div>
                            <div className="text-sm text-secondary-500 dark:text-secondary-400 line-clamp-2">
                              {service.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                              {service.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-300">
                            ₹{service.fee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-300">
                            {service.requiredDocuments.length} docs
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              service.isActive
                                ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200'
                                : 'bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200'
                                : 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200'
                            }`}>
                              {service.isActive ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-secondary-300">
                            {format(service.createdAt, 'MMM dd, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditModal(service)}
                                className="text-primary-600 hover:text-primary-700"
                                title="Edit Service"
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to ${service.isActive ? 'disable' : 'enable'} this service?`)) {
                                    updateService(service.id, { isActive: !service.isActive }, user!.uid);
                                    loadData();
                                  }
                                }}
                                className={service.isActive ? 'text-warning-600 hover:text-warning-700' : 'text-success-600 hover:text-success-700'}
                                title={service.isActive ? 'Disable Service' : 'Enable Service'}
                              >
                                {service.isActive ? '⏸️' : '▶️'}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteService(service.id)}
                                className="text-error-600 hover:text-error-700"
                                title="Delete Service"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <div className="px-6 py-4 border-b border-secondary-200 dark:border-secondary-700">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">All Applications</h2>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="mx-auto h-16 w-16 text-secondary-400 mb-6" />
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">No Applications</h3>
                  <p className="text-secondary-600 dark:text-secondary-300">
                    No applications have been submitted yet.
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
                      {applications.map((application) => (
                        <tr key={application.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors">
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
                              onClick={() => openApplicationModal(application)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>

      {/* Service Modal */}
      <Modal
        isOpen={showServiceModal}
        onClose={() => {
          setShowServiceModal(false);
          setEditingService(null);
          resetServiceForm();
        }}
        title={editingService ? 'Edit Service' : 'Create New Service'}
        size="lg"
      >
        <form onSubmit={editingService ? handleUpdateService : handleCreateService} className="space-y-6">
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <Settings className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-primary-900 dark:text-primary-100">Service Information</h4>
                <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">
                  {editingService ? 'Update the service details below.' : 'Fill in the details for the new government service.'}
                </p>
              </div>
            </div>
          </div>

          <Input
            label="Service Title *"
            type="text"
            value={serviceForm.title}
            onChange={(e) => setServiceForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter service title"
            required
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              Description *
            </label>
            <textarea
              rows={3}
              value={serviceForm.description}
              onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
              placeholder="Enter service description"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Category *"
              type="text"
              value={serviceForm.category}
              onChange={(e) => setServiceForm(prev => ({ ...prev, category: e.target.value }))}
              placeholder="e.g., Certificates, Licenses"
              required
            />

            <Input
              label="Fee (₹) *"
              type="number"
              value={serviceForm.fee}
              onChange={(e) => setServiceForm(prev => ({ ...prev, fee: parseInt(e.target.value) || 0 }))}
              placeholder="0"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
              Required Documents *
            </label>
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mb-3">
              Add all documents that citizens need to upload when applying for this service.
            </p>
            <div className="space-y-2">
              {serviceForm.requiredDocuments.map((doc, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={doc}
                    onChange={(e) => updateDocumentField(index, e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
                    placeholder="e.g., Aadhar Card, Income Certificate"
                    required
                  />
                  {serviceForm.requiredDocuments.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeDocumentField(index)}
                      className="text-error-600 hover:text-error-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                onClick={addDocumentField}
                className="text-primary-600 hover:text-primary-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Another Document
              </Button>
            </div>
          </div>

          <div className="flex items-center p-4 bg-secondary-50 dark:bg-secondary-800 rounded-xl">
            <input
              type="checkbox"
              id="isActive"
              checked={serviceForm.isActive}
              onChange={(e) => setServiceForm(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-secondary-700 dark:text-secondary-300">
              <span className="font-medium">Enable this service</span>
              <span className="block text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                Citizens can apply for this service when enabled
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowServiceModal(false);
                setEditingService(null);
                resetServiceForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingService ? (
                <>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Update Service
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Service
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Application Details Modal with Status Update */}
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
                <div className="space-y-3">
                    {Object.entries(selectedApplication.formData.uploadedDocuments).map(([key, files]) => (
-                      <div key={key} className="text-sm">
-                        <span className="font-medium text-secondary-900 dark:text-secondary-100">
-                          Document {key.replace('document_', '')}:
+                      <div key={key}>
+                        <h5 className="text-sm font-medium text-secondary-900 dark:text-secondary-100 mb-2">
+                          Required Document {parseInt(key.replace('document_', '')) + 1}
+                        </h5>
+                        <div className="space-y-2">
+                          {files.map((file: any, index: number) => (
+                            <DocumentViewer
+                              key={index}
+                              fileId={file.url}
+                              fileName={file.name}
+                              fileSize={file.size}
+                              fileType={file.type}
+                            />
+                          ))}
+                        </div>
+                      </div>
+                    ))}
+                </div>
+              </div>
+            )}
+            
+            <div>
+              <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Current Status</h4>
+              <StatusBadge status={selectedApplication.status} />
+              {selectedApplication.remarks && (
+                <p className="text-sm text-secondary-600 dark:text-secondary-300 mt-2">
+                  <strong>Previous Remarks:</strong> {selectedApplication.remarks}
+                </p>
+              )}
+            </div>
+
+            <div>
+              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
+                Remarks (Optional)
+              </label>
+              <textarea
+                rows={3}
+                value={remarks}
+                onChange={(e) => setRemarks(e.target.value)}
+                className="w-full px-4 py-3 border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
+                placeholder="Add remarks about this application..."
+              />
+            </div>
+            
+            <div className="flex flex-col space-y-4">
+              <div>
+                <h5 className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">
+                  Update Status
+                </h5>
+                <div className="flex flex-wrap gap-2">
+                  <Button
+                    onClick={() => handleStatusUpdate(selectedApplication.id, 'under-review')}
+                    loading={updating}
+                    variant="outline"
+                    className="bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
+                  >
+                    Under Review
+                  </Button>
+                  <Button
+                    onClick={() => handleStatusUpdate(selectedApplication.id, 'approved')}
+                    loading={updating}
+                    variant="outline"
+                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
+                  >
+                    Approve
+                  </Button>
+                  <Button
+                    onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
+                    loading={updating}
+                    variant="outline"
+                    className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
+                  >
+                    Reject
+                  </Button>
+                </div>
+              </div>
+              
+              <div className="flex justify-end space-x-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
+                <Button
+                  variant="outline"
+                  onClick={() => {
+                    setSelectedApplication(null);
+                    setRemarks('');
+                  }}
+                >
+                  Close
+                </Button>
+              </div>
+            </div>
+          </div>
+        </Modal>
+      )}
+    </div>
+  );
+};
+
+export default StaffDashboard;
```

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
                  Update Status (Admin Override)
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
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                  As an admin, you can override any status set by staff members.
                </p>
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

export default AdminDashboard;
```

src/pages/dashboard/StaffDashboard.tsx:
```diff
@@ .. @@
 import { FileText, Clock, Users, Eye, RefreshCw, Filter, File } from 'lucide-react';
 import { getAllApplications, updateApplicationStatus } from '../../services/applications';
+import DocumentViewer from '../../components/ui/DocumentViewer';
 import { useAuth } from '../../context/AuthContext';
@@ .. @@
             {/* Uploaded Documents */}
             {selectedApplication.formData.uploadedDocuments && (
               <div>
                 <h4 className="font-medium text-secondary-900 dark:text-white mb-2">Uploaded Documents</h4>
-                <div className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-4">
-                  <div className="space-y-2">
+                <div className="space-y-3">
                        </span>
                        <div className="ml-4 mt-1 space-y-1">
                          {files.map((file: any, index: number) => (
                            <div key={index} className="flex items-center space-x-2 text-secondary-600 dark:text-secondary-300">
                              <File className="w-4 h-4" />
                              <span>{file.name}</span>
                              <span className="text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
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
                  Update Status (Admin Override)
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
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                  As an admin, you can override any status set by staff members.
                </p>
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

export default AdminDashboard;