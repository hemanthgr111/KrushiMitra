/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#122018',
    background: '#F7FAF6',
    backgroundElement: '#ECF3EC',
    backgroundSelected: '#DCEBDE',
    textSecondary: '#5B6B5F',
    primary: '#1B7F4B',
    primaryDark: '#125C35',
    primarySoft: '#E3F2E7',
    onPrimary: '#FFFFFF',
    accent: '#E9A23B',
    accentSoft: '#FDF2DE',
    border: '#DCE6DD',
    card: '#FFFFFF',
    success: '#2E7D32',
    info: '#2E6F9E',
  },
  dark: {
    text: '#F2F7F2',
    background: '#0C130E',
    backgroundElement: '#16201A',
    backgroundSelected: '#223128',
    textSecondary: '#A9B9AD',
    primary: '#5CC98A',
    primaryDark: '#3FAE6E',
    primarySoft: '#173122',
    onPrimary: '#06210F',
    accent: '#F5B95A',
    accentSoft: '#33260F',
    border: '#26352B',
    card: '#121B15',
    success: '#7ADB9B',
    info: '#8BC5EA',
  },
} as const;

export const BrandColors = {
  primary: '#1B7F4B',
  primaryDark: '#125C35',
  primaryLight: '#E3F2E7',
  accent: '#E9A23B',
  earth: '#8B5E3C',
  sky: '#DCEEF7',
  white: '#FFFFFF',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
