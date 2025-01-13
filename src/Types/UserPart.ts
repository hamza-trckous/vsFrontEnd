export interface Product {
  _id: string;
  name: string;
  // ...other product fields...
}

export interface CartItem {
  productId: Product;
  quantity: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  cart: CartItem[];
}
