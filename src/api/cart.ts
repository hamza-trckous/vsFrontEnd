import axios from "axios";

export const addToCart = async (productId: string, quantity: number) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/add-to-cart`,
    { productId, quantity },
    { withCredentials: true }
  );
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/remove-from-cart`,
    { productId },
    { withCredentials: true }
  );
  return response.data;
};

export const getCartItems = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/cart`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};
