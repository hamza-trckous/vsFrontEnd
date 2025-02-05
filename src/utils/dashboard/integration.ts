"use client";
import { getIp } from "@/api/ip";
import { injectFacebookPixel, trackConversion } from "@/api/TrackConversion";
import { getCookie } from "cookies-next"; // Update the import statement for cookies-next
export const testingintegration = async ({ pixelId }: { pixelId: string }) => {
  injectFacebookPixel(pixelId);

  const email = "user@example.com";
  const phone = "1234567890";
  const firstName = "John";
  const lastName = "Doe";
  const dob = "1990-01-01";
  const zip = "12345";
  const city = "New York";
  const state = "NY";

  const hashedEmail = CryptoJS.SHA256(email).toString();
  const hashedPhone = CryptoJS.SHA256(phone).toString();
  const hashedFirstName = CryptoJS.SHA256(firstName).toString();
  const hashedLastName = CryptoJS.SHA256(lastName).toString();
  const hashedDob = CryptoJS.SHA256(dob).toString();
  const hashedZip = CryptoJS.SHA256(zip).toString();
  const hashedCity = CryptoJS.SHA256(city).toString();
  const hashedState = CryptoJS.SHA256(state).toString();

  const fbp = getCookie("_fbp");

  // Get client IP address from backend API
  let clientIpAddress = await getIp();

  // Validate the IP address format
  const isValidIp = (ip: string) =>
    /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/.test(
      ip
    );

  if (!isValidIp(clientIpAddress)) {
    console.warn("Invalid IP address retrieved. Skipping client_ip_address.");
    clientIpAddress = null; // Skip sending the IP address
  }

  const eventData = {
    event_name: "tesT3",
    event_time: Math.floor(Date.now() / 1000),
    user_data: {
      em: hashedEmail,
      ph: hashedPhone,
      fn: hashedFirstName,
      ln: hashedLastName,
      dob: hashedDob,
      zp: hashedZip,
      ct: hashedCity,
      st: hashedState,
      ...(clientIpAddress && { client_ip_address: clientIpAddress }), // Only include if valid
      client_user_agent: navigator.userAgent,
      fbp: typeof fbp === "string" ? fbp : "",
      fbc: "fb_click_id",
      external_id: "external_id",
      fb_login_id: "facebook_login_id",
    },
    custom_data: {
      currency: "USD",
      value: 0,
    },
  };

  console.log("Event data:", eventData);

  await trackConversion(eventData);
};
