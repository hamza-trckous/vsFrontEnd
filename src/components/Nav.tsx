"use client";
import React, { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { profile } from "@/Types/Profile";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, loading, logout, isAdmin, setLoading } = useAuth(); // Use the AuthContext
  const { Profile }: { Profile: profile | null } = useProfile();
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log("Profile", Profile);
    if (isLoggedIn) {
      console.log("User is logged in");
    }
  }, [isLoggedIn]);

  if (loading) {
    return null; // Don't render the Nav component while loading
  }

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setLoading(true);
    startTransition(() => {
      router.push(href);
      setLoading(false); // تعيين حالة التحميل إلى false بعد اكتمال التنقل
    });
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-lg shadow-md sticky top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            width={200}
            height={200}
            src={Profile?.logo || "/LogoPrincipal.png"}
            alt="BabyBloom Logo"
            className="w-8 h-8 cursor-pointer"
            onClick={() => window.location.replace("/")}
          />
          <div
            onClick={() => window.location.replace("/")}
            className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent hover:scale-105 transform transition-all duration-300 tracking-wide"
            style={{
              fontFamily: "Macondo, sans-serif",
              textShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}>
            {Profile?.nameOfBrand || "BabyBloom"}
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="hidden md:flex items-center space-x-2 flex-grow justify-center mx-20 relative">
          <Image src="/search.svg" width={20} height={20} alt="Search Icon" />
        </div> */}

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
        <div className="hidden md:flex md:items-center space-x-8">
          <Link
            onClick={(e) => handleClick(e, "/")}
            href="/"
            className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
            style={{ fontFamily: "Cairo, sans-serif" }}>
            الصفحة الرئيسية
          </Link>

          {isLoggedIn ? (
            isAdmin ? (
              <>
                <button
                  onClick={logout}
                  className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  تسجيل الخروج
                </button>
                <Link
                  onClick={(e) => handleClick(e, "/dashboard/users")}
                  href="/dashboard/users"
                  className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  لوحة التحكم
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                تسجيل الخروج
              </button>
            )
          ) : (
            <>
              <Link
                href="/login"
                onClick={(e) => handleClick(e, "/login")}
                className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                تسجيل الدخول
              </Link>
              <Link
                onClick={(e) => handleClick(e, "/register")}
                href="/register"
                className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                تسجيل
              </Link>
            </>
          )}
          <Link
            onClick={(e) => handleClick(e, "/cart")}
            href="/cart"
            className="block mt-4 md:inline-block md:mt-0 text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
            style={{ fontFamily: "Cairo, sans-serif" }}>
            <FaShoppingCart /> {/* Cart icon */}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white p-4 shadow-md rounded-lg flex flex-col space-y-4 text-right">
          <Link
            onClick={(e) => handleClick(e, "/cart")}
            href="/categories"
            className="block text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
            style={{ fontFamily: "fantasy" }}>
            الصفحة الرئيسية
          </Link>
          {isLoggedIn ? (
            isAdmin ? (
              <>
                <button
                  onClick={logout}
                  className="block text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  تسجيل الخروج
                </button>
                <Link
                  onClick={(e) => handleClick(e, "/dashboard")}
                  href="/dashboard"
                  className="block text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                  style={{ fontFamily: "Cairo, sans-serif" }}>
                  لوحة التحكم
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="block text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                تسجيل الخروج
              </button>
            )
          ) : (
            <>
              <Link
                onClick={(e) => handleClick(e, "/login")}
                href="/login"
                className="block text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="block text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                تسجيل
              </Link>
            </>
          )}
          <Link
            onClick={(e) => handleClick(e, "/cart")}
            href="/cart"
            className="block text-gray-800 hover:text-teal-500 no-underline transition duration-300 ease-in-out"
            style={{ fontFamily: "Cairo, sans-serif" }}>
            <FaShoppingCart /> {/* Cart icon */}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
