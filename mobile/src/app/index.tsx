import { Redirect } from 'expo-router';

import { useAppSettings } from '@/context/app-settings';

export default function EntryScreen() {
  const { ready, onboardingComplete } = useAppSettings();

  if (!ready) {
    return null;
  }

  if (!onboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/home" />;
}
