import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  type ImageSourcePropType,
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
const CARD_WIDTH = width * 0.85;

const LoansScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const isRtl = i18n.dir() === 'rtl';

  interface LoanItem {
    key: string;
    image: ImageSourcePropType;
    reversImage: ImageSourcePropType;
    title: string;
    other: string;
  }

  const loanList: LoanItem[] = [
    {
      key: '1',
      image: images.loan2,
      reversImage: images.loan4, // Ensure this exists in images.ts
      title: t('loansScreen.makeEducation'),
      other: t('loansScreen.lowestInterest'),
    },
    {
      key: '2',
      image: images.loan1,
      reversImage: images.loan3, // Ensure this exists in images.ts
      title: t('loansScreen.theRightChoiceCar'),
      other: t('loansScreen.dreamCar'),
    },
  ];

  const renderItemLoan = ({ item }: { item: LoanItem }) => {
    return (
      <TouchableOpacity
        onPress={() => router.push('/education-loan')}
        className="mx-2.5 my-5 h-[150px] flex-row rounded-[10px] bg-white shadow-md"
        style={{ width: CARD_WIDTH, elevation: 6 }}
      >
        <View className="flex-[6]">
          <Image
            source={isRtl ? item.reversImage : item.image}
            resizeMode="stretch"
            style={{ width: width / 2, height: 150 }}
            className="rounded-l-[10px]"
          />
        </View>
        <View className="flex-[4] justify-center px-4 pl-1.5">
          <Text
            numberOfLines={2}
            className="text-primary overflow-hidden font-nunito text-base font-bold"
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            className="text-grey mt-1 overflow-hidden font-nunito text-sm font-bold"
          >
            {item.other}
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/education-loan')}
            className="border-primary mt-2.5 w-[95px] items-center justify-center rounded-[5px] border bg-white p-1"
          >
            <Text
              numberOfLines={1}
              className="text-primary overflow-hidden font-nunito text-sm font-bold"
            >
              {t('loansScreen.applyNow')}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  interface CurrentLoanItem {
    key: string;
    image: ImageSourcePropType;
    title: string;
    number: string;
    dollar: string;
    period: string;
    rate: string;
    EMI: string;
  }

  const currentLoanList: CurrentLoanItem[] = [
    {
      key: '1',
      image: images.services12,
      title: t('loansScreen.homeLoan'),
      number: '1234 4567 8956 1222',
      dollar: '$20000.00',
      period: '24 month',
      rate: '13% rate',
      EMI: '$1000.00',
    },
    {
      key: '2',
      image: images.services13,
      title: t('loansScreen.carLoan'),
      number: '1234 4567 8956 1222',
      dollar: '$10000.00',
      period: '12 month',
      rate: '10% rate',
      EMI: '$1000.00',
    },
  ];

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <ImageBackground
        source={images.depositImage}
        className="h-20 w-full items-center justify-center px-5"
      >
        <Text className="font-nunito text-xl font-extrabold text-white">
          {t('loansScreen.loans')}
        </Text>
      </ImageBackground>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <FlatList
          inverted={isRtl}
          horizontal
          pagingEnabled
          data={loanList}
          renderItem={renderItemLoan}
          scrollEventThrottle={1}
          snapToAlignment="center"
          decelerationRate={'fast'}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />

        <DashedLine
          dashGap={2}
          dashLength={2}
          dashThickness={1.5}
          dashColor={colors.primary}
        />

        <View className="mx-5 mt-5">
          <Text className="mb-3 text-left font-nunito text-lg font-bold text-black">
            {t('loansScreen.currentLoans')}
          </Text>
          {currentLoanList.map((item) => {
            return (
              <View
                key={item.key}
                className="mb-5 rounded-[10px] bg-white shadow-md"
                style={{ elevation: 6 }}
              >
                <View className="flex-row items-center justify-between px-4 pb-4 pt-3.5">
                  <View className="flex-1 flex-row items-center">
                    <View className="bg-extraLightGrey size-[38px] items-center justify-center rounded-full">
                      <Image
                        resizeMode="contain"
                        source={item.image}
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
                        className="text-grey mt-1 overflow-hidden font-nunito text-sm font-semibold"
                      >
                        {item.number}
                      </Text>
                    </View>
                  </View>

                  <Text
                    numberOfLines={1}
                    className="text-primary max-w-[100px] font-nunito text-base font-bold"
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
                      {t('loansScreen.period')}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="mt-1 font-nunito text-base font-semibold text-black"
                    >
                      {item.period}
                    </Text>
                  </View>
                  <View className="mx-1 flex-1 items-center justify-center">
                    <Text
                      numberOfLines={1}
                      className="text-grey overflow-hidden font-nunito text-sm font-semibold"
                    >
                      {t('loansScreen.rate')}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="mt-1 font-nunito text-base font-semibold text-black"
                    >
                      {item.rate}
                    </Text>
                  </View>
                  <View className="flex-1 items-end justify-center">
                    <Text
                      numberOfLines={1}
                      className="text-grey overflow-hidden font-nunito text-sm font-semibold"
                    >
                      {t('loansScreen.eMI')}
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="mt-1 font-nunito text-base font-semibold text-black"
                    >
                      {item.EMI}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/loans-statement',
                      params: {
                        title: item.title,
                        image: item.image as unknown as string,
                      },
                    })
                  }
                  className="bg-lightPink items-center justify-center rounded-b-[10px] p-2"
                >
                  <Text className="text-primary font-nunito text-base font-bold">
                    {t('loansScreen.viewStatement')}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default LoansScreen;
