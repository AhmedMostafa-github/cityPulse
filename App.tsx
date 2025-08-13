import React from "react";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Import contexts
import { ThemeProvider } from "./src/contexts/ThemeContext";
import { LanguageProvider } from "./src/contexts/LanguageContext";
import { AuthProvider } from "./src/contexts/AuthContext";

// Import navigation
import { AppNavigator } from "./src/navigation";

// Import i18n
import i18n from "./src/utils/i18n";

// Main App Component
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <AppNavigator />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}
