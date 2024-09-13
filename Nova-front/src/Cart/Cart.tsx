import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {CartItem } from "../CartMemory/cartArray";
import { DataItem, fetchDataById } from "../api/api";
import Counter from "../tools/counter";
import config from "../config";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../Context/Context";

interface CartProps {
    isVisible: boolean;
    toggleVisibility: () => void;
}

interface CartItemWithDetails extends CartItem, DataItem {
    quantity: number;
    sizeCart: string;
}
function Cart({ isVisible, toggleVisibility }: CartProps) {
    const { cartItems, removeItem, updateItem } = useCart();
    const [fetchedItems, setFetchedItems] = useState<CartItemWithDetails[]>([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const items: CartItemWithDetails[] = await Promise.all(
                cartItems.map(async (cartItem) => {
                    const data = await fetchDataById(cartItem.id);
                    const sizeKey = Object.keys(cartItem.size)[0];
                    const quantity = cartItem.size[sizeKey].remainder;
                    return { ...cartItem, ...data, quantity, sizeCart: sizeKey };
                })
            );
            setFetchedItems(items);
        };

        fetchCartItems();
    }, [cartItems]);

    const handleDelete = (id: number, size: string) => {
        removeItem(id, size);
    };

    const handleQuantityChange = (id: number, size: string, newQuantity: number) => {
        updateItem(id, size, newQuantity);
    };

    return (
        <>
            <div className={`cart-backdrop ${isVisible ? "open" : ""}`} onClick={toggleVisibility}></div>
            <section className={`cart ${isVisible ? "open" : ""}`}>
                <div className="cart-menu">
                    <div className="cart-row">
                        <h3>Кошик</h3>
                        <button onClick={toggleVisibility}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    {fetchedItems.length > 0 ? (
                        <>
                    <div className="cart-list">
                        {fetchedItems.map((cartItem, index) => (
                            <div className="cart-item" key={index}>
                                <div className="cart-photo">
                                    <img src={`${config.BASE_URL}images/${cartItem.photos[0]}`} alt="item image" />
                                </div>
                                <div className="cart-desc">
                                    <h3>{cartItem.header}</h3>
                                    <p>{cartItem.price} ₴</p>
                                    <p>{cartItem.sizeCart}</p>
                                    <div className="cart-amount">
                                       <Counter 
                                            maxCount={cartItem.size[cartItem.sizeCart].remainder} 
                                            resetCount={false} 
                                            onResetComplete={() => {}} 
                                            quantity={cartItem.quantity} 
                                            onQuantityChange={(newQuantity) => handleQuantityChange(cartItem.id, cartItem.sizeCart, newQuantity)}
                                        />
                                        <p onClick={() => handleDelete(cartItem.id, cartItem.sizeCart)}>Вилучити</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                     
                    <div className="to-checkout">
                        <p className="total">Всього: <b>{fetchedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)} ₴</b></p>
                        <Link to='/checkout' className="to-checkout">Оформити замовлення</Link>
                        <p>Податки та вартість доставки обчислюються під час оформлення замовлення</p>
                    </div>
                    </>
                    ) : (
                        <p className="empty">Кошик пустий</p>
                    )}
                </div>
            </section>
        </>
    );
}

export default Cart;