export interface Review {
  text: string;
  images?: string[];
}

export interface Product {
  _id: string; // Ensure this is always a string
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  rating: number;
  reviews: Review[];
  colors: string[];
  sizes: string[];
  images: string[];
  withShipping: string;
}

export interface ProductPagination extends Product {
  products: Product[];
  totalProducts: number;
}
export interface NewProduct {
  _id?: string; // Ensure this is always a string
  name: string;
  description: string;
  price: number;
  discountedPrice?: number; // Ensure this is a required number
  rating: number;
  reviews: Review[];
  colors: string[];
  sizes: string[];
  images: string[];
  withShipping: string;
}

export interface ProductWithreviews extends Product {
  reviews: Review[];
}

export interface ProductPaginationreviews extends ProductPagination {
  reviews: Review[];
}
