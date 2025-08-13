import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

interface ValidatedInputProps extends TextInputProps {
  error?: string;
  label?: string;
  isPassword?: boolean;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  error,
  label,
  style,
  isPassword = false,
  secureTextEntry,
  ...props
}) => {
  const { colors } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const hasError = error && error !== "";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const shouldShowPassword = isPassword && !showPassword;

  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text
          style={{
            fontSize: 14,
            fontWeight: "500",
            color: colors.text,
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View style={{ position: "relative" }}>
        <TextInput
          style={[
            {
              height: 56,
              borderWidth: 1,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingRight: isPassword ? 56 : 16,
              fontSize: 16,
              backgroundColor: colors.surface,
              borderColor: hasError ? colors.error : colors.border,
              color: colors.text,
            },
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={shouldShowPassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 16,
              top: 16,
              padding: 4,
            }}
            onPress={togglePasswordVisibility}
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
            accessibilityRole="button"
            accessibilityHint="Toggles password visibility"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {hasError && (
        <Text
          style={{
            fontSize: 12,
            marginTop: 4,
            marginLeft: 4,
            color: colors.error,
            fontWeight: "500",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};
