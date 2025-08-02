"use client";
import AddNAme from "@/components/ProductPart/AddNAme";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Category } from "@/Types/Categorys";
import BtnSubmit from "@/components/ProductPart/BtnSubmit";
import Description from "@/components/ProductPart/description";
import AddPhoto from "@/components/dashbord/Categorys/addPhoto";

import { useAlert } from "@/context/useAlert";
import AlertModal from "@/components/AlertModal";
import { useCategory } from "@/context/CategoryContext";
import { useLanguage } from "@/context/languageColorContext";

const FormForAddingCategory = () => {
  const { alertMessage, setAlertMessage, alertType, setAlertType } = useAlert();
  const [imagePreviews, setImagePreviews] = useState("");

  const {
    setValue,
    setError,
    handleSubmit,
    register,
    clearErrors,

    formState: { errors },
  } = useForm<Category>();

  const { addCategorie } = useCategory();
  const onSubmit = async (data: Category) => {
    if (!data.image) {
      setError("image", {
        type: "required",
        message: "الصورة مطلوبة",
      });
      setValue("image", "");
      return;
    }

    const add = await addCategorie(data);
    setAlertMessage(add);
    setAlertType(add === "تمت اضافة الفئة بنجاح" ? "success" : "error");
    setValue("name", "");
    setValue("description", "");
    setValue("image", "");
    setImagePreviews("");
  };
  const { dataOflang, lang } = useLanguage();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-4 text-sm flex flex-col"
    >
      <AddNAme
        lang={lang}
        dataOfLang={dataOflang}
        nameOfInput={dataOflang?.addingProduct.categoryTitle || " الفئة"}
        register={register}
        errors={errors}
      />
      <Description<Category>
        lang={lang}
        dataOflang={dataOflang}
        nameOfInput={dataOflang?.addingProduct.categoryTitle || " الفئة"}
        register={register}
        errors={errors}
      />
      <AddPhoto
        setImagePreviews={setImagePreviews}
        imagePreviews={imagePreviews}
        clearErrors={clearErrors}
        setError={setError}
        setValue={setValue}
        register={register}
        errors={errors}
      />
      <BtnSubmit
        BtnName={dataOflang?.addingProduct?.addCategory || "إضافة الفئة"}
      />
      {alertMessage && (
        <AlertModal
          type={alertType}
          onClose={() => setAlertMessage(null)}
          message={alertMessage}
        />
      )}
    </form>
  );
};

export default FormForAddingCategory;
