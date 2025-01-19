import axios from "axios";
import { Product, NewProduct, ProductPagination } from "../Types/ProductPart";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, // Backend API base URL
  withCredentials: true, // Include cookies in requests
});

// Fetch all products
export const getAllProducts = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): Promise<ProductPagination> => {
  try {
    const response = await api.get<ProductPagination>(
      `?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Fetch all products
export const getAllProductsNormal = async (): Promise<ProductPagination> => {
  try {
    const response = await api.get<ProductPagination>(``);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new product
export const createProduct = async (
  productData: Omit<NewProduct, "_id">
): Promise<Product> => {
  try {
    const response = await api.post<Product>("", productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (
  id: string,
  productData: Partial<Omit<NewProduct, "_id">>
): Promise<Product> => {
  try {
    const response = await api.put<Product>(`/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await api.delete<{ message: string }>(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
