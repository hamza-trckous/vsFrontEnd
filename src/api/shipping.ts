import { url } from "@/utils/api";
import axios from "axios";

export const getShippingPrices = async () => {
  try {
    const response = await axios.get(`${url}/api/shipping`);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping prices:", error);
    throw error;
  }
};

export const updateShippingPrice = async (
  wilaya: string,
  priceToDesktop: number,
  priceToHomme: number
) => {
  try {
    const response = await axios.post(`${url}/api/shipping/update`, {
      wilaya,
      priceToDesktop,
      priceToHomme,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating shipping price:", error);
    throw error;
  }
};

export const deleteShippingPrice = async (wilaya: string) => {
  try {
    const response = await axios.delete(`${url}/api/shipping/delete`, {
      data: { wilaya },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting shipping price:", error);
    throw error;
  }
};

export const createInitialShippingPrices = async (
  shippingPrices: {
    wilaya: string;
    priceToDesktop: number;
    priceToHomme: number;
  }[]
) => {
  try {
    const response = await axios.post(`${url}/api/shipping/create`, {
      shippingPrices,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
