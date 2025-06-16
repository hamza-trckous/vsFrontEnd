"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "../../components/Login";
import { useAuth } from "@/context/AuthContext";
import { FaSpinner } from "react-icons/fa";
import { themeColors } from "@/utils/theme";
import { useTheme } from "@/context/themeContext";

const LoginPage: React.FC = () => {
  const { currentColor } = useTheme();

  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleLoginSuccess = () => {
    setTimeout(() => {
      router.push("/");
    }, 1000); // Delay of 1 second before redirecting
  };

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [isLoggedIn, router]);

  return (
    <>
      {!isLoggedIn ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <div
          className={`w-full flex flex-wrap justify-center align-middle content-center bg-slate-500 text-${
            themeColors[currentColor ?? "teal"]?.basics
          }-400  text-2xl font-bold h-screen`}>
          You already loggedin ...
          <FaSpinner
            className={`animate-spin text-${
              themeColors[currentColor ?? "teal"]?.basics
            }-500 text-4xl mb-4`}
          />
        </div>
      )}
    </>
  );
};

export default LoginPage;
