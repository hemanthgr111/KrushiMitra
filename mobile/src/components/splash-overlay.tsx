import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

import { BrandMark } from '@/components/brand-mark';
import { BrandColors, Spacing } from '@/constants/theme';

export function SplashOverlay() {
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={FadeIn.duration(250)}
      exiting={FadeOut.duration(450)}
      onLayout={() => {
        SplashScreen.hideAsync().catch(() => {});
      }}
      style={styles.container}>
      <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" viewBox="0 0 400 800">
        <Circle cx={50} cy={120} r={140} fill={BrandColors.white} opacity={0.06} />
        <Circle cx={360} cy={640} r={190} fill={BrandColors.white} opacity={0.05} />
        <Circle cx={330} cy={150} r={60} fill={BrandColors.accent} opacity={0.16} />
        <Path
          d="M-20 620C70 540 150 570 220 630c80 70 160 40 210-20v210H-20V620Z"
          fill={BrandColors.primaryDark}
          opacity={0.4}
        />
        <Path
          d="M-20 680C70 620 170 650 240 700c60 45 130 30 180-15v135H-20V680Z"
          fill="#0D4427"
          opacity={0.5}
        />
      </Svg>

      <Animated.View entering={ZoomIn.duration(650)} style={styles.logoWrapper}>
        <BrandMark size={110} background={BrandColors.white} color={BrandColors.primary} />
      </Animated.View>

      <Text style={styles.title}>{t('common.appName')}</Text>
      <Text style={styles.tagline}>{t('splash.tagline')}</Text>

      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: BrandColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.five,
    zIndex: 1000,
  },
  logoWrapper: {
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  title: {
    marginTop: Spacing.four,
    color: BrandColors.white,
    fontSize: 34,
    lineHeight: 42,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  tagline: {
    marginTop: Spacing.two,
    color: BrandColors.white,
    opacity: 0.86,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  dots: {
    position: 'absolute',
    bottom: 72,
    flexDirection: 'row',
    gap: Spacing.two,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: BrandColors.white,
    opacity: 0.35,
  },
  dotActive: {
    width: 22,
    opacity: 0.95,
  },
});
