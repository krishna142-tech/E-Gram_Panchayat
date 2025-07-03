import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, User, Mail, Phone, MessageCircle } from 'lucide-react';
import { sendSupportRequest } from '../../services/emailService';
import Button from './Button';
import Input from './Input';
import toast from 'react-hot-toast';

interface SupportRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestType: 'staff' | 'admin';
}

const SupportRequestModal: React.FC<SupportRequestModalProps> = ({
  isOpen,
  onClose,
  requestType,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await sendSupportRequest({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        request_type: requestType,
        message: formData.message,
      });

      toast.success('Support request sent successfully! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to send support request');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-secondary-800 rounded-2xl shadow-large"
        >
          <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
              Request {requestType.charAt(0).toUpperCase() + requestType.slice(1)} Access
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-primary-800 dark:text-primary-200">
                Please provide your details and reason for requesting {requestType} access. 
                Our team will review your request and contact you within 24-48 hours.
              </p>
            </div>

            <Input
              label="Full Name *"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              icon={<User className="w-5 h-5 text-secondary-400" />}
              required
            />

            <Input
              label="Email Address *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              icon={<Mail className="w-5 h-5 text-secondary-400" />}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              icon={<Phone className="w-5 h-5 text-secondary-400" />}
            />

            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Reason for Request *
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-3 w-5 h-5 text-secondary-400" />
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
                  placeholder="Please explain why you need this access level..."
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={sending}
                className="flex-1 group"
              >
                {sending ? 'Sending...' : 'Send Request'}
                <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportRequestModal;