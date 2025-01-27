"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo1 from "../../../public/Logos/window.svg";
import Logo2 from "../../../public/Logos/file.svg";
import Logo3 from "../../../public/Logos/equalizer_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import Logo4 from "../../../public/Logos/bus-svgrepo-com.svg";
import Logo5 from "../../../public/Logos/facebook-svgrepo-com.svg";
import Logo6 from "../../../public/Logos/google-sheets-svgrepo-com.svg";
import Logo7 from "../../../public/Logos/identity_platform_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg";
import Logo8 from "../../../public/Logos/pages-svgrepo-com.svg";
import Logo9 from "../../../public/Logos/user-settings-svgrepo-com.svg";
import { Links } from "@/utils/dashboard";
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
  const { items } = Links({
    Logo1,
    Logo2,
    Logo3,
    Logo4,
    Logo5,
    Logo6,
    Logo7,
    Logo8,
    Logo9,
  });
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
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  onClick={(e) => handleClick(e, item.Link)}
                  href={item.Link}
                  className="hover:bg-teal-600 p-2 rounded text-white hover:text-white items-center relative flex">
                  <Image
                    width={24}
                    height={24}
                    src={item.icon}
                    alt={item.name}
                    className="mr-2"
                  />
                  {isHovered && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
};

export default Dashboard;
