import { profile } from "@/Types/Profile";
import { url } from "@/utils/api";
import axios from "axios";

export const getSettingsProfile = async () => {
  const response = await axios.get(`${url}/api/profile`, {
    withCredentials: true,
  });
  return response.data;
};

export const saveSettingsProfile = async (settings: profile) => {
  const response = await axios.post(`${url}/api/profile`, settings, {
    withCredentials: true,
  });
  return response.data;
};
