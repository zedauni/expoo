import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
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

const ChangePinScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const insets = useSafeAreaInsets();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`changePinScreen.${key}`);
  }

  const [currentPin, setCurrentPin] = useState<string>();
  const [newPin, setNewPin] = useState<string>();
  const [confirmPin, setConfirmPin] = useState<string>();

  const [resetLoaderModal, setResetLoaderModal] = useState<boolean>(false);

  const handleReset = () => {
    setResetLoaderModal(true);
    setTimeout(() => {
      setResetLoaderModal(false);
      router.back();
    }, 800);
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
          {tr('changePin')}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View className="m-5">
          <Text
            className="font-nunito text-[17px] font-bold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('currentPin')}
          </Text>

          <View
            className="mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md"
            style={{ elevation: 3 }}
          >
            <TextInput
              value={currentPin}
              onChangeText={setCurrentPin}
              keyboardType="number-pad"
              placeholder={tr('enterCurrentPin')}
              placeholderTextColor={colors.grey}
              selectionColor={colors.primary}
              numberOfLines={1}
              className="p-0 font-nunito text-[15px] font-semibold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            />
          </View>

          <Text
            className="font-nunito text-[17px] font-bold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('newPin')}
          </Text>

          <View
            className="mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md"
            style={{ elevation: 3 }}
          >
            <TextInput
              value={newPin}
              onChangeText={setNewPin}
              keyboardType="number-pad"
              placeholder={tr('enterNewPin')}
              placeholderTextColor={colors.grey}
              selectionColor={colors.primary}
              numberOfLines={1}
              className="p-0 font-nunito text-[15px] font-semibold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            />
          </View>

          <Text
            className="font-nunito text-[17px] font-bold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('confirmPin')}
          </Text>

          <View
            className="mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md"
            style={{ elevation: 3 }}
          >
            <TextInput
              value={confirmPin}
              onChangeText={setConfirmPin}
              keyboardType="number-pad"
              placeholder={tr('confirmNewPin')}
              placeholderTextColor={colors.grey}
              selectionColor={colors.primary}
              numberOfLines={1}
              className="p-0 font-nunito text-[15px] font-semibold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            />
          </View>
        </View>
        <Loader visible={resetLoaderModal} />
        <TouchableOpacity
          onPress={handleReset}
          className="bg-primary m-5 items-center justify-center rounded-[10px] p-3 shadow-md"
          style={{ elevation: 5 }}
        >
          <Text className="font-nunito text-lg font-bold text-white">
            {tr('reset')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChangePinScreen;
