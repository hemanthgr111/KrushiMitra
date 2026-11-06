import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { CheckIcon } from '@/components/ui/icons';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type LanguageOptionProps = {
  code: string;
  nativeName: string;
  englishName: string;
  selected: boolean;
  onPress: () => void;
};

export function LanguageOption({
  code,
  nativeName,
  englishName,
  selected,
  onPress,
}: LanguageOptionProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={`${nativeName}, ${englishName}`}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: selected ? theme.primarySoft : theme.card,
          borderColor: selected ? theme.primary : theme.border,
        },
        pressed && styles.pressed,
      ]}>
      <View style={[styles.codeBadge, { backgroundColor: selected ? theme.primary : theme.backgroundElement }]}>
        <ThemedText
          style={[
            styles.codeText,
            { color: selected ? theme.onPrimary : theme.textSecondary },
          ]}>
          {code.toUpperCase()}
        </ThemedText>
      </View>

      <View style={styles.names}>
        <ThemedText style={[styles.nativeName, selected && { color: theme.primary }]}>
          {nativeName}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {englishName}
        </ThemedText>
      </View>

      <View
        style={[
          styles.radio,
          {
            borderColor: selected ? theme.primary : theme.border,
            backgroundColor: selected ? theme.primary : 'transparent',
          },
        ]}>
        {selected ? <CheckIcon size={15} color={theme.onPrimary} strokeWidth={3} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    borderRadius: Spacing.three,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  pressed: {
    opacity: 0.82,
  },
  codeBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 800,
    letterSpacing: 0.6,
  },
  names: {
    flex: 1,
    gap: 1,
  },
  nativeName: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: 700,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
