import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DashedLine from 'react-native-dashed-line';

import EducationLoanModal from '@/components/education-loan-modal';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width } = Dimensions.get('window');

const EducationLoanScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`educationLoanScreen.${key}`);
  }

  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [message, setMessage] = useState<string>();

  const [educationLoanModal, setEducationLoanModal] = useState<boolean>(false);

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <View
        className="bg-regularGrey flex-row items-center px-5 py-3 shadow-md"
        style={{
          zIndex: 1,
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
          {tr('educationLoan')}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Image
          // @ts-ignore
          source={
            images.educationImage ||
            require('../../assets/images/education-image.png')
          }
          style={{ width: width, height: 190 }}
          resizeMode="stretch"
        />
        <View
          className="absolute m-5"
          style={{ maxWidth: isRtl ? undefined : '60%' }}
        >
          <Text className="text-primary font-nunito text-lg font-bold">
            {tr('makeEducation')}
          </Text>
        </View>

        <Text
          className="text-grey mx-5 mb-6 mt-5 font-nunito text-sm font-semibold"
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        >
          {tr('description')}
        </Text>

        <DashedLine
          dashGap={2}
          dashLength={2}
          dashThickness={1.5}
          dashColor={colors.grey}
        />

        <View className="mx-5 mt-6">
          <Text
            className="font-nunito text-[17px] font-bold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('phoneNumber')}
          </Text>

          <View className="mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md">
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="number-pad"
              placeholder={tr('enterNumber')}
              placeholderTextColor={colors.grey}
              selectionColor={colors.primary}
              numberOfLines={1}
              className="flex-1 p-0 font-nunito text-[15px] font-semibold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            />
          </View>
        </View>

        <View className="mx-5">
          <Text
            className="font-nunito text-[17px] font-bold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('message')}
          </Text>
          <View className="mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md">
            <TextInput
              value={message}
              multiline={true}
              numberOfLines={7}
              onChangeText={setMessage}
              textAlignVertical="top"
              placeholder={tr('writeMessage')}
              placeholderTextColor={colors.grey}
              selectionColor={colors.primary}
              className="h-[113px] p-0 font-nunito text-[15px] font-semibold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setEducationLoanModal(true)}
        className="bg-primary m-5 items-center justify-center rounded-[10px] p-3 shadow-md"
        style={{ elevation: 5 }}
      >
        <Text
          numberOfLines={1}
          className="overflow-hidden font-nunito text-lg font-bold text-white"
        >
          {tr('interested')}
        </Text>
      </TouchableOpacity>

      <EducationLoanModal
        visible={educationLoanModal}
        educationLoanModalClose={() => setEducationLoanModal(false)}
        okayClickHandle={() => {
          setEducationLoanModal(false);
          router.back();
        }}
      />
    </View>
  );
};

export default EducationLoanScreen;
