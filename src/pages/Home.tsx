import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Users, 
  FileText, 
  Shield, 
  Clock,
  CheckCircle,
  Star,
  Globe,
  Smartphone,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Users,
      title: 'Citizen Services',
      description: 'Access all government services from the comfort of your home with our intuitive platform.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FileText,
      title: 'Online Applications',
      description: 'Submit applications online and track their progress in real-time with instant notifications.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with bank-level security measures and encrypted transactions.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access services anytime, anywhere, at your convenience without office hour restrictions.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Citizens Served', icon: Users },
    { number: '25+', label: 'Government Services', icon: FileText },
    { number: '99.9%', label: 'Uptime Guarantee', icon: Shield },
    { number: '24/7', label: 'Support Available', icon: Clock },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Local Farmer',
      content: 'Getting my income certificate was so easy! No more long queues or multiple visits to the office.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Small Business Owner',
      content: 'The online application process saved me so much time. I could track everything from my phone.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Village Resident',
      content: 'Excellent service! The staff was helpful and the whole process was transparent and quick.',
      rating: 5
    }
  ];

  return (
    <div className="bg-white dark:bg-secondary-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-secondary-900 dark:via-secondary-900 dark:to-secondary-800"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent-200 dark:bg-accent-800 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-success-200 dark:bg-success-800 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
            >
              <Award className="w-4 h-4 mr-2" />
              Trusted by 10,000+ Citizens
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 bg-clip-text text-transparent">
                Digital E-Gram
              </span>
              <br />
              <span className="text-secondary-900 dark:text-white">
                Panchayat
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 max-w-4xl mx-auto leading-relaxed"
            >
              Bridging the gap between citizens and government services through 
              digital innovation, transparency, and seamless user experience.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {user ? (
                <Link
                  to={user.role === 'admin' ? '/dashboard/admin' : user.role === 'staff' ? '/dashboard/staff' : '/dashboard/user'}
                >
                  <Button size="xl" className="group">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="xl" className="group">
                      Get Started Today
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" size="xl">
                      Explore Services
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl mb-3">
                    <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white">
                    {stat.number}
                  </div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary-50 dark:bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
              Experience the future of governance with our comprehensive digital platform 
              designed for modern citizens and efficient administration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-soft group-hover:shadow-glow transition-all duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              What Citizens Say
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
              Real feedback from real people who have experienced the convenience 
              of our digital government services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-warning-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join thousands of citizens who are already benefiting from our digital services. 
              Experience the convenience of modern governance today.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button 
                    variant="secondary" 
                    size="xl" 
                    className="bg-white text-primary-700 hover:bg-primary-50 group"
                  >
                    Create Account
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button 
                    variant="outline" 
                    size="xl"
                    className="border-white text-white hover:bg-white hover:text-primary-700"
                  >
                    Browse Services
                  </Button>
                </Link>
              </div>
            )}

            {/* Additional Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center space-x-3 text-primary-100"
              >
                <Globe className="w-6 h-6" />
                <span>Available 24/7</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center space-x-3 text-primary-100"
              >
                <Smartphone className="w-6 h-6" />
                <span>Mobile Friendly</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center space-x-3 text-primary-100"
              >
                <Shield className="w-6 h-6" />
                <span>Secure & Private</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;