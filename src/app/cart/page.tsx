import React from "react";
import CartContent from "@/components/cart/CartContent";

import { dehydrate, QueryClient } from "react-query";
import HydrateWrapper from "@/components/HydrateWrapper";
import { getCartServerAction } from "../actions/cart";
const CartPage = async () => {
  const quryClinet = new QueryClient();
  await quryClinet.prefetchQuery({
    queryKey: ["cart"],
    queryFn: getCartServerAction,
  });
  const dehydratedState = dehydrate(quryClinet);

  return (
    <HydrateWrapper state={dehydratedState}>
      <CartContent />
    </HydrateWrapper>
  );
};

export default CartPage;
