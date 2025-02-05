"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import LoadingComp from "@/components/Loading";
const Dashboard = () => {
  const [, startTransition] = useTransition();

  const router = useRouter();
  const { isAdmin, isLoggedIn } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
  const [isHovered, setIsHovered] = useState(false); // State to control hover effect
  const [loading, setLoading] = useState(false);
  const [loadingForDash, setloadingForDash] = useState(false);

  const [activePath, setActivePath] = useState("");

  const path = usePathname();
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
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    setActivePath(href);
    setLoading(true);
    setloadingForDash(true);
    setTimeout(() => {
      setloadingForDash(false);
    }, 300);
    startTransition(() => {
      router.push(href);
      setLoading(false);
    });
  };
  useEffect(() => {
    setActivePath(path || "");
  }, [path]);

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

  const asideClasse = () => {
    return `bg-teal-500 shadow-lg md:p-4 p-0 -mt-3 md:min-h-screen flex text-center fixed right-0 transition-all w-full md:w-20 z-10  ${
      isMenuOpen ? "h-auto text-end" : "h-20"
    } ${isHovered ? "md:w-64" : "md:w-20"}`;
  };

  return (
    <>
      {loading && <LoadingComp />}
      {isAdmin && isLoggedIn && (
        <aside
          className={asideClasse()}
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
                  className={`${
                    activePath?.includes(item.Link) &&
                    `${
                      activePath && loadingForDash
                        ? " hover:bg-emerald-600  bg-emerald-600 "
                        : " bg-teal-200  hover:bg-teal-100 "
                    }  rounded-s-3xl  shadow-xl w-full  ${
                      activePath && loadingForDash
                        ? "hover:bg-emerald-600  bg-emerald-600"
                        : " hover:bg-teal-600 hover:rounded-s-3xl"
                    }`
                  } ${
                    activePath && loadingForDash
                      ? "hover:bg-emerald-600"
                      : "hover:bg-teal-600"
                  }  p-2 hover:rounded-s-3xl   rounded text-white hover:text-black/70 items-center relative flex md:text-right justify-between content-end transition-all duration-300`}>
                  <Image
                    width={24}
                    height={24}
                    src={item.icon}
                    alt={item.name}
                    className={`mr-2 `}
                  />
                  {isHovered && <span>{item.name}</span>}
                </Link>
                {isHovered &&
                  activePath?.includes(item.Link) &&
                  item.sections &&
                  item.sections.length > 0 &&
                  item.sections.map((section, index) => (
                    <div
                      className={`w-full m-1 flex justify-end items-end content-end  `}
                      key={index}>
                      <Link
                        id="subLink"
                        href={section.Link}
                        onClick={(e) => handleClick(e, section.Link)}
                        className={`  p-2 rounded ${
                          activePath && loadingForDash
                            ? "hover:bg-emerald-600"
                            : "hover:bg-teal-600"
                        } hover:rounded-s-3xl text-white text-sm hover:text-white  relative flex w-1/2 justify-end ${
                          isHovered &&
                          activePath === section.Link &&
                          `bg-teal-400 rounded-s-3xl ${
                            activePath && loadingForDash
                              ? "hover:bg-emerald-600  bg-emerald-600"
                              : " hover:bg-teal-600 hover:rounded-s-3xl"
                          } `
                        } `}>
                        {isHovered && <span>{section.name} ◉ </span>}
                      </Link>
                    </div>
                  ))}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
};

export default Dashboard;
