import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts, Images } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const ServicesScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`servicesScreen:${key}`);
  }

  interface ServiceItem {
    key: string;
    image: ImageSourcePropType;
    title: string;
  }

  const servicesList: ServiceItem[] = [
    {
      key: "1",
      image: Images.services1,
      title: tr("account"),
    },
    {
      key: "2",
      image: Images.services2,
      title: tr("fundTransfer"),
    },
    {
      key: "3",
      image: Images.services3,
      title: tr("statement"),
    },
    {
      key: "4",
      image: Images.primaryDeposit,
      title: tr("deposit"),
    },
    {
      key: "5",
      image: Images.primaryLoans,
      title: tr("loans"),
    },
    {
      key: "6",
      image: Images.services7,
      title: tr("cards"),
    },
    {
      key: "7",
      image: Images.services5,
      title: tr("billPay"),
    },
    {
      key: "8",
      image: Images.services4,
      title: tr("scan"),
    },
    {
      key: "9",
      image: Images.services8,
      title: tr("mutualFund"),
    },
    {
      key: "10",
      image: Images.services11,
      title: tr("insurance"),
    },
    {
      key: "11",
      image: Images.services9,
      title: tr("shopOffer"),
    },
    {
      key: "12",
      image: Images.services10,
      title: tr("recharge"),
    },
  ];

  const servicesClickHandler = (index: number) => {
    if (index == 0) {
      return navigation.push("accountDetail/accountDetailScreen");
    } else if (index == 1) {
      return navigation.push("fundTransfer/fundTransferScreen");
    } else if (index == 2) {
      return navigation.push("statement/statementScreen");
    } else if (index == 3) {
      return navigation.navigate("(tabs)", { screen: "deposit/depositScreen" });
    } else if (index == 4) {
      return navigation.navigate("(tabs)", { screen: "loans/loansScreen" });
    }
  };

  const renderItemServices = ({ item, index }: { item: ServiceItem; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={index > 4 ? true : false}
        onPress={() => servicesClickHandler(index)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
          paddingHorizontal: Default.fixPadding * 0.5,
          marginHorizontal: Default.fixPadding,
          marginBottom: Default.fixPadding * 2,
          maxWidth: width / 3 - 25,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <Image
          resizeMode="contain"
          source={item.image}
          style={{ width: 30, height: 30 }}
        />
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.Bold15primary,
            overflow: "hidden",
            marginTop: Default.fixPadding * 0.5,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
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
          {tr("services")}
        </Text>
      </View>

      <FlatList
        numColumns={3}
        data={servicesList}
        renderItem={renderItemServices}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: Default.fixPadding * 2,
          paddingHorizontal: Default.fixPadding,
        }}
      />
    </View>
  );
};

export default ServicesScreen;
