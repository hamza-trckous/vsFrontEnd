"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo1 from "../../../public/window.svg";
import Logo2 from "../../../public/file.svg";
import Logo3 from "../../../public/equalizer_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import Logo4 from "../../../public/bus-svgrepo-com.svg";
import Logo5 from "../../../public/facebook-svgrepo-com.svg";
import Logo6 from "../../../public/google-sheets-svgrepo-com.svg";
import Logo7 from "../../../public/identity_platform_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";

const Dashboard = () => {
  const [, startTransition] = useTransition();

  const router = useRouter();
  const { isAdmin, setLoading, isLoggedIn } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
  const [isHovered, setIsHovered] = useState(false); // State to control hover effect

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    setLoading(true);
    e.preventDefault();
    startTransition(() => {
      router.push(href);
      setLoading(false);
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isAdmin && isLoggedIn && (
        <aside
          className={`bg-teal-500 shadow-lg md:p-4 p-0 -mt-3 md:min-h-screen flex text-center fixed right-0 transition-all w-full md:w-20 z-10 ${
            isMenuOpen ? "h-auto text-end" : "h-20"
          } ${isHovered ? "md:w-64" : "md:w-20"}`}
          style={{ top: `${scrollY > 25 ? 70 : 110}px` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <button
            className="md:hidden text-white p-2 ml-auto flex w-full justify-start"
            onClick={toggleMenu}>
            {isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          </button>
          <ul
            className={`space-y-2 flex md:flex-col relative transition-all duration-300 ${
              isMenuOpen ? "flex-col" : "hidden md:flex"
            }`}>
            <li>
              <Link
                onClick={(e) => handleClick(e, "/dashboard/users")}
                href="/dashboard/users"
                className="hover:bg-teal-600 p-2 rounded text-white hover:text-white items-center relative flex">
                <Image
                  width={24}
                  height={24}
                  src={Logo1}
                  alt="Users"
                  className="mr-2"
                />
                {isHovered && <span>إدارة المستخدمين</span>}
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => handleClick(e, "/dashboard/Product")}
                href="/dashboard/Product"
                className="hover:bg-teal-600 p-2 rounded text-white hover:text-white flex items-center">
                <Image
                  width={24}
                  height={24}
                  src={Logo2}
                  alt="Products"
                  className="mr-2"
                />
                {isHovered && <span>إدارة المنتجات</span>}
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => handleClick(e, "/dashboard/statics")}
                href="/dashboard/statics"
                className="hover:bg-teal-600 p-2 rounded text-white hover:text-white flex items-center">
                <Image
                  width={24}
                  height={24}
                  src={Logo3}
                  alt="Statistics"
                  className="mr-2"
                />
                {isHovered && <span>إحصائيات الموقع</span>}
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => handleClick(e, "/dashboard/shipping")}
                href="/dashboard/shipping"
                className="hover:bg-teal-600 p-2 rounded text-white hover:text-white flex items-center">
                <Image
                  width={24}
                  height={24}
                  src={Logo4}
                  alt="Shipping"
                  className="mr-2"
                />
                {isHovered && <span>إدارة الشحن</span>}
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => handleClick(e, "/dashboard/integration")}
                href="/dashboard/integration"
                className="hover:bg-teal-600 p-2 rounded text-white hover:text-white flex items-center">
                <Image
                  width={24}
                  height={24}
                  src={Logo5}
                  alt="Integration"
                  className="mr-2"
                />
                {isHovered && <span>التكامل مع Facebook Pixel</span>}
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => handleClick(e, "/dashboard/sheets")}
                href="/dashboard/sheets"
                className="hover:bg-teal-600 p-2 rounded text-white hover:text-white flex items-center">
                <Image
                  width={24}
                  height={24}
                  src={Logo6}
                  alt="sheets"
                  className="mr-2"
                />
                {isHovered && <span>Google Sheets التكامل مع</span>}
              </Link>
            </li>
            <li>
              <Link
                onClick={(e) => handleClick(e, "/dashboard/policy")}
                href="/dashboard/policy"
                className="hover:bg-teal-600 p-2 rounded text-white hover:text-white flex items-center">
                <Image
                  width={24}
                  height={24}
                  src={Logo7}
                  alt="policys"
                  className="mr-2"
                />
                {isHovered && <span>تعديل صفحات السياسات</span>}
              </Link>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
};

export default Dashboard;
