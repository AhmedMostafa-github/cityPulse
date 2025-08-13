import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ThemedCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: "small" | "medium" | "large";
  margin?: "small" | "medium" | "large";
  elevation?: number;
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  children,
  style,
  padding = "medium",
  margin = "small",
  elevation = 3,
}) => {
  const { colors } = useTheme();

  const getPadding = () => {
    switch (padding) {
      case "small":
        return 12;
      case "large":
        return 24;
      default:
        return 16;
    }
  };

  const getMargin = () => {
    switch (margin) {
      case "small":
        return 8;
      case "large":
        return 24;
      default:
        return 16;
    }
  };

  const cardStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: 15,
    padding: getPadding(),
    margin: getMargin(),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: elevation },
    shadowOpacity: 0.1,
    shadowRadius: elevation,
    elevation: elevation,
  };

  return <View style={[cardStyle, style]}>{children}</View>;
};
