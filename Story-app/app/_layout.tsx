import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from '@expo-google-fonts/inter';
import {
  Merriweather_400Regular,
  Merriweather_700Bold,
  Merriweather_400Regular_Italic
} from '@expo-google-fonts/merriweather';
import { SplashScreen } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import AuthProvider from '@/providers/AuthProvider';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Clerk token cache
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
    'Merriweather-Regular': Merriweather_400Regular,
    'Merriweather-Italic': Merriweather_400Regular_Italic,
    'Merriweather-Bold': Merriweather_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <GestureHandlerRootView style={styles.container}>
        <AuthProvider>
          <StatusBar style="auto" />
          <SignedIn>
            <SignedInLayout />
          </SignedIn>
          <SignedOut>
            <SignedOutLayout />
          </SignedOut>
        </AuthProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

function SignedInLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="story/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

function SignedOutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth/login" options={{ presentation: 'modal' }} />
      <Stack.Screen name="auth/signup" options={{ presentation: 'modal' }} />
      <Stack.Screen name="+not-found" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
