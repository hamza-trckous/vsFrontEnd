import { url } from "@/utils/api";
import axios from "axios";

export const getIp = async () => {
  const ipResponse = await axios.get(`${url}/api/get-ip`);
  const ip = ipResponse.data.ip;
  return ip;
};
