import { useEffect, useState } from "react"
import { fetchOrder, fetchOrders } from "../api/order.api";
import { Order, OrderListItem } from "../models/order.model";

export const useOrders = ()=>{
    const [orders, setOrders] = useState<OrderListItem[]>();
    const [selectedItemId, setSelectedItemId] = useState<number|null>(null);

    // 주문 목록 가져오기
    useEffect(()=>{
        fetchOrders().then((orders) => {
            setOrders(orders)
        })
        
    },[])
    
    // 자세히 보기 클릭한 아이템 등록
    const selectOrderItem = (orderId: number)=>{

        // 요청 방어 (선택한 주문에 이미 디테일 정보가 등록되어 있을때)
        if (orders?.filter((item) => item.id === orderId)[0].detail) {
            setSelectedItemId(orderId);
            return;
        }

        // 클릭한 아이템 id로 주문 상세 정보 가져오기
        fetchOrder(orderId).then((orderDetail) =>{
            setSelectedItemId(orderId);
            // 주문 목록 중에 선택한 목록에는 디테일 정보 추가
            setOrders(
                orders?.map((item) => {
                    if (item.id === orderId) {
                        return {
                            ...item,
                            detail: orderDetail,
                        };
                    }
                    return item;
                })
            )
        })
    }

    return {orders, selectedItemId, selectOrderItem};
}