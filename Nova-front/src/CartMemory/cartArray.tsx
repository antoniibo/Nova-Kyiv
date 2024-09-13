import React,{ useState } from "react";
import { Size } from "../api/api";

export interface CartItem {
    cartId: string;
    id: number;
    size:Size;
}

export const cartMemory: CartItem[] = [
    // {
    //     cartId: "9M",
    //     id: 9,
    //     size: {
    //         M:{
    //             remainder: 2
    //         }
    //     }
        
    // },
    // {
    //     cartId: "2R",
    //     id: 2,
    //     size: {
    //         R:{
    //             remainder: 3
    //         }
    //     }
    // }
];