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
  const response = await axios.get(`${url}/api/category`, {
    withCredentials: true,
  });
  console.log("response", response);

  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await axios.delete(`${url}/api/category/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateCategory = async (category: Category) => {
  const response = await axios.put(
    `${url}/api/category/${category._id}`,
    category,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await axios.get(`${url}/api/category/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const getCategoryProducts = async (id: string) => {
  const response = await axios.get(`${url}/api/category/${id}/products`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
