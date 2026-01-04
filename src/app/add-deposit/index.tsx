import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  FlatList,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyStatusBar from '@/components/my-status-bar';
import SuccessDepositModal from '@/components/success-deposit-modal';
import colors from '@/components/ui/colors';

const { width } = Dimensions.get('window');

const AddDepositScreen = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`addDepositScreen.${key}`);
  }

  interface DepositPeriodItem {
    key: string;
    title: string;
  }

  const depositPeriodList: DepositPeriodItem[] = [
    {
      key: '1',
      title: '1 month',
    },
    {
      key: '2',
      title: '3 month',
    },
    {
      key: '3',
      title: '6 month',
    },
    {
      key: '4',
      title: '12 month',
    },
    {
      key: '5',
      title: '18 month',
    },
    {
      key: '6',
      title: '24 month',
    },
  ];

  const [selectDepositPeriod, setSelectDepositPeriod] = useState('18 month');

  const renderItemDepositPeriod = ({ item }: { item: DepositPeriodItem }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectDepositPeriod(item.title)}
        className={`mx-2.5 mb-5 flex-1 items-center justify-center rounded-[5px] p-3 shadow-md ${
          selectDepositPeriod === item.title ? 'bg-primary' : 'bg-white'
        }`}
        style={{
          elevation: 3,
        }}
      >
        <Text
          numberOfLines={1}
          className={`overflow-hidden font-nunito text-base font-semibold ${
            selectDepositPeriod === item.title ? 'text-white' : 'text-grey'
          }`}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const [amount, setAmount] = useState<string>('');

  const [successDepositModal, setSuccessDepositModal] = useState(false);

  const [accountBottomSheet, setAccountBottomSheet] = useState<boolean>(false);

  const accountList = [
    {
      key: '1',
      name: tr('savingAccount'),
      no: 'SB-*******1231',
    },
    {
      key: '2',
      name: tr('currentAccount'),
      no: 'SB-*******1232',
    },
    {
      key: '3',
      name: tr('salaryAccount'),
      no: 'SB-*******1233',
    },
    {
      key: '4',
      name: tr('nriAccount'),
      no: 'SB-*******1234',
    },
  ];
  const [selectedAccount, setSelectedAccount] = useState<string>();

  const insets = useSafeAreaInsets();
  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <View
        className="bg-regularGrey flex-row items-center px-5 py-3 shadow-md"
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          elevation: 5,
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
          {tr('addDeposit')}
        </Text>
      </View>

      <FlatList
        numColumns={3}
        data={depositPeriodList}
        keyExtractor={(item) => item.key}
        renderItem={renderItemDepositPeriod}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <Text
            className="mx-5 mb-3 mt-5 font-nunito text-[17px] font-bold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('depositPeriod')}
          </Text>
        }
        ListFooterComponent={
          <View className="mx-5">
            <Text
              className="font-nunito text-[17px] font-bold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            >
              {tr('amount')}
            </Text>

            <View
              className="mb-2 mt-3 rounded-[10px] bg-white px-4 py-3 shadow-md"
              style={{ elevation: 3 }}
            >
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="number-pad"
                placeholder={tr('enterDeposit')}
                placeholderTextColor={colors.grey}
                selectionColor={colors.primary}
                numberOfLines={1}
                className="p-0 font-nunito text-base font-semibold text-black"
                style={{ textAlign: isRtl ? 'right' : 'left' }}
              />
            </View>

            <Text
              className="text-primary font-nunito text-sm font-semibold"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            >
              {tr('yourRate')}
            </Text>

            <Text
              className="mt-5 font-nunito text-[17px] font-bold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            >
              {tr('depositTo')}
            </Text>

            <TouchableOpacity
              onPress={() => setAccountBottomSheet(true)}
              className="mb-5 mt-3 rounded-[10px] bg-white px-4 py-3 shadow-md"
              style={{
                elevation: 3,
                paddingVertical: Platform.OS === 'ios' ? 12 : 15,
              }}
            >
              <Text
                className={`font-nunito text-base font-semibold ${
                  selectedAccount ? 'text-black' : 'text-grey'
                }`}
                style={{ textAlign: isRtl ? 'right' : 'left' }}
              >
                {selectedAccount ? selectedAccount : tr('selectAmount')}
              </Text>
            </TouchableOpacity>

            <Text
              className="font-nunito text-[17px] font-bold text-black"
              style={{ textAlign: isRtl ? 'right' : 'left' }}
            >
              {tr('uploadImage')}
            </Text>

            <View
              className="mb-4 mt-3 flex-row items-center justify-center rounded-[10px] bg-white p-3 shadow-md"
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                elevation: 3,
              }}
            >
              <View className="bg-extraLightGrey size-[46px] items-center justify-center rounded-full">
                <Ionicons
                  name="camera-outline"
                  size={22}
                  color={colors.primary}
                />
              </View>

              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-[15px] font-semibold"
                style={{
                  maxWidth: width * 0.65,
                  textAlign: isRtl ? 'right' : 'left',
                  marginLeft: isRtl ? 0 : 20,
                  marginRight: isRtl ? 20 : 0,
                }}
              >
                {tr('frontSideImage')}
              </Text>
            </View>

            <View
              className="mb-4 flex-row items-center justify-center rounded-[10px] bg-white p-3 shadow-md"
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                elevation: 3,
              }}
            >
              <View className="bg-extraLightGrey size-[46px] items-center justify-center rounded-full">
                <Ionicons
                  name="camera-outline"
                  size={22}
                  color={colors.primary}
                />
              </View>

              <Text
                numberOfLines={1}
                className="text-grey overflow-hidden font-nunito text-[15px] font-semibold"
                style={{
                  textAlign: isRtl ? 'right' : 'left',
                  marginLeft: isRtl ? 0 : 20,
                  marginRight: isRtl ? 20 : 0,
                  maxWidth: width * 0.65,
                }}
              >
                {tr('backSideImage')}
              </Text>
            </View>
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => setSuccessDepositModal(true)}
        className="bg-primary m-5 items-center justify-center rounded-[10px] p-3 shadow-md"
        style={{ elevation: 5, marginBottom: insets.bottom + 20 }}
      >
        <Text className="font-nunito text-lg font-bold text-white">
          {tr('depositNow')}
        </Text>
      </TouchableOpacity>

      <SuccessDepositModal
        visible={successDepositModal}
        successModalClose={() => setSuccessDepositModal(false)}
        okayClickHandle={() => {
          setSuccessDepositModal(false);
          router.back();
        }}
      />

      <BottomSheet
        visible={accountBottomSheet}
        onBackButtonPress={() => setAccountBottomSheet(false)}
        onBackdropPress={() => setAccountBottomSheet(false)}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white shadow-lg">
          {accountList.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  setSelectedAccount(item.name);
                  setAccountBottomSheet(false);
                }}
                className={`mx-5 mb-4 rounded-[10px] bg-white px-4 py-2.5 shadow-md ${
                  index === 0 ? 'mt-5' : 'mt-0'
                }`}
                style={{
                  alignItems: isRtl ? 'flex-end' : 'flex-start',
                  elevation: 3,
                }}
              >
                <Text className="font-nunito text-base font-bold text-black">
                  {item.name}
                </Text>
                <Text className="mt-1.5 font-nunito text-base font-semibold text-black">
                  {item.no}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
};

export default AddDepositScreen;
