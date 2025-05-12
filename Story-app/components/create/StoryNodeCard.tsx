import Colors from '@/constants/Colors';
import { ChevronRight } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StoryNodeCardProps {
  title: string;
  preview: string;
  colorScheme?: 'light' | 'dark' | null;  // Explicitly define the colorScheme type
  onPress?: () => void;
}

// Helper to safely get theme colors
const getTheme = (scheme: 'light' | 'dark' | null | undefined) =>
  Colors[scheme === 'dark' ? 'dark' : 'light'];

export default function StoryNodeCard({ title, preview, colorScheme, onPress }: StoryNodeCardProps) {
  const theme = getTheme(colorScheme);

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.card }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          {title}
        </Text>
        <Text 
          style={[styles.preview, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {preview}
        </Text>
      </View>
      
      <ChevronRight size={20} color={theme.textSecondary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  preview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});
