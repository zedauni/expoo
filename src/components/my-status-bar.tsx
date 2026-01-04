import { useColorScheme } from 'nativewind';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '@/components/ui/colors';

const MyStatusBar = ({
  backgroundColor,
  barStyle,
  translucent = true,
  ...props
}: any) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Default to primary in light mode (migration), black in dark mode (respect theme)
  const defaultBackgroundColor = isDark ? colors.black : colors.primary;
  const appliedBackgroundColor = backgroundColor || defaultBackgroundColor;

  // Default to light-content because both Primary and Black are dark backgrounds
  const appliedBarStyle = barStyle || 'light-content';

  return (
    <View
      style={{ height: insets.top, backgroundColor: appliedBackgroundColor }}
    >
      <StatusBar
        animated={true}
        backgroundColor={appliedBackgroundColor}
        barStyle={appliedBarStyle}
        translucent={translucent}
        {...props}
      />
    </View>
  );
};

export default MyStatusBar;
