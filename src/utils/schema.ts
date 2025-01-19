import { z } from "zod";
export type IFormInput = z.infer<typeof registerSchema> & { role: "user" };

export const registerSchema = z
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
