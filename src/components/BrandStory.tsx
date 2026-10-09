import React, { useEffect, useRef, useState } from 'react';
import { Award, Heart, Users, Sparkles } from 'lucide-react';

const BrandStory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users, number: '10,000+', label: 'Happy Customers' },
    { icon: Award, number: '15+', label: 'Years of Excellence' },
    { icon: Heart, number: '50,000+', label: 'Pieces Crafted' },
    { icon: Sparkles, number: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-900 mb-6">
                Our Story of
                <span className="block text-transparent bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 bg-clip-text">
                  Elegance & Tradition
                </span>
              </h2>
              <p className="text-lg text-gray-600 font-poppins leading-relaxed mb-6">
                Founded with a vision to celebrate the rich heritage of Pakistani fashion, Aima's Collection has been 
                at the forefront of creating exquisite clothing that honors tradition while embracing contemporary style.
              </p>
              <p className="text-lg text-gray-600 font-poppins leading-relaxed mb-8">
                Every piece in our collection tells a story - of skilled artisans, premium fabrics, and timeless designs 
                that have been passed down through generations. We believe in creating fashion that empowers women and 
                celebrates their individuality.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 transition-all duration-700 delay-${index * 100} ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mb-3">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 font-poppins mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-poppins">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Section */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative w-full h-[500px]">
              <div className="absolute top-0 left-0 w-1/2 h-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group mx-4">
                  <img
                    src="/Homepage/a-cinematic-portrait-photograph-of-a-pak_GvEw4bqGSCKExGSKzbpivg_BdF0E_VXRYOGwWMoIAAZJQ.jpeg"
                    alt="Fashion model"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="absolute top-1/4 left-1/2 w-1/2 h-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group mx-4">
                  <img
                    src="/Homepage/a-sophisticated-portrait-photograph-capt_E_Q1i02wSMCo-pdY0QX7DQ_oCZ03yn9TPmAvuEKov0WxQ.jpeg"
                    alt="Artisan at work"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;