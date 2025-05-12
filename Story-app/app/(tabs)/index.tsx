import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme, Image } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchIcon, TrendingUp, Clock, Star } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { FEATURED_STORIES, TRENDING_STORIES, NEW_STORIES } from '@/data/stories';
import StoryCard from '@/components/home/StoryCard';
import CategoryFilter from '@/components/home/CategoryFilter';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('trending');
  
  const featuredStory = FEATURED_STORIES[0];
  const displayStories = activeTab === 'trending' 
    ? TRENDING_STORIES 
    : activeTab === 'new' 
      ? NEW_STORIES 
      : FEATURED_STORIES;

  const categories = ['All', 'Fantasy', 'Sci-Fi', 'Mystery', 'Romance'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.logo, { color: Colors[colorScheme ?? 'light'].text }]}>StoryScape</Text>
        <TouchableOpacity onPress={() => {}} style={styles.searchButton}>
          <SearchIcon size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayStories}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            {/* Featured Story */}
            <TouchableOpacity 
              activeOpacity={0.9}
              onPress={() => router.push(`/story/${featuredStory.id}` as string)} // Type assertion to string
              style={styles.featuredContainer}
            >
              <Image 
                source={{ uri: featuredStory.coverImage }} 
                style={styles.featuredImage} 
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              >
                <View style={styles.featuredContent}>
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>Featured</Text>
                  </View>
                  <Text style={styles.featuredTitle}>{featuredStory.title}</Text>
                  <Text style={styles.featuredAuthor}>By {featuredStory.author}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Category Filter */}
            <CategoryFilter 
              categories={categories} 
              activeCategory={activeCategory} 
              onSelectCategory={setActiveCategory} 
            />

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
                onPress={() => setActiveTab('trending')}
              >
                <TrendingUp size={16} color={activeTab === 'trending' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} />
                <Text style={[styles.tabText, { color: activeTab === 'trending' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text }]}>Trending</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'new' && styles.activeTab]}
                onPress={() => setActiveTab('new')}
              >
                <Clock size={16} color={activeTab === 'new' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} />
                <Text style={[styles.tabText, { color: activeTab === 'new' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text }]}>New</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tab, activeTab === 'for-you' && styles.activeTab]}
                onPress={() => setActiveTab('for-you')}
              >
                <Star size={16} color={activeTab === 'for-you' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} />
                <Text style={[styles.tabText, { color: activeTab === 'for-you' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text }]}>For You</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <StoryCard 
            story={item} 
            onPress={() => router.push(`/story/${item.id}` as string)} 
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logo: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
  },
  searchButton: {
    padding: 8,
  },
  featuredContainer: {
    height: 240,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 16,
  },
  featuredBadge: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: '#000',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  featuredTitle: {
    color: '#fff',
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  featuredAuthor: {
    color: '#fff',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 24,
    borderBottomWidth: 2,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
});
