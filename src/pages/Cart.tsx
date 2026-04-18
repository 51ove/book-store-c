import styled from "styled-components";
import Title from "../components/common/Title";
import { CartItem } from "../components/cart/CartItem";
import { useCart } from "../hooks/useCart";
import { useMemo, useState } from "react";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const {showAlert, showConfirm} = useAlert();
    const navigate = useNavigate();

    const {carts, deleteCartItem, isEmpty} = useCart();

    const [checkedItems, setCheckedItems] = useState<number[]>([]);

    const handleCheckItem = (id: number) => {
        if (checkedItems.includes(id)) {
            // 언체크
            setCheckedItems(checkedItems.filter((item)=> item !== id))
        } else {
            // 체크
            setCheckedItems([
                ...checkedItems,
                id
            ]);
            }
    }

    const handleItemDelete = (id: number) => {
        // 삭제 행위
        deleteCartItem(id);
    }

    // 총 수량 계산
    const totalQuantity = useMemo(()=> {
        return carts.reduce((acc, cart)=> {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.quantity;
            }

            return acc;
        }, 0)
    }, [carts, checkedItems]);

    // 총 가격 계산
    const totalPrice = useMemo(()=>{
        return carts.reduce((acc, cart)=> {
            if (checkedItems.includes(cart.id)) {
                return acc + (cart.price * cart.quantity);
            }

            return acc;
        },0)
    }, [carts, checkedItems])

    // 주문하기 버튼 클릭시
    const handleOrder = () => {
        if (checkedItems.length === 0) {
            showAlert("주문할 상품을 선택해 주세요.");
            return;
        }

        // 추가
        const firstCheckedCart = carts.find((cart) =>
            checkedItems.includes(cart.id)
        );

        if (!firstCheckedCart) {
            showAlert("선택한 상품 정보를 찾을 수 없습니다.");
            return;
        }


        // 주문 액션 -> 주문서 작성으로 데이터 전달
        const orderData: Omit<OrderSheet, "delivery"> = {
            items: checkedItems,
            totalPrice,
            totalQuantity,
            // firstBookTitle: carts[0].title,
            firstBookTitle: firstCheckedCart.title,
        };

        showConfirm("주문하시겠습니까?", ()=> {
            // order로 이동 (state를 전달하며)
            navigate("/order", {state: orderData})
        });
    }

    return (
    <>
        <Title size="large">장바구니</Title>
        <CartStyle>
            {
                !isEmpty && (
                    <>
                    <div className="content">
                    {
                        carts.map((item)=>(
                            <CartItem 
                                key={item.id} 
                                cart={item} 
                                checkedItems={checkedItems} 
                                onCheck={handleCheckItem}
                                onDelete={handleItemDelete}
                            />
                        ))
                    }
                    </div>
                    <div className="summary">
                        <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice}/>
                        <Button size="large" scheme="primary" onClick={handleOrder}>
                            주문하기
                        </Button>
                    </div>
                    </>
                )
            }
            {
                isEmpty && (
                    <Empty 
                        title="장바구니가 비었습니다" 
                        icon={<FaShoppingCart/>} 
                        description={<>장바구니를 채워보세요</>}
                    />
                )
            }
        </CartStyle>
    </>
    )
}

export const CartStyle = styled.div`
    display: flex;
    gap: 24px;
    justify-content: space-between;
    padding: 24px 0 0 0;

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .summary{
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .order-info {
        h1{
            padding: 0 0 24px 0;
        }

        border: 1px solid ${({theme})=> theme.color.border};
        border-radius: ${({theme})=> theme.borderRadius.default};
        padding: 12px;
    }

    .delivery {
        fieldset{
            border: 0;
            margin: 0;
            padding: 0 0 12px 0;
            display: flex;
            justify-content: start;
            gap: 8px;

            label {
                width: 80ps;
            }

            .input {
                flex: 1;
                input {
                    width: 100%;
                }
            }
        }

        .error-text {
            color: red;
            margin: 0;
            padding: 0 0 12px 0;
            text-align: right;
        }
    }
`;
export default Cart