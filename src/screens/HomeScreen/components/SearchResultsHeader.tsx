import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../contexts/ThemeContext";
import { styles } from "../styles";

interface SearchResultsHeaderProps {
  searchQuery: string;
  filteredEvents: any[];
  filteredVenues: any[];
}

export const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
  searchQuery,
  filteredEvents,
  filteredVenues,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  if (!searchQuery.trim().length) return null;

  return (
    <View style={styles.searchResultsHeader}>
      <Text style={[styles.searchResultsText, { color: colors.textSecondary }]}>
        {t("home.searchResults", {
          count: filteredEvents.length + filteredVenues.length,
          query: searchQuery,
        })}
      </Text>
    </View>
  );
};
