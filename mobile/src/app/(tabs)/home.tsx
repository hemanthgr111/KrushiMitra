import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandMark } from '@/components/brand-mark';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  ArrowRightIcon,
  CloudSunIcon,
  GlobeIcon,
  LeafIcon,
  UsersIcon,
} from '@/components/ui/icons';
import { PrimaryButton } from '@/components/ui/primary-button';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  hint: string;
  onPress: () => void;
};

function InfoCard({ icon, title, value, hint, onPress }: InfoCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${value}. ${hint}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
      ]}>
      <View style={[styles.cardIcon, { backgroundColor: theme.primarySoft }]}>{icon}</View>
      <View style={styles.cardContent}>
        <ThemedText type="small" themeColor="textSecondary">
          {title}
        </ThemedText>
        <ThemedText type="smallBold" style={styles.cardValue}>
          {value}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {hint}
        </ThemedText>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();

  const openExplore = () => router.push('/explore');
  const openLanguage = () =>
    router.push({ pathname: '/language', params: { source: 'settings' } });

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View style={styles.headerText}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('home.greeting')}
              </ThemedText>
              <ThemedText type="subtitle">{t('home.title')}</ThemedText>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('common.changeLanguage')}
              hitSlop={8}
              onPress={openLanguage}
              style={({ pressed }) => [
                styles.languageButton,
                { backgroundColor: theme.card, borderColor: theme.border },
                pressed && styles.pressed,
              ]}>
              <GlobeIcon size={22} color={theme.primary} />
            </Pressable>
          </View>

          <ThemedText themeColor="textSecondary" style={styles.subtitle}>
            {t('home.subtitle')}
          </ThemedText>

          <View style={[styles.heroCard, { backgroundColor: theme.primary }]}>
            <View style={styles.heroHeader}>
              <View style={styles.heroBrand}>
                <BrandMark size={52} background={theme.onPrimary} color={theme.primary} />
                <View style={styles.heroBrandText}>
                  <ThemedText style={[styles.heroTitle, { color: theme.onPrimary }]}>
                    {t('common.appName')}
                  </ThemedText>
                  <ThemedText style={[styles.heroTagline, { color: theme.onPrimary }]}>
                    {t('common.tagline')}
                  </ThemedText>
                </View>
              </View>
            </View>

            <View style={[styles.heroDivider, { backgroundColor: theme.onPrimary }]} />

            <ThemedText style={[styles.heroTipTitle, { color: theme.onPrimary }]}>
              {t('home.tipTitle')}
            </ThemedText>
            <ThemedText style={[styles.heroTipBody, { color: theme.onPrimary }]}>
              {t('home.tipBody')}
            </ThemedText>
          </View>

          <ThemedText type="smallBold" style={styles.sectionTitle}>
            {t('home.quickActions')}
          </ThemedText>

          <View style={styles.cards}>
            <InfoCard
              icon={<CloudSunIcon size={24} color={theme.primary} />}
              title={t('home.weatherTitle')}
              value={t('home.weatherValue')}
              hint={t('home.weatherHint')}
              onPress={openExplore}
            />
            <InfoCard
              icon={<LeafIcon size={24} color={theme.primary} />}
              title={t('home.cropTitle')}
              value={t('home.cropValue')}
              hint={t('home.cropHint')}
              onPress={openExplore}
            />
            <InfoCard
              icon={<UsersIcon size={24} color={theme.primary} />}
              title={t('home.communityTitle')}
              value={t('home.communityValue')}
              hint={t('home.communityHint')}
              onPress={openExplore}
            />
          </View>

          <PrimaryButton
            label={t('home.exploreButton')}
            onPress={openExplore}
            icon={<ArrowRightIcon size={19} color={theme.onPrimary} />}
            style={styles.exploreButton}
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('home.languageButton')}
            onPress={openLanguage}
            style={({ pressed }) => [styles.languageRow, pressed && styles.pressed]}>
            <GlobeIcon size={18} color={theme.primary} />
            <ThemedText type="small" style={{ color: theme.primary }}>
              {t('home.languageButton')}
            </ThemedText>
          </Pressable>
        </ScrollView>
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
  content: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  headerText: {
    flex: 1,
    gap: Spacing.one,
  },
  languageButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
  subtitle: {
    maxWidth: 620,
  },
  heroCard: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
    shadowColor: '#0B2E18',
    shadowOpacity: 0.16,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    flex: 1,
  },
  heroBrandText: {
    flex: 1,
    gap: 2,
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 800,
  },
  heroTagline: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 500,
    opacity: 0.86,
  },
  heroDivider: {
    height: 1,
    opacity: 0.18,
  },
  heroTipTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 800,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.82,
  },
  heroTipBody: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: 500,
  },
  sectionTitle: {
    marginTop: Spacing.two,
  },
  cards: {
    gap: Spacing.two,
  },
  card: {
    borderRadius: Spacing.three,
    borderWidth: 1,
    padding: Spacing.three,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
    minHeight: 84,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flex: 1,
    gap: 2,
  },
  cardValue: {
    fontSize: 15,
    lineHeight: 21,
  },
  exploreButton: {
    marginTop: Spacing.one,
  },
  languageRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
});
