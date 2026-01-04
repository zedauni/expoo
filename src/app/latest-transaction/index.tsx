import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  type ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const LatestTransactionScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`latestTransactionScreen.${key}`);
  }

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
      image: images.services10,
      name: '+91 987654321',
      other: 'Mobile payment',
      dollar: '-$150',
      transaction: false,
    },
    {
      key: '4',
      image: images.transaction3,
      name: 'Atm',
      other: 'Cash withdrawal',
      dollar: '-$140',
      transaction: false,
    },
    {
      key: '5',
      image: images.services2,
      name: 'Jane Cooper',
      other: 'Money transfer',
      dollar: '+$640',
      transaction: true,
    },
    {
      key: '6',
      image: images.services5,
      name: 'Electricity',
      other: 'bill payment',
      dollar: '-$540',
      transaction: false,
    },
    {
      key: '7',
      image: images.transaction1,
      name: 'Paypal',
      other: 'Deposits',
      dollar: '-$140',
      transaction: true,
    },
    {
      key: '8',
      image: images.transaction4,
      name: 'eBay',
      other: 'Online payment',
      dollar: '-$190',
      transaction: false,
    },
    {
      key: '9',
      image: images.transaction2,
      name: 'Amazon',
      other: 'Online payment',
      dollar: '-$440',
      transaction: false,
    },
    {
      key: '10',
      image: images.transaction3,
      name: 'Atm',
      other: 'Cash withdrawal',
      dollar: '-$140',
      transaction: false,
    },
    {
      key: '11',
      image: images.services10,
      name: '+91 987654321',
      other: 'Mobile payment',
      dollar: '-$100',
      transaction: false,
    },
  ];

  const renderItem = ({ item }: { item: TransactionItem }) => {
    return (
      <View
        className="mx-5 mb-5 flex-row items-center justify-between rounded-[10px] bg-white px-4 py-3 shadow-md"
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          elevation: 6,
        }}
      >
        <View
          className="flex-1 flex-row items-center"
          style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
        >
          <View className="bg-extraLightGrey size-[38px] items-center justify-center rounded-full">
            <Image
              resizeMode="contain"
              source={item.image}
              className="size-[22px]"
            />
          </View>
          <View
            className="flex-1 px-4"
            style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
          >
            <Text
              numberOfLines={1}
              className="overflow-hidden font-nunito text-[15px] font-bold text-black"
            >
              {item.name}
            </Text>
            <Text
              numberOfLines={1}
              className="text-grey mt-[3px] overflow-hidden font-nunito text-xs font-bold"
            >
              {item.other}
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          className={`max-w-[100px] overflow-hidden font-nunito text-[15px] font-bold ${
            item.transaction ? 'text-green' : 'text-red'
          }`}
        >
          {item.dollar}
        </Text>
      </View>
    );
  };

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
          {tr('transaction')}
        </Text>
      </View>

      <FlatList
        data={transactionList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: insets.bottom + 20,
        }}
      />
    </View>
  );
};

export default LatestTransactionScreen;
