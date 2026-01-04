import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet } from 'react-native-btr';

import BankAccountName from '@/components/bank-account-name';
import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';

const AccountDetailScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const [bankAccountNameBottomSheet, setBankAccountNameBottomSheet] =
    useState<boolean>(false);

  const toggleCloseBankAccountName = () => {
    setBankAccountNameBottomSheet(!bankAccountNameBottomSheet);
  };

  const bankAccountNameList = [
    {
      key: '1',
      name: t('accountDetailScreen.currentAccount'),
    },
    {
      key: '2',
      name: t('accountDetailScreen.saving'),
    },
    {
      key: '3',
      name: t('accountDetailScreen.salaryAccount'),
    },
    {
      key: '4',
      name: t('accountDetailScreen.nRIAccount'),
    },
  ];

  const [selectBankAccountName, setSelectBankAccountName] = useState(
    t('accountDetailScreen.saving')
  );

  const accountDetailList = [
    {
      key: '1',
      title: t('accountDetailScreen.cif'),
      detail: '12345678921',
    },
    {
      key: '2',
      title: t('accountDetailScreen.ifsc'),
      detail: 'SMART000S600',
    },
    {
      key: '3',
      title: t('accountDetailScreen.branchCode'),
      detail: '1235',
    },
    {
      key: '4',
      title: t('accountDetailScreen.currentAccount'),
      detail: 'Andheri, Mumbai',
    },
    {
      key: '5',
      title: t('accountDetailScreen.branchName'),
      detail: '10/12/2020',
    },
    {
      key: '6',
      title: t('accountDetailScreen.mmid'),
      detail: '120546',
    },
  ];

  return (
    <View className="flex-1 bg-regularGrey">
      <MyStatusBar />
      <View
        className="flex-row items-center bg-regularGrey px-5 py-3 shadow-md"
        style={{ elevation: 6 }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name={isRtl ? 'arrow-forward' : 'arrow-back'}
            size={23}
            color={colors.black}
          />
        </TouchableOpacity>
        <Text className="mx-4 font-nunito text-xl font-bold text-black">
          {t('accountDetailScreen.account')}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center">
          <TouchableOpacity
            onPress={() => setBankAccountNameBottomSheet(true)}
            className="my-5 flex-row items-center justify-center rounded-[5px] border border-primary bg-white px-3 py-2.5"
          >
            <Text className="mx-2.5 font-nunito text-base font-bold text-primary">
              {selectBankAccountName}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View
          className="mx-5 mb-5 flex-row items-center rounded-[10px] bg-white p-4 shadow-md"
          style={{ elevation: 6 }}
        >
          <View className="flex-1 items-start">
            <Text
              numberOfLines={1}
              className="overflow-hidden font-nunito text-base font-bold text-black"
            >
              Leslie Alexander
            </Text>
            <Text
              numberOfLines={1}
              className="mt-2.5 overflow-hidden font-nunito text-sm font-semibold text-grey"
            >
              {t('accountDetailScreen.accountNumber')}
            </Text>
            <Text
              numberOfLines={1}
              className="mt-1 font-nunito text-[15px] font-semibold text-black"
            >
              SB-******1234
            </Text>
          </View>
          <View className="flex-1 items-end">
            <Text
              numberOfLines={1}
              className="overflow-hidden font-nunito text-sm font-bold text-grey"
            >
              {t('accountDetailScreen.totalBalance')}
            </Text>
            <Text
              numberOfLines={1}
              className="mt-1.5 font-nunito text-xl font-bold text-primary"
            >
              $1000.00
            </Text>
          </View>
        </View>

        <View className="mx-5">
          <Text className="mb-3 text-left font-nunito text-lg font-bold text-black">
            {t('accountDetailScreen.accountDetail')}
          </Text>

          {accountDetailList.map((item) => {
            return (
              <View
                key={item.key}
                className="mb-4 flex-row items-center justify-between"
              >
                <Text
                  numberOfLines={1}
                  className="mx-2.5 flex-1 text-left font-nunito text-[15px] font-semibold text-grey"
                >
                  {item.title}
                </Text>
                <Text
                  numberOfLines={1}
                  className="flex-1 text-right font-nunito text-[15px] font-semibold text-black"
                >
                  {item.detail}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          // router.push('/statement/statementScreen')
          {}
        }
        className="m-5 items-center justify-center rounded-[10px] bg-primary py-3 shadow-md"
        style={{
          elevation: 4,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
        }}
      >
        <Text className="font-nunito text-lg font-bold text-white">
          {t('accountDetailScreen.viewStateMent')}
        </Text>
      </TouchableOpacity>

      <BottomSheet
        visible={bankAccountNameBottomSheet}
        onBackButtonPress={toggleCloseBankAccountName}
        onBackdropPress={toggleCloseBankAccountName}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white shadow-lg">
          {bankAccountNameList.map((item, index) => {
            return (
              <BankAccountName
                key={item.key}
                name={item.name}
                isFirst={index === 0}
                bankAccountNameClickHandler={() => {
                  setSelectBankAccountName(item.name);
                  toggleCloseBankAccountName();
                }}
              />
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
};

export default AccountDetailScreen;
