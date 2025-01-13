"use client";
import { getCartItems, removeFromCart } from "@/api/cart";
import { Product } from "@/Types/ProductPart";
import { useEffect, useState } from "react";

export const UseCardItems = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { cart } = await getCartItems();
        setCartItems(cart.map((item: { productId: string }) => item.productId));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id: string) => {
    try {
      await removeFromCart(id);
      setCartItems(cartItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return { cartItems, loading, handleRemoveItem };
};
