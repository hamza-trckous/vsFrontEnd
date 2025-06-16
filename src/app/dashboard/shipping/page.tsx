"use client";

import React, { useState, useEffect } from "react";
import { fetchShippingPrices, wilayas } from "@/utils/shipping";
import {
  updateShippingPrice,
  deleteShippingPrice,
  createInitialShippingPrices
} from "@/api/shipping";
import AlertModal from "@/components/AlertModal";
import Container from "@/components/dashbord/multualCompenents/Container";
import { themeColors } from "@/utils/theme";
import { useTheme } from "@/context/themeContext";

const Shipping = () => {
  const { currentColor } = useTheme();

  const [shippingPrices, setShippingPrices] = useState<{
    [city: string]: { priceToDesktop: number; priceToHomme: number };
  }>({});

  const [globalPrice, setGlobalPrice] = useState<number>(600);
  const [globalPrice2, setGlobalPrice2] = useState<number>(800);
  const [isInitialPricesCreated, setIsInitialPricesCreated] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error">("success");

  useEffect(() => {
    const feetch = async () => {
      const prices = await fetchShippingPrices();
      if (prices) {
        setIsInitialPricesCreated(true);
        setShippingPrices(prices);
      }
    };
    feetch();
  }, []);

  const handlePriceChange = (
    city: string,
    pricetype: "priceToDesktop" | "priceToHomme",
    price: number
  ) => {
    setShippingPrices((prevPrices) => ({
      ...prevPrices,
      [city]: { ...prevPrices[city], [pricetype]: price }
    }));
  };

  const handleSavePrices = async () => {
    try {
      for (const [wilaya, { priceToDesktop, priceToHomme }] of Object.entries(
        shippingPrices
      )) {
        await updateShippingPrice(wilaya, priceToDesktop, priceToHomme);
      }

      setAlertMessage("تم حفظ أسعار التوصيل بنجاح!");
      setType("success");
    } catch (error) {
      console.error("Error saving shipping prices:", error);
      setAlertMessage("حدث خطأ أثناء حفظ أسعار التوصيل.");
      setType("error");
    }
  };

  const handleInitializePrices = async () => {
    try {
      const initialPrices = wilayas.map((wilaya) => ({
        wilaya: wilaya.name,
        priceToDesktop: globalPrice,
        priceToHomme: globalPrice2
      }));
      await createInitialShippingPrices(initialPrices);
      setAlertMessage("تم إنشاء قائمة أسعار التوصيل بنجاح!");
      window.location.reload();
    } catch (error) {
      console.error("Error initializing shipping prices:", error);
      setAlertMessage("حدث خطأ أثناء إنشاء قائمة أسعار التوصيل.");
    }
  };

  const handleDeletePrices = async () => {
    try {
      for (const wilaya of Object.keys(shippingPrices)) {
        await deleteShippingPrice(wilaya);
      }
      setAlertMessage("تم حذف قائمة أسعار التوصيل بنجاح!");
      setShippingPrices({});
    } catch (error) {
      console.error("Error deleting shipping prices:", error);
      setAlertMessage("حدث خطأ أثناء حذف قائمة أسعار التوصيل.");
    }
  };

  const handleApplyGlobalPrice = () => {
    const updatedPrices = wilayas.reduce(
      (
        acc: { [city: string]: { priceDesktop: number; priceToHomme: number } },
        wilaya
      ) => {
        const currentPrices = shippingPrices[wilaya.name] || {
          priceDesktop: 0,
          priceToHomme: 0
        };
        acc[wilaya.name] = {
          priceDesktop: globalPrice,
          priceToHomme: currentPrices.priceToHomme
        };
        return acc;
      },
      {}
    );
    setShippingPrices((pre) => {
      const updated = { ...pre };
      for (const city in updatedPrices) {
        updated[city] = {
          priceToDesktop: updatedPrices[city].priceDesktop,
          priceToHomme: updated[city]?.priceToHomme || 0
        };
      }
      return updated;
    });
  };

  const handleApplyGlobalPrice2 = () => {
    const updatedPrices = wilayas.reduce(
      (
        acc: { [city: string]: { priceDesktop: number; priceToHomme: number } },
        wilaya
      ) => {
        const currentPrices = shippingPrices[wilaya.name] || {
          priceDesktop: 0,
          priceToHomme: 0
        };
        acc[wilaya.name] = {
          priceDesktop: currentPrices.priceToDesktop,
          priceToHomme: globalPrice2
        };
        return acc;
      },
      {}
    );
    setShippingPrices((pre) => {
      const updated = { ...pre };
      for (const city in updatedPrices) {
        updated[city] = {
          priceToDesktop: updated[city]?.priceToDesktop || 0,
          priceToHomme: updatedPrices[city].priceToHomme
        };
      }
      return updated;
    });
  };
  return (
    <Container>
      <h2 className="text-2xl font-bold mb-4 text-center">
        جدول أسعار التوصيل في الجزائر
      </h2>
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={handleApplyGlobalPrice}
          className={`ml-2 bg-${
            themeColors[currentColor ?? "teal"]?.basics
          }-500 text-white px-4 py-2 rounded-lg hover:bg-${
            themeColors[currentColor ?? "teal"]?.basics
          }-600 transition-colors duration-200`}>
          تطبيق سعر التوصيل للمكتب على جميع الولايات
        </button>
        <input
          type="number"
          value={globalPrice}
          onChange={(e) => setGlobalPrice(parseFloat(e.target.value))}
          className="border rounded px-2 py-1 text-center"
        />
      </div>
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={handleApplyGlobalPrice2}
          className={`ml-2 bg-${
            themeColors[currentColor ?? "teal"]?.basics
          }-500 text-white px-4 py-2 rounded-lg hover:bg-${
            themeColors[currentColor ?? "teal"]?.basics
          }-600 transition-colors duration-200`}>
          تطبيق سعر التوصيل للمنزل على جميع الولايات
        </button>
        <input
          type="number"
          value={globalPrice2}
          onChange={(e) => setGlobalPrice2(parseFloat(e.target.value))}
          className="border rounded px-2 py-1 text-center"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">الولاية</th>
            <th className="py-2 px-4 border-b"> سعر التوصيل للمكتب(دج)</th>

            <th className="py-2 px-4 border-b">سعر التوصيل للمنزل(دج)</th>
          </tr>
        </thead>
        <tbody>
          {wilayas.map((wilaya) => (
            <tr key={wilaya.code}>
              <td className="py-2 px-4 border-b text-center">
                {wilaya.arabicName}
              </td>
              <td className="py-2 px-4 border-b">
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    value={shippingPrices[wilaya.name]?.priceToDesktop || ""}
                    onChange={(e) =>
                      handlePriceChange(
                        wilaya.name,
                        "priceToDesktop",
                        parseFloat(e.target.value)
                      )
                    }
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                  <span className="ml-2">دج</span>
                </div>
              </td>
              <td className="py-2 px-4 border-b">
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    value={shippingPrices[wilaya.name]?.priceToHomme || ""}
                    onChange={(e) =>
                      handlePriceChange(
                        wilaya.name,
                        "priceToHomme",
                        parseFloat(e.target.value)
                      )
                    }
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                  <span className="ml-2">دج</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center space-x-4">
        <button
          onClick={handleSavePrices}
          className={`mt-4 bg-${
            themeColors[currentColor ?? "teal"]?.basics
          }-500 text-white px-4 py-2 rounded-lg hover:bg-${
            themeColors[currentColor ?? "teal"]?.basics
          }-600 transition-colors duration-200`}>
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

      {alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
          type={type}
        />
      )}
    </Container>
  );
};

export default Shipping;
