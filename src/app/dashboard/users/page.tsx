"use client";
import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "@/api/users";
import { User } from "@/Types/UserPart";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="container mx-auto p-4 w-full items-end flex flex-col "
      dir="rtl">
      <div className="md:w-11/12 w-full  mt-52 md:mt-0">
        <h1 className="text-2xl font-bold mb-4 text-right">إدارة المستخدمين</h1>
        <input
          type="text"
          placeholder="بحث عن المستخدمين..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">اسم المستخدم</th>
                <th className="py-2 px-4 border-b">البريد الإلكتروني</th>
                <th className="py-2 px-4 border-b">الدور</th>
                <th className="py-2 px-4 border-b">المنتجات في السلة</th>
                <th className="py-2 px-4 border-b">إجراءات</th>
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
                        {item.productId?.name
                          ? item.productId.name
                          : "Unknown Product"}{" "}
                        - {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200 text-xs">
                      حذف المستخدم
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
                d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
