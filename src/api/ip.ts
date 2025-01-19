import axios from "axios";

export const getIp = async () => {
  const ipResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-ip`
  );
  const ip = ipResponse.data.ip;
  return ip;
};
