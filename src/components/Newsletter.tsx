import React, { useState } from 'react';
import { Mail, Gift, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
      <section className="flex flex-col min-h-screen bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
            <Mail size={40} className="text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-merriweather font-bold text-white mb-6">
            Stay in Style
          </h2>
          <p className="text-xl text-white/90 font-poppins mb-8 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and styling tips
          </p>

          {/* Benefits */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-white/90">
              <Gift size={20} />
              <span className="font-poppins">15% off first order</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Mail size={20} />
              <span className="font-poppins">Weekly style updates</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <CheckCircle size={20} />
              <span className="font-poppins">VIP early access</span>
            </div>
          </div>

          {/* Newsletter Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full text-gray-900 font-poppins text-lg placeholder-gray-500 border-none outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                disabled={isLoading || isSubmitted}
              />
              
              <button
                type="submit"
                disabled={isLoading || isSubmitted || !email}
                className={`absolute right-2 top-2 bottom-2 px-8 rounded-full font-poppins font-semibold transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : isLoading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed'
                }`}
              >
                {isSubmitted ? (
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={18} />
                    <span>Subscribed!</span>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  'Subscribe'
                )}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mt-6 p-4 bg-white/20 rounded-lg backdrop-blur-sm animate-fade-in">
              <p className="text-white font-poppins">
                Welcome to the Aima's Collection family! Check your email for your exclusive discount code.
              </p>
            </div>
          )}

          {/* Privacy Note */}
          <p className="text-sm text-white/70 font-poppins mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;