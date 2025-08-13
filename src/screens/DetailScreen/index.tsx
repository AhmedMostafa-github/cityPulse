import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import MapView, { Marker } from "react-native-maps";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { ThemedCard } from "../../components/ThemedCard";
import { Place, Event } from "../../types";
import { DetailScreenProps } from "../../navigation/types";
import { styles } from "./styles";

export const DetailScreen: React.FC<DetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { item, type } = route.params;
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { isRTL } = useLanguage();
  const { addToFavorites, removeFromFavorites, isFavorite } =
    useFavoritesStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = "images" in item ? item.images : [];
  const hasImages = images.length > 0;

  const getCoordinates = () => {
    if ("coordinates" in item) {
      return item.coordinates;
    }
    return {
      latitude: 24.7136,
      longitude: 46.6753,
    };
  };

  const coordinates = getCoordinates();

  const getLocalizedName = (field: string) => {
    const arField = `${field}Ar` as keyof typeof item;
    const defaultField = field as keyof typeof item;

    if (isRTL && arField in item) {
      return (item as any)[arField] || (item as any)[defaultField];
    }
    return (item as any)[defaultField];
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(item.id, type)) {
      removeFromFavorites(item.id, type);
    } else {
      addToFavorites(item, type);
    }
  };

  const handleShare = () => {
    Alert.alert(
      t("detail.share", "Share"),
      t("detail.shareMessage", "Share this item"),
      [
        { text: t("common.cancel", "Cancel"), style: "cancel" },
        {
          text: t("common.share", "Share"),
          onPress: () => {
            Alert.alert(
              t("detail.shared", "Shared"),
              t("detail.sharedMessage", "Item shared successfully")
            );
          },
        },
      ]
    );
  };

  const handleDirections = () => {
    const { latitude, longitude } = coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert(
          t("detail.error", "Error"),
          t("detail.cannotOpenMaps", "Cannot open maps application")
        );
      }
    });
  };

  const handleCall = () => {
    if (type === "venue" && "phone" in item && (item as any).phone) {
      Linking.openURL(`tel:${(item as any).phone}`);
    }
  };

  useEffect(() => {
    const title = getLocalizedName("name") || getLocalizedName("title");
    navigation.setOptions({
      title: title,
      headerShown: false,
    });
  }, [navigation, item, type, isFavorite, colors, isRTL]);

  if (!colors) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        {hasImages ? (
          <>
            <Image
              source={{ uri: images[selectedImageIndex] }}
              style={styles.mainImage}
              resizeMode="cover"
            />
            {images.length > 1 && (
              <View style={styles.imageIndicators}>
                {images.map((_: any, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      {
                        backgroundColor:
                          index === selectedImageIndex
                            ? colors.primary
                            : colors.border,
                      },
                    ]}
                  />
                ))}
              </View>
            )}
            {images.length > 1 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.thumbnailContainer}
                contentContainerStyle={styles.thumbnailContent}
              >
                {images.map((image: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedImageIndex(index)}
                    style={[
                      styles.thumbnail,
                      {
                        borderColor:
                          index === selectedImageIndex
                            ? colors.primary
                            : colors.border,
                      },
                    ]}
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.thumbnailImage}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        ) : (
          <View
            style={[
              styles.mainImage,
              {
                backgroundColor: colors.border,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Ionicons name="image" size={80} color={colors.textSecondary} />
            <Text
              style={[styles.defaultImageText, { color: colors.textSecondary }]}
            >
              {type === "venue" ? "No venue images" : "No event images"}
            </Text>
          </View>
        )}

        <View style={styles.headerOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <View style={styles.backButtonBackground}>
              <Ionicons
                name={isRTL ? "arrow-forward" : "arrow-back"}
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.actionButtonsOverlay}>
            <TouchableOpacity
              style={styles.actionButtonOverlay}
              onPress={handleShare}
            >
              <View style={styles.actionButtonBackground}>
                <Ionicons name="share-outline" size={20} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButtonOverlay}
              onPress={handleFavoriteToggle}
            >
              <View style={styles.actionButtonBackground}>
                <Ionicons
                  name={isFavorite(item.id, type) ? "heart" : "heart-outline"}
                  size={20}
                  color={
                    isFavorite(item.id, type) ? colors.primary : colors.white
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={[styles.title, { color: colors.text }]}>
            {getLocalizedName("name") || getLocalizedName("title")}
          </Text>
          {type === "venue" && "rating" in item && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.gold} />
              <Text style={[styles.rating, { color: colors.textSecondary }]}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.metaSection}>
          {item.category && (
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: colors.primary },
              ]}
            >
              <Text style={styles.categoryText}>
                {getLocalizedName("category")}
              </Text>
            </View>
          )}
          {item.price && (
            <Text style={[styles.price, { color: colors.textSecondary }]}>
              {item.price}
            </Text>
          )}
        </View>

        <ThemedCard style={styles.descriptionCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("detail.description", "Description")}
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {getLocalizedName("description")}
          </Text>
        </ThemedCard>

        <ThemedCard style={styles.locationCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("detail.location", "Location")}
          </Text>
          <Text style={[styles.location, { color: colors.textSecondary }]}>
            {getLocalizedName("address") || getLocalizedName("location")}
          </Text>

          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
            >
              <Marker
                coordinate={coordinates}
                title={getLocalizedName("name") || getLocalizedName("title")}
                description={
                  getLocalizedName("address") || getLocalizedName("location")
                }
              />
            </MapView>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={handleDirections}
            >
              <Ionicons name="navigate" size={20} color="white" />
              <Text style={[styles.actionButtonText, { color: colors.white }]}>
                {t("detail.getDirections", "Get Directions")}
              </Text>
            </TouchableOpacity>

            {type === "venue" && "phone" in item && (item as any).phone && (
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: colors.secondary },
                ]}
                onPress={handleCall}
              >
                <Ionicons name="call" size={20} color="white" />
                <Text
                  style={[styles.actionButtonText, { color: colors.white }]}
                >
                  {t("detail.call", "Call")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ThemedCard>

        {type === "event" && (
          <ThemedCard style={styles.eventInfoCard}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t("detail.eventDetails", "Event Details")}
            </Text>
            <View style={styles.eventInfoRow}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <Text
                style={[styles.eventInfoText, { color: colors.textSecondary }]}
              >
                {getLocalizedName("date")}
              </Text>
            </View>
            <View style={styles.eventInfoRow}>
              <Ionicons name="time" size={20} color={colors.primary} />
              <Text
                style={[styles.eventInfoText, { color: colors.textSecondary }]}
              >
                {getLocalizedName("time")}
              </Text>
            </View>
          </ThemedCard>
        )}

        {type === "venue" &&
          "tags" in item &&
          item.tags &&
          item.tags.length > 0 && (
            <ThemedCard style={styles.tagsCard}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                {t("detail.tags", "Tags")}
              </Text>
              <View style={styles.tagsContainer}>
                {item.tags.map((tag: any, index: number) => (
                  <View
                    key={index}
                    style={[styles.tag, { backgroundColor: colors.border }]}
                  >
                    <Text
                      style={[styles.tagText, { color: colors.textSecondary }]}
                    >
                      {tag}
                    </Text>
                  </View>
                ))}
              </View>
            </ThemedCard>
          )}
      </View>
    </ScrollView>
  );
};
