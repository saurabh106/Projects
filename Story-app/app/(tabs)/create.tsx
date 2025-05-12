import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, useColorScheme, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, PlusCircle, Save, Image as ImageIcon, AlignLeft, BookOpen } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'expo-router';
import RichTextEditor from '@/components/create/RichTextEditor';
import StoryNodeCard from '@/components/create/StoryNodeCard';

export default function CreateScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('editor');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  
  const genres = ['Fantasy', 'Sci-Fi', 'Mystery', 'Romance', 'Horror', 'Adventure', 'Thriller'];
  
  const handleSave = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    if (!storyTitle.trim()) {
      Alert.alert('Missing Information', 'Please enter a title for your story.');
      return;
    }
    
    if (!storyContent.trim()) {
      Alert.alert('Missing Information', 'Please add some content to your story.');
      return;
    }
    
    if (!selectedGenre) {
      Alert.alert('Missing Information', 'Please select a genre for your story.');
      return;
    }
    
    // Save story logic would go here
    Alert.alert('Success', 'Your story has been saved!');
  };
  
  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <View style={styles.authContainer}>
          <Text style={[styles.authTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Create Your Stories</Text>
          <Text style={[styles.authDesc, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            Join StoryScape to create and share your own interactive stories with readers around the world.
          </Text>
          <TouchableOpacity 
            style={[styles.authButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.authButtonText}>Sign In to Create</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Create Story</Text>
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
          onPress={handleSave}
        >
          <Save size={16} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.titleInput, { color: Colors[colorScheme ?? 'light'].text, borderBottomColor: Colors[colorScheme ?? 'light'].border }]}
          placeholder="Story Title"
          placeholderTextColor={Colors[colorScheme ?? 'light'].textSecondary}
          value={storyTitle}
          onChangeText={setStoryTitle}
          maxLength={50}
        />
        
        <View style={styles.genreContainer}>
          <TouchableOpacity 
            style={[styles.genreSelector, { borderColor: Colors[colorScheme ?? 'light'].border }]}
            onPress={() => setShowGenreDropdown(!showGenreDropdown)}
          >
            <Text style={[
              styles.genreText, 
              { color: selectedGenre ? Colors[colorScheme ?? 'light'].text : Colors[colorScheme ?? 'light'].textSecondary }
            ]}>
              {selectedGenre || 'Select Genre'}
            </Text>
            <ChevronDown size={20} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          
          {showGenreDropdown && (
            <View style={[styles.dropdown, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
              {genres.map((genre) => (
                <TouchableOpacity 
                  key={genre}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedGenre(genre);
                    setShowGenreDropdown(false);
                  }}
                >
                  <Text style={[styles.dropdownText, { color: Colors[colorScheme ?? 'light'].text }]}>{genre}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'editor' && styles.activeTab,
            { borderBottomColor: activeTab === 'editor' ? Colors[colorScheme ?? 'light'].primary : 'transparent' }
          ]}
          onPress={() => setActiveTab('editor')}
        >
          <AlignLeft size={16} color={activeTab === 'editor' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} />
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'editor' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text }
          ]}>Editor</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'preview' && styles.activeTab,
            { borderBottomColor: activeTab === 'preview' ? Colors[colorScheme ?? 'light'].primary : 'transparent' }
          ]}
          onPress={() => setActiveTab('preview')}
        >
          <BookOpen size={16} color={activeTab === 'preview' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} />
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'preview' ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text }
          ]}>Preview</Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'editor' ? (
        <RichTextEditor
          value={storyContent}
          onChange={setStoryContent}
          colorScheme={colorScheme}
        />
      ) : (
        <ScrollView style={styles.previewContainer}>
          <Text style={[styles.previewTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {storyTitle || 'Untitled Story'}
          </Text>
          <Text style={[styles.previewGenre, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
            {selectedGenre || 'No genre selected'}
          </Text>
          <Text style={[styles.previewContent, { color: Colors[colorScheme ?? 'light'].text }]}>
            {storyContent || 'Your story preview will appear here...'}
          </Text>
          
          <View style={styles.choicesContainer}>
            <Text style={[styles.choicesTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Decision Points</Text>
            <StoryNodeCard
              title="Continue the journey"
              preview="The character decides to follow the mysterious path..."
              colorScheme={colorScheme}
            />
            <TouchableOpacity 
              style={[styles.addChoiceButton, { borderColor: Colors[colorScheme ?? 'light'].primary }]}
            >
              <PlusCircle size={16} color={Colors[colorScheme ?? 'light'].primary} />
              <Text style={[styles.addChoiceText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                Add Decision Point
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  titleInput: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  genreContainer: {
    marginTop: 16,
    zIndex: 1,
  },
  genreSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  genreText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
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
  previewContainer: {
    flex: 1,
    padding: 16,
  },
  previewTitle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  previewGenre: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 16,
  },
  previewContent: {
    fontFamily: 'Merriweather-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  choicesContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  choicesTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  addChoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    marginTop: 16,
  },
  addChoiceText: {
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
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  authButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});