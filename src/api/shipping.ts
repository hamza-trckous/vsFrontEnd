import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/shipping`;

export const getShippingPrices = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping prices:", error);
    throw error;
  }
};

export const updateShippingPrice = async (wilaya: string, price: number) => {
  try {
    const response = await axios.post(`${API_URL}/update`, { wilaya, price });
    return response.data;
  } catch (error) {
    console.error("Error updating shipping price:", error);
    throw error;
  }
};

export const deleteShippingPrice = async (wilaya: string) => {
  try {
    const response = await axios.delete(`${API_URL}/delete`, {
      data: { wilaya },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting shipping price:", error);
    throw error;
  }
};

export const createInitialShippingPrices = async (
  shippingPrices: { wilaya: string; price: number }[]
) => {
  try {
    const response = await axios.post(`${API_URL}/create`, { shippingPrices });
    return response.data;
  } catch (error) {
    console.error("Error creating initial shipping prices:", error);
    throw error;
  }
};
