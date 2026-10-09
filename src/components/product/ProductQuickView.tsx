import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Plus, Minus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  nameUrdu: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  description: string;
}

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, selectedColor, selectedSize);
    }
    onClose();
  };

  const getColorStyle = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'red': '#ef4444',
      'blue': '#3b82f6',
      'green': '#10b981',
      'pink': '#ec4899',
      'navy': '#1e3a8a',
      'black': '#000000',
      'white': '#ffffff',
      'grey': '#808080',
      'beige': '#f5f5dc',
      'yellow': '#ffd700',
      'orange': '#ffa500',
      'wine': '#722f37',
      'royal blue': '#4169e1',
      'emerald': '#50c878',
      'maroon': '#800000',
      'gold': '#ffd700',
      'cream': '#f5f5dc',
      'light blue': '#add8e6'
    };
    return colorMap[color.toLowerCase()] || '#9ca3af';
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-merriweather font-bold text-gray-900">
              Quick View
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover rounded-lg"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart
                  size={18}
                  className={`${
                    isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'
                  } transition-colors`}
                />
              </button>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-poppins">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl font-merriweather font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-xl font-nastaliq text-gray-600">
                  {product.nameUrdu}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-poppins font-bold text-gray-900">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl font-poppins text-gray-500 line-through">
                      PKR {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-poppins font-semibold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 font-poppins leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-3">
                    Color: <span className="font-normal">{selectedColor}</span>
                  </h4>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-pink-500 ring-2 ring-pink-200'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: getColorStyle(color) }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes.length > 0 && (
                <div>
                  <h4 className="font-poppins font-semibold text-gray-900 mb-3">
                    Size: <span className="font-normal">{selectedSize}</span>
                  </h4>
                  <div className="flex space-x-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg font-poppins font-medium transition-all ${
                          selectedSize === size
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h4 className="font-poppins font-semibold text-gray-900 mb-3">Quantity</h4>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-poppins font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-4 rounded-lg font-poppins font-semibold text-lg hover:from-pink-600 hover:to-orange-600 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>Add to Cart - PKR {(product.price * quantity).toLocaleString()}</span>
              </button>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-poppins">Free Shipping</p>
                  <p className="text-xs text-gray-500 font-poppins">Orders over PKR 5,000</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 font-poppins">Easy Returns</p>
                  <p className="text-xs text-gray-500 font-poppins">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductQuickView;