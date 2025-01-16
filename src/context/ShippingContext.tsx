"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getShippingPrices } from "@/api/shipping";

interface ShippingContextProps {
  shippingPrices: {
    [city: string]: { priceToDesktop: number; priceToHomme: number };
  };
  setShippingPrices: React.Dispatch<
    React.SetStateAction<{
      [city: string]: { priceToDesktop: number; priceToHomme: number };
    }>
  >;
}

const ShippingContext = createContext<ShippingContextProps | undefined>(
  undefined
);

export const ShippingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [shippingPrices, setShippingPrices] = useState<{
    [city: string]: { priceToDesktop: number; priceToHomme: number };
  }>({});
  const fetchShippingPrices = useCallback(async () => {
    try {
      const prices = await getShippingPrices();
      console.log("prices", prices);
      const pricesMap = prices.reduce(
        (
          acc: {
            [city: string]: { priceToDesktop: number; priceToHomme: number };
          },
          item: {
            wilayas: string;
            priceToDesktop: number;
            priceToHomme: number;
          }
        ) => {
          acc[item.wilayas] = {
            priceToDesktop: item.priceToDesktop,
            priceToHomme: item.priceToHomme,
          };
          return acc;
        },
        {}
      );
      setShippingPrices(pricesMap);
    } catch (error) {
      console.error("Error fetching shipping prices:", error);
    }
  }, []);

  useEffect(() => {
    fetchShippingPrices();
  }, [fetchShippingPrices]);

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
