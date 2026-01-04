import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyStatusBar from '@/components/my-status-bar';
import SelectAccountNo from '@/components/select-account-no';
import SelectBankName from '@/components/select-bank-name';
import colors from '@/components/ui/colors';

const PayIMPSTab = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`payIMPSScreen.${key}`);
  }

  const [fromAccountNoBottomSheet, setFromAccountNoBottomSheet] =
    useState<boolean>(false);

  const toggleCloseAccountNumber = () => {
    setFromAccountNoBottomSheet(!fromAccountNoBottomSheet);
  };

  const fromAccountNoList = [
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
  const [selectFromAccountNo, setSelectFromAccountNo] = useState<string>();

  const [bankNameBottomSheet, setBankNameBottomSheet] =
    useState<boolean>(false);
  const toggleCloseSelectBank = () => {
    setBankNameBottomSheet(!bankNameBottomSheet);
  };

  const bankNameList = [
    {
      key: '1',
      name: 'Indian bank',
    },
    {
      key: '2',
      name: 'SBI bank',
    },
    {
      key: '3',
      name: 'Axis bank',
    },
    {
      key: '4',
      name: 'HDFC bank',
    },
    {
      key: '5',
      name: 'ICICI bank',
    },
    {
      key: '6',
      name: 'Star bank',
    },
  ];
  const [bankName, setBankName] = useState<string>();

  const [bankHolderName, setBankHolderName] = useState<string>();
  const [toAccountNo, setToAccountNo] = useState<string>();
  const [code, setCode] = useState<string>();
  const [amount, setAmount] = useState<string>();

  return (
    <View className="bg-regularGrey flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text
          className="mx-5 mt-2.5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('fromAccount')}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setFromAccountNoBottomSheet(true)}
          className="mx-5 mb-5 mt-3 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: Platform.OS === 'ios' ? 12 : 15,
            elevation: 3,
          }}
        >
          <Text
            className={`font-nunito text-[15px] font-semibold ${
              selectFromAccountNo ? 'text-black' : 'text-grey'
            }`}
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {selectFromAccountNo ? selectFromAccountNo : tr('accountNo')}
          </Text>
        </TouchableOpacity>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('holderName')}
        </Text>

        <View
          className="mx-5 mb-4 mt-2.5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={bankHolderName}
            onChangeText={setBankHolderName}
            placeholder={tr('enterHolderName')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('toAccount')}
        </Text>

        <View
          className="mx-5 mb-4 mt-2.5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={toAccountNo}
            onChangeText={setToAccountNo}
            keyboardType="number-pad"
            placeholder={tr('enterAccountNo')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('bankName')}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setBankNameBottomSheet(true)}
          className="mx-5 mb-5 mt-2.5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: Platform.OS === 'ios' ? 12 : 15,
            elevation: 3,
          }}
        >
          <Text
            className={`font-nunito text-[15px] font-semibold ${
              bankName ? 'text-black' : 'text-grey'
            }`}
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {bankName ? bankName : tr('hBank')}
          </Text>
        </TouchableOpacity>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('iCode')}
        </Text>

        <View
          className="mx-5 mb-4 mt-2.5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder={tr('enterICode')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('amount')}
        </Text>

        <View
          className="mx-5 mb-4 mt-2.5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder={tr('enterAmount')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
      </ScrollView>

      <BottomSheet
        visible={fromAccountNoBottomSheet}
        onBackButtonPress={toggleCloseAccountNumber}
        onBackdropPress={toggleCloseAccountNumber}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white pt-5 shadow-lg">
          {fromAccountNoList.map((item) => {
            return (
              <SelectAccountNo
                key={item.key}
                name={item.name}
                no={item.no}
                accountNoCardClick={() => {
                  setSelectFromAccountNo(item.no);
                  toggleCloseAccountNumber();
                }}
                selected={selectFromAccountNo === item.no}
              />
            );
          })}
        </View>
      </BottomSheet>

      <BottomSheet
        visible={bankNameBottomSheet}
        onBackButtonPress={toggleCloseSelectBank}
        onBackdropPress={toggleCloseSelectBank}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white shadow-lg">
          {bankNameList.map((item, index) => {
            return (
              <SelectBankName
                key={item.key}
                name={item.name}
                isFirst={index === 0}
                bankNameClickHandler={() => {
                  setBankName(item.name);
                  toggleCloseSelectBank();
                }}
              />
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
};

const PaymentIBANTab = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`paymentIBANScreen.${key}`);
  }

  const [fromAccountNoBottomSheet, setFromAccountNoBottomSheet] =
    useState<boolean>(false);

  const toggleCloseAccountNumber = () => {
    setFromAccountNoBottomSheet(!fromAccountNoBottomSheet);
  };

  const fromAccountNoList = [
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
  const [fromAccountNo, setFromAccountNo] = useState<string>();

  const [number, setNumber] = useState<string>();
  const [name, setName] = useState<string>();
  const [code, setCode] = useState<string>();

  const [beneficiaryBankBottomSheet, setBeneficiaryBankBottomSheet] =
    useState<boolean>(false);

  const toggleCloseBeneficiaryBank = () => {
    setBeneficiaryBankBottomSheet(!beneficiaryBankBottomSheet);
  };

  const beneficiaryBankList = [
    {
      key: '1',
      name: 'Indian bank',
    },
    {
      key: '2',
      name: 'SBI bank',
    },
    {
      key: '3',
      name: 'Axis bank',
    },
    {
      key: '4',
      name: 'HDFC bank',
    },
    {
      key: '5',
      name: 'ICICI bank',
    },
    {
      key: '6',
      name: 'Star bank',
    },
  ];
  const [selectBeneficiaryBank, setSelectBeneficiaryBank] = useState<string>();

  const [amount, setAmount] = useState<string>();
  const [remark, setRemark] = useState<string>();

  return (
    <View className="bg-regularGrey flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text
          className="mx-5 mt-2.5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('fromAccount')}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setFromAccountNoBottomSheet(true)}
          className="mx-5 mb-5 mt-3 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: Platform.OS === 'ios' ? 12 : 15,
            elevation: 3,
          }}
        >
          <Text
            className={`font-nunito text-[15px] font-semibold ${
              fromAccountNo ? 'text-black' : 'text-grey'
            }`}
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {fromAccountNo ? fromAccountNo : 'SB - 12345854213'}
          </Text>
        </TouchableOpacity>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('beneficiaryInfo')}
        </Text>

        <View
          className="mx-5 mb-4 mt-2.5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={number}
            onChangeText={setNumber}
            placeholder={tr('number')}
            keyboardType="number-pad"
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
        <View
          className="mx-5 mb-4 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={tr('name')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
        <View
          className="mx-5 mb-4 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder={tr('code')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => setBeneficiaryBankBottomSheet(true)}
          className="mx-5 mb-5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: Platform.OS === 'ios' ? 12 : 15,
            elevation: 3,
          }}
        >
          <Text
            className={`font-nunito text-[15px] font-semibold ${
              selectBeneficiaryBank ? 'text-black' : 'text-grey'
            }`}
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {selectBeneficiaryBank ? selectBeneficiaryBank : tr('bank')}
          </Text>
        </TouchableOpacity>

        <View
          className="mx-5 mb-4 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder={tr('amount')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
        <View
          className="mx-5 mb-4 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={remark}
            onChangeText={setRemark}
            placeholder={tr('remark')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
      </ScrollView>

      <BottomSheet
        visible={fromAccountNoBottomSheet}
        onBackButtonPress={toggleCloseAccountNumber}
        onBackdropPress={toggleCloseAccountNumber}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white pt-5 shadow-lg">
          {fromAccountNoList.map((item) => {
            return (
              <SelectAccountNo
                key={item.key}
                name={item.name}
                no={item.no}
                accountNoCardClick={() => {
                  setFromAccountNo(item.no);
                  toggleCloseAccountNumber();
                }}
                selected={fromAccountNo === item.no}
              />
            );
          })}
        </View>
      </BottomSheet>

      <BottomSheet
        visible={beneficiaryBankBottomSheet}
        onBackButtonPress={toggleCloseBeneficiaryBank}
        onBackdropPress={toggleCloseBeneficiaryBank}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white shadow-lg">
          {beneficiaryBankList.map((item, index) => {
            return (
              <SelectBankName
                key={item.key}
                name={item.name}
                isFirst={index === 0}
                bankNameClickHandler={() => {
                  setSelectBeneficiaryBank(item.name);
                  toggleCloseBeneficiaryBank();
                }}
              />
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
};

const BeneficiaryPayTab = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`beneficiaryPayScreen.${key}`);
  }

  const [accountNumberBottomSheet, setAccountNumberBottomSheet] =
    useState<boolean>(false);

  const toggleCloseAccountNumber = () => {
    setAccountNumberBottomSheet(!accountNumberBottomSheet);
  };

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

  const [selectAccount, setSelectAccount] = useState<string>();

  const [name, setName] = useState<string>();
  const [accountNumber, setAccountNumber] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [transLimit, setTransferLimit] = useState<string>();

  const [bankNameBottomSheet, setBankNameBottomSheet] =
    useState<boolean>(false);

  const toggleCloseSelectBank = () => {
    setBankNameBottomSheet(!bankNameBottomSheet);
  };

  const [bankName, setBankName] = useState<string>();

  const bankNameList = [
    {
      key: '1',
      name: 'Indian bank',
    },
    {
      key: '2',
      name: 'SBI bank',
    },
    {
      key: '3',
      name: 'Axis bank',
    },
    {
      key: '4',
      name: 'HDFC bank',
    },
    {
      key: '5',
      name: 'ICICI bank',
    },
    {
      key: '6',
      name: 'Star bank',
    },
  ];

  return (
    <View className="bg-regularGrey flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text
          className="mx-5 mt-2.5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('fromAccount')}
        </Text>

        <TouchableOpacity
          onPress={() => setAccountNumberBottomSheet(true)}
          className="mx-5 mb-5 mt-3 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: Platform.OS === 'ios' ? 12 : 15,
            elevation: 3,
          }}
        >
          <Text
            className={`font-nunito text-[15px] font-semibold ${
              selectAccount ? 'text-black' : 'text-grey'
            }`}
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {selectAccount ? selectAccount : 'SB - 12345854213'}
          </Text>
        </TouchableOpacity>
        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {tr('beneficiaryInfo')}
        </Text>
        <View
          className="mx-5 mb-4 mt-2.5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={tr('name')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setBankNameBottomSheet(true)}
          className="mx-5 mb-5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: Platform.OS === 'ios' ? 12 : 15,
            elevation: 3,
          }}
        >
          <Text
            className={`font-nunito text-[15px] font-semibold ${
              bankName ? 'text-black' : 'text-grey'
            }`}
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {bankName ? bankName : tr('bankName')}
          </Text>
        </TouchableOpacity>
        <View
          className="mx-5 mb-4 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder={tr('accountNumber')}
            keyboardType="number-pad"
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
        <View
          className="mx-5 mb-4 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder={tr('amount')}
            keyboardType="number-pad"
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
        <View
          className="mx-5 rounded-[10px] bg-white px-3.5 shadow-md"
          style={{
            paddingVertical: 12,
            elevation: 3,
          }}
        >
          <TextInput
            value={transLimit}
            onChangeText={setTransferLimit}
            keyboardType="number-pad"
            placeholder={tr('transferLimit')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="p-0 font-nunito text-[15px] font-semibold text-black"
            style={{
              textAlign: isRtl ? 'right' : 'left',
            }}
          />
        </View>
      </ScrollView>

      <BottomSheet
        visible={accountNumberBottomSheet}
        onBackButtonPress={toggleCloseAccountNumber}
        onBackdropPress={toggleCloseAccountNumber}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white pt-5 shadow-lg">
          {accountList.map((item) => {
            return (
              <SelectAccountNo
                key={item.key}
                name={item.name}
                no={item.no}
                accountNoCardClick={() => {
                  setSelectAccount(item.no);
                  toggleCloseAccountNumber();
                }}
                selected={selectAccount === item.no}
              />
            );
          })}
        </View>
      </BottomSheet>

      <BottomSheet
        visible={bankNameBottomSheet}
        onBackButtonPress={toggleCloseSelectBank}
        onBackdropPress={toggleCloseSelectBank}
      >
        <View className="overflow-hidden rounded-t-[20px] bg-white shadow-lg">
          {bankNameList.map((item, index) => {
            return (
              <SelectBankName
                key={item.key}
                name={item.name}
                isFirst={index === 0}
                bankNameClickHandler={() => {
                  setBankName(item.name);
                  toggleCloseSelectBank();
                }}
              />
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
};

const FundTransferScreen = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`fundTransferScreen.${key}`);
  }

  interface FundTransferItem {
    key: string;
    title: string;
  }

  const fundTransferList: FundTransferItem[] = [
    {
      key: '1',
      title: tr('beneficiaryPay'),
    },
    {
      key: '2',
      title: tr('payment'),
    },
    {
      key: '3',
      title: tr('pay'),
    },
  ];

  const [fundTransfer, setFundTransfer] = useState(tr('beneficiaryPay'));

  const renderItemFundTransfer = ({ item }: { item: FundTransferItem }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setFundTransfer(item.title)}
        className={`mx-2.5 mb-2.5 mt-5 flex-1 items-center justify-center rounded-[10px] px-1 py-2 shadow-md ${
          fundTransfer === item.title ? 'bg-primary' : 'bg-white'
        }`}
        style={{
          elevation: 5,
        }}
      >
        <Text
          numberOfLines={2}
          className={`overflow-hidden text-center font-nunito text-base font-bold ${
            fundTransfer === item.title ? 'text-white' : 'text-grey'
          }`}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const ListFooterComponent = () => {
    if (fundTransfer === tr('beneficiaryPay')) {
      return <BeneficiaryPayTab />;
    } else if (fundTransfer === tr('payment')) {
      return <PaymentIBANTab />;
    } else {
      return <PayIMPSTab />;
    }
  };

  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1">
      <MyStatusBar />
      <View className="bg-regularGrey flex-1">
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
            {tr('fundTransfer')}
          </Text>
        </View>
        <View>
          <FlatList
            numColumns={3}
            data={fundTransferList}
            keyExtractor={(item) => item.key}
            renderItem={renderItemFundTransfer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>
        <ListFooterComponent />
        <TouchableOpacity
          onPress={() => router.push('/successfully')}
          className="bg-primary m-5 items-center justify-center rounded-[10px] p-3 shadow-md"
          style={{ elevation: 5, marginBottom: insets.bottom + 20 }}
        >
          <Text className="font-nunito text-lg font-bold text-white">
            {tr('transferNow')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FundTransferScreen;
