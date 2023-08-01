import { createContext, useContext, useState } from 'react';
const CartContext = createContext({
    item:[],
    totalAmount:0,
    addItem:(item)=>{},
    removeItem:(id)=>{},
    deleteItem:(id)=>{}
})
export default CartContext;