export interface Product {
  _id: string;
  name: string;
  // ...other product fields...
}

export interface OrderProduct {
  product: Product;
  quantity: number;
}

export interface Order {
  name: string;
  _id: string;
  user: string;
  phone: string;
  address: string;

  products: OrderProduct[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

export interface OrderDetails {
  name: string;
  email: string;
  address: string;
  phone: string;
  quantity: number;
  totalAmount?: number; // Add totalAmount to the OrderDetails interface
  withShipping?: string;
  wilaya?: string;
}
