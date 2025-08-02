// lib/getUserSettings.ts
import { cookies } from "next/headers";
import axios from "axios";
import { url } from "../api";
import { getLanguage } from "@/api/Language";
export async function getUserSettings() {
  const token = (await cookies()).get("token")?.value;
  const headers = token ? { Authorization: token } : {};
  const language = (await cookies()).get("language")?.value || "AR";
  let LanguageData;

  if (language) {
    LanguageData = await getLanguage((language as "AR") || "EN");
  }
  let isLoggedIn = false;
  let isAdmin = false;
  // 1. check-auth (إذا كان هناك توكن)
  if (token) {
    try {
      const authRes = await axios.get(`${url}/api/check-auth`, {
        headers,
      });

      isLoggedIn = authRes.data?.isAuthenticated ?? false;
      isAdmin = authRes.data?.user?.role === "admin";
    } catch (err) {
      console.log("baby", err);

      // invalid token / unauthorized
      isLoggedIn = false;
      isAdmin = false;
    }
  }

  return {
    isLoggedIn,
    isAdmin,
    LanguageData,
    language,
  };
}
