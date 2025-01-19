"use client";

import { registerUser } from "@/api/auth";
import { IFormInput } from "./schema";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterFormUtils = () => {
  const [message, setMessage] = useState("");

  const { cheking } = useAuth();

  const router = useRouter();
  const LogicOnSubmitRegister = async (data: IFormInput) => {
    try {
      const response = await registerUser({ ...data, role: "user" });
      setMessage(response.message);
      const token = response.token;
      if (!token) {
        throw new Error("Token is null");
      }
      localStorage.setItem("token", token);
      cheking(token);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000); // Delay of 1 second before redirecting
    } catch (error: unknown) {
      console.error("Error Details:", error);
      if (error instanceof Error) {
        setMessage(`${error.message}`);
      } else {
        setMessage("حدث خطأ غير متوقع");
      }
    }
  };

  return { LogicOnSubmitRegister, message, setMessage };
};

export default RegisterFormUtils;
