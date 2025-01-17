import React from "react";
import Head from "next/head"; // Import Head for inlining CSS
import { FaFacebook, FaInstagram } from "react-icons/fa"; // Import icons

const TopNavBar = () => {
  return (
    <>
      <Head>
        <style>{`
          /* Inline critical CSS */
          .bg-gray-100 {
            background-color: #f7fafc;
          }
          .p-2 {
            padding: 0.5rem;
          }
          .shadow-sm {
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
          }
          .mx-auto {
            margin-left: auto;
            margin-right: auto;
          }
          .flex {
            display: flex;
          }
          .justify-between {
            justify-content: space-between;
          }
          .items-center {
            align-items: center;
          }
          .text-sm {
            font-size: 0.875rem;
          }
          .relative {
            position: relative;
          }
          .text-gray-800 {
            color: #2d3748;
          }
          .focus\\:outline-none:focus {
            outline: none;
          }
          .text-gray-600 {
            color: #718096;
          }
          .italic {
            font-style: italic;
          }
          .text-xs {
            font-size: 0.75rem;
          }
          .md\\:text-base {
            font-size: 1rem;
          }
          .space-x-4 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(1rem * var(--tw-space-x-reverse));
            margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
          }
          .hover\\:text-teal-500:hover {
            color: #38b2ac;
          }
        `}</style>
        <script src="https://example.com/third-party-script.js" defer></script>
      </Head>
      <div className="bg-teal-400 p-2 shadow-sm">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <a
            href="https://www.facebook.com/profile.php?id=61569429093427"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-teal-500 transition-colors duration-200">
            <FaFacebook size={20} />
          </a>

          <div
            className="text-gray-600 italic text-xs md:text-base w-full text-center"
            style={{ fontFamily: "Cairo, sans-serif" }}>
            {"ألعاب تنمي الذكاء وتزرع الإبداع!"}
          </div>

          <a
            href="https://www.instagram.com/babybloom_dz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white  hover:text-teal-500 transition-colors duration-200">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </>
  );
};

export default TopNavBar;
