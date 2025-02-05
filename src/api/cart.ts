import { url } from "@/utils/api";
import axios from "axios";

export const addToCart = async (productId: string, quantity: number) => {
  const response = await axios.post(
    `${url}/api/cart/add-to-cart`,
    { productId, quantity },
    { withCredentials: true }
  );
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await axios.post(
    `${url}/api/cart/remove-from-cart`,
    { productId },
    { withCredentials: true }
  );
  return response.data;
};

export const getCartItems = async () => {
  const response = await axios.get(`${url}/api/cart/cart`, {
    withCredentials: true,
  });
  return response.data;
};
