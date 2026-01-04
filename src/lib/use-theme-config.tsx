import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

import colors from '@/components/ui/colors';

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary, // Using the primary string instead of undefined index
    background: '#171717', // Consistent with .dark background
    text: '#D6D6D6', // Consistent with .dark foreground
    border: '#404040',
    card: '#262626',
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};

export function useThemeConfig() {
  const { colorScheme } = useColorScheme();

  if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}
