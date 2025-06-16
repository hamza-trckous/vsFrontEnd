"use client";
import Container from "@/components/dashbord/multualCompenents/Container";
import { useLanguage } from "@/context/languageColorContext";
import { useTheme } from "@/context/themeContext";
import { useUser } from "@/context/UserContext";
import { themeColors } from "@/utils/theme";
import React, { useState } from "react";

const UsersPage = () => {
  const { currentColor } = useTheme();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const { dataOflang, lang } = useLanguage();
  const { users, handleDelete } = useUser();

  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <Container lang={lang}>
      <h1 className="text-2xl font-bold  m-2">
        {dataOflang?.manageUsers?.title || "إدارة المستخدمين"}
      </h1>
      <input
        type="text"
        placeholder={dataOflang?.manageUsers?.search || "بحث عن المستخدمين..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`p-2 w-full mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500}`}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">
                {dataOflang?.manageUsers?.username || "اسم المستخدم"}
              </th>
              <th className="py-2 px-4 border-b">
                {dataOflang?.manageUsers?.email || "البريد الإلكتروني"}
              </th>
              <th className="py-2 px-4 border-b">
                {dataOflang?.manageUsers?.role || "الدور"}
              </th>
              <th className="py-2 px-4 border-b">
                {dataOflang?.manageUsers?.cartProducts || "المنتجات في السلة"}
              </th>
              <th className="py-2 px-4 border-b">
                {dataOflang?.manageUsers?.actions || "إجراءات"}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  {user.cart.map((item) => (
                    <div key={item.productId?._id}>
                      {item.productId?.name || "Unknown Product"} -{" "}
                      {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200 text-xs">
                    {dataOflang?.delete || "حذف المستخدم"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-8 flex items-center justify-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Container>
  );
};

export default UsersPage;
