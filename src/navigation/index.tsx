import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";

// Import contexts
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

// Import screens
import { AuthScreen } from "../screens/AuthScreen";

// Import navigation components
import { TabNavigator } from "./tabs";

export const AppNavigator = () => {
  const { isRTL } = useLanguage();
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, direction: isRTL ? "rtl" : "ltr" }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        {isAuthenticated ? <TabNavigator /> : <AuthScreen />}
      </NavigationContainer>
    </View>
  );
};

// Export individual components for use in other files
export { HomeStack, ExploreStack, FavoritesStack, ProfileStack } from "./stack";
export { TabNavigator } from "./tabs";
