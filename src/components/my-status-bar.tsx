import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';

import colors from '@/components/ui/colors';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = () => {
  return (
    <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: colors.primary }}>
      <SafeAreaView>
        <StatusBar
          translucent
          backgroundColor={colors.primary}
          barStyle="light-content"
        />
      </SafeAreaView>
    </View>
  );
};

export default MyStatusBar;
