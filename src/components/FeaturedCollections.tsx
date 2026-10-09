import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: 'Bridal Collection',
    titleUrdu: 'دلہن کا مجموعہ',
    description: 'Exquisite bridal wear crafted with premium fabrics and intricate embroidery',
    image: '/clothing/a-striking-portrait-photograph-of-a-paki_hwxxnEklRa-HC91O7G9ubQ_jaN6qOzAShaMvjaKPd2Gzw.jpeg',
    price: 'Starting from PKR 25,000',
    tag: 'Premium'
  },
  {
    id: 2,
    title: 'Formal Collection',
    titleUrdu: 'فارمل مجموعہ',
    description: 'Sophisticated formal wear perfect for elegant occasions',
    image: '/clothing/a-captivating-studio-portrait-photograph_YTSSpf6IQ7-Z7SC5dNdDbQ_s6mdFUa1TlGRjHosqXyH0Q.jpeg',
    price: 'Starting from PKR 8,000',
    tag: 'Best Seller'
  },
  {
    id: 3,
    title: 'Luxury Lawn',
    titleUrdu: 'لکسری لان',
    description: 'Premium lawn collection featuring contemporary prints and designs',
    image: '/clothing/a-photograph-of-a-young-woman-in-vibrant_8MuyvG8gQla_gJ1hRm7jqg_2_J1bsnZRhej3-fuLbBmQA.jpeg',
    price: 'Starting from PKR 4,500',
    tag: 'New Arrival'
  }
];

const FeaturedCollections = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section id="collections" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-merriweather font-bold text-gray-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-xl text-gray-600 font-poppins max-w-2xl mx-auto">
            Discover our carefully curated collections that blend traditional elegance with contemporary style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredItem(collection.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className={`px-3 py-1 rounded-full text-sm font-poppins font-semibold ${
                  collection.tag === 'Premium' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                  collection.tag === 'Best Seller' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' :
                  'bg-gradient-to-r from-green-500 to-teal-500 text-white'
                }`}>
                  {collection.tag}
                </span>
              </div>

              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredItem === collection.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-4 left-4 right-4">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-gray-900 py-3 rounded-lg font-poppins font-semibold flex items-center justify-center space-x-2 hover:bg-white transition-colors">
                      <Eye size={18} />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-merriweather font-bold text-gray-900 mb-2">
                  {collection.title}
                </h3>
                <p className="text-lg font-nastaliq text-gray-600 mb-3">
                  {collection.titleUrdu}
                </p>
                <p className="text-gray-600 font-poppins mb-4 leading-relaxed">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-poppins font-semibold text-gray-900">
                    {collection.price}
                  </span>
                  <Link 
                    to="/collections"
                    className="group/btn bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-2 rounded-full font-poppins font-medium hover:from-pink-600 hover:to-orange-600 transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>View More</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link 
            to="/collections"
            className="group bg-gradient-to-r from-pink-600 via-orange-500 to-purple-600 text-white px-12 py-4 rounded-full font-poppins font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto w-fit"
          >
            <span>Explore All Collections</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;