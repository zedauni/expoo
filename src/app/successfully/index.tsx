import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';

const SuccessfullyScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`successfullyScreen.${key}`);
  }

  // Handle preventing back navigation if needed, or just let router handle it.
  // Original code used navigation.addListener("beforeRemove", ...).
  // With Expo Router, we can't easily block generic back swipes without native-stack configs,
  // but for the button we can explicitely push to tabs.
  useEffect(() => {
    // Note: Expo Router doesn't have a direct equivalent to 'beforeRemove' in `useEffect` easily accessible
    // without `navigation` prop or specific layout setup.
    // For now, we will rely on the "Back to Home" button.
  }, []);

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <View className="flex-1 justify-center">
        <View className="items-center justify-center">
          <Ionicons name="checkmark-circle" size={102} color={colors.green} />
          <Text className="mt-5 text-center font-nunito text-xl font-bold text-black">
            {tr('successfully')}
          </Text>
          <Text className="text-grey mt-1 font-nunito text-sm font-bold">
            5 feb 2022 at 9.00am
          </Text>
        </View>
        <View
          className="mx-5 mt-10 rounded-[10px] bg-white shadow-md"
          style={{ elevation: 6 }}
        >
          <View
            className="flex-row items-center px-5 pb-5 pt-4"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <View
              className="flex-1"
              style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
            >
              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-base font-semibold"
              >
                {tr('transferred')}
              </Text>
              <Text className="mt-1 font-nunito text-sm font-bold text-black">
                Virat Sharma
              </Text>
            </View>
            <View
              className="flex-[1.5]"
              style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
            >
              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-base font-semibold"
              >
                {tr('from')}
              </Text>
              <Text
                className="mt-1 font-nunito text-sm font-bold text-black"
                style={{ textAlign: isRtl ? 'right' : 'left' }}
              >
                SB 1234 5647 8956 5654
              </Text>
            </View>
          </View>
          <DashedLine
            dashGap={2}
            dashLength={2}
            dashThickness={1.5}
            dashColor={colors.grey}
          />

          <View
            className="item-center flex-row justify-between px-5 pb-4 pt-5"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <View
              className="flex-1 justify-center"
              style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
            >
              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-base font-semibold"
              >
                {tr('remark')}
              </Text>
              <Text className="mt-1 font-nunito text-sm font-bold text-black">
                Rent
              </Text>
            </View>
            <View className="mx-0.5 flex-1 items-center justify-center">
              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-base font-semibold"
              >
                {tr('amount')}
              </Text>
              <Text className="mt-1 font-nunito text-sm font-bold text-black">
                $1000.00
              </Text>
            </View>
            <View
              className="flex-1 justify-center"
              style={{ alignItems: isRtl ? 'flex-start' : 'flex-end' }}
            >
              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-base font-semibold"
              >
                {tr('paymentMode')}
              </Text>
              <Text className="mt-1 font-nunito text-sm font-bold text-black">
                IMPS
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        className="self-center"
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text
          className="m-5 text-center font-nunito text-base font-bold text-black"
          style={{ marginBottom: insets.bottom + 20 }}
        >
          {tr('backToHome')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessfullyScreen;
