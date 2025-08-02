import { LanguageConfig } from "@/Types/LanguageConfig";
import { ColorName, ThemeColor } from "@/utils/theme";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const NavMobile = ({
  handleClick,
  isOpen,
  isLoggedIn,
  isAdmin,
  logout,
  dataOflang,
  themeColors,
  currentColor,
}: {
  isOpen: boolean;
  handleClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  dataOflang: LanguageConfig | undefined;
  themeColors: ThemeColor;
  currentColor: ColorName | undefined;
}) => {
  return (
    <>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white p-4 shadow-md rounded-lg flex flex-col space-y-4 text-right">
          <Link
            onClick={(e) => handleClick(e, "/")}
            href="/categories"
            className={`block text-gray-800 hover:text-${
              themeColors[currentColor ?? "teal"]?.basics
            }-500 no-underline transition duration-300 ease-in-out`}
            style={{ fontFamily: "fantasy" }}
          >
            {dataOflang?.home || " الصفحة الرئيسية"}
          </Link>

          {isLoggedIn ? (
            isAdmin ? (
              <>
                <button
                  onClick={logout}
                  className={`block text-gray-800 hover:text-${
                    themeColors[currentColor ?? "teal"]?.basics
                  }-500 no-underline transition duration-300 ease-in-out`}
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  {dataOflang?.logout || "تسجيل الخروج"}
                </button>

                <Link
                  onClick={(e) => handleClick(e, "/dashboard")}
                  href="/dashboard"
                  className={`block text-gray-800 hover:text-${
                    themeColors[currentColor ?? "teal"]?.basics
                  }-500 no-underline transition duration-300 ease-in-out`}
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  {dataOflang?.dashboard || "لوحة التحكم"}
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className={`block text-gray-800 hover:text-${
                  themeColors[currentColor ?? "teal"]?.basics
                }-500 no-underline transition duration-300 ease-in-out`}
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {dataOflang?.logout || "تسجيل الخروج"}
              </button>
            )
          ) : (
            <>
              <Link
                onClick={(e) => handleClick(e, "/login")}
                href="/login"
                className={`block text-gray-800 hover:text-${
                  themeColors[currentColor ?? "teal"]?.basics
                }-500 no-underline transition duration-300 ease-in-out`}
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {dataOflang?.login || "تسجيل الدخول"}
              </Link>
              <Link
                href="/register"
                className={`block text-gray-800 hover:text-${
                  themeColors[currentColor ?? "teal"]?.basics
                }-500 no-underline transition duration-300 ease-in-out`}
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {dataOflang?.register || "تسجيل"}
              </Link>
            </>
          )}
          <Link
            onClick={(e) => handleClick(e, "/cart")}
            href="/cart"
            className={`block text-gray-800 hover:text-${
              themeColors[currentColor ?? "teal"]?.basics
            }-500 no-underline transition duration-300 ease-in-out`}
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            <FaShoppingCart /> {/* Cart icon */}
          </Link>
        </div>
      )}
    </>
  );
};

export default NavMobile;
