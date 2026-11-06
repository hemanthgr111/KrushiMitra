import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import i18n, { DEFAULT_LANGUAGE, type LanguageCode } from '@/i18n';
import {
  getOnboardingComplete,
  getStoredLanguage,
  saveLanguage,
  saveOnboardingComplete,
} from '@/services/storage';

type AppSettingsValue = {
  ready: boolean;
  language: LanguageCode;
  onboardingComplete: boolean;
  setLanguage: (language: LanguageCode) => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AppSettingsContext = createContext<AppSettingsValue | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [language, setLanguageState] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [onboardingComplete, setOnboardingCompleteState] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function restoreSettings() {
      try {
        const [storedLanguage, completed] = await Promise.all([
          getStoredLanguage(),
          getOnboardingComplete(),
        ]);

        if (!mounted) return;

        if (storedLanguage) {
          await i18n.changeLanguage(storedLanguage);
          if (mounted) setLanguageState(storedLanguage);
        }

        if (mounted) setOnboardingCompleteState(completed);
      } finally {
        if (mounted) setReady(true);
      }
    }

    restoreSettings();

    return () => {
      mounted = false;
    };
  }, []);

  const setLanguage = useCallback(async (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    await i18n.changeLanguage(nextLanguage);
    await saveLanguage(nextLanguage);
  }, []);

  const completeOnboarding = useCallback(async () => {
    setOnboardingCompleteState(true);
    await saveOnboardingComplete(true);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      language,
      onboardingComplete,
      setLanguage,
      completeOnboarding,
    }),
    [ready, language, onboardingComplete, setLanguage, completeOnboarding],
  );

  return <AppSettingsContext.Provider value={value}>{children}</AppSettingsContext.Provider>;
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);

  if (!context) {
    throw new Error('useAppSettings must be used inside an AppSettingsProvider.');
  }

  return context;
}
