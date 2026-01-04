import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import DashedLine from 'react-native-dashed-line';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';

const LoansStatementScreen = () => {
  const router = useRouter();
  const { title, image } = useLocalSearchParams();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`loansStatementScreen.${key}`);
  }

  // NOTE: `image` from params is a string/number.
  // If passed as string path or URI, we need to handle it.
  // Original code passed a `require(...)` which results in a number ID in dev/prod bundle.
  // Expo router params are strings.
  // If we pass an image ID, it might be stringified.
  // We need to cast it back to number if possible or handle potential string URI.
  // However, local images are usually numbers.
  // For now let's try to interpret it.

  // Actually, passing local require() images via params is tricky with deep linking URL params.
  // But within the app flow it might work if router serializes it.
  // If it comes as a string "5", Number("5") -> 5.

  const imageSource =
    typeof image === 'string' && !isNaN(Number(image)) ? Number(image) : image;

  const recentTransactionList = [
    {
      key: '1',
      title: 'EMI debited',
      date: '12 may 2019',
      dollar: '-$800.00',
    },
    {
      key: '2',
      title: 'EMI debited',
      date: '12 may 2019',
      dollar: '-$800.00',
    },
    {
      key: '3',
      title: 'EMI debited',
      date: '12 april 2019',
      dollar: '-$800.00',
    },
    {
      key: '4',
      title: 'EMI debited',
      date: '12 march 2019',
      dollar: '-$800.00',
    },
    {
      key: '5',
      title: 'EMI debited',
      date: '12 Feb 2019',
      dollar: '-$800.00',
    },
    {
      key: '6',
      title: 'EMI debited',
      date: '12 Jan 2019',
      dollar: '-$800.00',
    },
    {
      key: '7',
      title: 'EMI debited',
      date: '12 Dec 2018',
      dollar: '-$800.00',
    },
    {
      key: '8',
      title: 'EMI debited',
      date: '12 Nov 2018',
      dollar: '-$800.00',
    },
    {
      key: '9',
      title: 'EMI debited',
      date: '12 Oct 2018',
      dollar: '-$800.00',
    },
    {
      key: '10',
      title: 'EMI debited',
      date: '12Sep 2018',
      dollar: '-$800.00',
    },
  ];

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
          {`${title} ${tr('statement')}`}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className="m-5 rounded-[10px] bg-white shadow-md"
          style={{ elevation: 6 }}
        >
          <View
            className="flex-row items-center justify-between p-5 pb-6"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <View
              className="flex-1 flex-row items-center"
              style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
            >
              <View className="bg-extraLightGrey size-[38px] items-center justify-center rounded-[19px]">
                <Image
                  source={imageSource as any}
                  resizeMode="contain"
                  className="size-[22px]"
                />
              </View>

              <View
                className="flex-1 px-4"
                style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
              >
                <Text
                  numberOfLines={1}
                  className="overflow-hidden font-nunito text-base font-bold text-black"
                >
                  {title}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-grey mt-1 overflow-hidden font-nunito text-sm font-semibold"
                >
                  1234 4567 8956 1222
                </Text>
              </View>
            </View>

            <Text
              numberOfLines={1}
              className="text-primary max-w-[100px] font-nunito text-base font-bold"
            >
              $20000.00
            </Text>
          </View>

          <DashedLine
            dashGap={2}
            dashLength={2}
            dashThickness={1.5}
            dashColor={colors.primary}
          />

          <View
            className="flex-row items-center justify-between px-5 py-3"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <View
              className="flex-1 justify-center"
              style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
            >
              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-sm font-semibold"
              >
                {tr('period')}
              </Text>
              <Text
                numberOfLines={1}
                className="mt-1 font-nunito text-base font-semibold text-black"
              >
                24 month
              </Text>
            </View>
            <View className="mx-1 flex-1 items-center justify-center">
              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-sm font-semibold"
              >
                {tr('rate')}
              </Text>
              <Text
                numberOfLines={1}
                className="mt-1 font-nunito text-base font-semibold text-black"
              >
                13% rate
              </Text>
            </View>
            <View
              className="flex-1 justify-center"
              style={{ alignItems: isRtl ? 'flex-start' : 'flex-end' }}
            >
              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-sm font-semibold"
              >
                {tr('eMI')}
              </Text>
              <Text
                numberOfLines={1}
                className="mt-1 font-nunito text-base font-semibold text-black"
              >
                $1000.00
              </Text>
            </View>
          </View>
        </View>

        <Text
          className="text-grey mx-5 font-nunito text-base font-semibold"
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        >
          {tr('recentTransaction')}
        </Text>

        {recentTransactionList.map((item, index) => {
          return (
            <View
              key={item.key}
              className={`flex-row items-center justify-between px-5 py-4 ${
                index !== 0 ? 'border-lightGrey border-t-[0.8px]' : ''
              }`}
              style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
            >
              <View
                className="flex-1"
                style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
              >
                <Text className="font-nunito text-[15px] font-bold text-black">
                  {item.title}
                </Text>
                <Text className="text-grey mt-1 font-nunito text-xs font-bold">
                  {item.date}
                </Text>
              </View>

              <Text
                numberOfLines={1}
                className="text-red max-w-[100px] font-nunito text-[15px] font-bold"
              >
                {item.dollar}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LoansStatementScreen;
