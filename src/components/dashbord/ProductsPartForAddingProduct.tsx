"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProduct, getAllProductsNormal } from "../../api/product"; // Adjust the import path as necessary
import {
  NewProduct,
  Product,
  ProductPagination,
  ProductWithreviews,
} from "../../Types/ProductPart"; // Adjust the import path as necessary
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
import { getCategoryProducts } from "@/api/category";
const ProductPart = () => {
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
  const [products, setProducts] = useState<ProductWithreviews[]>([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectCategory.name !== "") {
        const fetchedProducts: Product[] = await getCategoryProducts(
          selectCategory.id
        );
        console.log(fetchedProducts, "ProductsCategory");
        const productsWithReviews: ProductWithreviews[] = fetchedProducts.map(
          (product) => ({
            ...product,
            _id: product._id || "", // Ensure _id is always a string
            reviews: product.reviews || [],
            withShipping: product.withShipping || "لا", // Ensure withShipping is included
            discountedPrice: product.discountedPrice || 0, // Ensure discountedPrice is included
          })
        );
        setProducts(productsWithReviews);
      } else {
        try {
          const fetchedProducts: ProductPagination =
            await getAllProductsNormal();
          console.log(fetchedProducts);
          const productsWithReviews: ProductWithreviews[] =
            fetchedProducts.products.map((product) => ({
              ...product,
              _id: product._id || "", // Ensure _id is always a string
              reviews: product.reviews || [],
              withShipping: product.withShipping || "لا", // Ensure withShipping is included
              discountedPrice: product.discountedPrice || 0, // Ensure discountedPrice is included
            }));
          setProducts(productsWithReviews);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [selectCategory]);

  const onSubmit = async (data: NewProduct) => {
    console.log(data, "data showing ");

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
      data.withShipping = "لا"; // Default value if not provided
    }

    try {
      const createdProduct = await createProduct(data);
      setProducts([...products, createdProduct]);
      setAlertType("success");
      setAlertMessage("تمت إضافة المنتج بنجاح!");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.errors) {
        console.error(
          "Error updating product:",
          error.response.data.errors[0].message
        );
        setAlertMessage(
          error.response.data.errors[0].message || "حدث خطأ أثناء تحديث المنتج."
        );
      } else {
        console.error("Error updating product:", error);
        setAlertMessage("حدث خطأ أثناء تحديث المنتج.");
      }
      setAlertType("error");
    }

    // Reset new product state
    setNewProduct({
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
    <Container>
      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 text-sm mt-20  md:mt-0">
        <TitleRtl title=" إضافةالمنتجات" />
        <SelectCategory
          setSelectCategory={setSelectCategory}
          register={register}
          errors={errors}
        />
        <ShowCategory />
        <div className="md:grid flex flex-wrap md:grid-cols-2 gap-2">
          <AddNAme register={register} errors={errors} nameOfInput="name" />

          <MethodAddingPhoto
            register={register}
            errors={errors}
            setNewProduct={setNewProduct}
            newProduct={newProduct}
            setValue={setValue}
          />

          <Description register={register} errors={errors} />
          <Price register={register} errors={errors} />
          <DiscountPrice register={register} errors={errors} />
          <WithShipping
            getValues={getValues}
            register={register}
            setValue={setValue}
            errors={errors}
          />
          {/* Colors Section */}
          <Color
            getValues={getValues}
            setValue={setValue}
            register={register}
            errors={errors}
          />
          {/* Sizes Section */}
          <Size
            getValues={getValues}
            setValue={setValue}
            register={register}
            errors={errors}
          />
          {/* Rating Section */}
          <Ration
            getValues={getValues}
            register={register}
            setValue={setValue}
            errors={errors}
          />

          {/* Reviews Section */}
          <Reviews
            register={register}
            errors={errors}
            setValue={setValue}
            unregister={unregister}
            initialReviews={newProduct.reviews || []}
          />
        </div>
        <BtnSubmit BtnName={"إضافةالمنتج"} />
      </form>

      <hr className="mb-4" />

      {/* Products List */}
      <h2 className="text-lg font-bold mb-2 text-right">إدارة المنتجات</h2>
      {selectCategory && (
        <>
          <TitleRtl title={selectCategory.name} />
        </>
      )}
      <Table
        products={products}
        onDelete={async (id: string) => {
          await handleDelete(
            id,
            setProducts,
            setAlertType,
            setAlertMessage,
            products
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
