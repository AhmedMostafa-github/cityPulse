import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { ThemedCard } from "../../components/ThemedCard";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "./styles";

type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
};

type SettingsScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Settings"
>;

export const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { language, changeLanguage, isRTL } = useLanguage();
  const { user } = useAuth();
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const handleLanguageChange = async () => {
    const newLanguage = language === "en" ? "ar" : "en";
    await changeLanguage(newLanguage);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const getLanguageDisplayName = (lang: string) => {
    return lang === "en" ? "English" : "العربية";
  };

  const getLanguageFlag = (lang: string) => {
    return lang === "en" ? "🇺🇸" : "🇸🇦";
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <TouchableOpacity
          style={[
            styles.backButton,
            { transform: [{ rotate: isRTL ? "180deg" : "0deg" }] },
          ]}
          onPress={handleBackPress}
        >
          <Ionicons
            name={isRTL ? "arrow-forward" : "arrow-back"}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("settings.title")}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {user?.name}
        </Text>
      </View>

      <ThemedCard style={styles.settingsCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("settings.language", "Language")}
        </Text>

        <View
          style={[styles.settingItem, { borderBottomColor: colors.border }]}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="language" size={24} color={colors.secondary} />
            <Text style={[styles.settingText, { color: colors.text }]}>
              {t("settings.language", "Language")}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.languageButton,
              {
                borderColor: colors.primary,
                backgroundColor:
                  language === "en" ? colors.primary : colors.surface,
                flexDirection: isRTL ? "row-reverse" : "row",
              },
            ]}
            onPress={handleLanguageChange}
          >
            <Text style={styles.languageFlag}>{getLanguageFlag(language)}</Text>
            <Text
              style={[
                styles.languageText,
                {
                  color: language === "en" ? colors.white : colors.primary,
                },
              ]}
            >
              {getLanguageDisplayName(language)}
            </Text>
          </TouchableOpacity>
        </View>
      </ThemedCard>

      <ThemedCard style={styles.settingsCard}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("settings.about", "About")}
        </Text>

        <View
          style={[styles.settingItem, { borderBottomColor: colors.border }]}
        >
          <View style={styles.settingLeft}>
            <Ionicons name="information-circle" size={24} color={colors.info} />
            <Text style={[styles.settingText, { color: colors.text }]}>
              {t("settings.version", "Version")}
            </Text>
          </View>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            1.0.0
          </Text>
        </View>
      </ThemedCard>
    </ScrollView>
  );
};
