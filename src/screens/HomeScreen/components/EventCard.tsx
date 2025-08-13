import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedCard } from "../../../components/ThemedCard";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { styles } from "../styles";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    titleAr: string;
    date: string;
    month: string;
    monthAr: string;
    location: string;
    locationAr: string;
    time: string;
  };
  onPress: () => void;
  onFavoritePress: () => void;
  getLocalizedName: (item: any, field: string) => string;
  isFavorite: (id: string, category: "event" | "venue") => boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  onFavoritePress,
  getLocalizedName,
  isFavorite,
}) => {
  const { colors } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedCard style={styles.eventCard}>
        <View style={[styles.eventDate, { backgroundColor: colors.primary }]}>
          <Text style={[styles.eventDay, { color: colors.white }]}>
            {event.date}
          </Text>
          <Text style={[styles.eventMonth, { color: colors.white }]}>
            {getLocalizedName(event, "month")}
          </Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={[styles.eventTitle, { color: colors.text }]}>
            {getLocalizedName(event, "title")}
          </Text>
          <Text style={[styles.eventLocation, { color: colors.textSecondary }]}>
            {getLocalizedName(event, "location")} • {event.time}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.eventFavoriteButton,
            {
              [isRTL ? "left" : "right"]: 8,
            },
          ]}
          onPress={onFavoritePress}
        >
          <Ionicons
            name={isFavorite(event.id, "event") ? "heart" : "heart-outline"}
            size={18}
            color={
              isFavorite(event.id, "event")
                ? colors.primary
                : colors.textSecondary
            }
          />
        </TouchableOpacity>
      </ThemedCard>
    </TouchableOpacity>
  );
};
