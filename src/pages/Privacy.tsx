import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';

const Privacy: React.FC = () => {
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, submit applications, or contact us for support. This includes personal information like name, email, phone number, and government documents.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: 'We use your information to provide and improve our services, process your applications, communicate with you, ensure security, and comply with legal obligations.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: UserCheck,
      title: 'Information Sharing',
      content: 'We do not sell, trade, or rent your personal information to third parties. We may share information with government agencies as required for service delivery and legal compliance.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const dataTypes = [
    'Personal identification information (Name, Address, Phone)',
    'Government identification numbers (Aadhar, PAN)',
    'Email addresses and contact information',
    'Application data and supporting documents',
    'Usage data and platform interactions',
    'Device information and IP addresses'
  ];

  const rights = [
    'Access your personal data',
    'Correct inaccurate information',
    'Request deletion of your data',
    'Object to processing',
    'Data portability',
    'Withdraw consent'
  ];

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            <p className="text-sm text-primary-200">
              Last updated: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-6">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-4xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your 
            personal information. This privacy policy outlines our practices regarding data 
            collection, use, and protection.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                      {section.title}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Data Types and Rights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Data Types */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
                Types of Data We Collect
              </h3>
              <div className="space-y-3">
                {dataTypes.map((type, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-secondary-600 dark:text-secondary-300">{type}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* User Rights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-6">
                Your Rights
              </h3>
              <div className="space-y-3">
                {rights.map((right, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <UserCheck className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                    <p className="text-secondary-600 dark:text-secondary-300">{right}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Data Retention */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              Data Retention
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">
              We retain your personal information for as long as necessary to provide our services 
              and comply with legal obligations. Specific retention periods include:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <h4 className="font-medium text-secondary-900 dark:text-white mb-1">Account Data</h4>
                <p className="text-sm text-secondary-600 dark:text-secondary-300">Until account deletion</p>
              </div>
              <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <h4 className="font-medium text-secondary-900 dark:text-white mb-1">Application Records</h4>
                <p className="text-sm text-secondary-600 dark:text-secondary-300">7 years (legal requirement)</p>
              </div>
              <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <h4 className="font-medium text-secondary-900 dark:text-white mb-1">Usage Logs</h4>
                <p className="text-sm text-secondary-600 dark:text-secondary-300">12 months</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              Cookies and Tracking
            </h3>
            <p className="text-secondary-600 dark:text-secondary-300 mb-4">
              We use cookies and similar technologies to enhance your experience, analyze usage, 
              and improve our services. You can control cookie settings through your browser.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-1">Essential Cookies</h4>
                <p className="text-sm text-primary-800 dark:text-primary-200">Required for platform functionality</p>
              </div>
              <div className="p-4 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <h4 className="font-medium text-secondary-900 dark:text-white mb-1">Analytics Cookies</h4>
                <p className="text-sm text-secondary-600 dark:text-secondary-300">Help us improve our services</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-warning-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-warning-900 dark:text-warning-100 mb-2">
                  Questions About Privacy?
                </h3>
                <p className="text-warning-800 dark:text-warning-200 mb-4">
                  If you have any questions about this privacy policy or our data practices, 
                  please contact our Data Protection Officer.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-warning-800 dark:text-warning-200">
                    <strong>Email:</strong> privacy@grampanchayat.gov.in
                  </p>
                  <p className="text-warning-800 dark:text-warning-200">
                    <strong>Phone:</strong> +91 1234567890
                  </p>
                  <p className="text-warning-800 dark:text-warning-200">
                    <strong>Address:</strong> Village Office, District, State
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;