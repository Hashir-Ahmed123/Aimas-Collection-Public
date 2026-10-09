import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartSidebar from './cart/CartSidebar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('categories-dropdown');
      const button = document.getElementById('categories-button');
      if (dropdown && button && !dropdown.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const categoryItems = [
    { id: 'clothing', name: 'Clothing', description: 'Formal & Casual Wear', path: '/clothing' },
    { id: 'cosmetics', name: 'Cosmetics', description: 'Beauty & Makeup', path: '/cosmetics' },
    { id: 'handbags', name: 'Handbags', description: 'Bags & Accessories', path: '/handbags' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-3 md:py-1">
          <div className="flex items-center justify-between">
            {/* ✅ Logo from Code 2 */}
            <button onClick={() => scrollToSection('home')} className="flex items-center space-x-2 flex-shrink-0">
              <div className="h-16 md:h-16 lg:h-16 flex items-center">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-full scale-[1.7] md:scale-[2] lg:scale-[2.3] object-contain origin-left"
                />
              </div>
            </button>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium">
                Home
              </Link>

              <div className="relative">
                <button
                  id="categories-button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium"
                >
                  <span>Categories</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div id="categories-dropdown" className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                    {categoryItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="w-full px-6 py-3 text-left hover:bg-gray-50 transition-colors group block"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-poppins font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500 font-poppins">{item.description}</p>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ChevronDown size={14} className="text-white rotate-[-90deg]" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium">
                About
              </button>
              <button onClick={() => scrollToSection('footer')} className="text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium">
                Contact
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="hidden sm:block p-2 text-gray-700 hover:text-pink-600 transition-colors">
                <Search size={20} />
              </button>

              {/* 🛒 Cart Button from Code 1 */}
              <button onClick={toggleCart} className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors">
                <ShoppingBag size={18} className="md:w-5 md:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold text-[10px] md:text-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="lg:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors ml-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t">
              <nav className="flex flex-col space-y-4 p-6">
                <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-poppins font-semibold text-gray-500 mb-3 uppercase tracking-wide">Categories</h4>
                  {categoryItems.map((item) => (
                    <Link key={item.id} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium">
                      {item.name}
                    </Link>
                  ))}
                </div>

                <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium">
                  About
                </button>
                <button onClick={() => scrollToSection('footer')} className="text-left text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium">
                  Contact
                </button>

                <div className="border-t border-gray-200 pt-4">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors font-poppins font-medium">
                    <Search size={18} />
                    <span>Search</span>
                  </button>
                </div>

              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />

    </>
  );
};

export default Header;
