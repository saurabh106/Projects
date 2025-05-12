import StoryThumbnail from '@/components/profile/StoryThumbnail';
import Colors from '@/constants/Colors';
import { MY_READING_LIST, MY_STORIES } from '@/data/stories';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import { BookMarked, BookOpen, LogOut, PenLine, Settings } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('stories');
  
  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.authContainer}>
          <Text style={[styles.authTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Join StoryScape</Text>
          <Text style={[styles.authDesc, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            Sign in to track your reading progress, create and share your own stories, and join the community.
          </Text>
          <TouchableOpacity 
            style={[styles.authButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.authButtonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.signupButton, { borderColor: Colors[colorScheme ?? 'light'].primary }]}
            onPress={() => router.push('/auth/signup')}
          >
            <Text style={[styles.signupButtonText, { color: Colors[colorScheme ?? 'light'].primary }]}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} 
            style={styles.profileImage} 
          />
          <Text style={[styles.username, { color: Colors[colorScheme ?? 'light'].text }]}>Alex Morgan</Text>
          <Text style={[styles.bio, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            Storyteller | Fantasy & Sci-Fi Enthusiast
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>12</Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Stories</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>45</Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>29</Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>Following</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'stories' && styles.activeTab,
              { borderBottomColor: activeTab === 'stories' ? Colors[colorScheme ?? 'light'].primary : 'transparent' }
            ]}
            onPress={() => setActiveTab('stories')}
          >
            <PenLine size={16} color={activeTab === 'stories' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} />
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'stories' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text }
            ]}>My Stories</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'reading' && styles.activeTab,
              { borderBottomColor: activeTab === 'reading' ? Colors[colorScheme ?? 'light'].primary : 'transparent' }
            ]}
            onPress={() => setActiveTab('reading')}
          >
            <BookOpen size={16} color={activeTab === 'reading' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} />
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'reading' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text }
            ]}>Reading</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'saved' && styles.activeTab,
              { borderBottomColor: activeTab === 'saved' ? Colors[colorScheme ?? 'light'].primary : 'transparent' }
            ]}
            onPress={() => setActiveTab('saved')}
          >
            <BookMarked size={16} color={activeTab === 'saved' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} />
            <Text style={[
              styles.tabText, 
              { color: activeTab === 'saved' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text }
            ]}>Saved</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.contentContainer}>
          {activeTab === 'stories' && (
            <View style={styles.storiesGrid}>
              {MY_STORIES.map((story: { id: any; }) => (
                <StoryThumbnail
                  key={story.id}
                  story={story}
                  onPress={() => router.push(`/story/${story.id}`)}
                />
              ))}
              <TouchableOpacity 
                style={[styles.createButton, { borderColor: Colors[colorScheme ?? 'light'].border }]}
                onPress={() => router.push('/create')}
              >
                <PenLine size={24} color={Colors[colorScheme ?? 'light'].primary} />
                <Text style={[styles.createButtonText, { color: Colors[colorScheme ?? 'light'].primary }]}>New Story</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {activeTab === 'reading' && (
            <View style={styles.readingList}>
              {MY_READING_LIST.map((story: { id: any; progress: any; }) => (
                <StoryThumbnail
                  key={story.id}
                  story={story}
                  onPress={() => router.push(`/story/${story.id}`)}
                  showProgress
                  progress={story.progress || 0}
                />
              ))}
            </View>
          )}
          
          {activeTab === 'saved' && (
            <View style={styles.savedList}>
              {MY_READING_LIST.filter(s => s.bookmarked).map((story: { id: any; }) => (
                <StoryThumbnail
                  key={story.id}
                  story={story}
                  onPress={() => router.push(`/story/${story.id}`)}
                  showBookmark
                />
              ))}
            </View>
          )}
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={16} color={Colors[colorScheme ?? 'light'].error} />
          <Text style={[styles.logoutText, { color: Colors[colorScheme ?? 'light'].error }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
  },
  settingsButton: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  username: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginBottom: 4,
  },
  bio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
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
  contentContainer: {
    padding: 16,
  },
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  readingList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  savedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  createButton: {
    width: '48%',
    aspectRatio: 0.75,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  createButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginTop: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  authTitle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  authDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  authButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  authButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  signupButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  signupButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});