import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/brand-mark';
import { LanguageOption } from '@/components/language/language-option';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ChevronLeftIcon, GlobeIcon } from '@/components/ui/icons';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Spacing } from '@/constants/theme';
import { useAppSettings } from '@/context/app-settings';
import { useTheme } from '@/hooks/use-theme';
import { SUPPORTED_LANGUAGES, type LanguageCode } from '@/i18n/languages';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { source } = useLocalSearchParams<{ source?: string }>();
  const { language, setLanguage } = useAppSettings();
  const isSettings = source === 'settings';

  const selectLanguage = (code: LanguageCode) => {
    if (code !== language) {
      setLanguage(code);
    }
  };

  const handleContinue = () => {
    if (isSettings && router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/home');
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          {isSettings ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('common.back')}
              hitSlop={8}
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backButton,
                { backgroundColor: theme.backgroundElement },
                pressed && styles.pressed,
              ]}>
              <ChevronLeftIcon size={22} color={theme.text} />
            </Pressable>
          ) : (
            <View style={styles.brandRow}>
              <BrandMark size={34} color={theme.primary} withBackground={false} />
              <ThemedText type="smallBold">{t('common.appName')}</ThemedText>
            </View>
          )}

          <View style={[styles.globeBadge, { backgroundColor: theme.primarySoft }]}>
            <GlobeIcon size={20} color={theme.primary} />
          </View>
        </View>

        <View style={styles.intro}>
          <ThemedText type="subtitle">{t('language.title')}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.subtitle}>
            {t('language.subtitle')}
          </ThemedText>
        </View>

        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}>
          {SUPPORTED_LANGUAGES.map((option) => (
            <LanguageOption
              key={option.code}
              code={option.code}
              nativeName={option.nativeName}
              englishName={option.englishName}
              selected={language === option.code}
              onPress={() => selectLanguage(option.code)}
            />
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.selectedRow}>
            <View style={[styles.selectedDot, { backgroundColor: theme.primary }]} />
            <ThemedText type="small" themeColor="textSecondary">
              {t('language.selected')}: {SUPPORTED_LANGUAGES.find((item) => item.code === language)?.nativeName}
            </ThemedText>
          </View>
          <PrimaryButton label={t('language.continue')} onPress={handleContinue} />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 56,
    paddingHorizontal: Spacing.four,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  globeBadge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
    gap: Spacing.two,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  subtitle: {
    maxWidth: 560,
  },
  listScroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.three,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  selectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
