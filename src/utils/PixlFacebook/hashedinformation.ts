import { OrderDetails } from "@/Types/OrderPart";
import { getCookie } from "cookies-next";
import CryptoJS from "crypto-js";

export const HashedInformation = ({
  data,
  userIpAddress,
  totalAmount,
}: {
  data: OrderDetails;
  userIpAddress: string;
  totalAmount: number;
}) => {
  const hashedPhone = CryptoJS.SHA256(data.phone).toString();
  const fbp = getCookie("_fbp")?.toString() || "";
  const fbc = getCookie("_fbc")?.toString() || "";
  const hashedFirstName = CryptoJS.SHA256(data.name).toString();
  const hashedState = CryptoJS.SHA256(data.wilaya || "").toString();
  const eventData = {
    event_name: "order",
    event_time: Math.floor(Date.now() / 1000),
    user_data: {
      client_ip_address: userIpAddress,
      client_user_agent: navigator.userAgent,
      fbc: fbc || "",
      ph: hashedPhone || "",
      fbp: fbp || "",
      external_id: "external_id",
      fb_login_id: "facebook_login_id",
      fn: hashedFirstName || "",
      st: hashedState || "",
    },
    custom_data: {
      currency: "DZD",
      value: totalAmount,
    },
  };
  return { eventData, hashedPhone, fbp, fbc, hashedFirstName, hashedState };
};
