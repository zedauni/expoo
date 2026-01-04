import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';

const NotificationScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const isRtl = i18n.dir() === 'rtl';

  const notificationList = [
    {
      key: '1',
      title: 'Loan application approved!',
      description: 'Your car loan application has been successfully approved',
      status: 'Aug 20,2022 at 09:36 AM',
      color: colors.lightGreen,
      iconName: 'check',
    },
    {
      key: '2',
      title: 'Loan EMI period expires!',
      description: 'Your car loan application has been successfully approved',
      status: 'Aug 20,2022 at 09:36 AM',
      color: colors.yellow,
      iconName: 'alert-outline',
    },
    {
      key: '3',
      title: 'Loan application was rejected!',
      description: 'Your car loan application has been successfully approved',
      status: 'Aug 20,2022 at 09:36 AM',
      color: colors.pink,
      iconName: 'close',
    },
    {
      key: '4',
      title: 'Loan application approved!',
      description: 'Your car loan application has been successfully approved',
      status: 'Aug 20,2022 at 09:36 AM',
      color: colors.lightGreen,
      iconName: 'check',
    },
  ];

  const rowTranslateAnimatedValues: { [key: string]: Animated.Value } = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  interface NotificationItem {
    key: string;
    title: string;
    description: string;
    status: string;
    color: string;
    iconName: string;
  }

  const [notification, setNotification] = useState<NotificationItem[]>(
    notificationList.map((NotificationItem, i) => ({
      key: `${i}`,
      title: NotificationItem.title,
      description: NotificationItem.description,
      status: NotificationItem.status,
      color: NotificationItem.color,
      iconName: NotificationItem.iconName,
    }))
  );

  const onSwipeValueChange = (swipeData: { key: string; value: number }) => {
    const { key, value } = swipeData;
    if (
      value < -Dimensions.get('window').width ||
      value > Dimensions.get('window').width
    ) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...notification];
        const prevIndex = notification.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setNotification(newData);
        showMessage({
          message: t('notificationScreen.remove'),
          type: 'default',
          backgroundColor: colors.black,
          color: colors.white,
        });
      });
    }
  };

  const renderItem = (data: { item: NotificationItem }) => {
    // Note: SwipeListView renderItem passes { item, index, separators }
    // The original code typed data as { item: NotificationItem } which is mostly correct structure wise.
    // However, SwipeListView usually wraps data.

    return (
      <View className="bg-regularGrey">
        <View
          className="mx-5 mb-5 rounded-[10px] bg-white p-4 shadow-md"
          style={{ elevation: 6 }}
        >
          <View className="flex-row items-center">
            <View
              className="size-[22px] items-center justify-center rounded-full"
              style={{ backgroundColor: data.item.color }}
            >
              <MaterialCommunityIcons
                name={data.item.iconName as any}
                size={15}
                color={colors.white}
              />
            </View>
            <Text
              numberOfLines={1}
              className="mx-2.5 flex-1 overflow-hidden text-left font-nunito text-base font-bold text-black"
            >
              {data.item.title}
            </Text>
          </View>

          <Text
            numberOfLines={2}
            className="overflow-hidden py-2.5 text-left font-nunito text-[15px] font-normal text-black"
          >
            {data.item.description}
          </Text>

          <View className="border-lightGrey border-t-[0.5px]" />

          <Text
            numberOfLines={1}
            className="text-grey overflow-hidden pt-2.5 text-left font-nunito text-xs font-semibold"
          >
            {data.item.status}
          </Text>
        </View>
      </View>
    );
  };

  const renderHiddenItem = () => <View className="bg-primary mb-5 flex-1" />;

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <View
        className="bg-regularGrey flex-row items-center px-5 py-3 shadow-md"
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
          {t('notificationScreen.notification')}
        </Text>
      </View>

      {notification.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Ionicons
            name="notifications-off-outline"
            size={48}
            color={colors.grey}
          />
          <Text className="text-grey mt-2.5 font-nunito text-base font-bold">
            {t('notificationScreen.noNotification')}
          </Text>
        </View>
      ) : (
        <SwipeListView
          data={notification}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          onSwipeValueChange={onSwipeValueChange}
          rightOpenValue={-Dimensions.get('window').width}
          leftOpenValue={Dimensions.get('window').width}
          useNativeDriver={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: insets.bottom + 20,
          }}
        />
      )}
    </View>
  );
};

export default NotificationScreen;
