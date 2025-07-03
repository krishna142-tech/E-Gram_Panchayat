import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, Clock, IndianRupee, AlertCircle } from 'lucide-react';
import { getServices } from '../services/services';
import { Service } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, selectedCategory]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (error: any) {
      console.error('Error loading services:', error);
      toast.error(error.message || 'Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    setFilteredServices(filtered);
  };

  const categories = Array.from(new Set(services.map(service => service.category))).filter(Boolean);

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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Government Services
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Browse and apply for various government services available in your Gram Panchayat. 
              Fast, secure, and convenient online applications.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search services by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="w-5 h-5 text-secondary-400" />}
                />
              </div>
              
              <div className="lg:w-64">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 rounded-xl text-secondary-900 dark:text-secondary-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 transition-all duration-200"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="text-center py-16">
              {services.length === 0 ? (
                <>
                  <AlertCircle className="mx-auto h-16 w-16 text-warning-500 mb-6" />
                  <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-4">
                    No Services Available
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-6 max-w-md mx-auto">
                    There are currently no services available. Please check back later or contact 
                    your local administration.
                  </p>
                  <Button onClick={loadServices}>
                    Refresh Services
                  </Button>
                </>
              ) : (
                <>
                  <FileText className="mx-auto h-16 w-16 text-secondary-400 mb-6" />
                  <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-4">
                    No Services Found
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                    No services match your current search criteria. Try adjusting your search 
                    terms or clearing the filters.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                      }}
                    >
                      Clear Filters
                    </Button>
                    <Button onClick={loadServices}>
                      Refresh Services
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white line-clamp-2 flex-1">
                      {service.title}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 ml-3 whitespace-nowrap">
                      {service.category}
                    </span>
                  </div>
                  
                  <p className="text-secondary-600 dark:text-secondary-300 mb-6 line-clamp-3 flex-1">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                      <IndianRupee className="w-4 h-4 mr-2 text-success-600" />
                      <span>Application Fee: ₹{service.fee}</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                      <FileText className="w-4 h-4 mr-2 text-primary-600" />
                      <span>{service.requiredDocuments.length} documents required</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-500 dark:text-secondary-400">
                      <Clock className="w-4 h-4 mr-2 text-warning-600" />
                      <span>Processing time: 3-5 business days</span>
                    </div>
                  </div>
                  
                  <Link to={`/apply/${service.id}`} className="mt-auto">
                    <Button className="w-full group">
                      Apply Now
                      <motion.span
                        className="ml-2 inline-block"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Service Count */}
        {filteredServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-secondary-600 dark:text-secondary-300">
              Showing {filteredServices.length} of {services.length} services
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Services;