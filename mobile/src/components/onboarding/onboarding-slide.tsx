import { StyleSheet, View } from 'react-native';

import { OnboardingIllustration, type OnboardingScene } from '@/components/onboarding/illustrations';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type OnboardingSlideProps = {
  eyebrow: string;
  title: string;
  description: string;
  scene: OnboardingScene;
  illustrationWidth: number;
};

export function OnboardingSlide({
  eyebrow,
  title,
  description,
  scene,
  illustrationWidth,
}: OnboardingSlideProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.illustrationWrapper,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}>
        <OnboardingIllustration scene={scene} width={illustrationWidth} />
      </View>

      <View style={styles.textContainer}>
        <ThemedText style={[styles.eyebrow, { color: theme.primary }]}>{eyebrow}</ThemedText>
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText style={styles.description} themeColor="textSecondary">
          {description}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.five,
    width: '100%',
  },
  illustrationWrapper: {
    borderRadius: Spacing.five,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#0B2E18',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  textContainer: {
    alignItems: 'center',
    gap: Spacing.three,
  },
  eyebrow: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 800,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: 420,
  },
});
