import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar: React.FC = () => {
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    isCartOpen, 
    loading,
    toggleCart, 
    updateQuantity, 
    removeFromCart 
  } = useCart();

  if (!isCartOpen) return null;

  const shipping = cartTotal > 5000 ? 0 : 250;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + shipping + tax;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={toggleCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={24} className="text-pink-500" />
            <h2 className="text-xl font-merriweather font-bold text-gray-900">
              Shopping Cart
            </h2>
            {cartCount > 0 && (
              <span className="bg-pink-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </div>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-merriweather font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 font-poppins mb-6">
                  Add some beautiful items to get started
                </p>
                <button
                  onClick={toggleCart}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-poppins font-semibold hover:from-pink-600 hover:to-orange-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-merriweather font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 font-nastaliq mb-2 line-clamp-1">
                          {item.nameUrdu}
                        </p>
                        
                        {/* Color and Size */}
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 font-poppins mb-2">
                          {item.selectedColor && (
                            <span className="bg-white px-2 py-1 rounded-full">
                              Color: {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="bg-white px-2 py-1 rounded-full">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="font-poppins font-semibold text-gray-900">
                            PKR {item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through font-poppins">
                              PKR {item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={loading}
                              className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center font-poppins font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={loading}
                              className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            disabled={loading}
                            className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1"
                            title="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer with Totals and Checkout - Fixed */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 bg-white flex-shrink-0">
            <div className="p-6">
              {/* Order Summary */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm font-poppins">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">PKR {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-poppins">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `PKR ${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-poppins">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">PKR {tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-poppins font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">PKR {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-700 font-poppins">
                    Add PKR {(5000 - cartTotal).toLocaleString()} more for free shipping!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                to="/checkout"
                onClick={toggleCart}
                className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg font-poppins font-semibold hover:from-pink-600 hover:to-orange-600 transition-colors flex items-center justify-center space-x-2 mb-3"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </Link>
              
              <button
                onClick={toggleCart}
                className="w-full text-gray-600 hover:text-gray-800 font-poppins text-sm transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;