import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  type ImageSourcePropType,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import DashedLine from 'react-native-dashed-line';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BankAccountName from '@/components/bank-account-name';
import MyStatusBar from '@/components/my-status-bar';
import StartEndCalendarPicker, {
  type DateData,
} from '@/components/start-end-calendar-picker';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width } = Dimensions.get('window');

const StatementScreen = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`statementScreen.${key}`);
  }

  const [bankAccountNameBottomSheet, setBankAccountNameBottomSheet] =
    useState(false);

  const toggleCloseBankAccountName = () => {
    setBankAccountNameBottomSheet(!bankAccountNameBottomSheet);
  };

  const bankAccountNameList = [
    {
      key: '1',
      name: tr('currentAccount'),
    },
    {
      key: '2',
      name: tr('savingAccount'),
    },
    {
      key: '3',
      name: tr('salaryAccount'),
    },
    {
      key: '4',
      name: tr('nriAccount'),
    },
  ];

  const [selectBankAccountName, setSelectBankAccountName] = useState(
    tr('savingAccount')
  );

  interface TransactionItem {
    key: string;
    image: ImageSourcePropType;
    name: string;
    other: string;
    dollar: string;
    transaction: boolean;
  }

  const transactionList: TransactionItem[] = [
    {
      key: '1',
      image: images.services2,
      name: 'Jeklin shah',
      other: 'Money transfer',
      dollar: '-$140',
      transaction: false,
    },
    {
      key: '2',
      image: images.transaction1,
      name: 'Paypal',
      other: 'Deposits',
      dollar: '-$140',
      transaction: true,
    },
    {
      key: '3',
      image: images.services10,
      name: '+91 987654321',
      other: 'Mobile payment',
      dollar: '-$150',
      transaction: false,
    },
    {
      key: '4',
      image: images.transaction3,
      name: 'Atm',
      other: 'Cash withdrawal',
      dollar: '-$140',
      transaction: false,
    },
    {
      key: '5',
      image: images.services2,
      name: 'Jane Cooper',
      other: 'Money transfer',
      dollar: '+$640',
      transaction: true,
    },
    {
      key: '6',
      image: images.services5,
      name: 'Electricity',
      other: 'bill payment',
      dollar: '-$540',
      transaction: false,
    },
    {
      key: '7',
      image: images.transaction4,
      name: 'eBay',
      other: 'Online payment',
      dollar: '-$190',
      transaction: false,
    },
    {
      key: '8',
      image: images.transaction2,
      name: 'Amazon',
      other: 'Online payment',
      dollar: '-$440',
      transaction: false,
    },
  ];

  const today = moment().format('YYYY-MM-DD');

  const [startDate, setStartDate] = useState(today);
  const [startDateCalendarModal, setStartDateCalendarModal] = useState(false);

  const ontStartDateChange = (day: DateData) => {
    setStartDate(day.dateString);
    setStartDateCalendarModal(false);
  };

  const [endDate, setEndDate] = useState(today);
  const [endDateCalendarModal, setEndDateCalendarModal] = useState(false);

  const onEndDateChange = (day: DateData) => {
    setEndDate(day.dateString);
    setEndDateCalendarModal(false);
  };

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
        <Text
          numberOfLines={1}
          className="mx-4 flex-1 font-nunito text-xl font-bold text-black"
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        >
          {tr('statement')}
        </Text>

        <Feather name="download" size={22} color={colors.primary} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View
          className="bg-extraLightPink m-5 flex-row items-center rounded-lg px-4 py-2"
          style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
        >
          <View
            className="flex-1"
            style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
          >
            <TouchableOpacity
              onPress={() => setBankAccountNameBottomSheet(true)}
              className="flex-row items-center"
              style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
            >
              <Text
                numberOfLines={1}
                className="text-grey font-nunito text-sm font-bold"
              >
                {selectBankAccountName}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.grey}
                style={{ marginHorizontal: 2.5 }}
              />
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              className="mt-1 font-nunito text-base font-semibold text-black"
            >
              SB-*******1234
            </Text>
          </View>

          <View
            className="flex-1"
            style={{ alignItems: isRtl ? 'flex-start' : 'flex-end' }}
          >
            <Text
              numberOfLines={1}
              className="text-grey font-nunito text-sm font-bold"
            >
              {tr('totalBalance')}
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary mt-1 font-nunito text-xl font-bold"
            >
              $1000.00
            </Text>
          </View>
        </View>

        <DashedLine
          dashGap={2}
          dashLength={2}
          dashThickness={1.5}
          dashColor={colors.grey}
        />

        <View className="mx-5 mt-5">
          <Text
            className="font-nunito text-base font-bold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          >
            {tr('selectDate')}
          </Text>
          <View
            className="mb-5 mt-2.5 flex-row items-center"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setStartDateCalendarModal(true)}
              className="flex-1 flex-row items-center justify-center rounded bg-white px-1 py-3 shadow-md"
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                elevation: 3,
              }}
            >
              <MaterialCommunityIcons
                name="calendar-range"
                size={20}
                color={colors.primary}
              />
              <Text
                numberOfLines={1}
                className="max-w-[95px] font-nunito text-[15px] font-semibold text-black"
                style={{
                  textAlign: isRtl ? 'right' : 'left',
                  marginLeft: isRtl ? 0 : 2.5,
                  marginRight: isRtl ? 2.5 : 0,
                }}
              >
                {startDate}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setEndDateCalendarModal(true)}
              className="mx-4 flex-1 flex-row items-center justify-center rounded bg-white px-1 py-3 shadow-md"
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                elevation: 3,
              }}
            >
              <MaterialCommunityIcons
                name="calendar-range"
                size={20}
                color={colors.primary}
              />
              <Text
                numberOfLines={1}
                className="max-w-[95px] font-nunito text-[15px] font-semibold text-black"
                style={{
                  textAlign: isRtl ? 'right' : 'left',
                  marginLeft: isRtl ? 0 : 2.5,
                  marginRight: isRtl ? 2.5 : 0,
                }}
              >
                {endDate}
              </Text>
            </TouchableOpacity>

            <View
              className="bg-primary w-[66px] items-center justify-center rounded p-3 shadow-sm"
              style={{ elevation: 5 }}
            >
              <Text
                numberOfLines={1}
                className="font-nunito text-base font-bold text-white"
              >
                {tr('go')}
              </Text>
            </View>
          </View>
        </View>

        <DashedLine
          dashGap={2}
          dashLength={2}
          dashThickness={1.5}
          dashColor={colors.grey}
        />
        <Text
          className="mx-5 mt-5 font-nunito text-base font-bold text-black"
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        >
          {tr('transaction')}
        </Text>

        {transactionList.map((item, index) => {
          return (
            <View
              key={item.key}
              className={`mx-5 mb-5 flex-row items-center justify-between rounded-lg bg-white px-4 py-3 shadow-md ${
                index === 0 ? 'mt-2.5' : 'mt-0'
              }`}
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                elevation: 3,
              }}
            >
              <View
                className="flex-1 flex-row items-center"
                style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
              >
                <View className="bg-extraLightGrey size-[38px] items-center justify-center rounded-full">
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    className="size-[22px]"
                  />
                </View>
                <View
                  className="flex-1 px-4"
                  style={{ alignItems: isRtl ? 'flex-end' : 'flex-start' }}
                >
                  <Text
                    numberOfLines={1}
                    className="font-nunito text-[15px] font-bold text-black"
                  >
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-grey mt-1 font-nunito text-xs font-bold"
                  >
                    {item.other}
                  </Text>
                </View>
              </View>

              <Text
                numberOfLines={1}
                className={`max-w-[100px] font-nunito text-[15px] font-bold ${
                  item.transaction ? 'text-green' : 'text-red'
                }`}
              >
                {item.dollar}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <BottomSheet
        visible={bankAccountNameBottomSheet}
        onBackButtonPress={toggleCloseBankAccountName}
        onBackdropPress={toggleCloseBankAccountName}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white shadow-md">
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

      <Modal
        transparent={true}
        animationType="fade"
        visible={startDateCalendarModal}
        onRequestClose={() => setStartDateCalendarModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setStartDateCalendarModal(false)}
          className="flex-1"
        >
          <View className="bg-transparentBlack flex-1 items-center justify-center">
            <TouchableOpacity
              activeOpacity={1}
              className="items-center justify-center rounded-lg bg-white p-4 shadow-md"
              style={{ width: width * 0.9, elevation: 10 }}
            >
              <StartEndCalendarPicker
                maxDate={today}
                current={startDate}
                onDayPress={ontStartDateChange}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={endDateCalendarModal}
        onRequestClose={() => setEndDateCalendarModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setEndDateCalendarModal(false)}
          className="flex-1"
        >
          <View className="bg-transparentBlack flex-1 items-center justify-center">
            <TouchableOpacity
              activeOpacity={1}
              className="items-center justify-center rounded-lg bg-white p-4 shadow-md"
              style={{ width: width * 0.9, elevation: 10 }}
            >
              <StartEndCalendarPicker
                maxDate={today}
                current={endDate}
                onDayPress={onEndDateChange}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default StatementScreen;
