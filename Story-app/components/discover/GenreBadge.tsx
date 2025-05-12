import { TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';

interface GenreBadgeProps {
  genre: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function GenreBadge({ genre, isSelected, onPress }: GenreBadgeProps) {
  const colorScheme = useColorScheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected ? 
          { backgroundColor: Colors[colorScheme ?? 'light'].primary } : 
          { backgroundColor: Colors[colorScheme ?? 'light'].card, borderColor: Colors[colorScheme ?? 'light'].border }
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: isSelected ? '#FFFFFF' : Colors[colorScheme ?? 'light'].text }
        ]}
      >
        {genre}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});