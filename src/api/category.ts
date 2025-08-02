import { url } from "@/utils/api";

import { Category } from "@/Types/Categorys";
import axios from "axios";

export const addCategory = async (category: Category) => {
  const response = await axios.post(`${url}/api/category`, category, {
    withCredentials: true,
  });
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${url}/api/category`);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await axios.delete(`${url}/api/category/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateCategory = async (category: Category) => {
  const response = await axios.patch(
    `${url}/api/category/${category._id}`,
    category,
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await axios.get(`${url}/api/category/${id}`);
  return response.data;
};

export const getCategoryProducts = async (id: string) => {
  const response = await axios.get(`${url}/api/category/${id}/products`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getCategoryProductsWithPagination = async (
  id: string,
  page: number,
  limit: number,
) => {
  const response = await axios.get(
    `${url}/api/category/${id}/productsWithPagination`,
    {
      params: { page, limit },
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
