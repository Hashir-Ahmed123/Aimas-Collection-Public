import React, { createContext, useContext, useEffect, useState } from 'react';

const CART_STORAGE_KEY = 'aimas-collection-cart';
const ORDERS_STORAGE_KEY = 'aimas-collection-orders';

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;

  const item = value as Record<string, unknown>;
  return typeof item.id === 'string'
    && typeof item.productId === 'number'
    && typeof item.name === 'string'
    && typeof item.nameUrdu === 'string'
    && typeof item.price === 'number'
    && typeof item.image === 'string'
    && typeof item.quantity === 'number'
    && typeof item.category === 'string'
    && typeof item.subcategory === 'string';
}

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  nameUrdu: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  category: string;
  subcategory: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
  estimatedDelivery?: Date;
}

type StoredOrder = Omit<Order, 'createdAt' | 'updatedAt' | 'estimatedDelivery'> & {
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
};

function isShippingAddress(value: unknown): value is ShippingAddress {
  if (typeof value !== 'object' || value === null) return false;

  const address = value as Record<string, unknown>;
  return typeof address.fullName === 'string'
    && typeof address.phone === 'string'
    && typeof address.address === 'string'
    && typeof address.city === 'string'
    && typeof address.state === 'string'
    && typeof address.postalCode === 'string'
    && typeof address.country === 'string'
    && (address.isDefault === undefined || typeof address.isDefault === 'boolean');
}

function isStoredOrder(value: unknown): value is StoredOrder {
  if (typeof value !== 'object' || value === null) return false;

  const order = value as Record<string, unknown>;
  const validStatus = order.status === 'pending'
    || order.status === 'confirmed'
    || order.status === 'processing'
    || order.status === 'shipped'
    || order.status === 'delivered'
    || order.status === 'cancelled';
  return typeof order.id === 'string'
    && Array.isArray(order.items)
    && order.items.every(isCartItem)
    && typeof order.subtotal === 'number'
    && typeof order.shipping === 'number'
    && typeof order.tax === 'number'
    && typeof order.total === 'number'
    && isShippingAddress(order.shippingAddress)
    && typeof order.paymentMethod === 'string'
    && validStatus
    && typeof order.createdAt === 'string'
    && typeof order.updatedAt === 'string'
    && (order.estimatedDelivery === undefined || typeof order.estimatedDelivery === 'string')
    && (order.trackingNumber === undefined || typeof order.trackingNumber === 'string');
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  loading: boolean;
  error: string | null;
  addToCart: (product: any, selectedColor?: string, selectedSize?: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  createOrder: (shippingAddress: ShippingAddress, paymentMethod: string) => Promise<string>;
  getOrders: () => Promise<Order[]>;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart: unknown = JSON.parse(storedCart);
        if (!Array.isArray(parsedCart) || !parsedCart.every(isCartItem)) {
          throw new Error('Saved cart data has an invalid format.');
        }
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading saved cart:', error);
      setError('Failed to load your saved cart. Please clear browser storage and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  const saveCartLocally = (items: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    setCartItems(items);
  };

  const addToCart = async (product: any, selectedColor?: string, selectedSize?: string) => {
    setLoading(true);
    setError(null);

    try {
      const itemId = `${product.id}-${selectedColor || 'default'}-${selectedSize || 'default'}`;
      
      const existingItemIndex = cartItems.findIndex(item => item.id === itemId);
      
      let newCartItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        newCartItems = cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item - ensure no undefined values
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          name: product.name || 'Unknown Product',
          nameUrdu: product.nameUrdu || '',
          price: product.price || 0,
          originalPrice: product.originalPrice || undefined,
          image: product.image || '',
          quantity: 1,
          selectedColor,
          selectedSize,
          category: product.category || 'clothing',
          subcategory: product.subcategory || 'general'
        };
        
        newCartItems = [...cartItems, newItem];
      }
      
      saveCartLocally(newCartItems);
      
      // Show success message
      console.log('Item added to cart successfully!');
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const newCartItems = cartItems.filter(item => item.id !== itemId);
      saveCartLocally(newCartItems);
    } catch (error: any) {
      console.error('Error removing from cart:', error);
      setError('Failed to remove item from cart.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const newCartItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      
      saveCartLocally(newCartItems);
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      setError('Failed to update item quantity.');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    setError(null);
    
    try {
      saveCartLocally([]);
    } catch (error: any) {
      console.error('Error clearing cart:', error);
      setError('Failed to clear cart.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const createOrder = async (shippingAddress: ShippingAddress, paymentMethod: string): Promise<string> => {
    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    setLoading(true);
    setError(null);

    try {
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const shipping = subtotal > 5000 ? 0 : 250; // Free shipping over PKR 5000
      const tax = Math.round(subtotal * 0.05); // 5% tax
      const total = subtotal + shipping + tax;

      // Generate tracking number
      const trackingNumber = `AC${Date.now().toString().slice(-8)}`;

      const orderId = `AC-${Date.now().toString(36).toUpperCase()}`;
      const order: Order = {
        id: orderId,
        items: cartItems,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress,
        paymentMethod,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        trackingNumber,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };
      const orders = await getOrders();
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([...orders, order]));
      await clearCart();

      return orderId;
    } catch (error: any) {
      console.error('Error creating order:', error);
      setError('Failed to save the order in this browser. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async (): Promise<Order[]> => {
    try {
      setError(null);
      const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (!storedOrders) return [];

      const parsedOrders: unknown = JSON.parse(storedOrders);
      if (!Array.isArray(parsedOrders) || !parsedOrders.every(isStoredOrder)) {
        throw new Error('Saved order data has an invalid format.');
      }

      return parsedOrders.map((order) => {
        const createdAt = new Date(order.createdAt);
        const updatedAt = new Date(order.updatedAt);
        const estimatedDelivery = order.estimatedDelivery
          ? new Date(order.estimatedDelivery)
          : undefined;
        if (Number.isNaN(createdAt.getTime()) || Number.isNaN(updatedAt.getTime())
          || (estimatedDelivery && Number.isNaN(estimatedDelivery.getTime()))) {
          throw new Error('Saved order data has an invalid date.');
        }

        return {
          ...order,
          createdAt,
          updatedAt,
          estimatedDelivery
        };
      });
    } catch (error: any) {
      console.error('Error reading saved orders:', error);
      setError('Failed to load your saved orders. Please clear browser storage and try again.');
      throw error;
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value: CartContextType = {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    createOrder,
    getOrders,
    clearError
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};