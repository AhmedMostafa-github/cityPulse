import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "../types";
import { changeLanguage, getCurrentLanguage, isRTL } from "../utils/i18n";

interface LanguageContextType {
  language: Language;
  isRTL: boolean;
  changeLanguage: (lang: Language) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [rtl, setRTL] = useState(false);

  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("user-language");
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
        setLanguageState(savedLanguage);
        setRTL(savedLanguage === "ar");
        await changeLanguage(savedLanguage);
      } else {
        // Set default values
        setLanguageState("en");
        setRTL(false);
        await changeLanguage("en");
      }
    } catch (error) {
      console.error("Error loading saved language:", error);
      // Set default values
      setLanguageState("en");
      setRTL(false);
      await changeLanguage("en");
    }
  };

  const handleLanguageChange = async (newLanguage: Language) => {
    try {
      await changeLanguage(newLanguage);
      setLanguageState(newLanguage);
      setRTL(newLanguage === "ar");

      // Save language preference
      await AsyncStorage.setItem("user-language", newLanguage);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const value: LanguageContextType = {
    language,
    isRTL: rtl,
    changeLanguage: handleLanguageChange,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
