import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';

const Terms: React.FC = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using the Digital E-Gram Panchayat platform, you accept and agree to be bound by the terms and provision of this agreement.'
    },
    {
      title: 'Use License',
      content: 'Permission is granted to temporarily use this platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.'
    },
    {
      title: 'User Account',
      content: 'You are responsible for safeguarding the password and for maintaining the confidentiality of your account. You agree not to disclose your password to any third party.'
    },
    {
      title: 'Prohibited Uses',
      content: 'You may not use our platform for any unlawful purpose, to transmit any harmful code, or to interfere with the security of the platform.'
    },
    {
      title: 'Service Availability',
      content: 'We strive to maintain 99.9% uptime but do not guarantee uninterrupted access. Scheduled maintenance will be announced in advance.'
    },
    {
      title: 'Data Protection',
      content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
    }
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
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our platform.
            </p>
            <p className="text-sm text-primary-200">
              Last updated: January 2025
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100 mb-2">
                  Important Notice
                </h2>
                <p className="text-primary-800 dark:text-primary-200">
                  These terms of service constitute a legally binding agreement between you and 
                  Digital E-Gram Panchayat. By using our platform, you acknowledge that you have 
                  read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
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

        {/* Additional Terms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <Card>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
              Additional Important Terms
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-600 dark:text-secondary-300">
                  <strong>Modifications:</strong> We reserve the right to modify these terms at any time. 
                  Changes will be effective immediately upon posting.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-600 dark:text-secondary-300">
                  <strong>Termination:</strong> We may terminate or suspend your account immediately, 
                  without prior notice, for conduct that violates these terms.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-600 dark:text-secondary-300">
                  <strong>Governing Law:</strong> These terms shall be governed by and construed in 
                  accordance with the laws of India.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                <p className="text-secondary-600 dark:text-secondary-300">
                  <strong>Contact:</strong> If you have any questions about these terms, please 
                  contact us at legal@grampanchayat.gov.in
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-warning-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-warning-900 dark:text-warning-100 mb-2">
                  Disclaimer
                </h3>
                <p className="text-warning-800 dark:text-warning-200 text-sm">
                  The information on this platform is provided on an "as is" basis. To the fullest 
                  extent permitted by law, this platform excludes all representations, warranties, 
                  conditions and terms whether express or implied.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;