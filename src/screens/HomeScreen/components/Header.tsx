import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../contexts/ThemeContext";
import { styles } from "../styles";

interface HeaderProps {
  safeTranslate: (key: string, fallback: string) => string;
}

export const Header: React.FC<HeaderProps> = ({ safeTranslate }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        {safeTranslate("home.title", "City Pulse")}
      </Text>
      <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
        {safeTranslate("home.subtitle", "Discover Your City")}
      </Text>
    </View>
  );
};
