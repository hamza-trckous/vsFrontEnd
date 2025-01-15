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
      await loginUser({ email, password });
      const authData = await checkAuth();
      console.log("authData 2 ", authData);

      if (!authData.isAuthenticated) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      setIsLoggedIn(true);
      if (authData.user.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      // console.error("Error logging in:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setTimeout(() => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const checkAuthStatus = useMemo(
    () => async () => {
      try {
        const authData = await checkAuth();
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
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
