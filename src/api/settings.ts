import { settings } from "@/Types/Settings";
import { url } from "@/utils/api";
import axios from "axios";

export const getSettings = async () => {
  const response = await axios.get(`${url}/api/settings`, {
    withCredentials: true,
  });
  return response.data;
};

export const saveSettings = async (settings: settings) => {
  const response = await axios.post(`${url}/api/settings`, settings, {
    withCredentials: true,
  });
  return response.data;
};
