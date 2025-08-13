import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState, AuthUser, AuthCredentials, SignupData } from "../types";

interface AuthContextType extends AuthState {
  signup: (data: SignupData) => Promise<boolean>;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const userData = await AsyncStorage.getItem("user-data");
      const authToken = await AsyncStorage.getItem("auth-token");

      if (userData && authToken) {
        const user = JSON.parse(userData);
        setState({
          isAuthenticated: true,
          user,
          isLoading: false,
          error: null,
        });
      } else {
        setState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: "Authentication check failed",
      });
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      if (data.password !== data.confirmPassword) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Passwords do not match",
        }));
        return false;
      }

      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const userExists = users.find((user: any) => user.email === data.email);
      if (userExists) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "User with this email already exists",
        }));
        return false;
      }

      const newUser: AuthUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        preferences: {
          theme: "dark",
          language: "en",
          notifications: true,
        },
      };

      users.push({
        email: data.email,
        password: data.password,
        userData: newUser,
      });

      await AsyncStorage.setItem("users", JSON.stringify(users));

      const token = `token_${Date.now()}_${Math.random()}`;

      await AsyncStorage.setItem("user-data", JSON.stringify(newUser));
      await AsyncStorage.setItem("auth-token", token);

      setState({
        isAuthenticated: true,
        user: newUser,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      console.error("Error during signup:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Signup failed. Please try again.",
      }));
      return false;
    }
  };

  const login = async (credentials: AuthCredentials): Promise<boolean> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const user = users.find(
        (u: any) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Invalid email or password",
        }));
        return false;
      }

      const token = `token_${Date.now()}_${Math.random()}`;

      await AsyncStorage.setItem("user-data", JSON.stringify(user.userData));
      await AsyncStorage.setItem("auth-token", token);

      setState({
        isAuthenticated: true,
        user: user.userData,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      console.error("Error during login:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Login failed. Please try again.",
      }));
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user-data");
      await AsyncStorage.removeItem("auth-token");

      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    signup,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
