export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  qty: number;
  price: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  discountCode?: string;
  createdAt?: string;
}
