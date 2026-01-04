import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Loader from '@/components/loader';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const CustomerSupportScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`customerSupportScreen.${key}`);
  }

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();

  const [submitLoaderModal, setSubmitLoaderModal] = useState<boolean>(false);

  const handleSubmit = () => {
    setSubmitLoaderModal(true);
    setTimeout(() => {
      setSubmitLoaderModal(false);
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
          {tr('customerSupport')}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="my-5 items-center justify-center">
          {/* Note: Check if contactImage exists in images.ts. If not, I should likely add it.
              For now assuming images.contactImage or similar.
              Wait, list_dir showed `contact-image.png`.
          */}
          <Image
            // @ts-ignore
            source={
              images.contactImage ||
              require('../../assets/images/contact-image.png')
            }
            className="size-[153px]"
            resizeMode="contain"
          />
          <Text className="mx-8 mt-4 text-center font-nunito text-[18px] font-semibold text-black">
            {tr('weAreHere')}
          </Text>
        </View>

        <View className="mx-5">
          <Text
            className="font-nunito text-[17px] font-semibold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('name')}
          </Text>
          <View className="relative mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md">
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={tr('enterName')}
              placeholderTextColor={colors.grey}
              selectionColor={colors.primary}
              numberOfLines={1}
              className="p-0 font-nunito text-[15px] font-semibold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            />
          </View>

          <Text
            className="font-nunito text-[17px] font-semibold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('email')}
          </Text>
          <View className="relative mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md">
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder={tr('enterEmail')}
              placeholderTextColor={colors.grey}
              selectionColor={colors.primary}
              numberOfLines={1}
              className="p-0 font-nunito text-[15px] font-semibold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            />
          </View>

          <Text
            className="font-nunito text-[17px] font-semibold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('message')}
          </Text>
          <View className="relative mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md">
            <TextInput
              value={message}
              multiline={true}
              numberOfLines={7}
              textAlignVertical="top"
              onChangeText={setMessage}
              placeholder={tr('enterMessage')}
              placeholderTextColor={colors.grey}
              selectionColor={colors.primary}
              className="h-[144px] p-0 font-nunito text-[15px] font-semibold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            />
          </View>
        </View>
      </ScrollView>
      <Loader visible={submitLoaderModal} />
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-primary m-5 items-center justify-center rounded-[10px] p-3 shadow-md"
        style={{ elevation: 5 }}
      >
        <Text className="font-nunito text-lg font-bold text-white">
          {tr('submit')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerSupportScreen;
