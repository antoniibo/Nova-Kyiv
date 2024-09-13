import React, { useState, useEffect } from "react";
import { cartMemory } from "../CartMemory/cartArray";

interface CounterProps {
    maxCount: number;
    resetCount: boolean;
    onResetComplete: () => void;
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
}

const Counter: React.FC<CounterProps> = ({ maxCount, resetCount, onResetComplete, quantity, onQuantityChange }) => {
    const [count, setCount] = useState<number>(quantity);

    useEffect(() => {
        setCount(quantity);  
    }, [quantity]);

    useEffect(() => {
        if (resetCount) {
            setCount(1);
            onResetComplete();
        }
    }, [resetCount, onResetComplete]);

    const handleDecrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            onQuantityChange(newCount);
        }
        console.log(cartMemory)
    };

    const handleIncrement = () => {
        if (count < maxCount) {
            const newCount = count + 1;
            setCount(newCount);
            onQuantityChange(newCount);
        }
    };

    return (
        <div className="counter">
            <button onClick={handleDecrement}>-</button>
            <p>{count}</p>
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default Counter;
