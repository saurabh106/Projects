import StoryTreeView from '@/components/story/StoryTreeView';
import Colors from '@/constants/Colors';
import { STORY_NODES } from '@/data/stories';
import { useAuth } from '@/providers/AuthProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BookmarkIcon, ChevronDown, Heart, MessageSquare, Share2, X } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


type StoryParams = {
  id: string; // Explicitly type the parameter as a string
};

export default function StoryScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useLocalSearchParams<StoryParams>(); // Get the dynamic ID from URL
  const { user } = useAuth();
  
  const [activeNodeId, setActiveNodeId] = useState('start');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showOptions, setShowOptions] = useState(false);
  const [showTreeView, setShowTreeView] = useState(false);
  
  const storyNode = STORY_NODES.find(node => node.id === activeNodeId);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleLike = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    setLiked(!liked);
  };

  const handleBookmark = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    
    setBookmarked(!bookmarked);
  };

  const handleShare = () => {
    // Implement share functionality if needed
  };

  const handleChoice = (nodeId: string) => {
    setActiveNodeId(nodeId);
    
    // Scroll back to top when navigating to a new node
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 0);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.headerButton, liked && { backgroundColor: 'rgba(255, 59, 48, 0.1)' }]} 
            onPress={handleLike}
          >
            <Heart 
              size={20} 
              color={liked ? Colors.light.error : Colors[colorScheme ?? 'light'].text} 
              fill={liked ? Colors.light.error : 'none'} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={() => setShowTreeView(!showTreeView)}>
            <ChevronDown size={20} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
        </View>
      </View>

      {showTreeView && (
        <View style={[styles.treeViewContainer, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
          <StoryTreeView 
            nodes={STORY_NODES} 
            activeNodeId={activeNodeId}
            onSelectNode={setActiveNodeId}
            colorScheme={colorScheme}
          />
        </View>
      )}

      <ScrollView 
        style={styles.content}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        {storyNode && (
          <View style={styles.storyContainer}>
            <Text style={[styles.nodeTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              {storyNode.title}
            </Text>

            <Text style={[styles.nodeContent, { color: Colors[colorScheme ?? 'light'].text }]}>
              {storyNode.content}
            </Text>

            {storyNode.choices && storyNode.choices.length > 0 && (
              <View style={styles.choicesContainer}>
                <Text style={[styles.choicesHeader, { color: Colors[colorScheme ?? 'light'].text }]}>
                  What will you do?
                </Text>

                {storyNode.choices.map((choice) => (
                  <TouchableOpacity
                    key={choice.nextNodeId}
                    style={[styles.choiceButton, { borderColor: Colors[colorScheme ?? 'light'].primary }]}
                    onPress={() => handleChoice(choice.nextNodeId)}
                  >
                    <Text style={[styles.choiceText, { color: Colors[colorScheme ?? 'light'].primary }]}>
                      {choice.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!storyNode.choices || storyNode.choices.length === 0 ? (
              <View style={styles.endingContainer}>
                <Text style={[styles.endingText, { color: Colors[colorScheme ?? 'light'].textSecondary }]}>
                  The End
                </Text>

                <TouchableOpacity
                  style={[styles.restartButton, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
                  onPress={() => setActiveNodeId('start')}
                >
                  <Text style={styles.restartButtonText}>
                    Start Over
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={handleLike}
              >
                <Heart 
                  size={20} 
                  color={liked ? Colors.light.error : Colors[colorScheme ?? 'light'].text} 
                  fill={liked ? Colors.light.error : 'none'} 
                />
                <Text style={[styles.actionText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Like
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => setShowOptions(true)}
              >
                <MessageSquare size={20} color={Colors[colorScheme ?? 'light'].text} />
                <Text style={[styles.actionText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Comment
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={handleBookmark}
              >
                <BookmarkIcon 
                  size={20} 
                  color={bookmarked ? Colors[colorScheme ?? 'light'].primary : Colors[colorScheme ?? 'light'].text} 
                  fill={bookmarked ? Colors[colorScheme ?? 'light'].primary : 'none'} 
                />
                <Text style={[styles.actionText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Save
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={handleShare}
              >
                <Share2 size={20} color={Colors[colorScheme ?? 'light'].text} />
                <Text style={[styles.actionText, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <LinearGradient
        colors={['transparent', Colors[colorScheme ?? 'light'].background]}
        style={styles.bottomGradient}
        pointerEvents="none"
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
  closeButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 16,
  },
  treeViewContainer: {
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  storyContainer: {
    paddingHorizontal: 24,
    paddingBottom: 120,
    paddingTop: 8,
  },
  nodeTitle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: 24,
    marginBottom: 24,
  },
  nodeContent: {
    fontFamily: 'Merriweather-Regular',
    fontSize: 18,
    lineHeight: 30,
  },
  choicesContainer: {
    marginTop: 48,
  },
  choicesHeader: {
    fontFamily: 'Merriweather-Italic',
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  choiceButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 16,
  },
  choiceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  endingContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  endingText: {
    fontFamily: 'Merriweather-Italic',
    fontSize: 20,
    marginBottom: 24,
  },
  restartButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  restartButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 48,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 4,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});
