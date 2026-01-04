import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const TermsConditionScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`termsConditionScreen.${key}`);
  }

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <View
        className="bg-regularGrey flex-row items-center px-5 py-3 shadow-md"
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          elevation: 6,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name={isRtl ? 'arrow-forward' : 'arrow-back'}
            size={23}
            color={colors.black}
          />
        </TouchableOpacity>
        <Text className="mx-4 font-nunito text-xl font-bold text-black">
          {tr('termsAndCondition')}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View className="items-center justify-center p-5">
          <Image
            source={images.splashIcon}
            className="tint-primary size-[78px]"
            style={{ tintColor: colors.primary }}
          />
          <Text className="text-primary mt-1 font-nunito text-[25px] font-semibold">
            STAR BANK
          </Text>
        </View>
        <View className="mx-5 mb-5">
          <Text
            className="text-grey font-nunito text-sm font-semibold"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('mainDescription')}
          </Text>
          <Text
            className="text-grey my-2.5 font-nunito text-sm font-semibold"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('subDescription')}
          </Text>
          <Text
            className="text-grey font-nunito text-sm font-semibold"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('mainDescription')}
          </Text>
          <Text
            className="text-grey my-2.5 font-nunito text-sm font-semibold"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('subDescription')}
          </Text>
          <Text
            className="text-grey font-nunito text-sm font-semibold"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('subDescription')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditionScreen;
