import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    services: [
      { name: 'Birth Certificate', href: '/services' },
      { name: 'Death Certificate', href: '/services' },
      { name: 'Income Certificate', href: '/services' },
      { name: 'Caste Certificate', href: '/services' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    government: [
      { name: 'About Panchayat', href: '/about' },
      { name: 'Officials', href: '/officials' },
      { name: 'Schemes', href: '/schemes' },
      { name: 'Transparency', href: '/transparency' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-secondary-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
                  <span className="text-white font-bold text-xl">GP</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Digital E-Gram Panchayat</h3>
                  <p className="text-secondary-400 text-sm">Empowering Rural Communities</p>
                </div>
              </div>
              
              <p className="text-secondary-300 leading-relaxed max-w-md">
                Bridging the digital divide in rural governance. Access government services, 
                apply online, and track your applications seamlessly through our modern platform.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-secondary-300">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center space-x-3 text-secondary-300">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>info@grampanchayat.gov.in</span>
                </div>
                <div className="flex items-center space-x-3 text-secondary-300">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>Village Office, District, State</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Government Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Government</h4>
            <ul className="space-y-3">
              {footerLinks.government.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-300 hover:text-primary-400 transition-colors duration-200 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-secondary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-secondary-400 text-sm">
            © 2025 Digital E-Gram Panchayat. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-secondary-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;