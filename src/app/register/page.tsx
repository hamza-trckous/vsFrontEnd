// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import { registerUser } from "../../api/auth";
// import AlertModal from "../../components/AlertModal";

// const RegisterPage = () => {
//   interface IFormInput {
//     name: string;
//     lastname: string;
//     dateOfbirth: string;
//     username: string;
//     email: string;
//     password: string;
//     role: "user" | "admin";
//     placeofbirth: string;
//   }

//   const [formData, setFormData] = useState<IFormInput>({
//     name: "",
//     lastname: "",
//     dateOfbirth: "",
//     username: "",
//     email: "",
//     password: "",
//     role: "user",
//     placeofbirth: "",
//   });

//   const [alert, setAlert] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const dataToSend = {
//         ...formData,
//         dateOfbirth: new Date(formData.dateOfbirth), // Convert date string to Date object
//       };
//       console.log("Data to send:", dataToSend);
//       const response = await registerUser(dataToSend);
//       setAlert({ message: response.message, type: "success" });
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         const translations: Record<string, string> = {
//           "Expected date, received string": "تاريخ غير صالح، تم استلام نص",
//           "String must contain at least 6 character(s)":
//             "يجب أن يحتوي النص على 6 أحرف على الأقل",
//           // Add more translations as needed
//         };
//         const errorDetails = error.response?.data?.errors || [];
//         const translatedMessages = errorDetails.map(
//           (err: { message: string }) =>
//             translations[err.message] || "حدث خطأ غير متوقع"
//         );
//         setAlert({ message: translatedMessages.join(", "), type: "error" });
//       } else {
//         setAlert({ message: "حدث خطأ غير متوقع", type: "error" });
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Lastname</label>
//           <input
//             type="text"
//             name="lastname"
//             placeholder="Lastname"
//             value={formData.lastname}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Date of Birth</label>
//           <input
//             type="date"
//             name="dateOfbirth"
//             placeholder="Date of Birth"
//             value={formData.dateOfbirth}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Username</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Place of Birth</label>
//           <input
//             type="text"
//             name="placeofbirth"
//             placeholder="Place of Birth"
//             value={formData.placeofbirth}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded-lg"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
//           Register
//         </button>
//       </form>
//       {alert && (
//         <AlertModal
//           message={alert.message}
//           type={alert.type}
//           onClose={() => setAlert(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default RegisterPage;

import RegisterForm from "@/components/RegisterForm";
import React from "react";

const page = () => {
  return <RegisterForm />;
};

export default page;
