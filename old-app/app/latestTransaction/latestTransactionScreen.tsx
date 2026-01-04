import { Text, View, FlatList, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts, Images } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const LatestTransactionScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`latestTransactionScreen:${key}`);
  }

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
      key: "1",
      image: Images.services2,
      name: "Jeklin shah",
      other: "Money transfer",
      dollar: "-$140",
      transaction: false,
    },
    {
      key: "2",
      image: Images.transaction1,
      name: "Paypal",
      other: "Deposits",
      dollar: "-$140",
      transaction: true,
    },
    {
      key: "3",
      image: Images.services10,
      name: "+91 987654321",
      other: "Mobile payment",
      dollar: "-$150",
      transaction: false,
    },
    {
      key: "4",
      image: Images.transaction3,
      name: "Atm",
      other: "Cash withdrawal",
      dollar: "-$140",
      transaction: false,
    },
    {
      key: "5",
      image: Images.services2,
      name: "Jane Cooper",
      other: "Money transfer",
      dollar: "+$640",
      transaction: true,
    },
    {
      key: "6",
      image: Images.services5,
      name: "Electricity",
      other: "bill payment",
      dollar: "-$540",
      transaction: false,
    },
    {
      key: "7",
      image: Images.transaction1,
      name: "Paypal",
      other: "Deposits",
      dollar: "-$140",
      transaction: true,
    },
    {
      key: "8",
      image: Images.transaction4,
      name: "eBay",
      other: "Online payment",
      dollar: "-$190",
      transaction: false,
    },
    {
      key: "9",
      image: Images.transaction2,
      name: "Amazon",
      other: "Online payment",
      dollar: "-$440",
      transaction: false,
    },
    {
      key: "10",
      image: Images.transaction3,
      name: "Atm",
      other: "Cash withdrawal",
      dollar: "-$140",
      transaction: false,
    },
    {
      key: "11",
      image: Images.services10,
      name: "+91 987654321",
      other: "Mobile payment",
      dollar: "-$100",
      transaction: false,
    },
  ];

  const renderItem = ({ item }: { item: TransactionItem }) => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.2,
          paddingHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
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
                marginTop: Default.fixPadding * 0.3,
                overflow: "hidden",
              }}
            >
              {item.other}
            </Text>
          </View>
        </View>

        <Text
          numberOfLines={1}
          style={{
            ...(item.transaction === true
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
          style={{
            ...Fonts.Bold20black,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("transaction")}
        </Text>
      </View>

      <FlatList
        data={transactionList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
      />
    </View>
  );
};

export default LatestTransactionScreen;
