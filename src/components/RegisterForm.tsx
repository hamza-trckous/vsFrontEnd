"use client";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IFormInput, registerSchema } from "@/utils/schema";
import RegisterFormUtils from "@/utils/registerForm";
import { useLanguage } from "@/context/languageColorContext";
import { LanguageConfig } from "@/Types/LanguageConfig";
import { themeColors } from "@/utils/theme";
import { useTheme } from "@/context/themeContext";

const RegisterForm = () => {
  const { dataOflang } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const registerFormUtils = RegisterFormUtils();
  const { message } = registerFormUtils;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await registerFormUtils.LogicOnSubmitRegister(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mt-16 mb-mt-16 w-[80%] mx-auto "
    >
      <div className=" space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 flex justify-center items-center content-center align-middle flex-col">
        <Name dataOflang={dataOflang} register={register} errors={errors} />
        <LastName dataOflang={dataOflang} register={register} errors={errors} />
        <DateOfBirthday
          dataOflang={dataOflang}
          register={register}
          errors={errors}
        />
        <PlaceOfBirthday
          dataOflang={dataOflang}
          register={register}
          errors={errors}
        />
        <UserName dataOflang={dataOflang} register={register} errors={errors} />
        <Email dataOflang={dataOflang} register={register} errors={errors} />
        <Password dataOflang={dataOflang} register={register} errors={errors} />
        <PasswordConfirm
          dataOflang={dataOflang}
          register={register}
          errors={errors}
        />
        <RegisterButton dataOflang={dataOflang} />

        {message && (
          <div
            className={`text-center p-2 rounded ${
              message.includes("بنجاح")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <p className="text-md font-bold ">{message}</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default RegisterForm;

interface NameProps {
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  dataOflang: LanguageConfig | undefined;
}
const Name = ({ register, errors, dataOflang }: NameProps) => {
  return (
    <div className="flex flex-col items-center  mt-2 w-full">
      <label className="block text-md font-bold  text-gray-700">
        {dataOflang?.name || "الاسم"}:
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
  );
};

const LastName = ({ register, errors, dataOflang }: NameProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <label className="block text-md font-bold  text-gray-700">
        {dataOflang?.lastname || "اسم العائلة"}:
      </label>
      <input
        data-tribute="true"
        {...register("lastname")}
        className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors.lastname && (
        <span className="text-red-500 text-sm">{errors.lastname.message}</span>
      )}
    </div>
  );
};
const DateOfBirthday = ({ register, errors, dataOflang }: NameProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <label className="block text-md font-bold  text-gray-700">
        {dataOflang?.dateOfbirth || "تاريخ الميلاد"}:
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
  );
};

const PlaceOfBirthday = ({ register, errors, dataOflang }: NameProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <label className="block text-md font-bold  text-gray-700">
        {dataOflang?.placeofbirth || "مكان الميلاد"}:
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
  );
};

const UserName = ({ register, errors, dataOflang }: NameProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <label className="block text-md font-bold  text-gray-700">
        {dataOflang?.username || "اسم المستخدم"}:
      </label>
      <input
        data-tribute="true"
        {...register("username")}
        className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors.username && (
        <span className="text-red-500 text-sm">{errors.username.message}</span>
      )}
    </div>
  );
};

const Email = ({ register, errors, dataOflang }: NameProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <label className="block text-md font-bold  text-gray-700">
        {dataOflang?.email || "البريد الإلكتروني"}:
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
  );
};
const Password = ({ register, errors, dataOflang }: NameProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <label className="block text-md font-bold  text-gray-700">
        {dataOflang?.password || "كلمة المرور"}:
      </label>
      <input
        data-tribute="true"
        type="password"
        {...register("password")}
        className="mt-1 block w-3/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}
    </div>
  );
};
const PasswordConfirm = ({ register, errors, dataOflang }: NameProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <label className="block text-md font-bold  text-gray-700">
        {dataOflang?.confirmPassword || "تأكيد كلمة المرور"}:
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
  );
};

const RegisterButton = ({
  dataOflang,
}: {
  dataOflang: LanguageConfig | undefined;
}) => {
  const { currentColor } = useTheme();

  return (
    <div className="flex justify-center w-full">
      <button
        type="submit"
        className={`w-3/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-bold  text-white bg-${
          themeColors[currentColor ?? "teal"]?.basics
        }-600 hover:bg-${
          themeColors[currentColor ?? "teal"]?.basics
        }-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500`}
      >
        {dataOflang?.submit || "تسجيل"}
      </button>
    </div>
  );
};
