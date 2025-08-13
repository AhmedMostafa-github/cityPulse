import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";

import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

import { AuthScreen } from "../screens/AuthScreen";

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

export { HomeStack, ExploreStack, FavoritesStack, ProfileStack } from "./stack";
export { TabNavigator } from "./tabs";
