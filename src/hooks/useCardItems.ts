"use client";
import { getCartServerAction, handleRemoveCartItem } from "@/app/actions/cart";
import { useQuery, useQueryClient, useMutation } from "react-query";

interface UseCardItemsProps {
  cart: {
    productId: string;
    _id: string;
    quantity: number;
  }[];
}

export const UseCardItems = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<UseCardItemsProps>({
    queryKey: ["cart"],
    queryFn: getCartServerAction,
    select: (data: UseCardItemsProps) => data,
    onSuccess: (data) => {
      console.log("Query succeeded:", data);
    },
    onError: (error) => {
      console.error("Query failed:", error);
    },
  });
  const { mutateAsync: removeItem, isLoading: isRemoving } = useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: (productId: string) => handleRemoveCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error: Error) => {
      console.error("Error removing item from cart:", error);
    },
  });

  return {
    cartItems: data ?? [],
    isLoading,
    handleRemoveItem: removeItem,
    isRemoving,
    error,
  };
};
