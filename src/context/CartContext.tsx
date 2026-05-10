import React, { createContext, useContext, useState, useEffect } from 'react';
import { type CartItem, type Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedFlavor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1, selectedFlavor?: string, selectedSize?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedFlavor === selectedFlavor && item.selectedSize === selectedSize);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.selectedFlavor === selectedFlavor && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedFlavor, selectedSize }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
