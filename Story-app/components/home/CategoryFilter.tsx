import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
 
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}: CategoryFilterProps) {
  const colorScheme = useColorScheme();
  
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.category,
            activeCategory === category && [
              styles.activeCategory,
              { backgroundColor: Colors[colorScheme ?? 'light'].primary }
            ]
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === category && styles.activeCategoryText
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  category: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: '#1A2038',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
});