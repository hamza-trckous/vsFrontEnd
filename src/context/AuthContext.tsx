"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { loginUser, logoutUser, checkAuth } from "@/api/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  cheking: (token: string) => Promise<void>;
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
      const token = response.data.token;

      if (!token) {
        throw new Error("Token is null");
      }

      // Store token and verify storage
      window.localStorage.setItem("token", token);
      const storedToken = window.localStorage.getItem("token");

      if (!storedToken) {
        throw new Error("Failed to store token");
      }

      // Verify authentication
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
      // First remove token and update state
      window.localStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsAdmin(false);
      // Then call logout API
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cheking = async (token: string) => {
    if (!token) {
      setIsLoggedIn(false);
      setIsAdmin(false);
      return;
    }

    try {
      const authData = await checkAuth(token);

      if (authData && authData.isAuthenticated) {
        setIsLoggedIn(true);
        setIsAdmin(authData.user.role === "admin");
        // Ensure token is still stored
        window.localStorage.setItem("token", token);
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      window.localStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const token = window.localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      await cheking(token);
    } catch (error) {
      console.error("Auth status check error:", error);
      window.localStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsAdmin(false);
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
        cheking,
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
