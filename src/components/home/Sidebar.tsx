"use client";
import { useLanguage } from "@/context/languageColorContext";
import { useTheme } from "@/context/themeContext";
import { themeColors } from "@/utils/theme";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const { dataOflang } = useLanguage();
  const { currentColor } = useTheme();

  const [isFixed, setIsFixed] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerHeight = windowHeight * 0.75;

      if (scrollPosition >= triggerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        if (footerTop <= windowHeight) {
          setIsFixed(false);
        } else {
          setIsFixed(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`p-2 bg-gray-100 rounded-lg shadow-md text-right m-2 transition-opacity duration-500 ease-in-out fixed top-28 invisible lg:visible sm:invisible md:visible md:top-14 md:text-sm ${
        isVisible && isFixed
          ? " visible opacity-100 block"
          : "invisible opacity-0 hidden"
      }`}>
      <h2
        className={`text-lg text-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500 font-bold mb-2`}
        style={{ fontFamily: "Cairo, sans-serif" }}>
        {dataOflang?.delivery_rules?.title || "قواعد التوصيل"}
      </h2>
      <ul className="list-disc list-inside mb-2">
        <li>
          {dataOflang?.delivery_rules?.free_shipping ||
            "الشحن مجاني للطلبات فوق 100$"}
        </li>
        <li>
          {dataOflang?.delivery_rules?.delivery_time ||
            "توصيل خلال 3-5 أيام عمل"}
        </li>
        <li>{dataOflang?.delivery_rules?.track_order || "تتبع الطلب متاح"}</li>
      </ul>

      <h2
        className={`text-lg text-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500 font-bold mb-2`}
        style={{ fontFamily: "Cairo, sans-serif" }}>
        {dataOflang?.cash_on_delivery_rules?.title ||
          "قواعد الدفع عند الاستلام"}
      </h2>
      <ul className="list-disc list-inside mb-2">
        <li>
          {dataOflang?.cash_on_delivery_rules?.cash_on_delivery ||
            "الدفع نقدًا عند الاستلام"}
        </li>
        <li>
          {dataOflang?.cash_on_delivery_rules?.additional_fee ||
            "رسوم إضافية 50 دج خمسة ألآف فرنك"}
        </li>
        <li>
          {dataOflang?.cash_on_delivery_rules?.available_in_areas ||
            "متاح في مناطق محددة فقط"}
        </li>
      </ul>

      <h2
        className={`text-lg text-${
          themeColors[currentColor ?? "teal"]?.basics
        }-500 font-bold mb-2`}
        style={{ fontFamily: "Cairo, sans-serif" }}>
        {dataOflang?.order_confirmation?.title || "تأكيد الطلب"}
      </h2>
      <ul className="list-disc list-inside">
        <li>
          {dataOflang?.order_confirmation?.contact_to_confirm ||
            "سنتصل لتأكيد الطلب"}
        </li>
        <li>
          {dataOflang?.order_confirmation?.check_details ||
            "يرجى التحقق من تفاصيل الطلب"}
        </li>
        <li>
          {dataOflang?.order_confirmation?.contact_customer_service ||
            "اتصل بخدمة العملاء لأي استفسار"}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
