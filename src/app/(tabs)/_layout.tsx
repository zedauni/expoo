import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable } from 'react-native';

import colors from '@/components/ui/colors';
import images from '@/constants/images';

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="home/index"
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          height: 68,
          borderTopWidth: 0,
          backgroundColor: colors.white,
          paddingTop: 4,
          elevation: 6,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
        },
        tabBarLabelStyle: {
          fontFamily: 'NunitoSans_Bold', // mapped from 'Bold'
          fontSize: 15,
        },
        tabBarButton: (props) =>
          (
            // @ts-ignore
            <Pressable
              {...props}
              android_ripple={{
                color: colors.white,
              }}
            />
          ) as any,
        tabBarInactiveTintColor: colors.grey,
        tabBarActiveTintColor: colors.primary,
      })}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          headerShown: false,
          title: t('bottomTab.home'),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'home-outline'}
              size={20}
              color={focused ? colors.primary : colors.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="deposit/index"
        options={{
          headerShown: false,
          title: t('bottomTab.deposit'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? images.primaryDeposit : images.greyDeposit}
              resizeMode="contain"
              style={{
                height: 24,
                width: 24,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="loans/index"
        options={{
          headerShown: false,
          title: t('bottomTab.loans'),
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? images.primaryLoans : images.greyLoans}
              resizeMode="contain"
              style={{ height: 24, width: 24 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          headerShown: false,
          title: t('bottomTab.account'),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={'person-outline'}
              size={20}
              color={focused ? colors.primary : colors.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account/account-detail"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
