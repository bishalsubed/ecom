"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, clearCartItems, getCartItems } from '@/helpers/cartHelper';

type CartItem = { id: string; name: string; quantity: number; price: number; img: string };

const CartContext = createContext<any>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Only run this on the client side
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCart(storedCart);
        }
    }, []); // Empty array ensures this effect only runs once, after the component mounts

    useEffect(() => {
        const handleStorageChange = () => {
            setCart(getCartItems());
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('storage', handleStorageChange);
            }
        };
    }, []);

    const updateCart = () => {
        setCart(getCartItems());
    };

    const addToCart = (itemObj: CartItem) => {
        addItemToCart(itemObj);
        updateCart();
    };

    const removeFromCart = (itemId: string) => {
        removeItemFromCart(itemId);
        updateCart();
    };

    const increaseQuantity = (itemId: string) => {
        increaseItemQuantity(itemId);
        updateCart();
    };

    const decreaseQuantity = (itemId: string) => {
        decreaseItemQuantity(itemId);
        updateCart();
    };

    const clearCart = () => {
        clearCartItems();
        updateCart();
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
