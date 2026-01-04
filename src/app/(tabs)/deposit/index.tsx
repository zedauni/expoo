import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width } = Dimensions.get('window');

const DepositScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const currentDepositList = [
    {
      key: '1',
      title: 'Deposit for 2 year',
      date: '12 march 2022',
      dollar: '$500.00',
      depositTo: '1234 5678 9101',
      status: t('depositScreen.pending'),
      rate: '2% rate',
    },
    {
      key: '2',
      title: 'Deposit for 3 year',
      date: '14 march 2022',
      dollar: '$900.00',
      depositTo: '1234 5678 9101',
      status: t('depositScreen.pending'),
      rate: '2% rate',
    },
  ];

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <View className="flex-1">
        <ImageBackground
          source={images.depositImage}
          resizeMode="cover"
          className="h-20 items-center justify-center px-5"
          style={{ width }}
        >
          <Text className="font-nunito text-xl font-extrabold text-white">
            {t('depositScreen.deposit')}
          </Text>
        </ImageBackground>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        >
          <Text className="mx-5 mb-4 mt-5 text-left font-nunito text-base font-semibold text-black">
            {t('depositScreen.currentDeposit')}
          </Text>

          {currentDepositList.map((item) => {
            return (
              <View
                key={item.key}
                className="mx-5 mb-5 rounded-[10px] bg-white shadow-md"
                style={{ elevation: 6 }}
              >
                <View className="flex-row items-center justify-between px-[18px] pb-[18px] pt-3.5">
                  <View className="flex-1 flex-row items-center">
                    <View className="bg-extraLightGrey size-[38px] items-center justify-center rounded-full">
                      <Image
                        resizeMode="contain"
                        source={images.primaryDeposit}
                        className="size-[22px]"
                      />
                    </View>

                    <View className="flex-1 items-start px-4">
                      <Text
                        numberOfLines={1}
                        className="overflow-hidden font-nunito text-base font-bold text-black"
                      >
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        className="text-grey mt-[3px] overflow-hidden font-nunito text-sm font-bold"
                      >
                        {item.title}
                      </Text>
                      {/* Note: In original code, it displayed title twice. Assuming date meant to be displayed? 
                          Original code:
                          <Text>{item.title}</Text>
                          <Text>{item.title}</Text> <--- Looks like a bug in original code or intentional? 
                          Wait, let's check the data. `title: "Deposit for 2 year"`
                          Let's stick to original behavior or maybe fix it to show date if that was intent?
                          Original data has date field but it's not used in original renderItem block for currentDepositList?
                          Wait, let's look closely at original code.
                          Lines 147 and 157 both use `item.title`.
                          Assume migrate as is for fidelity, or fix if obvious bug. I'll stick to migrating as is but it looks weird.
                          Actually looking at `completedDeposit` section later in original file, it shows date. 
                          I will assume for now to keep it as is to match original exactly.
                      */}
                    </View>
                  </View>

                  <Text
                    numberOfLines={1}
                    className="max-w-[100px] font-nunito text-lg font-bold text-black"
                  >
                    {item.dollar}
                  </Text>
                </View>

                <DashedLine
                  dashGap={2}
                  dashLength={2}
                  dashThickness={1.5}
                  dashColor={colors.primary}
                />

                <View className="flex-row items-center justify-between px-5 py-2.5">
                  <View className="flex-1 items-start justify-center">
                    <Text
                      numberOfLines={1}
                      className="text-grey overflow-hidden font-nunito text-sm font-semibold"
                    >
                      {t('depositScreen.depositTo')}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="mt-1.5 font-nunito text-[15px] font-semibold text-black"
                    >
                      {item.depositTo}
                    </Text>
                  </View>
                  <View className="mx-0.5 flex-1 items-center justify-center">
                    <Text
                      numberOfLines={1}
                      className="text-grey overflow-hidden font-nunito text-sm font-semibold"
                    >
                      {t('depositScreen.status')}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-red mt-1.5 font-nunito text-[15px] font-semibold"
                    >
                      {item.status}
                    </Text>
                  </View>
                  <View className="flex-1 items-end justify-center">
                    <Text
                      numberOfLines={1}
                      className="text-grey overflow-hidden font-nunito text-sm font-semibold"
                    >
                      {t('depositScreen.rate')}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="mt-1.5 font-nunito text-[15px] font-semibold text-black"
                    >
                      {item.rate}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}

          <Text className="mx-5 mb-4 text-left font-nunito text-base font-semibold text-black">
            {t('depositScreen.completedDeposit')}
          </Text>

          <View
            className="mx-5 mb-5 rounded-[10px] bg-white shadow-md"
            style={{ elevation: 6 }}
          >
            <View className="flex-row items-center justify-between px-[18px] pb-[18px] pt-3.5">
              <View className="flex-1 flex-row items-center">
                <View className="bg-lightGrey size-[38px] items-center justify-center rounded-full">
                  <Image
                    resizeMode="contain"
                    source={images.primaryDeposit}
                    className="size-[22px]"
                  />
                </View>

                <View className="flex-1 items-start px-4">
                  <Text
                    numberOfLines={1}
                    className="overflow-hidden font-nunito text-base font-bold text-black"
                  >
                    Deposit for 1 year
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-grey mt-[3px] overflow-hidden font-nunito text-sm font-bold"
                  >
                    10 march 2021
                  </Text>
                </View>
              </View>

              <Text
                numberOfLines={1}
                className="max-w-[100px] font-nunito text-lg font-bold text-black"
              >
                $600.00
              </Text>
            </View>

            <DashedLine
              dashGap={2}
              dashLength={2}
              dashThickness={1.5}
              dashColor={colors.primary}
            />

            <View className="flex-row items-center justify-between px-5 py-2.5">
              <View className="flex-1 items-start justify-center">
                <Text
                  numberOfLines={1}
                  className="text-grey overflow-hidden font-nunito text-sm font-semibold"
                >
                  {t('depositScreen.depositTo')}
                </Text>
                <Text
                  numberOfLines={1}
                  className="mt-1.5 font-nunito text-[15px] font-semibold text-black"
                >
                  1234 5678 9101
                </Text>
              </View>
              <View className="mx-0.5 flex-1 items-center justify-center">
                <Text
                  numberOfLines={1}
                  className="text-grey overflow-hidden font-nunito text-sm font-semibold"
                >
                  {t('depositScreen.status')}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-green mt-1.5 font-nunito text-[15px] font-semibold"
                >
                  {t('depositScreen.completed')}
                </Text>
              </View>
              <View className="flex-1 items-end justify-center">
                <Text
                  numberOfLines={1}
                  className="text-grey overflow-hidden font-nunito text-sm font-semibold"
                >
                  {t('depositScreen.rate')}
                </Text>
                <Text
                  numberOfLines={1}
                  className="mt-1.5 font-nunito text-[15px] font-semibold text-black"
                >
                  2% rate
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => router.push('/add-deposit')}
          className="bg-primary absolute right-5 size-[60px] items-center justify-center rounded-full"
          style={{ bottom: insets.bottom + 20 }}
        >
          <MaterialIcons name="add" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DepositScreen;
