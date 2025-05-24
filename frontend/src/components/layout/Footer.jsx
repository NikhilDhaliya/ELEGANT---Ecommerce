import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-gray-400 text-center mb-6">
            Stay updated with the latest products, exclusive offers, and styling tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-grow relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              Subscribe
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </form>
        </div>
        
        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/category/new-arrivals" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/category/bestsellers" className="text-gray-400 hover:text-white transition-colors">Bestsellers</Link></li>
              <li><Link to="/category/sale" className="text-gray-400 hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">ELEGANT</Link>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {currentYear} Elegant Shop. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;