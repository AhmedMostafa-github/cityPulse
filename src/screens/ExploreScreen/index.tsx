import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { ThemedCard } from "../../components/ThemedCard";
import { ThemedButton } from "../../components/ThemedButton";
import { styles } from "./styles";

export const ExploreScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { isRTL } = useLanguage();

  const filters = [
    { key: "distance", label: t("explore.distance"), icon: "location" },
    { key: "rating", label: t("explore.rating"), icon: "star" },
    { key: "price", label: t("explore.price"), icon: "card" },
    { key: "openNow", label: t("explore.openNow"), icon: "time" },
  ];

  const handleFilterPress = (filterKey: string) => {
    // Handle filter selection
    console.log("Filter selected:", filterKey);
  };

  const handleMapPress = () => {
    // Handle map interaction
    console.log("Map pressed");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text
          style={[
            styles.headerTitle,
            {
              color: colors.text,
            },
          ]}
        >
          {t("explore.title")}
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {t("explore.subtitle")}
        </Text>
      </View>

      <ThemedCard style={styles.mapPlaceholder}>
        <TouchableOpacity
          style={styles.mapContent}
          onPress={handleMapPress}
          activeOpacity={0.8}
        >
          <View style={[styles.mapIcon, { backgroundColor: colors.border }]}>
            <Ionicons name="map" size={60} color={colors.textSecondary} />
          </View>
          <Text style={[styles.mapText, { color: colors.text }]}>
            {t("explore.mapPlaceholder")}
          </Text>
          <Text style={[styles.mapSubtext, { color: colors.textSecondary }]}>
            {t("explore.mapSubtext")}
          </Text>
        </TouchableOpacity>
      </ThemedCard>

      <View style={styles.filtersContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          {t("explore.filters")}
        </Text>
        <View style={styles.filterChips}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
              onPress={() => handleFilterPress(filter.key)}
            >
              <Ionicons
                name={filter.icon as any}
                size={16}
                color={colors.primary}
                style={styles.filterIcon}
              />
              <Text style={[styles.filterChipText, { color: colors.text }]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.recentSearchesContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
            },
          ]}
        >
          {t("explore.recentSearches", "Recent Searches")}
        </Text>
        <View style={styles.recentSearchesList}>
          <Text
            style={[styles.noSearchesText, { color: colors.textSecondary }]}
          >
            {t("explore.noRecentSearches", "No recent searches")}
          </Text>
        </View>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {t("explore.quickActions", "Quick Actions")}
        </Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={[
              styles.quickActionCard,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons name="restaurant" size={32} color={colors.primary} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              {t("explore.findRestaurants", "Find Restaurants")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickActionCard,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons name="calendar" size={32} color={colors.secondary} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              {t("explore.eventsToday", "Events Today")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickActionCard,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons name="location" size={32} color={colors.info} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              {t("explore.nearMe", "Near Me")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickActionCard,
              { backgroundColor: colors.surface },
            ]}
          >
            <Ionicons name="trending-up" size={32} color={colors.warning} />
            <Text style={[styles.quickActionText, { color: colors.text }]}>
              {t("explore.trending", "Trending")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
