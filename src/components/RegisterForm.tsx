"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "../api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const registerSchema = z
  .object({
    name: z.string().min(1, "هذا الحقل مطلوب"),
    lastname: z.string().min(1, "هذا الحقل مطلوب"),
    dateOfbirth: z.string().optional(), // Change to string
    placeofbirth: z.string().optional(),
    username: z.string().min(1, "هذا الحقل مطلوب"),
    email: z.string().email("البريد الإلكتروني غير صالح"),
    password: z
      .string()
      .min(8, "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل")
      .regex(/\d/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل"),
    confirmPassword: z
      .string()
      .min(8, "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type IFormInput = z.infer<typeof registerSchema> & { role: "user" };

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(registerSchema),
  });
  const { cheking } = useAuth();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await registerUser({ ...data, role: "user" });
      console.log("Success:", response);
      setMessage(response.message);
      const token = response.token;

      if (!token) {
        throw new Error("Token is null");
      }
      localStorage.setItem("token", token);
      cheking(token);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000); // Delay of 1 second before redirecting
    } catch (error: unknown) {
      console.error("Error Details:", error);
      if (error instanceof Error) {
        setMessage(`${error.message}`);
      } else {
        setMessage("حدث خطأ غير متوقع");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          الاسم:
        </label>
        <input
          data-tribute="true"
          {...register("name")}
          className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          اسم العائلة:
        </label>
        <input
          data-tribute="true"
          {...register("lastname")}
          className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.lastname && (
          <span className="text-red-500 text-sm">
            {errors.lastname.message}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          تاريخ الميلاد:
        </label>
        <input
          data-tribute="true"
          type="date"
          {...register("dateOfbirth")}
          className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.dateOfbirth && (
          <span className="text-red-500 text-sm">
            {errors.dateOfbirth.message}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          مكان الميلاد:
        </label>
        <input
          data-tribute="true"
          {...register("placeofbirth")}
          className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.placeofbirth && (
          <span className="text-red-500 text-sm">
            {errors.placeofbirth.message}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          اسم المستخدم:
        </label>
        <input
          data-tribute="true"
          {...register("username")}
          className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          البريد الإلكتروني:
        </label>
        <input
          data-tribute="true"
          {...register("email")}
          className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          كلمة المرور:
        </label>
        <input
          data-tribute="true"
          type="password"
          {...register("password")}
          className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-gray-700">
          تأكيد كلمة المرور:
        </label>
        <input
          data-tribute="true"
          type="password"
          {...register("confirmPassword")}
          className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-3/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          تسجيل
        </button>
      </div>
      {message && (
        <div
          className={`text-center p-2 rounded ${
            message.includes("بنجاح")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
