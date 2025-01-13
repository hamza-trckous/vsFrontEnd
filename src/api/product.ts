import axios from "axios";
import { Product, NewProduct } from "../Types/ProductPart";
// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:5000/api/products", // Backend API base URL
  withCredentials: true, // Include cookies in requests
});

// Fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>("");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Create a new product
export const createProduct = async (
  productData: Omit<NewProduct, "_id">
): Promise<Product> => {
  try {
    const response = await api.post<Product>("", productData);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
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
    console.error(`Error updating product with ID ${id}:`, error);
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
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
