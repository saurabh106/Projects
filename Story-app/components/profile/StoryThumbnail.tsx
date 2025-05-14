import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { BookmarkIcon } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { Story } from '@/data/stories';
import React from 'react';

interface StoryThumbnailProps {
  story: Story;
  onPress: () => void;
  showProgress?: boolean;
  progress?: number;
  showBookmark?: boolean;
}

export default function StoryThumbnail({ 
  story, 
  onPress, 
  showProgress = false, 
  progress = 0, 
  showBookmark = false 
}: StoryThumbnailProps) {
  const colorScheme = useColorScheme();
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: story.coverImage }} style={styles.image} />
      
      {showProgress && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: Colors[colorScheme ?? 'light'].primary }]} />
        </View>
      )}
      
      {showBookmark && (
        <View style={styles.bookmarkContainer}>
          <BookmarkIcon size={16} color="#FFFFFF" fill="#FFFFFF" />
        </View>
      )}
      
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{story.title}</Text>
          <Text style={styles.author}>{story.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    aspectRatio: 0.75,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 12,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  author: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  progressBar: {
    height: '100%',
  },
  bookmarkContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
    borderRadius: 4,
  },
});