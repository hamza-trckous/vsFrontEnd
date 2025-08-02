"use client";
import React, { useEffect } from "react";
import { Product } from "@/Types/ProductPart";
import useTrackPageView from "@/hooks/useTrackPageView";
import trackFacebookEvent from "@/utils/trackFacebookEvent";
import { useAuth } from "@/context/AuthContext";
import { Title } from "@/components/cart/Title";
import { ShowingItems } from "@/components/cart/ShowingItems";
import { useQuery } from "@tanstack/react-query";
import { getCartServerAction } from "@/app/actions/cart";

interface CartItem {
  productId: Product;
  _id: string;
}
const CartPage = () => {
  const { isLoggedIn, isAdmin } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartServerAction,
    select: (data) => ({
      cart: data.cart.map((item: CartItem) => item.productId),
    }),
  });

  useEffect(() => {
    if (data?.cart?.length > 0) {
      trackFacebookEvent({
        eventName: "PageView",
        data: {
          page_name: "CartPage",
        },
        isAdmin,
      });
    }
    data?.cart?.forEach((product: Product) => {
      if (!product) return;

      trackFacebookEvent({
        eventName: "ViewContent",
        data: {
          content_type: "product",
          content_ids: product._id,
          content_name: product.name,
          value: product.price,
          currency: "DZD",
        },
        isAdmin,
      });
    });
  });

  useEffect(() => {}, [data]);

  const cartItems = data?.cart || [];
  const productNames = cartItems
    ?.filter((item: Product) => item)
    .map((item: Product) => item.name)
    .join(", ");

  useTrackPageView({
    page_name: "CartPage",
    product_names: productNames || "",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4" dir="rtl">
      <Title text="سلة التسوق" />
      {isLoggedIn ? (
        <Title text="مرحباً بك" />
      ) : (
        <Title text="للتمكن من الوصول للسلة يجب عليك تسجيل الدخول" />
      )}
      {!cartItems || cartItems.length === 0 ? (
        <Title text="سلة التسوق فارغة" />
      ) : (
        <ShowingItems cartItems={cartItems} />
      )}
    </div>
  );
};

export default CartPage;
