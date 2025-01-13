"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getShippingPrices } from "@/api/shipping";

interface ShippingContextProps {
  shippingPrices: { [city: string]: number };
  setShippingPrices: React.Dispatch<
    React.SetStateAction<{ [city: string]: number }>
  >;
}

const ShippingContext = createContext<ShippingContextProps | undefined>(
  undefined
);

export const ShippingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shippingPrices, setShippingPrices] = useState<{
    [city: string]: number;
  }>({});

  useEffect(() => {
    const fetchShippingPrices = async () => {
      try {
        const prices = await getShippingPrices();
        console.log("prices", prices);
        const pricesMap = prices.reduce(
          (
            acc: { [city: string]: number },
            item: { wilayas: string; price: number }
          ) => {
            acc[item.wilayas] = item.price;
            return acc;
          },
          {}
        );
        setShippingPrices(pricesMap);
      } catch (error) {
        console.error("Error fetching shipping prices:", error);
      }
    };

    fetchShippingPrices();
  }, []);

  return (
    <ShippingContext.Provider value={{ shippingPrices, setShippingPrices }}>
      {children}
    </ShippingContext.Provider>
  );
};

export const useShipping = () => {
  const context = useContext(ShippingContext);
  if (context === undefined) {
    throw new Error("useShipping must be used within a ShippingProvider");
  }
  return context;
};
