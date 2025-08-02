/* eslint-disable */

"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  loginUser,
  logoutUser,
  checkAuth,
  CheckAuthResponse,
  fetchCsrfToken,
} from "@/api/auth";
import axios from "axios";
import { getAllProducts, getAllProductsNormal } from "@/api/product";
import { sendHelp } from "@/api/serviceHelpe/help";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  cheking: (token: string) => Promise<CheckAuthResponse | void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginUser({ email, password });
      console.log("login", response);
      await cheking();
    } catch (error) {
      console.error("Login error:", error);

      setIsLoggedIn(false);
      setIsAdmin(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      setIsLoggedIn(false);
      setIsAdmin(false);

      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cheking = async (): Promise<CheckAuthResponse | void> => {
    if (typeof window === "undefined") return;

    try {
      const authData = await checkAuth();

      if (authData && authData.isAuthenticated) {
        setIsLoggedIn(true);
        setIsAdmin(authData?.user?.role === "admin");
        return authData;
      } else {
        // Token is invalid or expired
        await logout();
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      // Force logout on any auth error
      await logout();
      throw error; // Re-throw to handle in calling code
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await cheking();
      if (response?.isAuthenticated) {
        setIsLoggedIn(true);
        setIsAdmin(response?.user?.role === "admin");
      } else {
        await logout();
      }
    } catch (error) {
      console.error("Auth status check failed:", error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendHelp();
    const init = async () => {
      try {
        const product = await getAllProductsNormal();
        console.log("product Normal", product);
        const csrfToken = await fetchCsrfToken();
        console.log("✅ CSRF Token fetched:", csrfToken);

        axios.defaults.headers.post["X-CSRF-Token"] = csrfToken;
        axios.defaults.headers.put["X-CSRF-Token"] = csrfToken;
        axios.defaults.headers.delete["X-CSRF-Token"] = csrfToken;
      } catch (err) {
        console.error("❌ فشل في جلب CSRF Token", err);
      }

      try {
        await checkAuthStatus();
      } catch (err) {
        console.error("❌ فشل في التحقق من حالة تسجيل الدخول", err);
      }
    };

    init();
    // every 5 mnt chek Token in coockies :
    const interval = setInterval(checkAuthStatus, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        loading,
        login,
        logout,
        setLoading,
        setIsLoggedIn,
        cheking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
