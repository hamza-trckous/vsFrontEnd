"use client";

import React, { useState, useEffect } from "react";
import { wilayas } from "@/utils/shipping";
import {
  getShippingPrices,
  updateShippingPrice,
  deleteShippingPrice,
  createInitialShippingPrices,
} from "@/api/shipping";
import AlertModal from "@/components/AlertModal";

const Shipping = () => {
  const [shippingPrices, setShippingPrices] = useState<{
    [city: string]: number;
  }>({});
  const [globalPrice, setGlobalPrice] = useState<number>(600);
  const [isInitialPricesCreated, setIsInitialPricesCreated] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchShippingPrices = async () => {
      try {
        const prices = await getShippingPrices();
        if (prices.length > 0) {
          setIsInitialPricesCreated(true);
        }
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

  const handlePriceChange = (city: string, price: number) => {
    setShippingPrices((prevPrices) => ({
      ...prevPrices,
      [city]: price,
    }));
  };

  const handleSavePrices = async () => {
    try {
      for (const [wilaya, price] of Object.entries(shippingPrices)) {
        await updateShippingPrice(wilaya, price);
      }
      setAlertMessage("تم حفظ أسعار الشحن بنجاح!");
      setType("success");
    } catch (error) {
      console.error("Error saving shipping prices:", error);
      setAlertMessage("حدث خطأ أثناء حفظ أسعار الشحن.");
      setType("error");
    }
  };

  const handleInitializePrices = async () => {
    try {
      const initialPrices = wilayas.map((wilaya) => ({
        wilaya: wilaya.name,
        price: globalPrice,
      }));
      await createInitialShippingPrices(initialPrices);
      setAlertMessage("تم إنشاء قائمة أسعار الشحن بنجاح!");
      window.location.reload();
    } catch (error) {
      console.error("Error initializing shipping prices:", error);
      setAlertMessage("حدث خطأ أثناء إنشاء قائمة أسعار الشحن.");
    }
  };

  const handleDeletePrices = async () => {
    try {
      for (const wilaya of Object.keys(shippingPrices)) {
        await deleteShippingPrice(wilaya);
      }
      setAlertMessage("تم حذف قائمة أسعار الشحن بنجاح!");
      setShippingPrices({});
    } catch (error) {
      console.error("Error deleting shipping prices:", error);
      setAlertMessage("حدث خطأ أثناء حذف قائمة أسعار الشحن.");
    }
  };

  const handleApplyGlobalPrice = () => {
    const updatedPrices = wilayas.reduce(
      (acc: { [city: string]: number }, wilaya) => {
        acc[wilaya.name] = globalPrice;
        return acc;
      },
      {}
    );
    setShippingPrices(updatedPrices);
  };

  return (
    <div className="container mx-auto p-4 w-full justify-start flex-col">
      <div className="w-11/12">
        <h2 className="text-2xl font-bold mb-4 text-center">
          جدول أسعار الشحن في الجزائر
        </h2>
        <div className="flex items-center justify-center mb-4">
          <input
            type="number"
            value={globalPrice}
            onChange={(e) => setGlobalPrice(parseFloat(e.target.value))}
            className="border rounded px-2 py-1 text-center"
          />
          <button
            onClick={handleApplyGlobalPrice}
            className="ml-2 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200">
            تطبيق السعر على جميع الولايات
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">الولاية</th>
              <th className="py-2 px-4 border-b">سعر الشحن (دج)</th>
            </tr>
          </thead>
          <tbody>
            {wilayas.map((wilaya) => (
              <tr key={wilaya.code}>
                <td className="py-2 px-4 border-b text-center">
                  {wilaya.arabicName}
                </td>
                <td className="py-2 px-4 border-b flex items-center justify-center">
                  <input
                    type="number"
                    value={shippingPrices[wilaya.name] || ""}
                    onChange={(e) =>
                      handlePriceChange(wilaya.name, parseFloat(e.target.value))
                    }
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                  <span className="ml-2">دج</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-center space-x-4">
          <button
            onClick={handleSavePrices}
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200">
            حفظ الأسعار
          </button>
          <button
            onClick={handleInitializePrices}
            className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
              isInitialPricesCreated &&
              "bg-slate-400 cursor-auto hover:bg-slate-400"
            } `}
            disabled={isInitialPricesCreated}>
            إنشاء القائمة
          </button>
          <button
            onClick={handleDeletePrices}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200">
            حذف القائمة
          </button>
        </div>
      </div>
      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
          type={type}
        />
      )}
    </div>
  );
};

export default Shipping;
