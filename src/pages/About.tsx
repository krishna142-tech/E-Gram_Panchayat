import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, Shield, Globe } from 'lucide-react';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Citizen-Centric',
      description: 'Designed with citizens at the heart of every feature and interaction.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Bank-level security ensuring your data is always protected.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Globe,
      title: 'Accessible Anywhere',
      description: '24/7 access to government services from any device, anywhere.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Efficient Processing',
      description: 'Streamlined workflows that reduce processing time significantly.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Citizens Served' },
    { number: '25+', label: 'Services Available' },
    { number: '99.9%', label: 'Uptime' },
    { number: '3-5', label: 'Days Processing' },
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
              About Digital E-Gram Panchayat
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Transforming rural governance through digital innovation, making government 
              services accessible, transparent, and efficient for every citizen.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-4xl mx-auto leading-relaxed">
            To bridge the digital divide in rural governance by providing a comprehensive, 
            user-friendly platform that empowers citizens to access government services 
            efficiently while enabling administrators to serve their communities better.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <Card hover>
                <div className="text-3xl md:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
              To create a future where every citizen, regardless of their location or 
              technical expertise, can easily access and benefit from government services. 
              We envision a transparent, efficient, and inclusive digital governance 
              ecosystem that serves as a model for rural development worldwide.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;