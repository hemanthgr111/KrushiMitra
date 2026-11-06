import AsyncStorage from '@react-native-async-storage/async-storage';

import { isLanguageCode, type LanguageCode } from '@/i18n/languages';

const STORAGE_KEYS = {
  language: '@krushimitra/language',
  onboardingComplete: '@krushimitra/onboarding-complete',
} as const;

export async function getStoredLanguage(): Promise<LanguageCode | null> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.language);
    return isLanguageCode(value) ? value : null;
  } catch (error) {
    console.warn('Unable to read the saved language.', error);
    return null;
  }
}

export async function saveLanguage(language: LanguageCode): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.language, language);
  } catch (error) {
    console.warn('Unable to save the selected language.', error);
  }
}

export async function getOnboardingComplete(): Promise<boolean> {
  try {
    return (await AsyncStorage.getItem(STORAGE_KEYS.onboardingComplete)) === 'true';
  } catch (error) {
    console.warn('Unable to read onboarding status.', error);
    return false;
  }
}

export async function saveOnboardingComplete(complete: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.onboardingComplete, String(complete));
  } catch (error) {
    console.warn('Unable to save onboarding status.', error);
  }
}

export async function clearStoredPreferences(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([STORAGE_KEYS.language, STORAGE_KEYS.onboardingComplete]);
  } catch (error) {
    console.warn('Unable to clear stored preferences.', error);
  }
}

export { STORAGE_KEYS };
