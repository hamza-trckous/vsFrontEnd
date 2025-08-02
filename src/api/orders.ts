import { url } from "@/utils/api";
import axios from "axios";

interface OrderProduct {
  product: string;
  quantity: number;
}

interface OrderData {
  products: OrderProduct[];
  totalAmount: number;
  status: string;
}

export const createOrder = async (orderData: OrderData) => {
  const response = await axios.post(`${url}/api/orders`, orderData, {
    withCredentials: true,
  });
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(`${url}/api/orders`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axios.put(
    `${url}/api/orders/${orderId}`,
    { status },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

export const deleteOrder = async (orderId: string) => {
  const response = await axios.delete(`${url}/api/orders/${orderId}`, {
    withCredentials: true,
  });
  return response.data;
};
export const deleteAllOrders = async () => {
  const response = await axios.delete(`${url}/api/orders`, {
    withCredentials: true,
  });
  return response.data;
};
