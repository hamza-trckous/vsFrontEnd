"use client";
import { getCartServerAction, handleRemoveCartItem } from "@/app/actions/cart";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

interface UseCardItemsProps {
  cart: {
    productId: string;
    _id: string;
    quantity: number;
  }[];
}

export const UseCardItems = () => {
  const queryClient = useQueryClient();

  // Query to fetch cart items
  const { data, isLoading, error, isError, isSuccess } =
    useQuery<UseCardItemsProps>({
      queryKey: ["cart"],
      queryFn: getCartServerAction,
      select: (data: UseCardItemsProps) => data
    });

  // Mutation for removing items from the cart
  const {
    mutateAsync: removeItem,
    status: mutationStatus,
    isError: isMutationError
  } = useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: (productId: string) => handleRemoveCartItem(productId),
    onSettled: () => {
      // Invalidate the cart query after mutation is completed
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });

  // Handle success or error states manually
  if (isLoading) {
  }

  if (isError && error) {
    console.error("Error fetching cart items:", error);
  }

  if (isSuccess && data) {
  }

  if (mutationStatus === "pending") {
  }

  if (isMutationError) {
    console.error("Error removing item from cart");
  }

  // Return the data and methods
  return {
    cartItems: data?.cart ?? [],
    isLoading,
    handleRemoveItem: removeItem,
    isRemoving: mutationStatus === "pending", // this can be used as a loading indicator
    error
  };
};
