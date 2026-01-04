import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import IntlPhoneInput from 'react-native-intl-phone-input';

import Loader from '@/components/loader';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [exitApp, setExitApp] = useState(0);
  const [loginLoaderVisible, setLoginLoaderVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === 'android') {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            showMessage({
              message: t('loginScreen.tapBack'),
              type: 'info',
              backgroundColor: colors.darkGrey,
            });
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      return () => {
        subscription.remove();
      };
    }, [exitApp, t])
  );

  const handleLoginBtn = () => {
    setLoginLoaderVisible(true);
    setTimeout(() => {
      setLoginLoaderVisible(false);
      router.replace('/(tabs)/home');
    }, 800);
  };

  const ScreenBackground = () => {
    return (
      <View className="absolute inset-0">
        <View className="flex-1 items-center justify-between">
          <ImageBackground
            source={images.bg}
            style={{ width, height: height * 0.3 }}
          />
          <View className="mb-5 items-center justify-center">
            <Image
              source={images.splashIcon}
              className="size-[78px]"
              style={{ tintColor: colors.primary }}
            />
            <Text className="text-primary font-inter text-[25px] font-semibold">
              STAR BANK
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <MyStatusBar />
      <View className="flex-1 bg-white">
        <ScreenBackground />

        <Text className="mt-[60px] text-center font-inter text-[25px] font-bold text-white">
          {t('loginScreen.login')}
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
          className="z-10 mx-5 mb-5 mt-8 rounded-[50px] bg-white shadow-md"
          style={{ maxHeight: height / 1.8, elevation: 6 }}
        >
          <View className="overflow-hidden rounded-[50px]">
            <ScrollView
              showsVerticalScrollIndicator={false}
              automaticallyAdjustKeyboardInsets={true}
            >
              <Image
                source={images.image}
                className="my-[30px] size-[140px] self-center"
              />
              <View className="items-center justify-center">
                <Text className="font-inter text-lg font-bold text-black">
                  {t('loginScreen.welcomeBack')}
                </Text>
                <Text className="text-grey font-inter text-sm font-semibold">
                  {t('loginScreen.happy')}
                </Text>
              </View>

              <IntlPhoneInput
                defaultCountry="IN"
                closeText={t('loginScreen.close')}
                filterText={t('loginScreen.search')}
                placeholder={t('loginScreen.mobileNumber')}
                placeholderTextColor={colors.grey}
                flagStyle={{
                  height: 0,
                  width: 0,
                }}
                inputProps={{
                  selectionColor: colors.primary,
                }}
                modalCountryItemCountryNameStyle={{
                  fontFamily: 'NunitoSans_SemiBold', // Use raw family name if possible, or omit
                  fontSize: 16,
                  color: colors.black,
                }}
                closeButtonStyle={{
                  fontFamily: 'NunitoSans_SemiBold',
                  fontSize: 16,
                  color: colors.black,
                  backgroundColor: colors.primary,
                }}
                dialCodeTextStyle={{
                  fontFamily: 'NunitoSans_SemiBold',
                  fontSize: 16,
                  color: colors.black,
                  paddingRight: 12,
                }}
                containerStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  marginHorizontal: 20,
                  marginVertical: 40,
                  borderRadius: 10,
                  backgroundColor: colors.white,
                  elevation: 6,
                  shadowColor: colors.black,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                }}
                phoneInputStyle={{
                  padding: 0,
                  fontFamily: 'NunitoSans_SemiBold',
                  fontSize: 16,
                  color: colors.black,
                  textAlign: 'left',
                  paddingHorizontal: 12,
                  borderLeftWidth: 2,
                  borderLeftColor: colors.lightGrey,
                }}
              />

              <Loader visible={loginLoaderVisible} />

              <TouchableOpacity
                onPress={handleLoginBtn}
                className="mx-5 mb-[30px] mt-[10px] items-center justify-center rounded-[10px] p-3 shadow-md"
                style={{
                  backgroundColor: colors.primary,
                  elevation: 4,
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                }}
              >
                <Text className="font-inter text-lg font-bold text-white">
                  {t('loginScreen.login')}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default LoginScreen;
