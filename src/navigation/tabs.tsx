import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

import { HomeStack } from "./stack";
import { ExploreStack } from "./stack";
import { FavoritesStack } from "./stack";
import { ProfileStack } from "./stack";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { colors, theme } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 88,
          paddingBottom: 20,
          paddingTop: 10,
          shadowColor: colors.shadow,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: theme === "dark" ? 0.3 : 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: isRTL ? "الرئيسية" : "Home",
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarLabel: isRTL ? "استكشاف" : "Explore",
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarLabel: isRTL ? "المفضلة" : "Favorites",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: isRTL ? "الملف الشخصي" : "Profile",
        }}
      />
    </Tab.Navigator>
  );
};
