import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';
import { useAppLock } from '@/lib/app-lock';
import { signOut } from '@/lib/auth';

const { width, height } = Dimensions.get('window');

export const LockScreen = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const pin = useAppLock.use.pin();
  const setLocked = useAppLock.use.setLocked();
  const isLocked = useAppLock.use.isLocked();

  const [error, setError] = useState(false);

  const handleVerify = (enteredPin: string) => {
    if (enteredPin === pin) {
      setLocked(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleForgotPin = () => {
    // For security, if they forgot the PIN, we sign them out to re-authenticate
    setLocked(false);
    signOut();
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
    <Modal visible={isLocked} animationType="fade" transparent={false}>
      <View className="flex-1">
        <MyStatusBar />
        <View className="flex-1 bg-white">
          <ScreenBackground />
          <View>
            <View className="h-14" />
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
                    <Text className="max-w-[80%] text-center font-inter text-base font-semibold text-black">
                      {t('pinScreen.enterDigit')}
                    </Text>
                  </View>

                  <View className="mx-12 my-14">
                    <OtpInput
                      numberOfDigits={4}
                      onTextChange={(otp) => {
                        if (otp.length === 4) handleVerify(otp);
                      }}
                      secureTextEntry={true}
                      theme={{
                        pinCodeContainerStyle: {
                          borderWidth: 1,
                          borderColor: error ? colors.red : colors.lightGrey,
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
                          color: error ? colors.red : colors.primary,
                        },
                        focusedPinCodeContainerStyle: {
                          borderColor: colors.primary,
                          borderWidth: 1.5,
                        },
                        focusStickStyle: { backgroundColor: colors.primary },
                      }}
                    />
                    {error && (
                      <Text className="text-red mt-2 text-center text-sm font-semibold">
                        Incorrect PIN
                      </Text>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={handleForgotPin}
                    className="mx-5 mb-10 items-center justify-center"
                  >
                    <Text className="text-primary font-inter text-base font-bold">
                      Forgot PIN?
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </View>
    </Modal>
  );
};
