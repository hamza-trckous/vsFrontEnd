"use server";

import { cookies } from "next/headers";

export async function syncColorCookie(color: string) {
  (await cookies()).set("ColorText", color, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
