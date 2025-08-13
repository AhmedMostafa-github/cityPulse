import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../hooks/useAuth";
import { ThemedCard } from "../../components/ThemedCard";
import { ThemedButton } from "../../components/ThemedButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";

type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

export const ProfileScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors, theme, toggleTheme } = useTheme();
  const { isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = async () => {
    await logout();
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  const menuItems = [
    {
      icon: "settings",
      title: t("profile.settings"),
      onPress: handleSettingsPress,
      color: colors.primary,
      showArrow: true,
    },
    {
      icon: "notifications",
      title: t("profile.notifications"),
      onPress: () => {},
      color: colors.info,
      showArrow: true,
    },
    {
      icon: "help-circle",
      title: t("profile.helpSupport"),
      onPress: () => {},
      color: colors.warning,
      showArrow: true,
    },
    {
      icon: "information-circle",
      title: t("profile.about"),
      onPress: () => {},
      color: colors.secondary,
      showArrow: true,
    },
  ];

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>
            {t("common.loading")}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View
          style={[styles.profileAvatar, { backgroundColor: colors.primary }]}
        >
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person" size={40} color="#fff" />
          )}
        </View>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {user.name}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {t("profile.subtitle")}
        </Text>
      </View>

      <ThemedCard style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>24</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            {t("profile.placesVisited")}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.secondary }]}>
            12
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            {t("profile.reviews")}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: colors.info }]}>8</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            {t("profile.favorites")}
          </Text>
        </View>
      </ThemedCard>

      {/* Theme Toggle Section */}
      <ThemedCard style={styles.themeContainer}>
        <View style={styles.themeHeader}>
          <View style={styles.themeHeaderLeft}>
            <Ionicons
              name={theme === "dark" ? "moon" : "sunny"}
              size={24}
              color={theme === "dark" ? "#FFD700" : "#FF6B6B"}
            />
            <Text style={[styles.themeTitle, { color: colors.text }]}>
              {t("profile.darkMode", "Dark Mode")}
            </Text>
          </View>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={theme === "dark" ? colors.surface : colors.background}
            ios_backgroundColor={colors.border}
          />
        </View>
        <Text
          style={[styles.themeDescription, { color: colors.textSecondary }]}
        >
          {t(
            "profile.darkModeDescription",
            "Switch between light and dark themes"
          )}
        </Text>
      </ThemedCard>

      <ThemedCard style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon as any} size={24} color={item.color} />
              <Text style={[styles.menuText, { color: colors.text }]}>
                {item.title}
              </Text>
            </View>
            {item.showArrow && (
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
                style={{ transform: [{ rotate: isRTL ? "180deg" : "0deg" }] }}
              />
            )}
          </TouchableOpacity>
        ))}
      </ThemedCard>

      <View style={styles.logoutContainer}>
        <ThemedButton
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          fullWidth
          style={[styles.logoutButton, { borderColor: colors.error }] as any}
          textStyle={{ color: colors.error }}
        />
      </View>
    </ScrollView>
  );
};
