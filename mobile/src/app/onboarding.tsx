import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/brand-mark';
import { OnboardingSlide } from '@/components/onboarding/onboarding-slide';
import type { OnboardingScene } from '@/components/onboarding/illustrations';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ArrowRightIcon } from '@/components/ui/icons';
import { PrimaryButton } from '@/components/ui/primary-button';
import { Spacing } from '@/constants/theme';
import { useAppSettings } from '@/context/app-settings';
import { useTheme } from '@/hooks/use-theme';

const SLIDE_KEYS = ['welcome', 'crops', 'weather', 'community'] as const;

const SCENES: Record<(typeof SLIDE_KEYS)[number], OnboardingScene> = {
  welcome: 'welcome',
  crops: 'crops',
  weather: 'weather',
  community: 'community',
};

const slideInRight = new Keyframe({
  0: { opacity: 0, transform: [{ translateX: 42 }] },
  100: {
    opacity: 1,
    transform: [{ translateX: 0 }],
    easing: Easing.out(Easing.cubic),
  },
});

const slideInLeft = new Keyframe({
  0: { opacity: 0, transform: [{ translateX: -42 }] },
  100: {
    opacity: 1,
    transform: [{ translateX: 0 }],
    easing: Easing.out(Easing.cubic),
  },
});

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  const { completeOnboarding } = useAppSettings();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLastSlide = index === SLIDE_KEYS.length - 1;
  const slideKey = SLIDE_KEYS[index];
  const illustrationWidth = Math.min(width - Spacing.five * 2, height < 700 ? 250 : 320, 360);

  const finish = async () => {
    await completeOnboarding();
    router.replace('/language');
  };

  const goNext = () => {
    if (isLastSlide) {
      finish();
      return;
    }

    setDirection(1);
    setIndex((current) => current + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setIndex((current) => Math.max(0, current - 1));
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <BrandMark size={32} color={theme.primary} withBackground={false} />
            <ThemedText type="smallBold">{t('common.appName')}</ThemedText>
          </View>

          {!isLastSlide ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('common.skip')}
              hitSlop={8}
              onPress={finish}
              style={({ pressed }) => [styles.skipButton, pressed && styles.pressed]}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('common.skip')}
              </ThemedText>
            </Pressable>
          ) : (
            <View style={styles.skipPlaceholder} />
          )}
        </View>

        <ScrollView
          contentContainerStyle={styles.slideScroll}
          showsVerticalScrollIndicator={false}>
          <Animated.View
            key={slideKey}
            entering={(direction > 0 ? slideInRight : slideInLeft).duration(320)}
            style={styles.slideContainer}>
            <OnboardingSlide
              eyebrow={t(`onboarding.slides.${slideKey}.eyebrow`)}
              title={t(`onboarding.slides.${slideKey}.title`)}
              description={t(`onboarding.slides.${slideKey}.description`)}
              scene={SCENES[slideKey]}
              illustrationWidth={illustrationWidth}
            />
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.progressRow}>
            <View style={styles.dots}>
              {SLIDE_KEYS.map((key, dotIndex) => (
                <View
                  key={key}
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        dotIndex === index ? theme.primary : theme.backgroundSelected,
                      width: dotIndex === index ? 26 : 8,
                    },
                  ]}
                />
              ))}
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              {t('onboarding.slideCount', {
                current: index + 1,
                total: SLIDE_KEYS.length,
              })}
            </ThemedText>
          </View>

          <View style={styles.actions}>
            {index > 0 ? (
              <PrimaryButton
                label={t('common.back')}
                variant="secondary"
                onPress={goBack}
                style={styles.backButton}
              />
            ) : null}
            <PrimaryButton
              label={isLastSlide ? t('common.getStarted') : t('common.next')}
              onPress={goNext}
              icon={<ArrowRightIcon size={19} color={theme.onPrimary} />}
              style={styles.nextButton}
            />
          </View>
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
  skipButton: {
    minHeight: 44,
    minWidth: 56,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: Spacing.two,
  },
  skipPlaceholder: {
    minWidth: 56,
  },
  pressed: {
    opacity: 0.6,
  },
  slideScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  slideContainer: {
    width: '100%',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
    gap: Spacing.three,
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1.6,
  },
});
