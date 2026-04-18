import { useEffect, useState } from "react"
import { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";

export const useCart = ()=>{
    const [carts,setCarts] = useState<Cart[]>([]);
    const [isEmpty,setIsEmpty] = useState(true);
    const [ready, setReady] = useState(false);


    const deleteCartItem = (id: number) => {
        deleteCart(id).then(()=> {
            setCarts(carts.filter((cart)=>cart.id !== id));
        });
    }

    useEffect(()=>{
        fetchCart().then((carts) => {
            setCarts(carts);
            setIsEmpty(carts.length === 0);
        }).finally(() => {
            setReady(true);
        });
    },[])
    return {carts, isEmpty, deleteCartItem}
}