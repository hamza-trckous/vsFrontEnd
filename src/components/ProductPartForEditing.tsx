"use client";
import React, { useState, useEffect, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useRouter, useParams } from "next/navigation";
import { getProductById, updateProduct } from "../api/product";
import { NewProduct, ProductWithreviews } from "../Types/ProductPart";
import AddNAme from "./ProductPart/AddNAme";
import MethodAddingPhoto from "./ProductPart/methodAddingPhoto";
import Description from "./ProductPart/description";
import Price from "./ProductPart/Price";
import Color from "./ProductPart/Color";
import Size from "./ProductPart/Size";
import Ration from "./ProductPart/ration";
import Reviews from "./ProductPart/reviews";
import DiscountPrice from "./ProductPart/DiscountPrice";
import AlertModal from "@/components/AlertModal";
import BtnSubmit from "./ProductPart/BtnSubmit";
import Title from "./dashbord/multualCompenents/Title";
import Container from "./dashbord/multualCompenents/Container";

const ProductPage = () => {
  const router = useRouter();
  const params = useParams<{ ProductID: string }>();
  const ProductID = params?.ProductID;

  const {
    unregister,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<NewProduct>();

  // State for product

  const [product, setProduct] = useState<ProductWithreviews | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  // Fetch product details when the component mounts
  useEffect(() => {
    if (ProductID) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await getProductById(ProductID as string);
          setProduct(fetchedProduct);

          console.log("Fetched product:", fetchedProduct);
          // Populate form fields with product details
          setValue("name", fetchedProduct.name);
          setValue("description", fetchedProduct.description);
          setValue("price", fetchedProduct.price);
          setValue("colors", fetchedProduct.colors);
          setValue("sizes", fetchedProduct.sizes);
          setValue("rating", fetchedProduct.rating);
          setValue("reviews", fetchedProduct.reviews);
          setValue("images", fetchedProduct.images);
          setValue("withShipping", fetchedProduct.withShipping);
          setValue("discountedPrice", fetchedProduct.discountedPrice);
          if (fetchedProduct.LandingPageContent) {
            setValue("LandingPageContent", fetchedProduct.LandingPageContent);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [ProductID, setValue]);

  const onSubmit = async (data: NewProduct) => {
    // Ensure images is an array and contains valid URLs or base64 strings
    if (!Array.isArray(data.images)) {
      data.images = [data.images];
    }
    data.images = data.images
      .filter((image): image is string => typeof image === "string")
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

    console.log("Submitting data: ", data);
    try {
      await updateProduct(ProductID as string, data);
      console.log("Updated product: ", data);
      setAlertMessage("تم تحديث المنتج بنجاح!");
      setAlertType("success");
      setTimeout(() => {
        router.push("/dashboard/Product");
      }, 2000); // Redirect after 2 seconds
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
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* Edit Product Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 text-sm">
        <Title title={"تعديل المنتج"} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <AddNAme nameOfInput="الفئة" register={register} errors={errors} />{" "}
          <MethodAddingPhoto
            register={register}
            errors={errors}
            setNewProduct={(value: SetStateAction<NewProduct>) =>
              setProduct(
                (prev) => ({ ...prev, ...value } as ProductWithreviews)
              )
            }
            newProduct={product}
            setValue={setValue}
          />
          <Description register={register} errors={errors} />
          <Price register={register} errors={errors} />
          <DiscountPrice register={register} errors={errors} />
          {/* Colors Section */}
          <Color
            setValue={setValue}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          {/* Sizes Section */}
          <Size
            setValue={setValue}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          {/* Rating Section */}
          <Ration
            register={register}
            setValue={setValue}
            errors={errors}
            getValues={getValues}
          />
          {/* Reviews Section */}
          <Reviews
            register={register}
            errors={errors}
            setValue={setValue}
            unregister={unregister}
            initialReviews={product.reviews || []}
          />
        </div>
        <BtnSubmit BtnName="  تحديث المنتج" />
      </form>
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

export default ProductPage;
