import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../contexts/ThemeContext";
import { useLanguage } from "../../../contexts/LanguageContext";
import { styles } from "../styles";

interface CategoriesProps {
  categories: Array<{
    icon: string;
    name: string;
    color: string;
  }>;
}

export const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const { colors } = useTheme();
  const { isRTL } = useLanguage();

  return (
    <View style={styles.categoriesContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Categories
      </Text>
      <View style={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryCard, { backgroundColor: colors.surface }]}
          >
            <Ionicons
              name={category.icon as any}
              size={32}
              color={category.color}
            />
            <Text
              style={[
                styles.categoryText,
                {
                  color: colors.text,
                  textAlign: isRTL ? "right" : "center",
                },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
