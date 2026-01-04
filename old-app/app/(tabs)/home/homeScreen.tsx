import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts, Images } from "../../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyStatusBar from "../../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`homeScreen:${key}`);
  }

  interface AccountDetailItem {
    key: string;
    name: string;
    balance: string;
    acNumber: string;
  }

  const accountDetailList: AccountDetailItem[] = [
    {
      key: "1",
      name: "Saving account",
      balance: "$15000",
      acNumber: "A/c no xxxxxxx785",
    },
    {
      key: "2",
      name: "Current account",
      balance: "$5000",
      acNumber: "A/c no xxxxxxx456",
    },
  ];

  const renderItemAccountDetail = ({ item }: { item: AccountDetailItem }) => {
    return (
      <ImageBackground
        resizeMode="stretch"
        source={Images.image2}
        style={{
          marginVertical: Default.fixPadding * 3,
          marginHorizontal: Default.fixPadding,
          width: CARD_WIDTH,
          height: 120,
        }}
      >
        <View
          style={{
            alignItems: isRtl ? "flex-end" : "flex-start",
            padding: Default.fixPadding * 1.7,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold18extraLightRegularGrey }}
          >
            {`${tr("totalBalance")} : `}
            <Text style={{ ...Fonts.Bold22extraLightRegularGrey }}>
              {item.balance}
            </Text>
          </Text>

          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold14extraLightPink,
              marginTop: Default.fixPadding * 1.5,
            }}
          >
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.Bold14extraLightPink,
              marginTop: Default.fixPadding * 0.3,
            }}
          >
            {item.acNumber}
          </Text>
        </View>
      </ImageBackground>
    );
  };

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
      image: Images.services5,
      title: tr("billPay"),
    },
    {
      key: "5",
      image: Images.services4,
      title: tr("scan"),
    },
    {
      key: "6",
      image: Images.services6,
      title: tr("more"),
    },
  ];

  const servicesClickHandler = (index: number) => {
    if (index == 0) {
      return navigation.push("accountDetail/accountDetailScreen");
    } else if (index == 1) {
      return navigation.push("fundTransfer/fundTransferScreen");
    } else if (index == 2) {
      return navigation.push("statement/statementScreen");
    } else if (index == 5) {
      return navigation.push("services/servicesScreen");
    }
  };

  const renderItemServices = ({ item, index }: { item: ServiceItem; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={index == 3 || index == 4 ? true : false}
        onPress={() => servicesClickHandler(index)}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 2,
          paddingHorizontal: Default.fixPadding * 0.3,
          marginHorizontal: Default.fixPadding,
          marginBottom: Default.fixPadding * 2,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <Image source={item.image} style={{ width: 30, height: 30 }} />
        <Text
          numberOfLines={1}
          style={{
            ...(index === 5 ? Fonts.Bold15grey : Fonts.Bold15primary),
            overflow: "hidden",
            marginTop: Default.fixPadding * 0.5,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

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
      image: Images.transaction2,
      name: "Amazon",
      other: "Online payment",
      dollar: "-$140",
      transaction: false,
    },
  ];

  const ListFooterComponent = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...Fonts.Bold18black,
            }}
          >
            {tr("transaction")}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.push("latestTransaction/latestTransactionScreen")
            }
          >
            <Text
              numberOfLines={1}
              style={{ maxWidth: 100, ...Fonts.Bold14grey }}
            >
              {tr("seeAll")}
            </Text>
          </TouchableOpacity>
        </View>
        {transactionList.map((item) => {
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
                  <Text numberOfLines={1} style={{ ...Fonts.Bold15black }}>
                    {item.name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold12grey,
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
                  ...(item.transaction === true
                    ? Fonts.Bold15green
                    : Fonts.Bold15red),
                  maxWidth: 100,
                }}
              >
                {item.dollar}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
        <Image
          source={Images.homeImage}
          style={{ width: width, height: 220 }}
        />
        <View style={{ position: "absolute" }}>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: Default.fixPadding * 1.2,
              paddingHorizontal: Default.fixPadding * 2,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Image
                source={Images.splashIcon}
                style={{ width: 25, height: 25 }}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.Bold20white,
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              >
                STAR BANK
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.push("notification/notificationScreen")}
            >
              <Ionicons
                name="notifications-outline"
                size={25}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            inverted={isRtl}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            decelerationRate={"fast"}
            scrollEventThrottle={1}
            data={accountDetailList}
            keyExtractor={(item) => item.key}
            renderItem={renderItemAccountDetail}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + Default.fixPadding * 1.4}
            contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
          />
        </View>

        <FlatList
          numColumns={3}
          data={servicesList}
          keyExtractor={(item) => item.key}
          renderItem={renderItemServices}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ paddingHorizontal: Default.fixPadding }}
          ListHeaderComponent={() => (
            <Text
              style={{
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold18black,
                marginTop: Default.fixPadding * 1.5,
                marginHorizontal: Default.fixPadding * 2,
                marginBottom: Default.fixPadding,
              }}
            >
              {tr("services")}
            </Text>
          )}
          ListFooterComponent={<ListFooterComponent />}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
