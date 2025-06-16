"use client";

import { useEffect } from "react";
import { useFacebookPixel } from "@/context/FacebookPixelContext";
import { useAuth } from "@/context/AuthContext";

const PageTracker = () => {
  const { trackPageView } = useFacebookPixel();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    trackPageView({
      page_name: "AllProductsPage",
      user_role: isLoggedIn ? "logged_in" : "guest",
    });
  }, [trackPageView, isLoggedIn]);

  return null;
};

export default PageTracker;
