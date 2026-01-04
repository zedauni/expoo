import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  type ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const HomeScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  interface AccountDetailItem {
    key: string;
    name: string;
    balance: string;
    acNumber: string;
  }

  const accountDetailList: AccountDetailItem[] = [
    {
      key: '1',
      name: 'Saving account',
      balance: '$15000',
      acNumber: 'A/c no xxxxxxx785',
    },
    {
      key: '2',
      name: 'Current account',
      balance: '$5000',
      acNumber: 'A/c no xxxxxxx456',
    },
  ];

  const renderItemAccountDetail = ({ item }: { item: AccountDetailItem }) => {
    return (
      <ImageBackground
        resizeMode="stretch"
        source={images.image2}
        className="mx-[10px] my-[30px] h-[120px]"
        style={{ width: CARD_WIDTH }}
      >
        <View className="items-start p-[17px]">
          <Text
            numberOfLines={1}
            className="text-extraLightRegularGrey font-nunito text-lg font-bold"
          >
            {`${t('homeScreen.totalBalance')} : `}
            <Text className="text-extraLightRegularGrey font-nunito text-[22px] font-bold">
              {item.balance}
            </Text>
          </Text>

          <Text
            numberOfLines={1}
            className="text-extraLightPink mt-[15px] font-nunito text-sm font-semibold"
          >
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            className="text-extraLightPink mt-[3px] font-nunito text-sm font-bold"
          >
            {item.acNumber}
          </Text>
        </View>
      </ImageBackground>
    );
  };

  interface ServiceItem {
    key: string;
    image: ImageSourcePropType;
    title: string;
  }

  const servicesList: ServiceItem[] = [
    {
      key: '1',
      image: images.services1,
      title: t('homeScreen.account'),
    },
    {
      key: '2',
      image: images.services2,
      title: t('homeScreen.fundTransfer'),
    },
    {
      key: '3',
      image: images.services3,
      title: t('homeScreen.statement'),
    },
    {
      key: '4',
      image: images.services5,
      title: t('homeScreen.billPay'),
    },
    {
      key: '5',
      image: images.services4,
      title: t('homeScreen.scan'),
    },
    {
      key: '6',
      image: images.services6,
      title: t('homeScreen.more'),
    },
  ];

  const servicesClickHandler = (index: number) => {
    if (index === 0) {
      router.push('/(tabs)/account/account-detail');
    } else if (index === 1) {
      // router.push('/fundTransfer/fundTransferScreen');
    } else if (index === 2) {
      // router.push('/statement/statementScreen');
    } else if (index === 5) {
      router.push('/services');
    }
  };

  const renderItemServices = ({
    item,
    index,
  }: {
    item: ServiceItem;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={index === 3 || index === 4}
        onPress={() => servicesClickHandler(index)}
        className="mx-2.5 mb-5 flex-1 items-center justify-center rounded-[10px] bg-white p-[3px] py-5 shadow-md"
        style={{ elevation: 6 }}
      >
        <Image source={item.image} className="size-[30px]" />
        <Text
          numberOfLines={1}
          className={`mt-1.5 overflow-hidden font-nunito text-[15px] font-bold ${
            index === 5 ? 'text-grey' : 'text-primary'
          }`}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  interface TransactionItem {
    key: string;
    image: ImageSourcePropType;
    name: string;
    other: string;
    dollar: string;
    transaction: boolean;
  }

  const transactionList: TransactionItem[] = [
    {
      key: '1',
      image: images.services2,
      name: 'Jeklin shah',
      other: 'Money transfer',
      dollar: '-$140',
      transaction: false,
    },
    {
      key: '2',
      image: images.transaction1,
      name: 'Paypal',
      other: 'Deposits',
      dollar: '-$140',
      transaction: true,
    },
    {
      key: '3',
      image: images.transaction2,
      name: 'Amazon',
      other: 'Online payment',
      dollar: '-$140',
      transaction: false,
    },
  ];

  const ListFooterComponent = () => {
    return (
      <View>
        <View className="mx-5 mb-2.5 flex-row items-center justify-between">
          <Text className="mr-2.5 flex-1 text-left font-nunito text-lg font-bold text-black">
            {t('homeScreen.transaction')}
          </Text>
          <TouchableOpacity onPress={() => router.push('/latest-transaction')}>
            <Text className="text-grey max-w-[100px] font-nunito text-sm font-bold">
              {t('homeScreen.seeAll')}
            </Text>
          </TouchableOpacity>
        </View>
        {transactionList.map((item) => {
          return (
            <View
              key={item.key}
              className="mx-5 mb-5 flex-row items-center justify-between rounded-[10px] bg-white px-4 py-3 shadow-md"
              style={{ elevation: 6 }}
            >
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
                    className="font-nunito text-[15px] font-bold text-black"
                  >
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-grey mt-1 font-nunito text-xs font-bold"
                  >
                    {item.other}
                  </Text>
                </View>
              </View>

              <Text
                numberOfLines={1}
                className={`max-w-[100px] font-nunito text-[15px] font-bold ${
                  item.transaction ? 'text-green' : 'text-red'
                }`}
              >
                {item.dollar}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View className="flex-1">
      <MyStatusBar />
      <View className="bg-regularGrey flex-1">
        <Image
          source={images.homeImage} // Make sure this exists in images.ts
          style={{ width: width, height: 220 }}
          resizeMode="cover"
        />
        <View className="absolute w-full">
          <View className="flex-row items-center justify-center px-5 pt-3">
            <View className="flex-1 flex-row items-center">
              <Image source={images.splashIcon} className="size-[25px]" />
              <Text
                numberOfLines={1}
                className="mx-1 flex-1 text-left font-nunito text-xl font-bold text-white"
              >
                STAR BANK
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/notification')}>
              <Ionicons
                name="notifications-outline"
                size={25}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            pagingEnabled
            snapToAlignment="center"
            decelerationRate={'fast'}
            scrollEventThrottle={1}
            data={accountDetailList}
            keyExtractor={(item) => item.key}
            renderItem={renderItemAccountDetail}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 14} // fixPadding * 1.4 ~ 14
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>

        <FlatList
          numColumns={3}
          data={servicesList}
          keyExtractor={(item) => item.key}
          renderItem={renderItemServices}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ paddingHorizontal: 10 }}
          ListHeaderComponent={() => (
            <Text className="mx-5 mb-2.5 mt-4 text-left font-nunito text-lg font-bold text-black">
              {t('homeScreen.services')}
            </Text>
          )}
          ListFooterComponent={<ListFooterComponent />}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
