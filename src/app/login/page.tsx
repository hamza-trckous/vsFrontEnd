"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "../../components/Login";
import { useAuth } from "@/context/AuthContext";
import { FaSpinner } from "react-icons/fa";

const LoginPage: React.FC = () => {
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
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/background 2.jpg')" }}>
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-center align-middle content-center bg-slate-500 text-green-400  text-2xl font-bold h-screen">
          You already loggedin ...
          <FaSpinner className="animate-spin text-teal-500 text-4xl mb-4" />
        </div>
      )}
    </>
  );
};

export default LoginPage;
