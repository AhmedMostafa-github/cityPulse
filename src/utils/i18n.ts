import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "../types";

// Import translations
import enTranslation from "../locales/en/translation.json";
import arTranslation from "../locales/ar/translation.json";

// Initialize i18n with a simpler configuration
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    ar: {
      translation: arTranslation,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  debug: __DEV__,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Load saved language after initialization
const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("user-language");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      await i18n.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error("Error loading saved language:", error);
  }
};

// Load saved language
loadSavedLanguage();

export const changeLanguage = async (language: Language) => {
  try {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem("user-language", language);
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

export const getCurrentLanguage = (): Language => {
  try {
    return (i18n.language as Language) || "en";
  } catch (error) {
    console.error("Error getting current language:", error);
    return "en";
  }
};

export const isRTL = (): boolean => {
  try {
    return i18n.language === "ar";
  } catch (error) {
    console.error("Error checking RTL:", error);
    return false;
  }
};

export default i18n;
