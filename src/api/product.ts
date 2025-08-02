import axios from "axios";
import { Product, NewProduct, ProductPagination } from "../Types/ProductPart";
import { LandingPageUpdateData } from "@/Types/LandingEditing";
import { url } from "@/utils/api";

// Fetch all products with pagination
export const getAllProducts = async ({
  page,
  limit,
  category,
}: {
  page: number;
  limit: number;
  category?: string;
}): Promise<ProductPagination> => {
  try {
    const response = await axios.get<ProductPagination>(
      `${url}/api/products?page=${page}&limit=${limit}${
        category ? `&category=${category}` : ""
      }`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Fetch all products without pagination
export const getAllProductsNormal = async (): Promise<ProductPagination> => {
  try {
    const response = await axios.get<ProductPagination>(`${url}/api/products`);
    console.log("chekUrl", url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single product by ID
export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${url}/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new product
export const createProduct = async (
  productData: Omit<NewProduct, "_id">,
): Promise<Product> => {
  try {
    const response = await axios.post<Product>(
      `${url}/api/products`,
      productData,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (
  id: string,
  productData: Partial<Omit<NewProduct, "_id">>,
): Promise<Product> => {
  try {
    const response = await axios.put<Product>(
      `${url}/api/products/${id}`,
      productData,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (
  id: string,
): Promise<{ message: string }> => {
  try {
    const response = await axios.delete<{ message: string }>(
      `${url}/api/products/${id}`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update landing page data for a product
export const updateLandingPage = async (
  id: string,
  landingPageData: LandingPageUpdateData,
): Promise<Product> => {
  try {
    const response = await axios.patch<Product>(
      `${url}/api/products/${id}/landing`,
      landingPageData,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a landing content by index
export const deleteLandingContent = async (
  productId: string,
  index: number,
): Promise<Product> => {
  try {
    const response = await axios.delete<Product>(
      `${url}/api/products/${productId}/landing/${index}`,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const filterProducts = async (params: {
  category?: string;
  color?: string;
  size?: string; // comma-separated (e.g., "S,M,L")
  minPrice?: number;
  maxPrice?: number; // add this

  rating?: number;
  withShipping?: "yes";
}): Promise<Product[]> => {
  try {
    const query = new URLSearchParams();
    if (params.maxPrice !== undefined)
      query.append("maxPrice", String(params.maxPrice));
    if (params.category) query.append("category", params.category);
    if (params.color) query.append("color", params.color);
    if (params.size) query.append("size", params.size);
    if (params.minPrice !== undefined)
      query.append("minPrice", String(params.minPrice));
    if (params.rating !== undefined)
      query.append("rating", String(params.rating));
    if (params.withShipping) query.append("withShipping", params.withShipping);

    const response = await axios.get<Product[]>(
      `${url}/api/products/filter?${query.toString()}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error filtering products:", error);
    throw error;
  }
};
