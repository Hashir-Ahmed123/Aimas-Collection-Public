import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('collections');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/Homepage/a-vibrant-fashion-forward-portrait-photo_DzYZZDAbQTeccI5SJRBGqQ__krF5RzXRNaygGNcKYxWsw.jpeg)',
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/80 via-orange-500/70 to-purple-600/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-white/90 font-poppins">Trusted by 10,000+ customers</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-merriweather font-bold mb-6 leading-tight">
            Elegance
            <div className="flex justify-center items-center mt-2">
              <span className="text-4xl md:text-6xl font-nastaliq">خوبصورتی</span>
            </div>
            <span className="block text-5xl md:text-7xl mt-6">Redefined</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 font-poppins max-w-2xl mx-auto leading-relaxed">
            Discover the perfect blend of traditional Pakistani craftsmanship and contemporary fashion
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={scrollToNext}
              className="group bg-white text-gray-900 px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Shop Collections</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group border-2 border-white text-white px-8 py-4 rounded-full font-poppins font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              Watch Our Story
            </button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 bg-white/30 rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float-delay">
          <div className="w-6 h-6 bg-white/20 rounded-full"></div>
        </div>
        <div className="absolute bottom-32 left-20 animate-float-delay-2">
          <div className="w-3 h-3 bg-white/40 rounded-full"></div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors group"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center animate-scroll-pulse">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
          <ChevronDown size={20} className="animate-bounce group-hover:translate-y-1 transition-transform" />
          <span className="text-sm font-poppins">Scroll to explore</span>
        </button>
      </div>
    </section>
  );
};

export default Hero;