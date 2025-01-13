import axios from "axios";

export const getAllUsers = async () => {
  const response = await axios.get("http://localhost:5000/api/users", {
    withCredentials: true,
  });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await axios.delete(`http://localhost:5000/api/users/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
