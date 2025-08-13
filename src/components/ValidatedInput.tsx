import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface ValidatedInputProps extends TextInputProps {
  error?: string;
  label?: string;
}

export const ValidatedInput: React.FC<ValidatedInputProps> = ({
  error,
  label,
  style,
  ...props
}) => {
  const { colors } = useTheme();
  const hasError = error && error !== "";

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
      <TextInput
        style={[
          {
            height: 56,
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 16,
            fontSize: 16,
            backgroundColor: colors.surface,
            borderColor: hasError ? colors.error : colors.border,
            color: colors.text,
          },
          style,
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
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
