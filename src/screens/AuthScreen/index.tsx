import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { ValidatedInput } from "../../components/ValidatedInput";
import { useAuthForm } from "../../hooks/useAuthForm";
import { styles } from "./styles";

export const AuthScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { signup, login, isLoading, error, clearError } = useAuth();
  const {
    formData,
    validationErrors,
    handleInputChange,
    validateFormData,
    resetForm,
    clearValidationErrors,
  } = useAuthForm();

  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert(t("common.error"), error);
      clearError();
    }
  }, [error, t, clearError]);

  const handleSubmit = async () => {
    const validation = validateFormData(isSignup);

    if (!validation.isValid) {
      return;
    }

    if (isSignup) {
      const success = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (success) {
        Alert.alert(t("common.success"), "Account created successfully!");
      }
    } else {
      const success = await login({
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        Alert.alert(t("common.success"), "Login successful!");
      }
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    resetForm();
    clearError();
  };

  const handleLanguageToggle = async () => {
    const newLang = language === "en" ? "ar" : "en";
    try {
      await changeLanguage(newLang);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const isFormValid = (): boolean => {
    if (isSignup) {
      return (
        formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.confirmPassword.trim() !== "" &&
        formData.password === formData.confirmPassword &&
        Object.values(validationErrors).every((error) => error === "")
      );
    }
    return (
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      Object.values(validationErrors).every((error) => error === "")
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={[styles.languageToggle, { borderColor: colors.border }]}
          onPress={handleLanguageToggle}
        >
          <Text style={[styles.languageText, { color: colors.primary }]}>
            {language === "en" ? "العربية" : "English"}
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("auth.title")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {t("auth.subtitle")}
          </Text>
        </View>

        <View style={styles.form}>
          {isSignup && (
            <ValidatedInput
              label={t("auth.name")}
              placeholder={t("auth.namePlaceholder")}
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              autoCapitalize="words"
              error={validationErrors.name}
            />
          )}

          <ValidatedInput
            label={t("auth.email")}
            placeholder={t("auth.emailPlaceholder")}
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={validationErrors.email}
          />

          <ValidatedInput
            label={t("auth.password")}
            placeholder={t("auth.passwordPlaceholder")}
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            isPassword
            error={validationErrors.password}
          />

          {isSignup && (
            <ValidatedInput
              label={t("auth.confirmPassword")}
              placeholder={t("auth.confirmPasswordPlaceholder")}
              value={formData.confirmPassword}
              onChangeText={(value) =>
                handleInputChange("confirmPassword", value)
              }
              isPassword
              error={validationErrors.confirmPassword}
            />
          )}

          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: isFormValid() ? colors.primary : colors.border,
              },
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid() || isLoading}
          >
            <Text style={[styles.submitButtonText, { color: colors.surface }]}>
              {isLoading
                ? t("common.loading")
                : isSignup
                ? t("auth.signup")
                : t("auth.login")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.modeToggle} onPress={toggleMode}>
            <Text style={[styles.modeToggleText, { color: colors.primary }]}>
              {isSignup ? t("auth.switchToLogin") : t("auth.switchToSignup")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
