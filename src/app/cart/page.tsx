import React from "react";
import CartContent from "@/components/cart/CartContent";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import HydrateWrapper from "@/components/HydrateWrapper";
import { getCartServerAction } from "../actions/cart";
export const dynamic = "force-dynamic";

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
