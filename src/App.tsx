import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import BrandStory from './components/BrandStory';
import CustomerShowcase from './components/CustomerShowcase';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';
import ClothingPage from './components/ClothingPage';
import CosmeticsPage from './components/CosmeticsPage';
import HandbagsPage from './components/HandbagsPage';
import CheckoutPage from './components/checkout/CheckoutPage';

function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'collections', name: 'Collections' },
    { id: 'about', name: 'About' },
    { id: 'testimonials', name: 'Reviews' },
    { id: 'newsletter', name: 'Newsletter' },
    { id: 'footer', name: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Update current section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      let current = 0;
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = index;
          }
        }
      });
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index].id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white auto-scroll-container">
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      
      <main>
        <section id="hero" className="scroll-snap-section">
          <Hero />
        </section>
        
        <section id="collections" className="scroll-snap-section">
          <FeaturedCollections />
        </section>
        
        <section id="about" className="scroll-snap-section">
          <BrandStory />
        </section>
        
        <section id="testimonials" className="scroll-snap-section">
          <CustomerShowcase />
        </section>
        
        <section id="newsletter" className="scroll-snap-section">
          <Newsletter />
        </section>
        
        <section id="footer" className="scroll-snap-section">
          <Footer />
        </section>
      </main>

      {/* Scroll Navigation Indicator */}
      <ScrollIndicator 
        sections={sections}
        currentSection={currentSection}
        onSectionClick={scrollToSection}
      />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/clothing" element={<ClothingPage />} />
            <Route path="/cosmetics" element={<CosmeticsPage />} />
            <Route path="/handbags" element={<HandbagsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;