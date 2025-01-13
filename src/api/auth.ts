import axios from "axios";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export const registerUser = async (data: IFormInput) => {
  const translations: Record<string, string> = {
    "Username or email already exists":
      "اسم المستخدم أو البريد الإلكتروني موجود بالفعل",
    "Cannot register more than 2 admins": "لا يمكن إضافة أكثر من مسؤولين اثنين",
    "User registered successfully": "تم تسجيل المستخدم بنجاح",
    "كلمتا المرور غير متطابقتين": "كلمتا المرور غير متطابقتين",
    "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل":
      "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل",
    "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل":
      "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل",
    "Validation failed": "فشل التحقق من الصحة",
    "Something went wrong!": "حدث خطأ غير متوقع",
    "Invalid token": "رمز غير صالح",
    // You can add more known translations here
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/api/register",
      data,
      { withCredentials: true } // Added withCredentials
    );
    return {
      ...response.data,
      message: translations[response.data.message] ?? response.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Log the full error response for debugging
      console.error("Full Error Response:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        error: error.response?.data?.error,
        message: error.response?.data?.message,
      });

      // Extract the detailed error information
      const errorDetails = error.response?.data?.details || [];
      const errorMessage =
        error.response?.data?.message ||
        (errorDetails.length
          ? errorDetails
              .map((detail: { message: string }) => detail.message)
              .join(", ")
          : "An error occurred");

      const translatedMessage = translations[errorMessage] ?? errorMessage;
      throw new Error(translatedMessage);
    }
    throw new Error("حدث خطأ غير متوقع");
  }
};

export const loginUser = async (form: { email: string; password: string }) => {
  return axios.post("http://localhost:5000/api/login", form, {
    withCredentials: true, // Ensure cookies are sent with the request
  });
};

export const logoutUser = async () => {
  return axios.post(
    "http://localhost:5000/api/logout",
    {},
    {
      withCredentials: true, // Ensure cookies are sent with the request
    }
  );
};

export const checkAuth = async () => {
  const response = await axios.get("http://localhost:5000/api/check-auth", {
    withCredentials: true, // Ensure cookies are sent with the request
  });
  return response.data;
};
