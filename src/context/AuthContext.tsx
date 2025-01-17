"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { loginUser, logoutUser, checkAuth } from "@/api/auth"; // Import the checkAuth function

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
    localStorage.setItem("blablabla", "vlavlalval");

    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;
      console.log("Token:", token);
      if (!token) {
        throw new Error("Token is null");
      }
      localStorage.setItem("token", token);

      await cheking(token);
    } catch (error) {
      localStorage.removeItem("token"); // Clean up if error
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("token");
      await logoutUser();
      setTimeout(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }, 1000);
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuthStatus = useMemo(
    () => async () => {
      const token = localStorage.getItem("token");

      console.log("Checking auth status");
      if (!token) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      console.log("Checking auth status2");
      cheking(token);
    },
    []
  );
  const cheking = async (token: string) => {
    try {
      const authData = await checkAuth(token);
      console.log("authin", authData);
      if (!authData.isAuthenticated) {
        setIsLoggedIn(false);
        setIsAdmin(false);

        return;
      }

      setIsLoggedIn(true);
      if (authData.user.role === "admin") {
        setIsAdmin(true);
      }
    } catch {
      // Handle error if needed
      setIsLoggedIn(false);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

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
