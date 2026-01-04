import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import moment from "moment";
import { BottomSheet } from "react-native-btr";
import DashedLine from "react-native-dashed-line";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import BankAccountName from "../../components/bankAccountName";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StartEndCalendarPicker, {
  DateData,
} from "../../components/startEndCalendarPicker";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const StatementScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`statementScreen:${key}`);
  }

  const [bankAccountNameBottomSheet, setBankAccountNameBottomSheet] =
    useState(false);

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
      name: tr("savingAccount"),
    },
    {
      key: "3",
      name: tr("salaryAccount"),
    },
    {
      key: "4",
      name: tr("nriAccount"),
    },
  ];

  const [selectBankAccountName, setSelectBankAccountName] = useState(
    tr("savingAccount")
  );

  const transactionList = [
    {
      key: "1",
      image: require("../../assets/images/Services2.png"),
      name: "Jeklin shah",
      other: "Money transfer",
      dollar: "-$140",
      transaction: false,
    },
    {
      key: "2",
      image: require("../../assets/images/transaction1.png"),
      name: "Paypal",
      other: "Deposits",
      dollar: "-$140",
      transaction: true,
    },
    {
      key: "3",
      image: require("../../assets/images/Services10.png"),
      name: "+91 987654321",
      other: "Mobile payment",
      dollar: "-$150",
      transaction: false,
    },
    {
      key: "4",
      image: require("../../assets/images/transaction3.png"),
      name: "Atm",
      other: "Cash withdrawal",
      dollar: "-$140",
      transaction: false,
    },
    {
      key: "5",
      image: require("../../assets/images/Services2.png"),
      name: "Jane Cooper",
      other: "Money transfer",
      dollar: "+$640",
      transaction: true,
    },
    {
      key: "6",
      image: require("../../assets/images/Services5.png"),
      name: "Electricity",
      other: "bill payment",
      dollar: "-$540",
      transaction: false,
    },
    {
      key: "7",
      image: require("../../assets/images/transaction4.png"),
      name: "eBay",
      other: "Online payment",
      dollar: "-$190",
      transaction: false,
    },
    {
      key: "8",
      image: require("../../assets/images/transaction2.png"),
      name: "Amazon",
      other: "Online payment",
      dollar: "-$440",
      transaction: false,
    },
  ];

  const today = moment().format("YYYY-MM-DD");

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
          numberOfLines={1}
          style={{
            flex: 1,
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold20black,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("statement")}
        </Text>

        <Feather name="download" size={22} color={Colors.primary} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingHorizontal: Default.fixPadding * 1.5,
            paddingVertical: Default.fixPadding * 0.9,
            margin: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.extraLightPink,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
            }}
          >
            <TouchableOpacity
              onPress={() => setBankAccountNameBottomSheet(true)}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Text numberOfLines={1} style={{ ...Fonts.Bold14grey }}>
                {selectBankAccountName}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={Colors.grey}
                style={{ marginHorizontal: Default.fixPadding * 0.5 }}
              />
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold16black,
                marginTop: Default.fixPadding * 0.5,
              }}
            >
              SB-*******1234
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

        <DashedLine
          dashGap={2}
          dashLength={2}
          dashThickness={1.5}
          dashColor={Colors.grey}
        />

        <View
          style={{
            marginTop: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold16black,
            }}
          >
            {tr("selectDate")}
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setStartDateCalendarModal(true)}
              style={{
                flex: 1,
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Default.fixPadding * 1.2,
                paddingHorizontal: Default.fixPadding * 0.5,
                borderRadius: 5,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <MaterialCommunityIcons
                name="calendar-range"
                size={20}
                color={Colors.primary}
              />
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: 95,
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.SemiBold15black,
                  marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              >
                {startDate}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setEndDateCalendarModal(true)}
              style={{
                flex: 1,
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Default.fixPadding * 1.2,
                paddingHorizontal: Default.fixPadding * 0.5,
                marginHorizontal: Default.fixPadding * 1.5,
                borderRadius: 5,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <MaterialCommunityIcons
                name="calendar-range"
                size={20}
                color={Colors.primary}
              />
              <Text
                numberOfLines={1}
                style={{
                  maxWidth: 95,
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.SemiBold15black,
                  marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
                }}
              >
                {endDate}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                width: 66,
                justifyContent: "center",
                alignItems: "center",
                padding: Default.fixPadding * 1.2,
                borderRadius: 5,
                backgroundColor: Colors.primary,
                ...Default.shadowBtn,
              }}
            >
              <Text
                numberOfLines={1}
                style={{ ...Fonts.Bold16white, overflow: "hidden" }}
              >
                {tr("go")}
              </Text>
            </View>
          </View>
        </View>

        <DashedLine
          dashGap={2}
          dashLength={2}
          dashThickness={1.5}
          dashColor={Colors.grey}
        />
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold16black,
            marginTop: Default.fixPadding * 2,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("transaction")}
        </Text>

        {transactionList.map((item, index) => {
          return (
            <View
              key={item.key}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: Default.fixPadding * 1.2,
                paddingHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 2,
                marginTop: index == 0 ? Default.fixPadding : 0,
                marginHorizontal: Default.fixPadding * 2,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    backgroundColor: Colors.extraLightGrey,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={item.image}
                    style={{
                      width: 22,
                      height: 22,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: isRtl ? "flex-end" : "flex-start",
                    paddingHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Bold15black, overflow: "hidden" }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold12grey,
                      overflow: "hidden",
                      marginTop: Default.fixPadding * 0.3,
                    }}
                  >
                    {item.other}
                  </Text>
                </View>
              </View>

              <Text
                numberOfLines={1}
                style={{
                  ...(item.transaction == true
                    ? Fonts.Bold15green
                    : Fonts.Bold15red),
                  overflow: "hidden",
                  maxWidth: 100,
                }}
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
        <View style={styles.bottomSheet}>
          {bankAccountNameList.map((item, index) => {
            return (
              <BankAccountName
                key={item.key}
                name={item.name}
                isFirst={index == 0}
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
          style={{ flex: 1 }}
        >
          <View style={styles.mainModalView}>
            <TouchableOpacity activeOpacity={1} style={styles.subModalView}>
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
          style={{ flex: 1 }}
        >
          <View style={styles.mainModalView}>
            <TouchableOpacity activeOpacity={1} style={styles.subModalView}>
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

const styles = StyleSheet.create({
  bottomSheet: {
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  mainModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.transparentBlack,
  },
  subModalView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.5,
    width: width * 0.9,
    borderRadius: 8,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
