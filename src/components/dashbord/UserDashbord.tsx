"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const UserDashbord = () => {
  const [users, setUsers] = useState<
    { id: number; name: string; email: string; profilePicture: string }[]
  >([]);
  const [filter, setFilter] = useState("");

  // Mock user data
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        profilePicture: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        profilePicture: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        profilePicture: "https://via.placeholder.com/150",
      },
      // Add more fake users as needed
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="card-container bg-white shadow-lg rounded-lg p-6 w-9/12">
      {/* Filter Input */}
      <input
        type="text"
        placeholder="تصفية المستخدمين"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded  text-right flex w-full"
      />

      <hr className="mb-4" />

      {/* User Table */}
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 border border-gray-400">
              صورة الملف الشخصي
            </th>
            <th className="px-4 py-2 border border-gray-400">اسم المستخدم</th>
            <th className="px-4 py-2 border border-gray-400">
              البريد الإلكتروني
            </th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .slice()
            .reverse()
            .map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2 border border-gray-400">
                  <Image
                    width={200}
                    height={200}
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {user.name}
                </td>
                <td className="px-4 py-2 border border-gray-400">
                  {user.email}
                </td>
                {/* Add more user fields as needed */}
              </tr>
            ))}
        </tbody>
      </table>

      <hr className="mb-4" />

      {/* Removed Profile Pictures Section */}
    </div>
  );
};

export default UserDashbord;
