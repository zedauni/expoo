import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Image,
  type ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width } = Dimensions.get('window');

const ServicesScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  interface ServiceItem {
    key: string;
    image: ImageSourcePropType;
    title: string;
  }

  const servicesList: ServiceItem[] = [
    {
      key: '1',
      image: images.services1,
      title: t('servicesScreen.account'),
    },
    {
      key: '2',
      image: images.services2,
      title: t('servicesScreen.fundTransfer'),
    },
    {
      key: '3',
      image: images.services3,
      title: t('servicesScreen.statement'),
    },
    {
      key: '4',
      image: images.primaryDeposit,
      title: t('servicesScreen.deposit'),
    },
    {
      key: '5',
      image: images.primaryLoans,
      title: t('servicesScreen.loans'),
    },
    {
      key: '6',
      image: images.services7,
      title: t('servicesScreen.cards'),
    },
    {
      key: '7',
      image: images.services5,
      title: t('servicesScreen.billPay'),
    },
    {
      key: '8',
      image: images.services4,
      title: t('servicesScreen.scan'),
    },
    {
      key: '9',
      image: images.services8,
      title: t('servicesScreen.mutualFund'),
    },
    {
      key: '10',
      image: images.services11,
      title: t('servicesScreen.insurance'),
    },
    {
      key: '11',
      image: images.services9,
      title: t('servicesScreen.shopOffer'),
    },
    {
      key: '12',
      image: images.services10,
      title: t('servicesScreen.recharge'),
    },
  ];

  const servicesClickHandler = (index: number) => {
    if (index === 0) {
      router.push('/(tabs)/account/account-detail');
    } else if (index === 1) {
      // router.push('/fundTransfer/fundTransferScreen');
    } else if (index === 2) {
      // router.push('/statement/statementScreen');
    } else if (index === 3) {
      // router.push('(tabs)/deposit'); // Assuming separate tab or screen, check navigation structure
      // Original: navigation.navigate("(tabs)", { screen: "deposit/depositScreen" });
      router.push('/(tabs)/deposit');
    } else if (index === 4) {
      router.push('/(tabs)/loans');
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
        disabled={index > 4}
        onPress={() => servicesClickHandler(index)}
        className="mx-2.5 mb-5 flex-1 items-center justify-center rounded-[10px] bg-white px-2 py-5 shadow-md"
        style={{
          maxWidth: width / 3 - 25,
          elevation: 6,
        }}
      >
        <Image
          resizeMode="contain"
          source={item.image}
          className="size-[30px]"
        />
        <Text
          numberOfLines={1}
          className="mt-1.5 overflow-hidden font-nunito text-[15px] font-bold text-primary"
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-regularGrey">
      <MyStatusBar />
      <View
        className="flex-row items-center bg-regularGrey px-5 py-3 shadow-md"
        style={{ elevation: 6 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name={isRtl ? 'arrow-forward' : 'arrow-back'}
            size={23}
            color={colors.black}
          />
        </TouchableOpacity>
        <Text className="mx-4 font-nunito text-xl font-bold text-black">
          {t('servicesScreen.services')}
        </Text>
      </View>

      <FlatList
        numColumns={3}
        data={servicesList}
        renderItem={renderItemServices}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 10,
        }}
      />
    </View>
  );
};

export default ServicesScreen;
