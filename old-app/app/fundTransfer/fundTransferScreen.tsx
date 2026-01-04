import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import SelectAccountNo from "../../components/selectAccountNo";
import { BottomSheet } from "react-native-btr";
import SelectBankName from "../../components/selectBankName";

const PayIMPSTab = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`payIMPSScreen:${key}`);
  }

  const [fromAccountNoBottomSheet, setFromAccountNoBottomSheet] =
    useState<boolean>(false);

  const toggleCloseAccountNumber = () => {
    setFromAccountNoBottomSheet(!fromAccountNoBottomSheet);
  };

  const fromAccountNoList = [
    {
      key: "1",
      name: tr("savingAccount"),
      no: "SB-*******1231",
    },
    {
      key: "2",
      name: tr("currentAccount"),
      no: "SB-*******1232",
    },
    {
      key: "3",
      name: tr("salaryAccount"),
      no: "SB-*******1233",
    },
    {
      key: "4",
      name: tr("nriAccount"),
      no: "SB-*******1234",
    },
  ];
  const [selectFromAccountNo, setSelectFromAccountNo] = useState<string>();

  const [bankNameBottomSheet, setBankNameBottomSheet] = useState<boolean>(false);
  const toggleCloseSelectBank = () => {
    setBankNameBottomSheet(!bankNameBottomSheet);
  };

  const bankNameList = [
    {
      key: "1",
      name: "Indian bank",
    },
    {
      key: "2",
      name: "SBI bank",
    },
    {
      key: "3",
      name: "Axis bank",
    },
    {
      key: "4",
      name: "HDFC bank",
    },
    {
      key: "5",
      name: "ICICI bank",
    },
    {
      key: "6",
      name: "Star bank",
    },
  ];
  const [bankName, setBankName] = useState<string>();

  const [bankHolderName, setBankHolderName] = useState<string>();
  const [toAccountNo, setToAccountNo] = useState<string>();
  const [code, setCode] = useState<string>();
  const [amount, setAmount] = useState<string>();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginTop: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("fromAccount")}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setFromAccountNoBottomSheet(true)}
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.2
                : Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 1.2,
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Text
            style={{
              ...(selectFromAccountNo
                ? Fonts.SemiBold15black
                : Fonts.SemiBold15grey),
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {selectFromAccountNo ? selectFromAccountNo : tr("accountNo")}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("holderName")}
        </Text>

        <View style={{ ...styles.textInput, marginTop: Default.fixPadding }}>
          <TextInput
            value={bankHolderName}
            onChangeText={setBankHolderName}
            placeholder={tr("enterHolderName")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("toAccount")}
        </Text>

        <View style={{ marginTop: Default.fixPadding, ...styles.textInput }}>
          <TextInput
            value={toAccountNo}
            onChangeText={setToAccountNo}
            keyboardType="number-pad"
            placeholder={tr("enterAccountNo")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("bankName")}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setBankNameBottomSheet(true)}
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.2
                : Default.fixPadding * 1.5,
            marginTop: Default.fixPadding,
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Text
            style={{
              ...(bankName ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {bankName ? bankName : tr("hBank")}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("iCode")}
        </Text>

        <View style={{ marginTop: Default.fixPadding, ...styles.textInput }}>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder={tr("enterICode")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("amount")}
        </Text>

        <View style={{ marginTop: Default.fixPadding, ...styles.textInput }}>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder={tr("enterAmount")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>
      </ScrollView>

      <BottomSheet
        visible={fromAccountNoBottomSheet}
        onBackButtonPress={toggleCloseAccountNumber}
        onBackdropPress={toggleCloseAccountNumber}
      >
        <View
          style={{ ...styles.bottomSheet, paddingTop: Default.fixPadding * 2 }}
        >
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
        <View style={styles.bottomSheet}>
          {bankNameList.map((item, index) => {
            return (
              <SelectBankName
                key={item.key}
                name={item.name}
                isFirst={index == 0}
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

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`paymentIBANScreen:${key}`);
  }

  const [fromAccountNoBottomSheet, setFromAccountNoBottomSheet] =
    useState<boolean>(false);

  const toggleCloseAccountNumber = () => {
    setFromAccountNoBottomSheet(!fromAccountNoBottomSheet);
  };

  const fromAccountNoList = [
    {
      key: "1",
      name: tr("savingAccount"),
      no: "SB-*******1231",
    },
    {
      key: "2",
      name: tr("currentAccount"),
      no: "SB-*******1232",
    },
    {
      key: "3",
      name: tr("salaryAccount"),
      no: "SB-*******1233",
    },
    {
      key: "4",
      name: tr("nriAccount"),
      no: "SB-*******1234",
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
      key: "1",
      name: "Indian bank",
    },
    {
      key: "2",
      name: "SBI bank",
    },
    {
      key: "3",
      name: "Axis bank",
    },
    {
      key: "4",
      name: "HDFC bank",
    },
    {
      key: "5",
      name: "ICICI bank",
    },
    {
      key: "6",
      name: "Star bank",
    },
  ];
  const [selectBeneficiaryBank, setSelectBeneficiaryBank] = useState<string>();

  const [amount, setAmount] = useState<string>();
  const [remark, setRemark] = useState<string>();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginTop: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("fromAccount")}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setFromAccountNoBottomSheet(true)}
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.2
                : Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 1.2,
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Text
            style={{
              ...(fromAccountNo ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {fromAccountNo ? fromAccountNo : "SB - 12345854213"}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("beneficiaryInfo")}
        </Text>

        <View style={{ marginTop: Default.fixPadding, ...styles.textInput }}>
          <TextInput
            value={number}
            onChangeText={setNumber}
            placeholder={tr("number")}
            keyboardType="number-pad"
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>
        <View style={{ ...styles.textInput }}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={tr("name")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>
        <View style={{ ...styles.textInput }}>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder={tr("code")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              padding: 0,
              ...Fonts.SemiBold15black,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => setBeneficiaryBankBottomSheet(true)}
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.2
                : Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Text
            style={{
              ...(selectBeneficiaryBank
                ? Fonts.SemiBold15black
                : Fonts.SemiBold15grey),
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {selectBeneficiaryBank ? selectBeneficiaryBank : tr("bank")}
          </Text>
        </TouchableOpacity>

        <View style={{ ...styles.textInput }}>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder={tr("amount")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              padding: 0,
              ...Fonts.SemiBold15black,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>
        <View style={{ ...styles.textInput }}>
          <TextInput
            value={remark}
            onChangeText={setRemark}
            placeholder={tr("remark")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>
      </ScrollView>

      <BottomSheet
        visible={fromAccountNoBottomSheet}
        onBackButtonPress={toggleCloseAccountNumber}
        onBackdropPress={toggleCloseAccountNumber}
      >
        <View
          style={{ ...styles.bottomSheet, paddingTop: Default.fixPadding * 2 }}
        >
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
        <View style={styles.bottomSheet}>
          {beneficiaryBankList.map((item, index) => {
            return (
              <SelectBankName
                key={item.key}
                name={item.name}
                isFirst={index == 0}
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

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`beneficiaryPayScreen:${key}`);
  }

  const [accountNumberBottomSheet, setAccountNumberBottomSheet] = useState<boolean>(false);

  const toggleCloseAccountNumber = () => {
    setAccountNumberBottomSheet(!accountNumberBottomSheet);
  };

  const accountList = [
    {
      key: "1",
      name: tr("savingAccount"),
      no: "SB-*******1231",
    },
    {
      key: "2",
      name: tr("currentAccount"),
      no: "SB-*******1232",
    },
    {
      key: "3",
      name: tr("salaryAccount"),
      no: "SB-*******1233",
    },
    {
      key: "4",
      name: tr("nriAccount"),
      no: "SB-*******1234",
    },
  ];

  const [selectAccount, setSelectAccount] = useState<string>();

  const [name, setName] = useState<string>();
  const [accountNumber, setAccountNumber] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [transLimit, setTransferLimit] = useState<string>();

  const [bankNameBottomSheet, setBankNameBottomSheet] = useState<boolean>(false);

  const toggleCloseSelectBank = () => {
    setBankNameBottomSheet(!bankNameBottomSheet);
  };

  const [bankName, setBankName] = useState<string>();

  const bankNameList = [
    {
      key: "1",
      name: "Indian bank",
    },
    {
      key: "2",
      name: "SBI bank",
    },
    {
      key: "3",
      name: "Axis bank",
    },
    {
      key: "4",
      name: "HDFC bank",
    },
    {
      key: "5",
      name: "ICICI bank",
    },
    {
      key: "6",
      name: "Star bank",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginTop: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("fromAccount")}
        </Text>

        <TouchableOpacity
          onPress={() => setAccountNumberBottomSheet(true)}
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.2
                : Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 1.2,
            marginBottom: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Text
            style={{
              ...(selectAccount ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {selectAccount ? selectAccount : "SB - 12345854213"}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("beneficiaryInfo")}
        </Text>
        <View style={{ ...styles.textInput, marginTop: Default.fixPadding }}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={tr("name")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              padding: 0,
              ...Fonts.SemiBold15black,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setBankNameBottomSheet(true)}
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical:
              Platform.OS == "ios"
                ? Default.fixPadding * 1.2
                : Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <Text
            style={{
              ...(bankName ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {bankName ? bankName : tr("bankName")}
          </Text>
        </TouchableOpacity>
        <View style={{ ...styles.textInput }}>
          <TextInput
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder={tr("accountNumber")}
            keyboardType="number-pad"
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>
        <View style={{ ...styles.textInput }}>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder={tr("amount")}
            keyboardType="number-pad"
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              padding: 0,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>
        <View style={{ ...styles.textInput }}>
          <TextInput
            value={transLimit}
            onChangeText={setTransferLimit}
            keyboardType="number-pad"
            placeholder={tr("transferLimit")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              padding: 0,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
            }}
          />
        </View>
      </ScrollView>

      <BottomSheet
        visible={accountNumberBottomSheet}
        onBackButtonPress={toggleCloseAccountNumber}
        onBackdropPress={toggleCloseAccountNumber}
      >
        <View
          style={{ ...styles.bottomSheet, paddingTop: Default.fixPadding * 2 }}
        >
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
        <View style={styles.bottomSheet}>
          {bankNameList.map((item, index) => {
            return (
              <SelectBankName
                key={item.key}
                name={item.name}
                isFirst={index == 0}
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
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`fundTransferScreen:${key}`);
  }

  interface FundTransferItem {
    key: string;
    title: string;
  }

  const fundTransferList: FundTransferItem[] = [
    {
      key: "1",
      title: tr("beneficiaryPay"),
    },
    {
      key: "2",
      title: tr("payment"),
    },
    {
      key: "3",
      title: tr("pay"),
    },
  ];

  const [fundTransfer, setFundTransfer] = useState(tr("beneficiaryPay"));

  const renderItemFundTransfer = ({ item }: { item: FundTransferItem }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setFundTransfer(item.title)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 0.8,
          paddingHorizontal: Default.fixPadding * 0.4,
          marginHorizontal: Default.fixPadding,
          marginTop: Default.fixPadding * 2,
          marginBottom: Default.fixPadding,
          borderRadius: 10,
          backgroundColor:
            fundTransfer === item.title ? Colors.primary : Colors.white,
          ...Default.shadow,
        }}
      >
        <Text
          numberOfLines={2}
          style={{
            ...(fundTransfer === item.title
              ? Fonts.Bold16white
              : Fonts.Bold16grey),
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const ListFooterComponent = () => {
    if (fundTransfer === tr("beneficiaryPay")) {
      return <BeneficiaryPayTab />;
    } else if (fundTransfer === tr("payment")) {
      return <PaymentIBANTab />;
    } else {
      return <PayIMPSTab />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingVertical: Default.fixPadding * 1.2,
            paddingHorizontal: Default.fixPadding * 2,
            backgroundColor: Colors.regularGrey,
            ...Default.shadow,
          }}
        >
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Ionicons
              name={isRtl ? "arrow-forward" : "arrow-back"}
              size={23}
              color={Colors.black}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...Fonts.Bold20black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("fundTransfer")}
          </Text>
        </View>
        <View>
          <FlatList
            numColumns={3}
            data={fundTransferList}
            keyExtractor={(item) => item.key}
            renderItem={renderItemFundTransfer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
          />
        </View>
        <ListFooterComponent />
        <TouchableOpacity
          onPress={() => navigation.push("successfully/successfullyScreen")}
          style={styles.transferNowBtn}
        >
          <Text style={{ ...Fonts.Bold18white }}>{tr("transferNow")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FundTransferScreen;

const styles = StyleSheet.create({
  transferNowBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
  textInput: {
    flex: 1,
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 1.5,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSheet: {
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
