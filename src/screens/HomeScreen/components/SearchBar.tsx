import React from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { styles } from "../styles";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  safeTranslate: (key: string, fallback: string) => string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  safeTranslate,
}) => {
  const { colors } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <TouchableOpacity
      style={[styles.searchBar, { backgroundColor: colors.surface }]}
      onPress={() => {}}
    >
      <Ionicons name="search" size={20} color={colors.textSecondary} />
      <TextInput
        style={[
          styles.searchInput,
          { color: colors.text, textAlign: isRTL ? "right" : "left" },
        ]}
        placeholder={safeTranslate(
          "home.searchPlaceholder",
          "Search places, events, restaurants..."
        )}
        placeholderTextColor={colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Ionicons
            name="close-circle"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};
