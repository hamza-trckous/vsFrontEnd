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
  const response = await axios.post(
    "http://localhost:5000/api/orders",
    orderData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get("http://localhost:5000/api/orders", {
    withCredentials: true,
  });
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axios.put(
    `http://localhost:5000/api/orders/${orderId}`,
    { status },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
