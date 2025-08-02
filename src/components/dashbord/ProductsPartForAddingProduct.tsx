"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createProduct } from "../../api/product"; // Adjust the import path as necessary
import { NewProduct } from "../../Types/ProductPart"; // Adjust the import path as necessary
import AddNAme from "../ProductPart/AddNAme"; // Ensure correct import path
import MethodAddingPhoto from "../ProductPart/methodAddingPhoto";
import Description from "../ProductPart/description";
import Price from "../ProductPart/Price";
import Color from "../ProductPart/Color";
import Size from "../ProductPart/Size";
import Ration from "../ProductPart/ration";
import Reviews from "../ProductPart/reviews";
import Table from "../ProductPart/Table";
import WithShipping from "../ProductPart/WithShipping";
import DiscountPrice from "../ProductPart/DiscountPrice";
import AlertModal from "../AlertModal";
import { AxiosError } from "axios";
import { handleDelete } from "@/utils/dashboard/ProductPart";
import TitleRtl from "./multualCompenents/Title";
import BtnSubmit from "../ProductPart/BtnSubmit";
import Container from "./multualCompenents/Container";
import SelectCategory from "../ProductPart/SelectCategory";
import ShowCategory from "../ProductPart/ShowCategory";
import { useLanguage } from "@/context/languageColorContext";
import { useProducts } from "@/hooks/UseProducts";
import { useCategory } from "@/context/CategoryContext";
const ProductPart = () => {
  const { lang, dataOflang } = useLanguage();
  const {
    unregister,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm<NewProduct>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountedPrice: 0, // Provide a default value
      colors: [],
      sizes: [],
      rating: 0,
      reviews: [],
      images: [],
      withShipping: "",
    },
  });

  // State for new product
  const [newProduct, setNewProduct] = useState<NewProduct>({
    _id: "",
    name: "",
    description: "",
    price: 0,
    discountedPrice: 0, // Provide a default value
    colors: [],
    sizes: [],
    rating: 0,
    reviews: [],
    images: [], // Ensure the property name matches the backend schema
    withShipping: "",
    category: "",
  });

  // State for products
  // const [products, setProducts] = useState<ProductWithreviews[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [selectCategory, setSelectCategory] = useState<{
    id: string;
    name: string;
  }>({
    id: "",
    name: "",
  });
  // Fetch all products when the component mounts
  const { category } = useCategory();
  const { products, setProducts } = useProducts();
  const [productsInTAble, setproductsInTAble] = useState(products);
  useEffect(() => {
    setproductsInTAble(
      category
        ?.filter((cat) => cat._id === selectCategory.id)
        .flatMap((cat) => cat.products || []) || [],
    );
  }, [selectCategory, category]);
  const onSubmit = async (data: NewProduct) => {
    // Ensure images is an array and contains valid URLs or base64 strings
    if (typeof data.images === "string") {
      data.images = [data.images];
    }
    data.images = data.images
      .map((image) => {
        if (image.startsWith("data:image/")) {
          return image;
        } else {
          try {
            new URL(image);
            return image;
          } catch {
            return ""; // Invalid URL, replace with an empty string or handle accordingly
          }
        }
      })
      .filter((image) => image !== ""); // Remove invalid entries

    // Ensure withShipping is provided
    if (!data.withShipping) {
      data.withShipping =
        dataOflang?.addingProduct.no || dataOflang?.addingProduct.no || "لا"; // Default value if not provided
    }

    try {
      const createdProduct = await createProduct(data);
      setProducts([...products, createdProduct]);
      setAlertType("success");
      setAlertMessage(
        dataOflang?.addingProduct.successCreate || "تمت إضافة المنتج بنجاح!",
      );
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        console.error(
          "Error  Adding Poduct:",
          error.response.data.errors[0].message,
        );
        setAlertMessage(
          error.response.data.errors[0].message ||
            dataOflang?.addingProduct.errorCreate ||
            "حدث خطأ أثناء تحديث المنتج.",
        );
      } else {
        console.error("Error updating product:", error);
        setAlertMessage(
          dataOflang?.addingProduct.errorCreate ||
            "حدث خطأ أثناء تحديث المنتج.",
        );
      }
      setAlertType("error");
    }

    // Reset new product state
    setNewProduct({
      _id: "",
      name: "",
      description: "",
      price: 0,
      discountedPrice: 0,
      colors: [],
      sizes: [],
      rating: 0,
      reviews: [],
      images: [],
      withShipping: "",
      category: "",
    });
  };

  return (
    <Container lang={lang}>
      {/* Add Product Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 text-sm ">
        <TitleRtl
          title={dataOflang?.addingProduct.addProductTitle || "إضافةالمنتجات"}
        />
        <SelectCategory
          lang={lang}
          dataOfLang={dataOflang}
          setSelectCategory={setSelectCategory}
          register={register}
          errors={errors}
        />
        <ShowCategory />
        <div className="md:grid flex flex-wrap md:grid-cols-2 gap-2">
          <AddNAme
            lang={lang}
            dataOfLang={dataOflang}
            register={register}
            errors={errors}
            nameOfInput="product"
          />

          <MethodAddingPhoto
            lang={lang}
            register={register}
            errors={errors}
            setNewProduct={setNewProduct}
            newProduct={newProduct}
            setValue={setValue}
            dataOfLang={dataOflang}
          />

          <Description
            dataOflang={dataOflang}
            lang={lang}
            register={register}
            errors={errors}
          />
          <Price
            lang={lang}
            dataOfLang={dataOflang}
            register={register}
            errors={errors}
          />
          <DiscountPrice
            lang={lang}
            dataOfLang={dataOflang}
            register={register}
            errors={errors}
          />
          <WithShipping
            lang={lang}
            dataOflang={dataOflang}
            getValues={getValues}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          {/* Colors Section */}
          <Color
            lang={lang}
            dataOflang={dataOflang}
            getValues={getValues}
            setValue={setValue}
            register={register}
            errors={errors}
          />
          {/* Sizes Section */}
          <Size
            lang={lang}
            dataOflang={dataOflang}
            getValues={getValues}
            setValue={setValue}
            register={register}
            errors={errors}
          />
          {/* Rating Section */}
          <Ration
            lang={lang}
            dataOflang={dataOflang}
            getValues={getValues}
            register={register}
            setValue={setValue}
            errors={errors}
          />

          {/* Reviews Section */}
          <Reviews
            lang={lang}
            dataOflang={dataOflang}
            register={register}
            errors={errors}
            setValue={setValue}
            unregister={unregister}
            initialReviews={newProduct.reviews || []}
          />
        </div>
        <BtnSubmit
          BtnName={dataOflang?.addingProduct.addProductTitle || "إضافةالمنتجات"}
        />
      </form>

      <hr className="mb-4" />

      {/* Products List */}
      <h2 className="text-lg font-bold mb-2 ">
        {dataOflang?.addingProduct.manageProducts || "إدارة المنتجات"}
      </h2>
      {selectCategory && (
        <>
          <TitleRtl title={selectCategory.name} />
        </>
      )}
      <Table
        products={productsInTAble}
        onDelete={async (id: string) => {
          await handleDelete(
            id,
            setProducts,
            setAlertType,
            setAlertMessage,
            products,
          );
        }}
      />
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </Container>
  );
};

export default ProductPart;
