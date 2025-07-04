import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, IndianRupee, AlertCircle, CheckCircle, ArrowLeft, Upload } from 'lucide-react';
import { getServiceById } from '../services/services';
import { submitApplication } from '../services/applications';
import { uploadFile } from '../services/fileStorage';
import { useAuth } from '../context/AuthContext';
import { Service } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import FileUpload from '../components/ui/FileUpload';
import toast from 'react-hot-toast';

const Apply: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (serviceId) {
      loadService();
    }
  }, [serviceId]);

  const loadService = async () => {
    try {
      setLoading(true);
      if (serviceId) {
        const data = await getServiceById(serviceId);
        if (data) {
          setService(data);
        } else {
          toast.error('Service not found');
          navigate('/services');
        }
      }
    } catch (error: any) {
      console.error('Error loading service:', error);
      toast.error(error.message || 'Failed to load service details');
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.reason?.trim()) {
      newErrors.reason = 'Reason for application is required';
    }

    if (!formData.aadharNumber?.trim()) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (!/^\d{12}$/.test(formData.aadharNumber.replace(/\D/g, ''))) {
      newErrors.aadharNumber = 'Please enter a valid 12-digit Aadhar number';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    // Validate required documents
    if (service?.requiredDocuments) {
      service.requiredDocuments.forEach((doc, index) => {
        const files = uploadedFiles[`document_${index}`] || [];
        if (files.length === 0) {
          newErrors[`document_${index}`] = `${doc} is required`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!service || !user) return;

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setSubmitting(true);

    try {
      // Prepare form data with file information
      // Upload files and get storage URLs
      const uploadedDocuments: Record<string, any> = {};
      
      for (const [key, files] of Object.entries(uploadedFiles)) {
        const uploadedFileData = [];
        for (const file of files) {
          const storedFile = await uploadFile(file);
          uploadedFileData.push({
            name: storedFile.name,
            size: storedFile.size,
            type: storedFile.type,
            url: storedFile.url, // This is the file ID for retrieval
            uploadedAt: storedFile.uploadedAt,
          });
        }
        uploadedDocuments[key] = uploadedFileData;
      }

      const applicationFormData = {
        ...formData,
        uploadedDocuments,
      };

      await submitApplication({
        serviceId: service.id,
        serviceName: service.title,
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        formData: applicationFormData,
      }, user.uid);

      toast.success('Application submitted successfully!');
      navigate('/dashboard/user');
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast.error(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (documentIndex: number, files: File[]) => {
    setUploadedFiles(prev => ({
      ...prev,
      [`document_${documentIndex}`]: files
    }));
    
    // Clear error when files are uploaded
    if (files.length > 0 && fileErrors[`document_${documentIndex}`]) {
      setFileErrors(prev => ({
        ...prev,
        [`document_${documentIndex}`]: ''
      }));
    }
  };

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

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50 dark:bg-secondary-900">
        <Card className="text-center p-8">
          <AlertCircle className="mx-auto h-16 w-16 text-error-500 mb-4" />
          <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
            Service Not Found
          </h2>
          <p className="text-secondary-600 dark:text-secondary-300 mb-6">
            The requested service could not be found or is no longer available.
          </p>
          <Button onClick={() => navigate('/services')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/services')}
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Button>
        </motion.div>

        {/* Service Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card>
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
                  {service.title}
                </h1>
                <p className="text-secondary-600 dark:text-secondary-300 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 ml-6 whitespace-nowrap">
                {service.category}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-success-50 dark:bg-success-900/20 rounded-xl">
                <div className="w-10 h-10 bg-success-100 dark:bg-success-900/40 rounded-lg flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-success-600 dark:text-success-400" />
                </div>
                <div>
                  <p className="text-sm text-success-600 dark:text-success-400 font-medium">Application Fee</p>
                  <p className="text-xl font-bold text-success-800 dark:text-success-300">₹{service.fee}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">Required Documents</p>
                  <p className="text-xl font-bold text-primary-800 dark:text-primary-300">{service.requiredDocuments.length} documents</p>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="border-t border-secondary-200 dark:border-secondary-700 pt-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400 flex-shrink-0" />
                    <span className="text-secondary-700 dark:text-secondary-300">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <h2 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-6">Application Form</h2>
            
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4 mb-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-primary-900 dark:text-primary-100">Important Information</h4>
                  <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">
                    Please ensure all information is accurate. You will need to upload the required 
                    documents during the verification process. Processing typically takes 3-5 business days.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name *"
                  type="text"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.fullName}
                  required
                />
                
                <Input
                  label="Phone Number *"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  error={errors.phoneNumber}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Address *
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    errors.address
                      ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
                      : 'border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500'
                  } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:ring-2 focus:ring-opacity-20`}
                  placeholder="Enter your complete address"
                  required
                />
                {errors.address && (
                  <p className="text-sm text-error-600 dark:text-error-400 mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                  Reason for Application *
                </label>
                <textarea
                  name="reason"
                  rows={4}
                  value={formData.reason || ''}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    errors.reason
                      ? 'border-error-500 focus:border-error-500 focus:ring-error-500'
                      : 'border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500'
                  } bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:ring-2 focus:ring-opacity-20`}
                  placeholder="Explain why you need this service"
                  required
                />
                {errors.reason && (
                  <p className="text-sm text-error-600 dark:text-error-400 mt-1">{errors.reason}</p>
                )}
              </div>

              {/* Additional Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Aadhar Number *"
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber || ''}
                  onChange={handleChange}
                  placeholder="Enter your Aadhar number"
                  error={errors.aadharNumber}
                  required
                />
                
                <Input
                  label="Date of Birth *"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth || ''}
                  onChange={handleChange}
                  error={errors.dateOfBirth}
                  required
                />
              </div>

              {/* Document Upload Section */}
              <div className="border-t border-secondary-200 dark:border-secondary-700 pt-8">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Required Documents
                </h3>
                
                <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-primary-900 dark:text-primary-100">Document Upload Guidelines</h4>
                      <ul className="text-sm text-primary-700 dark:text-primary-300 mt-1 space-y-1">
                        <li>• Upload clear, readable copies of all required documents</li>
                        <li>• Accepted formats: PDF, JPG, PNG, DOC, DOCX</li>
                        <li>• Maximum file size: 5MB per document</li>
                        <li>• Ensure all text and details are clearly visible</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {service.requiredDocuments.map((document, index) => (
                    <FileUpload
                      key={index}
                      label={document}
                      onFilesChange={(files) => handleFileChange(index, files)}
                      error={errors[`document_${index}`] || fileErrors[`document_${index}`]}
                      required
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      maxSize={5}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-secondary-50 dark:bg-secondary-800 rounded-xl">
                <input
                  type="checkbox"
                  id="declaration"
                  required
                  className="w-4 h-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2 mt-1"
                />
                <label htmlFor="declaration" className="text-sm text-secondary-600 dark:text-secondary-300">
                  I declare that all the information provided is true and accurate. I understand 
                  that providing false information may result in rejection of my application and 
                  may have legal consequences. I confirm that all uploaded documents are authentic 
                  and belong to me.
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/services')}
                  className="sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={submitting}
                  className="flex-1 sm:flex-none group"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                  {!submitting && (
                    <motion.span
                      className="ml-2 inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      →
                    </motion.span>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;