import { url } from "@/utils/api";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  // add other fields as necessary
}

export const getAllUsers = async () => {
  const response = await axios.get(`${url}/api/users`, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`${url}/api/users/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  const response = await axios.put(`${url}/api/users/${id}`, userData, {
    withCredentials: true,
  });
  return response.data;
};
