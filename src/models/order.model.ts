export interface Order{
    id: number;
    createAt: string;
    address: string;
    receiver: string;
    contact: string;
    bookTitle: string;
    totalQuantity: number;
    totalPrice: number;
}

export interface OrderSheet{
    items: number[];
    totalQuantity: number;
    totalPrice: number;
    firstBookTitle: string;
    delivery: Delivery;
}

export interface Delivery {
    address: string;
    receiver: string;
    contact: string;
}

export interface OrderDetailItem {
    bookId: number;
    title: string;
    author: string;
    price: number;
    quantity: number;
}

// Order에 디테일 정보를 추가
export interface OrderListItem extends Order {
    detail?: OrderDetailItem[];
}