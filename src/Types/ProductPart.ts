import { LandingEditingProps } from "./LandingEditing";

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
  LandingPageContent?: LandingEditingProps[];
  category: string;
}

export interface ProductPagination extends Product {
  products: Product[];
  totalProducts: number;
  hasMore: boolean;
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
  LandingPageContent?: LandingEditingProps[];
  category: string;
}

export interface ProductWithreviews extends Product {
  reviews: Review[];
}

export interface Categoryoption {
  category: true;
  categoryId: string;
  initialProducts: Product[];
  productsRef?: React.RefObject<HTMLDivElement>;
  searchParams: { name: string };
}

export interface Productoption {
  category: false;
  initialProducts: Product[];
  productsRef?: React.RefObject<HTMLDivElement>;
  categoryId?: string;
  searchParams?: { name: string };
}

export interface ProductPaginationOnly {
  products: Product[];
  totalProducts: number;
  hasMore: boolean;
}
