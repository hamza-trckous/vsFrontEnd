"use client";
import React from "react";
import Link from "next/link";

const MainNavbar: React.FC = () => {
  return (
    <div className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold text-gray-800">
          متجر ألعاب الأطفال
        </div>
        <div className="flex space-x-8 p-2">
          <Link href="/products" legacyBehavior>
            <a className="hover:text-gray-600 hover:underline px-2">المنتجات</a>
          </Link>
          <Link href="/categories" legacyBehavior>
            <a className="hover:text-gray-600 hover:underline px-2">الفئات</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="hover:text-gray-600 hover:underline px-2">من نحن</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="hover:text-gray-600 hover:underline px-2">اتصل بنا</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
