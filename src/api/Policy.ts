import { Policy } from "@/Types/Policy";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/policies`;

export const getPolicies = async (): Promise<Policy[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPolicy = async (policy: Policy): Promise<Policy> => {
  const response = await axios.post(API_URL, policy);
  return response.data;
};

export const updatePolicy = async (
  id: string,
  policy: Policy
): Promise<Policy> => {
  const response = await axios.put(`${API_URL}/${id}`, policy);
  return response.data;
};

export const deletePolicy = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
