import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from '@/components/loader';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import { useSelectedLanguage } from '@/lib/i18n/utils';

const LanguageScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useSelectedLanguage();
  const isRtl = i18n.dir() === 'rtl';

  // Local state to track selection before applying
  const [selectedLanguage, setSelectedLanguage] = useState(
    language || i18n.resolvedLanguage
  );
  const insets = useSafeAreaInsets();
  const [updateLoader, setUpdateLoader] = useState(false);

  function tr(key: string) {
    return t(`languageScreen.${key}`);
  }

  const handleUpdate = () => {
    setUpdateLoader(true);
    setTimeout(() => {
      setUpdateLoader(false);
      setLanguage(selectedLanguage as 'fr' | 'en');
      // The utils changeLanguage handles reload/restart if needed,
      // but if not, we might want to pop back.
      // However, usually language change triggers a reload, so we might not reach here.
      // If no reload, we go back.
      // router.back();
    }, 1500);
  };

  const onDisableHandler = language === selectedLanguage;

  function LanguageOpt({ name, lang }: { name: string; lang: 'fr' | 'en' }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelectedLanguage(lang)}
        className="mx-5 mb-5 flex-row items-center justify-between rounded-[10px] bg-white px-5 py-3 shadow-md"
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          elevation: 6,
        }}
      >
        <Text
          numberOfLines={1}
          className="flex-1 font-nunito text-base font-semibold text-black"
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        >
          {name}
        </Text>
        <MaterialCommunityIcons
          name={selectedLanguage === lang ? 'record-circle' : 'circle-outline'}
          size={28}
          color={selectedLanguage === lang ? colors.primary : colors.lightGrey}
        />
      </TouchableOpacity>
    );
  }

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
          {tr('language')}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View className="mt-5">
          <LanguageOpt name="Français" lang="fr" />
          <LanguageOpt name="English" lang="en" />
        </View>
      </ScrollView>

      <Loader visible={updateLoader} />

      <TouchableOpacity
        onPress={() => {
          if (!onDisableHandler) {
            handleUpdate();
          }
        }}
        className="bg-primary m-5 items-center justify-center rounded-[10px] p-3 shadow-md"
        style={{ elevation: 5, marginBottom: insets.bottom + 20 }}
      >
        <Text className="font-nunito text-lg font-bold text-white">
          {tr('update')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageScreen;
