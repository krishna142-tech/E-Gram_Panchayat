import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react';
import { sendContactEmail } from '../services/emailService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await sendContactEmail({
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 1234567890',
      description: 'Mon-Fri from 9am to 6pm',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@grampanchayat.gov.in',
      description: 'We reply within 24 hours',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Village Office, District, State',
      description: 'Visit us during office hours',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Mon-Fri: 9:00 AM - 6:00 PM',
      description: 'Sat: 9:00 AM - 2:00 PM',
      color: 'from-orange-500 to-orange-600'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help you with all 
              your government service needs.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hover className="text-center h-full">
                <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-secondary-900 dark:text-white font-medium mb-1">
                  {info.details}
                </p>
                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                  {info.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center mr-3">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                  Send us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <Input
                  label="Subject *"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100 placeholder-secondary-500 dark:placeholder-secondary-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  loading={submitting}
                  className="w-full group"
                  size="lg"
                >
                  {submitting ? 'Sending Message...' : 'Send Message'}
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Card>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-secondary-900 dark:text-white mb-1">
                    How long does application processing take?
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">
                    Most applications are processed within 3-5 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900 dark:text-white mb-1">
                    What documents do I need?
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">
                    Required documents vary by service. Check the service details page.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900 dark:text-white mb-1">
                    Can I track my application status?
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300">
                    Yes, you can track your application status in your dashboard.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                Emergency Contact
              </h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-4">
                For urgent matters that require immediate attention, please contact 
                our emergency helpline.
              </p>
              <div className="flex items-center space-x-3 p-4 bg-error-50 dark:bg-error-900/20 rounded-lg">
                <Phone className="w-5 h-5 text-error-600 dark:text-error-400" />
                <div>
                  <p className="font-medium text-error-900 dark:text-error-100">
                    Emergency Helpline
                  </p>
                  <p className="text-error-700 dark:text-error-300">
                    +91 9876543210
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;