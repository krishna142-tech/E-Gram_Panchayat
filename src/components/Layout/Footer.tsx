import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Digital E-Gram Panchayat</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering rural communities through digital governance. Access government 
              services, apply online, and track your applications seamlessly.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">+91 1234567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">info@grampanchayat.gov.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Village Office, District</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="/services" className="block text-sm text-gray-300 hover:text-white transition-colors">
                All Services
              </a>
              <a href="/about" className="block text-sm text-gray-300 hover:text-white transition-colors">
                About Us
              </a>
              <a href="/contact" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="/privacy" className="block text-sm text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2025 Digital E-Gram Panchayat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;