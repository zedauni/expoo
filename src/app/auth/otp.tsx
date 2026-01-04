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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/loader';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [verifyLoaderVisible, setVerifyLoaderVisible] = useState(false);

  const handleVerify = () => {
    setVerifyLoaderVisible(true);
    setTimeout(() => {
      setVerifyLoaderVisible(false);
      router.push('/auth/pin');
    }, 800);
  };

  const handleTextChange = (otp: string) => {
    if (otp.length === 4) {
      handleVerify();
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
          <View
            className="mb-5 items-center justify-center"
            style={{ marginBottom: insets.bottom + 20 }}
          >
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
        <View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="self-start px-5 py-3"
          >
            <Ionicons name="arrow-back" size={25} color={colors.white} />
          </TouchableOpacity>

          <Text className="mt-2 text-center font-inter text-[25px] font-bold text-white">
            {t('otpScreen.verification')}
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
                <Image
                  source={images.image}
                  className="mt-2.5 size-[140px] self-center"
                />

                <Text className="text-grey mx-8 text-center font-inter text-sm font-semibold">
                  {t('otpScreen.pleaseEnter')}
                </Text>

                <View className="mx-12 my-14">
                  <OtpInput
                    numberOfDigits={4}
                    onTextChange={handleTextChange}
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
                        fontFamily: 'NunitoSans_SemiBold', // mapped to SemiBold22primary in old styles
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

                <Loader visible={verifyLoaderVisible} />

                <TouchableOpacity
                  onPress={handleVerify}
                  className="mx-5 mb-2.5 items-center justify-center rounded-[10px] p-3 shadow-md"
                  style={{
                    backgroundColor: colors.primary,
                    elevation: 4,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                  }}
                >
                  <Text className="font-inter text-lg font-bold text-white">
                    {t('otpScreen.verify')}
                  </Text>
                </TouchableOpacity>

                <Text className="text-grey mb-5 text-center font-inter text-base font-bold">
                  {t('otpScreen.resend')}
                </Text>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;
