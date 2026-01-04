import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import SuccessDepositModal from "../../components/successDepositModal";
import { BottomSheet } from "react-native-btr";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const AddDepositScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`addDepositScreen:${key}`);
  }

  interface DepositPeriodItem {
    key: string;
    title: string;
  }

  const depositPeriodList: DepositPeriodItem[] = [
    {
      key: "1",
      title: "1 month",
    },
    {
      key: "2",
      title: "3 month",
    },
    {
      key: "3",
      title: "6 month",
    },
    {
      key: "4",
      title: "12 month",
    },
    {
      key: "5",
      title: "18 month",
    },
    {
      key: "6",
      title: "24 month",
    },
  ];

  const [selectDepositPeriod, setSelectDepositPeriod] = useState("18 month");

  const renderItemDepositPeriod = ({ item }: { item: DepositPeriodItem }) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectDepositPeriod(item.title)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: Default.fixPadding * 1.2,
          marginHorizontal: Default.fixPadding,
          marginBottom: Default.fixPadding * 2,
          borderRadius: 5,
          backgroundColor:
            selectDepositPeriod === item.title ? Colors.primary : Colors.white,
          ...Default.shadow,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            ...(selectDepositPeriod === item.title
              ? Fonts.SemiBold16white
              : Fonts.SemiBold16grey),
            overflow: "hidden",
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const [amount, setAmount] = useState<string>("");

  const [successDepositModal, setSuccessDepositModal] = useState(false);

  const [accountBottomSheet, setAccountBottomSheet] = useState<boolean>(false);

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
  const [selectedAccount, setSelectedAccount] = useState<string>();

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
          {tr("addDeposit")}
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
          paddingHorizontal: Default.fixPadding,
        }}
        ListHeaderComponent={
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold17black,
              marginTop: Default.fixPadding * 2,
              marginHorizontal: Default.fixPadding * 2,
              marginBottom: Default.fixPadding * 1.2,
            }}
          >
            {tr("depositPeriod")}
          </Text>
        }
        ListFooterComponent={
          <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold17black,
              }}
            >
              {tr("amount")}
            </Text>

            <View
              style={{
                marginBottom: Default.fixPadding * 0.5,
                ...styles.textInput,
              }}
            >
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="number-pad"
                placeholder={tr("enterDeposit")}
                placeholderTextColor={Colors.grey}
                selectionColor={Colors.primary}
                numberOfLines={1}
                style={{
                  padding: 0,
                  ...Fonts.SemiBold16black,
                  textAlign: isRtl ? "right" : "left",
                }}
              />
            </View>

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold14primary,
              }}
            >
              {tr("yourRate")}
            </Text>

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold17black,
                marginTop: Default.fixPadding * 2,
              }}
            >
              {tr("depositTo")}
            </Text>

            <TouchableOpacity
              onPress={() => setAccountBottomSheet(true)}
              style={{
                paddingVertical:
                  Platform.OS === "ios"
                    ? Default.fixPadding * 1.2
                    : Default.fixPadding * 1.5,
                marginTop: Default.fixPadding * 1.2,
                marginBottom: Default.fixPadding * 2,
                paddingHorizontal: Default.fixPadding * 1.5,
                borderRadius: 10,
                backgroundColor: Colors.white,
                ...Default.shadow,
              }}
            >
              <Text
                style={{
                  ...(selectedAccount
                    ? Fonts.SemiBold16black
                    : Fonts.SemiBold16grey),
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                {selectedAccount ? selectedAccount : tr("selectAmount")}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold17black,
              }}
            >
              {tr("uploadImage")}
            </Text>

            <View
              style={{
                ...styles.uploadImageCard,
                flexDirection: isRtl ? "row-reverse" : "row",
                marginTop: Default.fixPadding * 1.2,
              }}
            >
              <View style={styles.cameraCircle}>
                <Ionicons
                  name="camera-outline"
                  size={22}
                  color={Colors.primary}
                />
              </View>

              <Text
                numberOfLines={1}
                style={{
                  maxWidth: width * 0.65,
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.SemiBold15grey,
                  overflow: "hidden",
                  marginLeft: isRtl ? 0 : Default.fixPadding * 2,
                  marginRight: isRtl ? Default.fixPadding * 2 : 0,
                }}
              >
                {tr("frontSideImage")}
              </Text>
            </View>

            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                ...styles.uploadImageCard,
              }}
            >
              <View style={styles.cameraCircle}>
                <Ionicons
                  name="camera-outline"
                  size={22}
                  color={Colors.primary}
                />
              </View>

              <Text
                numberOfLines={1}
                style={{
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.SemiBold15grey,
                  overflow: "hidden",
                  marginLeft: isRtl ? 0 : Default.fixPadding * 2,
                  marginRight: isRtl ? Default.fixPadding * 2 : 0,
                  maxWidth: width * 0.65,
                }}
              >
                {tr("backSideImage")}
              </Text>
            </View>
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => setSuccessDepositModal(true)}
        style={styles.depositNowBtn}
      >
        <Text style={{ ...Fonts.Bold18white }}>{tr("depositNow")}</Text>
      </TouchableOpacity>

      <SuccessDepositModal
        visible={successDepositModal}
        successModalClose={() => setSuccessDepositModal(false)}
        okayClickHandle={() => {
          setSuccessDepositModal(false);
          navigation.pop();
        }}
      />

      <BottomSheet
        visible={accountBottomSheet}
        onBackButtonPress={() => setAccountBottomSheet(false)}
        onBackdropPress={() => setAccountBottomSheet(false)}
      >
        <View style={styles.bottomSheet}>
          {accountList.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => {
                  setSelectedAccount(item.name);
                  setAccountBottomSheet(false);
                }}
                style={{
                  alignItems: isRtl ? "flex-end" : "flex-start",
                  paddingHorizontal: Default.fixPadding * 1.4,
                  paddingVertical: Default.fixPadding * 0.9,
                  marginHorizontal: Default.fixPadding * 2,
                  marginTop: index === 0 ? Default.fixPadding * 2 : 0,
                  marginBottom: Default.fixPadding * 1.8,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <Text style={{ ...Fonts.Bold16black }}>{item.name}</Text>
                <Text
                  style={{
                    ...Fonts.SemiBold16black,
                    marginTop: Default.fixPadding * 0.6,
                  }}
                >
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

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding * 1.2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  depositNowBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
  uploadImageCard: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.1,
    marginBottom: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  cameraCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.extraLightGrey,
  },
  bottomSheet: {
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
