import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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
import { OtpInput } from 'react-native-otp-entry';

import Loader from '@/components/loader';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width, height } = Dimensions.get('window');

const PinScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [continueLoaderVisible, setContinueLoaderVisible] = useState(false);

  const handleContinue = () => {
    setContinueLoaderVisible(true);
    setTimeout(() => {
      setContinueLoaderVisible(false);
      router.push('/(tabs)');
    }, 1500);
  };

  const handleTextChange = (otp: string) => {
    if (otp.length === 4) {
      handleContinue();
    }
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
            <Text className="font-inter text-[25px] font-semibold text-primary">
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
        <View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="self-start px-5 py-3"
          >
            <Ionicons name="arrow-back" size={25} color={colors.white} />
          </TouchableOpacity>

          <Text className="mt-2 text-center font-inter text-[25px] font-bold text-white">
            {t('pinScreen.enterPin')}
          </Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
            className="z-10 mx-5 mb-2.5 mt-10 rounded-[50px] bg-white shadow-md"
            style={{ maxHeight: height / 1.8, elevation: 6 }}
          >
            <View className="overflow-hidden rounded-[50px]">
              <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
              >
                <View className="mt-9 items-center justify-center">
                  <Text className="mb-1.5 font-inter text-[22px] font-bold text-black">
                    {t('pinScreen.welcome')}
                  </Text>
                  <Text className="max-w-[50%] text-center font-inter text-base font-semibold text-black">
                    {t('pinScreen.enterDigit')}
                  </Text>
                </View>

                <View className="mx-12 my-14">
                  <OtpInput
                    numberOfDigits={4}
                    onTextChange={handleTextChange}
                    secureTextEntry={true}
                    theme={{
                      pinCodeContainerStyle: {
                        borderWidth: 0,
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        backgroundColor: colors.white,
                        elevation: 6,
                        shadowColor: colors.black,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                      },
                      pinCodeTextStyle: {
                        fontFamily: 'NunitoSans_SemiBold',
                        fontSize: 22,
                        color: colors.primary,
                      },
                      focusedPinCodeContainerStyle: {
                        borderWidth: 0,
                        borderRadius: 10,
                      },
                      focusStickStyle: { backgroundColor: colors.primary },
                    }}
                  />
                </View>

                <Loader visible={continueLoaderVisible} />

                <TouchableOpacity
                  onPress={handleContinue}
                  className="mx-5 mb-5 items-center justify-center rounded-[10px] p-3 shadow-md"
                  style={{
                    backgroundColor: colors.primary,
                    elevation: 4,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                  }}
                >
                  <Text className="font-inter text-lg font-bold text-white">
                    {t('pinScreen.continue')}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default PinScreen;
