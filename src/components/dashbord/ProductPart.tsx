"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
} from "../../api/product"; // Adjust the import path as necessary
import { NewProduct, ProductWithreviews } from "../../Types/ProductPart"; // Adjust the import path as necessary
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
  });

  // State for products
  const [products, setProducts] = useState<ProductWithreviews[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: ProductWithreviews[] = await getAllProducts();
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
      setAlertType("success");
      setAlertMessage("تم حذف المنتج بنجاح!");
    } catch (error) {
      console.error("Error deleting product:", error);
      setAlertMessage("حدث خطأ أثناء حذف المنتج. يرجى المحاولة مرة أخرى.");
      setAlertType("error");
    }
  };

  return (
    <div
      className="card-container bg-white shadow-md rounded-lg p-4 w-full md:w-11/12"
      dir="rtl">
      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-4 text-sm mt-20  md:mt-0">
        <h2 className="text-lg font-bold mb-2 text-right">إضافة منتج جديد</h2>
        <div className="md:grid flex flex-wrap md:grid-cols-2 gap-2">
          <AddNAme register={register} errors={errors} />

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
        <button
          type="submit"
          className="mt-2 bg-teal-500 text-white px-3 py-1 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-xs"
          data-tribute="true">
          إضافة المنتج
        </button>
      </form>

      <hr className="mb-4" />

      {/* Products List */}
      <h2 className="text-lg font-bold mb-2 text-right">إدارة المنتجات</h2>
      <Table products={products} onDelete={handleDelete} />
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </div>
  );
};

export default ProductPart;
