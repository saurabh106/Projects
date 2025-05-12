import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Heart, MessageSquare, Clock } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Story } from '@/data/stories';

interface StoryCardProps {
  story: Story;
  onPress: () => void;
}

export default function StoryCard({ story, onPress }: StoryCardProps) {
  const colorScheme = useColorScheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].card }]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: story.coverImage }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.genreBadge}>
          <Text style={styles.genreText}>{story.genre}</Text>
        </View>
        
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]} numberOfLines={2}>
          {story.title}
        </Text>
        
        <Text style={[styles.author, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
          By {story.author}
        </Text>
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Heart size={14} color={Colors[colorScheme ?? 'light'].textSecondary} />
            <Text style={[styles.statText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              {story.likes > 999 ? `${(story.likes / 1000).toFixed(1)}K` : story.likes}
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <MessageSquare size={14} color={Colors[colorScheme ?? 'light'].textSecondary} />
            <Text style={[styles.statText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              {story.comments}
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Clock size={14} color={Colors[colorScheme ?? 'light'].textSecondary} />
            <Text style={[styles.statText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              {story.readTime}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 140,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  genreBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  genreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#4B5563',
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 16,
    marginBottom: 4,
  },
  author: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
});