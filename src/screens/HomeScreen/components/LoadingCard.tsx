import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedCard } from "../../../components/ThemedCard";
import { useTheme } from "../../../contexts/ThemeContext";
import { styles } from "../styles";

interface LoadingCardProps {
  type: "featured" | "event";
}

export const LoadingCard: React.FC<LoadingCardProps> = ({ type }) => {
  const { colors } = useTheme();

  if (type === "featured") {
    return (
      <ThemedCard style={styles.featuredCard}>
        <View
          style={[styles.featuredImage, { backgroundColor: colors.border }]}
        >
          <Ionicons name="image" size={40} color={colors.textSecondary} />
        </View>
        <View style={styles.featuredCardContent}>
          <View
            style={[styles.loadingText, { backgroundColor: colors.border }]}
          />
          <View
            style={[
              styles.loadingText,
              { backgroundColor: colors.border, width: "60%" },
            ]}
          />
        </View>
      </ThemedCard>
    );
  }

  return (
    <ThemedCard style={styles.eventCard}>
      <View style={[styles.eventDate, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.loadingText,
            { backgroundColor: colors.surface, height: 16 },
          ]}
        />
        <View
          style={[
            styles.loadingText,
            {
              backgroundColor: colors.surface,
              height: 12,
              width: "80%",
            },
          ]}
        />
      </View>
      <View style={styles.eventInfo}>
        <View
          style={[
            styles.loadingText,
            {
              backgroundColor: colors.border,
              height: 16,
              marginBottom: 8,
            },
          ]}
        />
        <View
          style={[
            styles.loadingText,
            {
              backgroundColor: colors.border,
              height: 12,
              width: "70%",
            },
          ]}
        />
      </View>
    </ThemedCard>
  );
};
