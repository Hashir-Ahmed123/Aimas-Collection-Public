import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  CreditCard,
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white min-h-screen flex flex-col justify-end">
      {/* Main Footer */}
      <div className="flex-1 flex items-end">
        <div className="container mx-auto px-4 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 via-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl font-nastaliq">A</span>
              </div>
              <div>
                <h3 className="text-2xl font-merriweather font-bold bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                  Aima's Collection
                </h3>
                <p className="text-sm text-gray-400 font-nastaliq">عائمہ کا مجموعہ</p>
              </div>
            </div>
            <p className="text-gray-400 font-poppins leading-relaxed mb-6">
              Celebrating the perfect blend of traditional Pakistani craftsmanship and contemporary fashion for over 15 years.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition-all duration-300 group"
              >
                <Facebook size={18} className="group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition-all duration-300 group"
              >
                <Instagram size={18} className="group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition-all duration-300 group"
              >
                <Twitter size={18} className="group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition-all duration-300 group"
              >
                <Youtube size={18} className="group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-merriweather font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                'Home', 'Collections', 'Bridal Wear', 'Formal Collection', 
                'Luxury Lawn', 'About Us', 'Our Story', 'Size Guide'
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-pink-400 transition-colors font-poppins"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xl font-merriweather font-bold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              {[
                'Contact Us', 'Shipping Info', 'Returns & Exchanges', 'Size Chart',
                'Care Instructions', 'FAQ', 'Track Your Order', 'Customer Reviews'
              ].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-pink-400 transition-colors font-poppins"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-merriweather font-bold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-pink-400 mt-1 flex-shrink-0" />
                <div className="text-gray-400 font-poppins">
                  <p>Shop #12, Fashion Plaza</p>
                  <p>Main Boulevard, Gulberg III</p>
                  <p>Lahore, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-pink-400 flex-shrink-0" />
                <div className="text-gray-400 font-poppins">
                  <p>+92 42 1234-5678</p>
                  <p>+92 300 1234567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-pink-400 flex-shrink-0" />
                <div className="text-gray-400 font-poppins">
                  <p>info@aimascollection.com</p>
                  <p>orders@aimascollection.com</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h5 className="font-poppins font-semibold mb-2">Store Hours</h5>
              <div className="text-sm text-gray-400 font-poppins space-y-1">
                <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                <p>Sunday: 2:00 PM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Features Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 text-center md:text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck size={20} className="text-white" />
              </div>
              <div>
                <h6 className="font-poppins font-semibold text-sm">Free Shipping</h6>
                <p className="text-xs text-gray-400">Orders over PKR 5,000</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-center md:text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw size={20} className="text-white" />
              </div>
              <div>
                <h6 className="font-poppins font-semibold text-sm">Easy Returns</h6>
                <p className="text-xs text-gray-400">30-day return policy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-center md:text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h6 className="font-poppins font-semibold text-sm">Secure Payment</h6>
                <p className="text-xs text-gray-400">SSL encrypted</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-center md:text-left">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard size={20} className="text-white" />
              </div>
              <div>
                <h6 className="font-poppins font-semibold text-sm">Multiple Payment</h6>
                <p className="text-xs text-gray-400">Cards & Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 font-poppins text-sm">
                © {currentYear} Aima's Collection. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start space-x-6 mt-2">
                <a href="#" className="text-gray-500 hover:text-pink-400 text-sm font-poppins">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-pink-400 text-sm font-poppins">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-pink-400 text-sm font-poppins">Cookie Policy</a>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm font-poppins mr-2">We Accept:</span>
              <div className="flex space-x-2">
                {['Visa', 'Mastercard', 'PayPal', 'COD'].map((method) => (
                  <div 
                    key={method}
                    className="w-10 h-6 bg-gray-800 rounded border border-gray-700 flex items-center justify-center"
                  >
                    <span className="text-xs text-gray-400 font-poppins">{method.slice(0, 2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;