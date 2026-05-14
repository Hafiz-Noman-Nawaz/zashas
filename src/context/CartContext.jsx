"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("zasha_cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse cart:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("zasha_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    setCartItems((prevItems) => {
      // Create a unique key if variants are used
      const cartItemId = selectedVariant ? `${product._id}-${selectedVariant}` : product._id;
      
      const existingItemIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        toast.success(`Increased quantity of ${product.name}`);
        return newItems;
      } else {
        // Add new item
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { 
          ...product, 
          cartItemId, 
          quantity, 
          selectedVariant 
        }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("zasha_cart");
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.discountedPrice || item.price || 0;
    return total + price * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
