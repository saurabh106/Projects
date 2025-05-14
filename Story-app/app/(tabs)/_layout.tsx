import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { BookOpen, Compass, PenLine, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors[colorScheme ?? 'light'].tabBorder,
          backgroundColor: Colors[colorScheme ?? 'light'].tabBackground,
          elevation: 0,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          color: Colors[colorScheme ?? 'light'].text,
        },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => <PenLine size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}