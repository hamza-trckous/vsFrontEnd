// app/actions.ts
"use server";

import { url } from "@/utils/api";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getCartServerAction() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      throw new Error("No token found in cookies");
    }

    // Create a cookie header instead of Authorization header
    const response = await axios.get(`${url}/api/cart/cart`, {
      headers: {
        Cookie: `token=${token}`, // Send token as a cookie
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Server action error:", {
        message: error.message,
        status: (error as AxiosError).response?.status,
        data: (error as AxiosError).response?.data,
      });
    } else {
      console.error("Unknown error:", error);
    }
    return { cart: [] };
  }
}

export const handleRemoveCartItem = async (id: string) => {
  console.log("id", id);
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;
    if (!token) {
      return {
        success: false,
        message: "لم يتم العثور على رمز المصادقة",
      };
    }
    await axios.post(
      `${url}/api/cart/remove-from-cart`,
      { productId: id },
      {
        headers: {
          Cookie: `token=${token}`, // Send token as a cookie
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    revalidatePath("/cart");
    return "تمت الإزالة من السلة";
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error removing item from cart:", error);
    } else {
      console.error("Unknown error:", error);
    }
  }
  return "حدث خطأ أثناء الإزالة من السلة";
};
