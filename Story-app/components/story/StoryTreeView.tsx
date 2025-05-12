import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { StoryNode } from '@/data/stories';

interface StoryTreeViewProps {
  nodes: StoryNode[];
  activeNodeId: string;
  onSelectNode: (nodeId: string) => void;
  colorScheme?: 'light' | 'dark' | null;  // Explicitly define colorScheme type
}

// Helper to safely get theme colors
const getTheme = (scheme: 'light' | 'dark' | null | undefined) =>
  Colors[scheme === 'dark' ? 'dark' : 'light'];

export default function StoryTreeView({
  nodes,
  activeNodeId,
  onSelectNode,
  colorScheme,
}: StoryTreeViewProps) {
  // Simple visualization by showing parent-child relationships
  const getChildNodes = (parentId: string) => {
    const parent = nodes.find((node) => node.id === parentId);
    if (!parent || !parent.choices) return [];

    return parent.choices.map((choice) => {
      const child = nodes.find((node) => node.id === choice.nextNodeId);
      return {
        id: choice.nextNodeId,
        title: child?.title || 'Unknown',
        choiceText: choice.text,
      };
    });
  };

  const childNodes = getChildNodes(activeNodeId);
  const parentNodes = nodes.filter((node) =>
    node.choices?.some((choice) => choice.nextNodeId === activeNodeId)
  );

  const theme = getTheme(colorScheme); // Get theme safely

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Story Map</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {parentNodes.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              Previous Choices
            </Text>

            {parentNodes.map((node) => {
              const choice = node.choices?.find((c) => c.nextNodeId === activeNodeId);

              return (
                <Animated.View key={node.id} entering={FadeIn} exiting={FadeOut}>
                  <TouchableOpacity
                    style={[
                      styles.nodeItem,
                      { backgroundColor: theme.background },
                    ]}
                    onPress={() => onSelectNode(node.id)}
                  >
                    <View style={styles.nodeContent}>
                      <Text style={[styles.nodeTitle, { color: theme.text }]}>
                        {node.title}
                      </Text>
                      {choice && (
                        <Text
                          style={[styles.choiceText, { color: theme.textSecondary }]}
                        >
                          Choice: &quot;{choice.text}&quot;
                        </Text>
                      )}
                    </View>
                    <ChevronRight size={16} color={theme.textSecondary} />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Current Node
          </Text>

          <View
            style={[
              styles.currentNode,
              {
                backgroundColor: theme.primary + '20',
                borderColor: theme.primary,
              },
            ]}
          >
            <Text style={[styles.currentNodeTitle, { color: theme.primary }]}>
              {nodes.find((node) => node.id === activeNodeId)?.title || 'Unknown'}
            </Text>
          </View>
        </View>

        {childNodes.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              Possible Choices
            </Text>

            {childNodes.map((node) => (
              <Animated.View key={node.id} entering={FadeIn} exiting={FadeOut}>
                <TouchableOpacity
                  style={[
                    styles.nodeItem,
                    { backgroundColor: theme.background },
                  ]}
                  onPress={() => onSelectNode(node.id)}
                >
                  <View style={styles.nodeContent}>
                    <Text style={[styles.nodeTitle, { color: theme.text }]}>
                      {node.title}
                    </Text>
                    <Text
                      style={[styles.choiceText, { color: theme.textSecondary }]}
                    >
                      Choice: &quot;{node.choiceText}&quot;
                    </Text>
                  </View>
                  <ChevronRight size={16} color={theme.textSecondary} />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
  },
  nodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  nodeContent: {
    flex: 1,
  },
  nodeTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 2,
  },
  choiceText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  currentNode: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  currentNodeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
});
