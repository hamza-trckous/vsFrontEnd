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

const RegisterForm = () => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Name register={register} errors={errors} />
      <LastName register={register} errors={errors} />
      <DateOfBirthday register={register} errors={errors} />
      <PlaceOfBirthday register={register} errors={errors} />
      <UserName register={register} errors={errors} />
      <Email register={register} errors={errors} />
      <Password register={register} errors={errors} />
      <PasswordConfirm register={register} errors={errors} />
      <RegisterButton />

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

interface NameProps {
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}
const Name = ({ register, errors }: NameProps) => {
  return (
    <div className="flex flex-col items-center">
      <label className="block text-sm font-medium text-gray-700">الاسم:</label>
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

const LastName = ({ register, errors }: NameProps) => {
  return (
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
        <span className="text-red-500 text-sm">{errors.lastname.message}</span>
      )}
    </div>
  );
};
const DateOfBirthday = ({ register, errors }: NameProps) => {
  return (
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
  );
};

const PlaceOfBirthday = ({ register, errors }: NameProps) => {
  return (
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
  );
};

const UserName = ({ register, errors }: NameProps) => {
  return (
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
        <span className="text-red-500 text-sm">{errors.username.message}</span>
      )}
    </div>
  );
};

const Email = ({ register, errors }: NameProps) => {
  return (
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
  );
};
const Password = ({ register, errors }: NameProps) => {
  return (
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
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}
    </div>
  );
};
const PasswordConfirm = ({ register, errors }: NameProps) => {
  return (
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
  );
};

const RegisterButton = () => {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="w-3/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        تسجيل
      </button>
    </div>
  );
};
