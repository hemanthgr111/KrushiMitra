import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { BookIcon } from '@/components/ui/icons';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const SECTIONS = ['cropGuides', 'weather', 'soil', 'pests', 'market', 'community'] as const;

export default function ExploreScreen() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={[styles.headerIcon, { backgroundColor: theme.primarySoft }]}>
              <BookIcon size={26} color={theme.primary} />
            </View>
            <View style={styles.headerText}>
              <ThemedText type="subtitle">{t('explore.title')}</ThemedText>
              <ThemedText themeColor="textSecondary">{t('explore.subtitle')}</ThemedText>
            </View>
          </View>

          <View style={styles.sections}>
            {SECTIONS.map((section) => (
              <Collapsible key={section} title={t(`explore.${section}.title`)}>
                <ThemedText type="small">{t(`explore.${section}.body`)}</ThemedText>
              </Collapsible>
            ))}
          </View>

          <ThemedView
            type="backgroundElement"
            style={[styles.communityCard, { borderColor: theme.border }]}>
            <ThemedText type="smallBold">{t('explore.community.title')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('explore.community.body')}
            </ThemedText>
          </ThemedView>
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
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.five,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: Spacing.one,
  },
  sections: {
    gap: Spacing.four,
  },
  communityCard: {
    borderRadius: Spacing.three,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.two,
  },
});
