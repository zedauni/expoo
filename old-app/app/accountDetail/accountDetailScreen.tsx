import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BottomSheet } from "react-native-btr";
import BankAccountName from "../../components/bankAccountName";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const AccountDetailScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`accountDetailScreen:${key}`);
  }

  const [bankAccountNameBottomSheet, setBankAccountNameBottomSheet] =
    useState<boolean>(false);

  const toggleCloseBankAccountName = () => {
    setBankAccountNameBottomSheet(!bankAccountNameBottomSheet);
  };

  const bankAccountNameList = [
    {
      key: "1",
      name: tr("currentAccount"),
    },
    {
      key: "2",
      name: tr("saving"),
    },
    {
      key: "3",
      name: tr("salaryAccount"),
    },
    {
      key: "4",
      name: tr("nRIAccount"),
    },
  ];

  const [selectBankAccountName, setSelectBankAccountName] = useState(
    tr("saving")
  );

  const accountDetailList = [
    {
      key: "1",
      title: tr("cif"),
      detail: "12345678921",
    },
    {
      key: "2",
      title: tr("ifsc"),
      detail: "SMART000S600",
    },
    {
      key: "3",
      title: tr("branchCode"),
      detail: "1235",
    },
    {
      key: "4",
      title: tr("currentAccount"),
      detail: "Andheri, Mumbai",
    },
    {
      key: "5",
      title: tr("branchName"),
      detail: "10/12/2020",
    },
    {
      key: "6",
      title: tr("mmid"),
      detail: "120546",
    },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
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
          {tr("account")}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => setBankAccountNameBottomSheet(true)}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: Default.fixPadding * 0.9,
              paddingHorizontal: Default.fixPadding * 1.2,
              marginVertical: Default.fixPadding * 2,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.primary,
              backgroundColor: Colors.white,
            }}
          >
            <Text
              style={{
                ...Fonts.Bold16primary,
                marginRight: isRtl ? 0 : Default.fixPadding,
                marginLeft: isRtl ? Default.fixPadding : 0,
              }}
            >
              {selectBankAccountName}
            </Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16black, overflow: "hidden" }}
            >
              Leslie Alexander
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold14grey,
                overflow: "hidden",
                marginTop: Default.fixPadding,
              }}
            >
              {tr("accountNumber")}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15black,
                marginTop: Default.fixPadding * 0.3,
              }}
            >
              SB-******1234
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-start" : "flex-end",
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
            >
              {tr("totalBalance")}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold20primary,
                marginTop: Default.fixPadding * 0.5,
              }}
            >
              $1000.00
            </Text>
          </View>
        </View>

        <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold18black,
              marginBottom: Default.fixPadding * 1.2,
            }}
          >
            {tr("accountDetail")}
          </Text>

          {accountDetailList.map((item) => {
            return (
              <View
                key={item.key}
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: Default.fixPadding * 1.5,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    textAlign: isRtl ? "right" : "left",
                    ...Fonts.SemiBold15grey,
                    marginRight: isRtl ? 0 : Default.fixPadding,
                    marginLeft: isRtl ? Default.fixPadding : 0,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    textAlign: isRtl ? "left" : "right",
                    ...Fonts.SemiBold15black,
                  }}
                >
                  {item.detail}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.push("statement/statementScreen")}
        style={styles.viewStateMentBtn}
      >
        <Text style={{ ...Fonts.Bold18white }}>{tr("viewStateMent")}</Text>
      </TouchableOpacity>

      <BottomSheet
        visible={bankAccountNameBottomSheet}
        onBackButtonPress={toggleCloseBankAccountName}
        onBackdropPress={toggleCloseBankAccountName}
      >
        <View style={styles.bottomSheet}>
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

const styles = StyleSheet.create({
  viewStateMentBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
  bottomSheet: {
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
