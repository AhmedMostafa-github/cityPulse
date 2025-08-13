import { ThemeColors } from "../types";

export const lightTheme: ThemeColors = {
  primary: "#FF6B6B",
  secondary: "#4ECDC4",
  background: "#F8F9FA",
  surface: "#FFFFFF",
  text: "#2C3E50",
  textSecondary: "#7F8C8D",
  border: "#E9ECEF",
  shadow: "#000000",
  success: "#28A745",
  error: "#DC3545",
  warning: "#FFC107",
  info: "#17A2B8",
};

export const darkTheme: ThemeColors = {
  primary: "#FF6B6B",
  secondary: "#4ECDC4",
  background: "#1A1A1A",
  surface: "#2D2D2D",
  text: "#FFFFFF",
  textSecondary: "#B0B0B0",
  border: "#404040",
  shadow: "#000000",
  success: "#28A745",
  error: "#DC3545",
  warning: "#FFC107",
  info: "#17A2B8",
};

export const getThemeColors = (theme: "light" | "dark"): ThemeColors => {
  return theme === "light" ? lightTheme : darkTheme;
};
