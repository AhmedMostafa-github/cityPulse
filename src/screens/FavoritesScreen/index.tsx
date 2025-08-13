import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { ThemedButton } from "../../components/ThemedButton";
import { styles } from "./styles";

export const FavoritesScreen: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { isRTL } = useLanguage();
  const { getFavoritesByCategory, removeFromFavorites } = useFavoritesStore();
  const favoriteVenues = getFavoritesByCategory("venue");
  const favoriteEvents = getFavoritesByCategory("event");
  const [activeTab, setActiveTab] = useState<"places" | "events">("places");

  const getLocalizedName = (item: any, field: string) => {
    try {
      const arField = `${field}Ar` as keyof typeof item;
      const defaultField = field as keyof typeof item;

      if (isRTL && arField in item) {
        return (item as any)[arField] || (item as any)[defaultField];
      }
      return (item as any)[defaultField];
    } catch (error) {
      return (item as any)[field] || "";
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIcon, { backgroundColor: colors.border }]}>
        <Ionicons name="heart" size={50} color={colors.textSecondary} />
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>
        {t("favorites.emptyTitle")}
      </Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        {t("favorites.emptySubtitle")}
      </Text>
      <ThemedButton
        title={t("favorites.startExploring", "Start Exploring")}
        onPress={() => {}}
        variant="primary"
        style={
          [
            styles.startExploringButton,
            { backgroundColor: colors.primary },
          ] as any
        }
        textStyle={{
          fontSize: 16,
          fontWeight: "600",
          color: colors.white,
        }}
      />
    </View>
  );

  const renderTabs = () => (
    <View style={[styles.tabsContainer, { backgroundColor: colors.lightGray }]}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "places" && [
            styles.activeTab,
            { backgroundColor: colors.primary },
          ],
        ]}
        onPress={() => setActiveTab("places")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "places"
              ? [styles.activeTabText, { color: colors.white }]
              : [styles.inactiveTabText, { color: colors.textSecondary }],
          ]}
        >
          {t("favorites.places")}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === "events" && [
            styles.activeTab,
            { backgroundColor: colors.primary },
          ],
        ]}
        onPress={() => setActiveTab("events")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "events"
              ? [styles.activeTabText, { color: colors.white }]
              : [styles.inactiveTabText, { color: colors.textSecondary }],
          ]}
        >
          {t("favorites.events")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (activeTab === "places") {
      return (
        <View style={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("favorites.places")}
          </Text>
          {favoriteVenues.length === 0 ? (
            <Text
              style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              {t("favorites.emptySubtitle")}
            </Text>
          ) : (
            favoriteVenues.map((venue) => (
              <View
                key={venue.id}
                style={[
                  styles.favoriteItem,
                  {
                    flexDirection: isRTL ? "row-reverse" : "row",
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.favoriteImage,
                    {
                      backgroundColor: colors.border,
                    },
                  ]}
                >
                  {venue.data.images?.[0]?.url ? (
                    <Image
                      source={{ uri: venue.data.images[0].url }}
                      style={styles.favoriteImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons
                      name="image"
                      size={30}
                      color={colors.textSecondary}
                    />
                  )}
                </View>
                <View style={styles.favoriteInfo}>
                  <Text style={[styles.favoriteTitle, { color: colors.text }]}>
                    {venue.name}
                  </Text>
                  <Text
                    style={[
                      styles.favoriteSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {venue.data.city?.name}, {venue.data.state?.name} •{" "}
                    {venue.data.upcomingEvents?._total || 0} events
                  </Text>
                </View>
                <View style={[styles.favoriteActions]}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => removeFromFavorites(venue.id, "venue")}
                  >
                    <Ionicons name="heart" size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.contentContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("favorites.events")}
          </Text>
          {favoriteEvents.length === 0 ? (
            <Text
              style={[styles.emptySubtitle, { color: colors.textSecondary }]}
            >
              {t("favorites.emptySubtitle")}
            </Text>
          ) : (
            favoriteEvents.map((event) => (
              <View
                key={event.id}
                style={[
                  styles.favoriteItem,
                  {
                    flexDirection: isRTL ? "row-reverse" : "row",
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.favoriteImage,
                    {
                      backgroundColor: colors.border,
                    },
                  ]}
                >
                  <Ionicons
                    name="calendar"
                    size={30}
                    color={colors.textSecondary}
                  />
                </View>
                <View style={styles.favoriteInfo}>
                  <Text style={[styles.favoriteTitle, { color: colors.text }]}>
                    {event.name}
                  </Text>
                  <Text
                    style={[
                      styles.favoriteSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {event.data.dates?.start?.localDate} •{" "}
                    {event.data._embedded?.venues?.[0]?.name || "Location TBD"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.favoriteActions,
                    { marginLeft: isRTL ? 0 : 10, marginRight: isRTL ? 10 : 0 },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => removeFromFavorites(event.id, "event")}
                  >
                    <Ionicons name="heart" size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("favorites.title")}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          {t("favorites.subtitle")}
        </Text>
      </View>

      {favoriteVenues.length === 0 && favoriteEvents.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          {renderTabs()}
          {renderContent()}
        </>
      )}
    </ScrollView>
  );
};
