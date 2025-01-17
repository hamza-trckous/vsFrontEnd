"use client";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
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
        isVisible ? "opacity-100" : "opacity-0"
      } ${isFixed ? "" : "opacity-0"} ${
        isVisible ? "visible" : "invisible"
      } md:visible md:text-sm`}>
      <h2
        className="text-lg text-teal-500 font-bold mb-2"
        style={{ fontFamily: "Cairo, sans-serif" }}>
        قواعد التوصيل
      </h2>
      <ul className="list-disc list-inside mb-2">
        <li>الشحن مجاني للطلبات فوق 100$</li>
        <li>توصيل خلال 3-5 أيام عمل</li>
        <li>تتبع الطلب متاح</li>
      </ul>
      <h2
        className="text-lg text-teal-500  font-bold mb-2"
        style={{ fontFamily: "Cairo, sans-serif" }}>
        قواعد الدفع عند الاستلام
      </h2>
      <ul className="list-disc list-inside mb-2">
        <li>الدفع نقدًا عند الاستلام</li>
        <li>رسوم إضافية 50 دج خمسة ألآف فرنك</li>
        <li>متاح في مناطق محددة فقط</li>
      </ul>
      <h2
        className="text-lg font-bold text-teal-500  mb-2"
        style={{ fontFamily: "Cairo, sans-serif" }}>
        تأكيد الطلب
      </h2>
      <ul className="list-disc list-inside">
        <li>سنتصل لتأكيد الطلب</li>
        <li>يرجى التحقق من تفاصيل الطلب</li>
        <li>اتصل بخدمة العملاء لأي استفسار</li>
      </ul>
    </div>
  );
};

export default Sidebar;
