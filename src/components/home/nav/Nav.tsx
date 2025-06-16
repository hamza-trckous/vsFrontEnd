/* eslint-disable */

"use client";
import React, { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import Image from "next/image";
import { useRouter } from "next/navigation";
import { themeColors } from "@/utils/theme";
import { useLanguage } from "@/context/languageColorContext";
import NavMobile from "./TopNav/NavMobile/NavMobile";
import { useTheme } from "@/context/themeContext";
import SkeletonNav from "../Skeleton";
import { useProfileContext } from "@/context/ProfileContext";
import LoadingComp from "@/components/Loading";
import { profile } from "@/Types/Profile";
const Nav = () => {
  const { lang, dataOflang } = useLanguage();
  const { currentColor } = useTheme();
  const [isMounted, setIsMounted] = useState(false); // State to check if component is mounted

  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, loading, logout, isAdmin, setLoading } = useAuth(); // Use the AuthContext
  const { Profile } = useProfileContext();
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isLoggedIn) {
    }
  }, [isLoggedIn]);
  useEffect(() => {
    // Set isMounted to true once the component is mounted
    setIsMounted(true);
  }, []);

  if (loading || !isMounted) {
    return <LoadingComp />; // Don't render the Nav component while loading
  }

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setLoading(true);
    startTransition(() => {
      router.push(href);
      setLoading(false); // Set loading state to false after navigation
    });
  };

  return (
    <nav
      dir={lang === "EN" ? "rtl" : "ltr"}
      className="bg-white bg-opacity-70 backdrop-blur-lg shadow-md sticky top-0 z-50 p-4 justify-end">
      <div className="container mx-auto flex justify-between  items-center ">
        {/* Logo */}
        {Profile?.logo?.enable && (
          <div className="flex items-center space-x-2 justify-center align-middle">
            <Image
              width={200}
              height={200}
              src={Profile?.logo?.src || "/LogoPrincipal.png"}
              alt="BabyBloom Logo"
              className="w-8 h-8 cursor-pointer"
              onClick={() => window.location.replace("/")}
            />
            {Profile?.nameOfBrand.enable && (
              <div
                onClick={() => window.location.replace("/")}
                className={`cursor-pointer text-2xl font-bold bg-gradient-to-r ${
                  themeColors[currentColor ?? "teal"]?.gradient
                }  bg-clip-text text-transparent hover:scale-105 transform transition-all duration-300 tracking-wide`}
                style={{
                  fontFamily: "Macondo, sans-serif",
                  textShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                }}>
                {Profile?.nameOfBrand?.name || "BabyBloom"}
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:justify-end  w-full ">
          <Link
            onClick={(e) => handleClick(e, "/")}
            href="/"
            className={`block mt-4 mx-4 md:inline-block md:mt-0 text-gray-800 hover:text-${
              themeColors[currentColor ?? "teal"]?.basics
            }-500 no-underline transition duration-300 ease-in-out`}
            style={{ fontFamily: "Cairo, sans-serif" }}>
            {dataOflang?.home || " الصفحة الرئيسية"}
          </Link>

          {isLoggedIn ? (
            isAdmin ? (
              <>
                <button
                  onClick={logout}
                  className={`block mt-4 mx-4 md:inline-block md:mt-0 text-gray-800 hover:text-${
                    themeColors[currentColor ?? "teal"]?.basics
                  }-500 no-underline transition duration-300 ease-in-out`}
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  {dataOflang?.logout || "تسجيل الخروج"}
                </button>

                <Link
                  onClick={(e) => handleClick(e, "/dashboard/users")}
                  href="/dashboard/users"
                  className={`block mt-4 mx-4 md:inline-block md:mt-0 text-gray-800 hover:text-${
                    themeColors[currentColor ?? "teal"]?.basics
                  }-500 no-underline transition duration-300 ease-in-out`}
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  {dataOflang?.dashboard || "لوحة التحكم"}
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className={`block mt-4 mx-4 md:inline-block md:mt-0 text-gray-800 hover:text-${
                  themeColors[currentColor ?? "teal"]?.basics
                }-500 no-underline transition duration-300 ease-in-out`}
                style={{ fontFamily: "Cairo, sans-serif" }}>
                {dataOflang?.logout || "تسجيل الخروج"}
              </button>
            )
          ) : (
            <>
              <Link
                href="/login"
                onClick={(e) => handleClick(e, "/login")}
                className={`block mt-4 mx-4 md:inline-block md:mt-0 text-gray-800 hover:text-${
                  themeColors[currentColor ?? "teal"]?.basics
                }-500 no-underline transition duration-300 ease-in-out`}
                style={{ fontFamily: "Cairo, sans-serif" }}>
                {dataOflang?.login || "تسجيل الدخول"}
              </Link>

              <Link
                onClick={(e) => handleClick(e, "/register")}
                href="/register"
                className={`block mt-4 mx-4 md:inline-block md:mt-0 text-gray-800 hover:text-${
                  themeColors[currentColor ?? "teal"]?.basics
                }-500 no-underline transition duration-300 ease-in-out`}
                style={{ fontFamily: "Cairo, sans-serif" }}>
                {dataOflang?.register || "تسجيل"}
              </Link>
              <Link
                onClick={(e) => handleClick(e, "/cart")}
                href="/cart"
                className={`block mx-4 items-center mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-${
                  themeColors[currentColor ?? "teal"]?.basics
                }-500 no-underline transition duration-300 ease-in-out`}
                style={{ fontFamily: "Cairo, sans-serif" }}>
                <FaShoppingCart /> {/* Cart icon */}
              </Link>
            </>
          )}
        </div>
      </div>

      <NavMobile
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        logout={logout}
        dataOflang={dataOflang}
        themeColors={themeColors}
        currentColor={currentColor}
        handleClick={handleClick}
        isOpen={isOpen}
      />
    </nav>
  );
};

export default Nav;
