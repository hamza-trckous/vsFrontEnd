/* eslint-disable */

"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from "react";
import {
  loginUser,
  logoutUser,
  checkAuth,
  CheckAuthResponse
} from "@/api/auth";

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
  children
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await loginUser({ email, password });
      const token = response.data.token;

      if (!token) {
        throw new Error("Token is null");
      }

      window.localStorage.setItem("token", token);
      const storedToken = window.localStorage.getItem("token");

      if (!storedToken) {
        throw new Error("Failed to store token");
      }

      await cheking(token);
    } catch (error) {
      console.error("Login error:", error);
      window.localStorage.removeItem("token");
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
      // Clear all storage
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("isAdmin");

      setIsLoggedIn(false);
      setIsAdmin(false);

      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cheking = async (token: string): Promise<CheckAuthResponse | void> => {
    if (!token) {
      setIsLoggedIn(false);
      setIsAdmin(false);
      await logout();
      console.log("logout - no token");
      return;
    }

    try {
      const authData = await checkAuth(token);

      if (authData && authData.isAuthenticated) {
        setIsLoggedIn(true);
        setIsAdmin(authData?.user?.role === "admin");
        window.localStorage.setItem("token", token);
        return authData;
      } else {
        // Token is invalid or expired
        console.log("Authentication failed - logging out");
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
    console.log("checking auth status...");
    const token = window.localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setIsLoggedIn(false);
      setIsAdmin(false);
      return;
    }

    try {
      const response = await cheking(token);
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
    checkAuthStatus();
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
        cheking
      }}>
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
