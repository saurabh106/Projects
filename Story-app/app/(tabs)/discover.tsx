import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Search, Filter } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ALL_STORIES } from '@/data/stories';
import StoryCard from '@/components/home/StoryCard';
import GenreBadge from '@/components/discover/GenreBadge';

export default function DiscoverScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  const genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Adventure', 'Thriller'];
  
  const filteredStories = ALL_STORIES.filter(story => {
    const matchesSearch = searchQuery === '' || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === null || 
      story.genre.toLowerCase() === selectedGenre.toLowerCase();
    
    return matchesSearch && matchesGenre;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Discover</Text>
      </View>
      
      <View style={[styles.searchContainer, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
        <Search size={20} color={Colors[colorScheme ?? 'light'].text} />
        <TextInput
          style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
          placeholder="Search stories or authors"
          placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.genresContainer}>
        <FlatList
          data={genres}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genresList}
          renderItem={({ item }) => (
            <GenreBadge
              genre={item}
              isSelected={selectedGenre === item}
              onPress={() => setSelectedGenre(selectedGenre === item ? null : item)}
            />
          )}
        />
      </View>
      
      <FlatList
        data={filteredStories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StoryCard
            story={item}
            onPress={() => router.push(`/story/${item.id}` as `/story/${string}`)}


          />
        )}
        contentContainerStyle={styles.storiesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
              No stories found matching your search.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 28,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginLeft: 8,
    paddingVertical: 8,
  },
  filterButton: {
    padding: 8,
  },
  genresContainer: {
    marginVertical: 8,
  },
  genresList: {
    paddingHorizontal: 16,
  },
  storiesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});