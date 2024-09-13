import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "../CartMemory/cartArray";

interface CartContextType {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number, size: string) => void;
    updateItem: (id: number, size: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addItem = (newItem: CartItem) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.cartId === newItem.cartId
            );
            if (existingItemIndex !== -1) {
                return prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { 
                            ...item, 
                            size: {
                                ...item.size,
                                [Object.keys(newItem.size)[0]]: {
                                    remainder: (item.size[Object.keys(newItem.size)[0]].remainder || 0) + newItem.size[Object.keys(newItem.size)[0]].remainder
                                }
                            }
                        }
                        : item
                );
            }
            return [...prevItems, newItem];
        });
    };

    const removeItem = (id: number, size: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id || Object.keys(item.size)[0] !== size));
    };

    const updateItem = (id: number, size: string, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && Object.keys(item.size)[0] === size
                    ? { ...item, size: { ...item.size, [size]: { remainder: quantity } } }
                    : item
            )
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, updateItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
