import React, { createContext, useContext, useEffect, useState } from "react";
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
    const initializeLanguage = async () => {
      try {
        // Set default values immediately
        setLanguageState("en");
        setRTL(false);

        // Try to get the actual language
        const currentLang = getCurrentLanguage();
        setLanguageState(currentLang);
        setRTL(isRTL());
      } catch (error) {
        console.error("Error initializing language:", error);
        // Keep default values
      }
    };

    // Initialize immediately
    initializeLanguage();

    // Set up a timeout to check again after a short delay
    const timer = setTimeout(() => {
      try {
        const currentLang = getCurrentLanguage();
        setLanguageState(currentLang);
        setRTL(isRTL());
      } catch (error) {
        console.error("Error in delayed language initialization:", error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = async (newLanguage: Language) => {
    try {
      await changeLanguage(newLanguage);
      setLanguageState(newLanguage);
      setRTL(isRTL());
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
