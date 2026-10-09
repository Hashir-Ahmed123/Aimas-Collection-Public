import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  Mail,
  CheckCircle,
  ArrowLeft,
  Truck,
  Shield,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useCart, ShippingAddress } from '../../contexts/CartContext';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, createOrder, loading, error, clearError } = useCart();
  
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderError, setOrderError] = useState('');
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
    isDefault: false
  });
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const shipping = cartTotal > 5000 ? 0 : 250;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + shipping + tax;

  // Redirect if cart is empty
  if (!loading && cartItems.length === 0 && !orderPlaced) {
    navigate('/');
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setOrderError('');
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setOrderError('');
    
    // Validate required fields
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address || 
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode) {
      setOrderError('Please fill in all shipping address fields.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardholderName) {
        setOrderError('Please fill in all card details.');
        return;
      }
    }

    try {
      console.log('Attempting to create order...');
      const newOrderId = await createOrder(shippingAddress, paymentMethod);
      console.log('Order created successfully:', newOrderId);
      setOrderId(newOrderId);
      setOrderPlaced(true);
    } catch (error: any) {
      console.error('Order creation failed:', error);
      setOrderError(error.message || 'Failed to place order. Please try again.');
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-600" />
              </div>
              
              <h1 className="text-3xl font-merriweather font-bold text-gray-900 mb-4">
                Order Placed Successfully!
              </h1>
              
              <p className="text-lg text-gray-600 font-poppins mb-6">
                Thank you for your order. This order is saved in this browser only.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 font-poppins mb-1">Order ID</p>
                <p className="text-lg font-poppins font-semibold text-gray-900">#{orderId.slice(-8).toUpperCase()}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Clock size={24} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-poppins font-semibold text-gray-900">Processing</p>
                  <p className="text-xs text-gray-600">1-2 business days</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Truck size={24} className="text-orange-600" />
                  </div>
                  <p className="text-sm font-poppins font-semibold text-gray-900">Shipping</p>
                  <p className="text-xs text-gray-600">3-5 business days</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <p className="text-sm font-poppins font-semibold text-gray-900">Delivered</p>
                  <p className="text-xs text-gray-600">Within 7 days</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg font-poppins font-semibold hover:from-pink-600 hover:to-orange-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h1 className="text-3xl font-merriweather font-bold text-gray-900">
              Checkout
            </h1>
          </div>

          {/* Error Messages */}
          {(error || orderError) && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <span className="text-red-700 font-poppins">{error || orderError}</span>
              <button
                onClick={() => {
                  clearError();
                  setOrderError('');
                }}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          )}

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <span className="font-poppins font-semibold">1</span>
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-pink-500' : 'bg-gray-200'}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <span className="font-poppins font-semibold">2</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 ? (
                /* Shipping Information */
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-merriweather font-bold text-gray-900 mb-6">
                    Shipping Information
                  </h2>
                  
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            required
                            value={shippingAddress.fullName}
                            onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            required
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                            placeholder="+92 300 1234567"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          required
                          rows={3}
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                          placeholder="Enter your complete address"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                          placeholder="City"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                          State/Province *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                          placeholder="State/Province"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                          placeholder="Postal Code"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg font-poppins font-semibold hover:from-pink-600 hover:to-orange-600 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              ) : (
                /* Payment Information */
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-merriweather font-bold text-gray-900 mb-6">
                    Payment Method
                  </h2>
                  
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-colors">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-pink-500 focus:ring-pink-500"
                        />
                        <label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-poppins font-semibold text-gray-900">Cash on Delivery</p>
                              <p className="text-sm text-gray-600 font-poppins">Pay when you receive your order</p>
                            </div>
                            <Truck size={24} className="text-gray-400" />
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-colors">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="text-pink-500 focus:ring-pink-500"
                        />
                        <label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-poppins font-semibold text-gray-900">Credit/Debit Card</p>
                              <p className="text-sm text-gray-600 font-poppins">Secure payment with SSL encryption</p>
                            </div>
                            <CreditCard size={24} className="text-gray-400" />
                          </div>
                        </label>
                      </div>
                    </div>
                    
                    {/* Card Details (if card payment selected) */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                            Cardholder Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardDetails.cardholderName}
                            onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                            placeholder="Name on card"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              required
                              value={cardDetails.expiryDate}
                              onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                              placeholder="MM/YY"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-poppins font-medium text-gray-700 mb-2">
                              CVV *
                            </label>
                            <input
                              type="text"
                              required
                              value={cardDetails.cvv}
                              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-poppins"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-poppins font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Back to Shipping
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg font-poppins font-semibold hover:from-pink-600 hover:to-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Placing Order...' : 'Place Order'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-merriweather font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>
                
                {/* Items */}
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-poppins font-medium text-gray-900 text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600 font-poppins">
                          Qty: {item.quantity} × PKR {item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-2 border-t border-gray-200 pt-4">
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
                    <div className="flex justify-between font-poppins font-semibold text-lg">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">PKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Security Notice */}
                <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield size={16} className="text-green-600" />
                    <p className="text-sm text-green-700 font-poppins">
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;