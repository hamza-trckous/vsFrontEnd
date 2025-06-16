"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/languageColorContext";
import { themeColors } from "@/utils/theme";
import { useTheme } from "@/context/themeContext";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = () => {
  const { currentColor } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Use the AuthContext
  const { dataOflang } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);

      // Pass a dummy token for
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md w-full mt-16 mb-16 space-y-8 p-14 bg-white rounded-xl shadow-lg z-10">
      <div className="text-center ">
        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          {dataOflang?.login || ">تسجيل الدخول"}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              {dataOflang?.email || "البريد الإلكتروني"}
              البريد الإلكتروني
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-${
                themeColors[currentColor ?? "teal"]?.basics
              }-500 focus:border-${
                themeColors[currentColor ?? "teal"]?.basics
              }-500 focus:z-10 sm:text-sm`}
              placeholder={dataOflang?.email || "البريد الإلكتروني"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              {dataOflang?.password || "كلمة المرور"}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-${
                themeColors[currentColor ?? "teal"]?.basics
              }-500 focus:border-${
                themeColors[currentColor ?? "teal"]?.basics
              }-500 focus:z-10 sm:text-sm`}
              placeholder={dataOflang?.password || "كلمة المرور"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div>
          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${
              themeColors[currentColor ?? "teal"]?.basics
            }-600 hover:bg-${
              themeColors[currentColor ?? "teal"]?.basics
            }-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
              themeColors[currentColor ?? "teal"]?.basics
            }-500`}>
            {dataOflang?.login || ">تسجيل الدخول"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
