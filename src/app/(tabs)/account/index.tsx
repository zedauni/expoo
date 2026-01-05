import {
  AntDesign,
  Feather,
  Fontisto,
  MaterialCommunityIcons,
  Octicons,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LogoutModal from '@/components/logout-modal';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';
import { useAppLock } from '@/lib/app-lock';

const { width } = Dimensions.get('window');

const AccountScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const userName = useAppLock.use.userName();
  const userPhone = useAppLock.use.userPhone();

  interface MenuItemProps {
    onPress: () => void;
    icon: React.ReactNode;
    label: string;
  }

  const MenuItem = ({ onPress, icon, label }: MenuItemProps) => (
    <TouchableOpacity
      onPress={onPress}
      className="mx-5 mb-5 flex-row items-center"
    >
      <View className="bg-lightGrey size-9 items-center justify-center rounded-[18px]">
        {icon}
      </View>
      <Text
        numberOfLines={1}
        className="mx-4 flex-1 text-left font-nunito text-[15px] font-semibold text-black"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <ImageBackground
        source={images.depositImage}
        resizeMode="cover"
        className="h-20 items-center justify-center px-5"
        style={{ width }}
      >
        <Text className="font-nunito text-xl font-extrabold text-white">
          {t('accountScreen.account')}
        </Text>
      </ImageBackground>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View
          className="bg-extraLightGrey mb-5 flex-row items-center px-5 py-3 shadow-md"
          style={{ elevation: 6 }}
        >
          <Image
            source={images.profile}
            className="size-[60px] rounded-[30px]"
          />

          <View className="flex-1 items-start px-2.5">
            <Text
              numberOfLines={1}
              className="font-nunito text-base font-bold text-black"
            >
              {userName || ''}
            </Text>
            <Text
              numberOfLines={1}
              className="text-grey mt-0.5 font-nunito text-sm font-semibold"
            >
              {userPhone || ''}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/edit-profile')}>
            <Feather name="edit" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <MenuItem
          onPress={() => router.push('/nearby?title=Nearby Bank')}
          icon={
            <MaterialCommunityIcons
              name="bank-outline"
              size={20}
              color={colors.primary}
            />
          }
          label={t('accountScreen.nearbyBank')}
        />

        <MenuItem
          onPress={() => router.push('/nearby?title=Nearby ATMs')}
          icon={
            <Octicons name="credit-card" size={18} color={colors.primary} />
          }
          label={t('accountScreen.nearbyATMs')}
        />

        <MenuItem
          onPress={() => router.push('/change-pin')}
          icon={<Octicons name="pin" size={18} color={colors.primary} />}
          label={t('accountScreen.changePin')}
        />

        <MenuItem
          onPress={() => router.push('/language')}
          icon={<Fontisto name="world-o" size={18} color={colors.primary} />}
          label={t('accountScreen.language')}
        />

        <MenuItem
          onPress={() => router.push('/privacy-policy')}
          icon={
            <MaterialCommunityIcons
              name="shield-alert-outline"
              size={20}
              color={colors.primary}
            />
          }
          label={t('accountScreen.PrivacyPolicy')}
        />

        <MenuItem
          onPress={() => router.push('/terms-condition')}
          icon={<AntDesign name="profile" size={18} color={colors.primary} />}
          label={t('accountScreen.termsCondition')}
        />

        <MenuItem
          onPress={() => router.push('/customer-support')}
          icon={
            <AntDesign
              name="customer-service"
              size={18}
              color={colors.primary}
            />
          }
          label={t('accountScreen.customerSupport')}
        />

        <MenuItem
          onPress={() => setLogoutModalVisible(true)}
          icon={<Feather name="log-out" size={18} color={colors.primary} />}
          label={t('accountScreen.logout')}
        />

        <LogoutModal
          visible={logoutModalVisible}
          logoutModalClose={() => setLogoutModalVisible(false)}
          yesClickHandler={() => {
            router.push('/auth/login');
            setLogoutModalVisible(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AccountScreen;
