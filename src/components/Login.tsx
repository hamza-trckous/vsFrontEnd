"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/languageColorContext";
import { themeColors } from "@/utils/theme";
import { useTheme } from "@/context/themeContext";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Script from "next/script";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

const Login: React.FC<LoginProps> = () => {
  const { currentColor } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginAttempts, setloginAttempts] = useState(0);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>("");

  const { login } = useAuth(); // Use the AuthContext
  const { dataOflang } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("ready", showRecaptcha);
    console.log("token recaptcha", recaptchaToken);
    console.log("attempts", loginAttempts);
    e.preventDefault();
    try {
      await login(email, password);
      console.log("hi");
      setloginAttempts(0);

      // Pass a dummy token for
    } catch (error: unknown) {
      setloginAttempts((prev) => {
        const updated = prev + 1;
        if (updated >= 3) {
          setShowRecaptcha(true);
        }
        return updated;
      });
      console.log("chouferror1", error);

      if (axios.isAxiosError(error)) {
        console.log("chouferror", error);
        setError(error.response?.data?.message || "فشل تسجيل الدخول");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("حدث خطأ غير متوقع");
      }
    }
  };

  return (
    <div className="max-w-md w-full mt-16 mb-16 space-y-8 p-14 bg-white rounded-xl shadow-lg z-10">
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        async
        defer
        onLoad={() => {
          console.log("reCAPTCHA script loaded");
        }}
      />
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
        {showRecaptcha && (
          <>
            qqqqq
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_ReCaptchaSiteKey!}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </>
        )}
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
