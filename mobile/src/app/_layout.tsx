import { DarkTheme, DefaultTheme, router, Stack, ThemeProvider, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import '@/i18n';

import { SplashOverlay } from '@/components/splash-overlay';
import { Colors } from '@/constants/theme';
import { AppSettingsProvider, useAppSettings } from '@/context/app-settings';

SplashScreen.preventAutoHideAsync().catch(() => {});
SplashScreen.setOptions({ duration: 400, fade: true });

function RootNavigator() {
  const { ready, onboardingComplete } = useAppSettings();
  const [showSplash, setShowSplash] = useState(true);
  const segments = useSegments();

  useEffect(() => {
    if (!ready) return;

    const timer = setTimeout(() => setShowSplash(false), 550);
    return () => clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    if (!ready || onboardingComplete) return;

    const currentRoute = segments.find((segment) => !segment.startsWith('('));
    const isPublicFlow = currentRoute === 'onboarding' || currentRoute === 'language';

    if (!isPublicFlow) {
      router.replace('/onboarding');
    }
  }, [ready, onboardingComplete, segments]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="language" />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
      </Stack>
      {showSplash ? <SplashOverlay /> : null}
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const palette = Colors[isDark ? 'dark' : 'light'];
  const baseTheme = isDark ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: palette.primary,
      background: palette.background,
      card: palette.background,
      text: palette.text,
      border: palette.border,
      notification: palette.accent,
    },
  };

  return (
    <ThemeProvider value={navigationTheme}>
      <AppSettingsProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <RootNavigator />
      </AppSettingsProvider>
    </ThemeProvider>
  );
}
