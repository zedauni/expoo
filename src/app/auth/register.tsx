import { Feather, Ionicons } from '@expo/vector-icons';
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
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/loader';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';
import { useAppLock } from '@/lib/app-lock';

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const setUserProfile = useAppLock.use.setUserProfile();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');

  const [registerLoaderVisible, setRegisterLoaderVisible] = useState(false);

  const handleRegister = () => {
    setUserProfile({ name, email, phone: number });
    setRegisterLoaderVisible(true);
    setTimeout(() => {
      setRegisterLoaderVisible(false);
      router.push('/auth/otp');
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
            {t('registerScreen.register')}
          </Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
            className="z-10 mx-5 mb-2.5 mt-8 rounded-[50px] bg-white shadow-md"
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

                <View
                  className="m-5 flex-row items-center rounded-[10px] bg-white px-4 py-3 shadow-md"
                  style={{ elevation: 6 }}
                >
                  <Feather name="user" color={colors.grey} size={18} />
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder={t('registerScreen.name')}
                    placeholderTextColor={colors.grey}
                    selectionColor={colors.primary}
                    numberOfLines={1}
                    className="mx-3 flex-1 p-0 font-inter text-base font-semibold text-black"
                    style={{ textAlign: 'left' }}
                  />
                </View>

                <View
                  className="mx-5 mb-5 flex-row items-center rounded-[10px] bg-white px-4 py-3 shadow-md"
                  style={{ elevation: 6 }}
                >
                  <Feather name="phone" color={colors.grey} size={18} />
                  <TextInput
                    value={number}
                    onChangeText={setNumber}
                    keyboardType="number-pad"
                    placeholder={t('registerScreen.number')}
                    placeholderTextColor={colors.grey}
                    selectionColor={colors.primary}
                    numberOfLines={1}
                    className="mx-3 flex-1 p-0 font-inter text-base font-semibold text-black"
                    style={{ textAlign: 'left' }}
                  />
                </View>

                <View
                  className="mx-5 mb-5 flex-row items-center rounded-[10px] bg-white px-4 py-3 shadow-md"
                  style={{ elevation: 6 }}
                >
                  <Feather name="mail" color={colors.grey} size={18} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder={t('registerScreen.email')}
                    placeholderTextColor={colors.grey}
                    selectionColor={colors.primary}
                    numberOfLines={1}
                    className="mx-3 flex-1 p-0 font-inter text-base font-semibold text-black"
                    style={{ textAlign: 'left' }}
                  />
                </View>

                <Loader visible={registerLoaderVisible} />

                <TouchableOpacity
                  onPress={handleRegister}
                  className="mx-5 my-[30px] items-center justify-center rounded-[10px] p-3 shadow-md"
                  style={{
                    backgroundColor: colors.primary,
                    elevation: 4,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                  }}
                >
                  <Text className="font-inter text-lg font-bold text-white">
                    {t('registerScreen.register')}
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

export default RegisterScreen;
