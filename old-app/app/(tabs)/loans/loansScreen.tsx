import {
  Text,
  View,
  ScrollView,
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
import DashedLine from "react-native-dashed-line";
import MyStatusBar from "../../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.85;

const LoansScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`loansScreen:${key}`);
  }

  interface LoanItem {
    key: string;
    image: ImageSourcePropType;
    reversImage: ImageSourcePropType;
    title: string;
    other: string;
  }

  const loanList: LoanItem[] = [
    {
      key: "1",
      image: Images.loan2,
      reversImage: require("../../../assets/images/loan4.png"),
      title: tr("makeEducation"),
      other: tr("lowestInterest"),
    },
    {
      key: "2",
      image: Images.loan1,
      reversImage: require("../../../assets/images/loan3.png"),
      title: tr("theRightChoiceCar"),
      other: tr("dreamCar"),
    },
  ];

  const renderItemLoan = ({ item }: { item: LoanItem }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push("educationLoan/educationLoanScreen")}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          marginHorizontal: Default.fixPadding,
          marginVertical: Default.fixPadding * 2,
          width: CARD_WIDTH,
          height: 150,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <View style={{ flex: 6 }}>
          <Image
            source={isRtl ? item.reversImage : item.image}
            style={{ resizeMode: "stretch", width: width / 2, height: 150 }}
          />
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            paddingRight: isRtl
              ? Default.fixPadding * 0.5
              : Default.fixPadding * 1.5,
            paddingLeft: isRtl
              ? Default.fixPadding * 1.5
              : Default.fixPadding * 0.5,
          }}
        >
          <Text
            numberOfLines={2}
            style={{ ...Fonts.Bold16primary, overflow: "hidden" }}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.Bold14grey,
              overflow: "hidden",
              marginTop: Default.fixPadding * 0.5,
            }}
          >
            {item.other}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.push("educationLoan/educationLoanScreen")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: Default.fixPadding * 0.5,
              marginTop: Default.fixPadding,
              width: 95,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.primary,
              backgroundColor: Colors.white,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold14primary, overflow: "hidden" }}
            >
              {tr("applyNow")}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  interface CurrentLoanItem {
    key: string;
    image: ImageSourcePropType;
    title: string;
    number: string;
    dollar: string;
    period: string;
    rate: string;
    EMI: string;
  }

  const currentLoanList: CurrentLoanItem[] = [
    {
      key: "1",
      image: Images.services12,
      title: tr("homeLoan"),
      number: "1234 4567 8956 1222",
      dollar: "$20000.00",
      period: "24 month",
      rate: "13% rate",
      EMI: "$1000.00",
    },
    {
      key: "2",
      image: Images.services13,
      title: tr("carLoan"),
      number: "1234 4567 8956 1222",
      dollar: "$10000.00",
      period: "12 month",
      rate: "10% rate",
      EMI: "$1000.00",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <ImageBackground
        source={Images.depositImage}
        style={{
          width: width,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.ExtraBold20white }}>{tr("loans")}</Text>
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          inverted={isRtl}
          horizontal
          pagingEnabled
          data={loanList}
          renderItem={renderItemLoan}
          scrollEventThrottle={1}
          snapToAlignment="center"
          decelerationRate={"fast"}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + Default.fixPadding * 2}
          contentContainerStyle={{ paddingHorizontal: Default.fixPadding }}
        />

        <DashedLine
          dashGap={2}
          dashLength={2}
          dashThickness={1.5}
          dashColor={Colors.primary}
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
              ...Fonts.Bold18black,
              marginBottom: Default.fixPadding * 1.2,
            }}
          >
            {tr("currentLoans")}
          </Text>
          {currentLoanList.map((item) => {
            return (
              <View
                key={item.key}
                style={{
                  marginBottom: Default.fixPadding * 2,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: Default.fixPadding * 1.4,
                    paddingBottom: Default.fixPadding * 1.8,
                    paddingHorizontal: Default.fixPadding * 1.8,
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
                        style={{ ...Fonts.Bold16black, overflow: "hidden" }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...Fonts.SemiBold14grey,
                          overflow: "hidden",
                          marginTop: Default.fixPadding * 0.3,
                        }}
                      >
                        {item.number}
                      </Text>
                    </View>
                  </View>

                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Bold16primary, maxWidth: 100 }}
                  >
                    {item.dollar}
                  </Text>
                </View>

                <DashedLine
                  dashGap={2}
                  dashLength={2}
                  dashThickness={1.5}
                  dashColor={Colors.primary}
                />

                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: Default.fixPadding,
                    paddingHorizontal: Default.fixPadding * 2,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: isRtl ? "flex-end" : "flex-start",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                    >
                      {tr("period")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold16black,
                        marginTop: Default.fixPadding * 0.3,
                      }}
                    >
                      {item.period}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: Default.fixPadding * 0.2,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                    >
                      {tr("rate")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold16black,
                        marginTop: Default.fixPadding * 0.3,
                      }}
                    >
                      {item.rate}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: isRtl ? "flex-start" : "flex-end",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                    >
                      {tr("eMI")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold16black,
                        marginTop: Default.fixPadding * 0.3,
                      }}
                    >
                      {item.EMI}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("loansStatement/loansStatementScreen", {
                      title: item.title,
                      image: item.image,
                    })
                  }
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: Default.fixPadding * 0.7,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: Colors.lightPink,
                  }}
                >
                  <Text style={{ ...Fonts.Bold16primary }}>
                    {tr("viewStatement")}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default LoansScreen;
