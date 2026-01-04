import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import DashedLine from "react-native-dashed-line";
import MyStatusBar from "../../components/myStatusBar";
import { useLocalSearchParams, useNavigation } from "expo-router";

const LoansStatementScreen = () => {
  const { title, image } = useLocalSearchParams();
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`loansStatementScreen:${key}`);
  }

  const recentTransactionList = [
    {
      key: "1",
      title: "EMI debited",
      date: "12 may 2019",
      dollar: "-$800.00",
    },
    {
      key: "2",
      title: "EMI debited",
      date: "12 may 2019",
      dollar: "-$800.00",
    },
    {
      key: "3",
      title: "EMI debited",
      date: "12 april 2019",
      dollar: "-$800.00",
    },
    {
      key: "4",
      title: "EMI debited",
      date: "12 march 2019",
      dollar: "-$800.00",
    },
    {
      key: "5",
      title: "EMI debited",
      date: "12 Feb 2019",
      dollar: "-$800.00",
    },
    {
      key: "6",
      title: "EMI debited",
      date: "12 Jan 2019",
      dollar: "-$800.00",
    },
    {
      key: "7",
      title: "EMI debited",
      date: "12 Dec 2018",
      dollar: "-$800.00",
    },
    {
      key: "8",
      title: "EMI debited",
      date: "12 Nov 2018",
      dollar: "-$800.00",
    },
    {
      key: "9",
      title: "EMI debited",
      date: "12 Oct 2018",
      dollar: "-$800.00",
    },
    {
      key: "10",
      title: "EMI debited",
      date: "12Sep 2018",
      dollar: "-$800.00",
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
          {`${title} ${tr("statement")}`}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: Default.fixPadding * 2,
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
                  source={image as any}
                  resizeMode="contain"
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
                  {title}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14grey,
                    overflow: "hidden",
                    marginTop: Default.fixPadding * 0.3,
                  }}
                >
                  1234 4567 8956 1222
                </Text>
              </View>
            </View>

            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16primary, maxWidth: 100 }}
            >
              $20000.00
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
                24 month
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
                13% rate
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
                $1000.00
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.SemiBold16grey,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("recentTransaction")}
        </Text>

        {recentTransactionList.map((item, index) => {
          return (
            <View
              key={item.key}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: Default.fixPadding * 1.5,
                paddingHorizontal: Default.fixPadding * 2,
                borderTopColor: index === 0 ? "transparent" : Colors.lightGrey,
                borderTopWidth: index === 0 ? 0 : 0.8,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: isRtl ? "flex-end" : "flex-start",
                }}
              >
                <Text style={{ ...Fonts.Bold15black }}>{item.title}</Text>
                <Text
                  style={{
                    ...Fonts.Bold12grey,
                    marginTop: Default.fixPadding * 0.3,
                  }}
                >
                  {item.date}
                </Text>
              </View>

              <Text
                numberOfLines={1}
                style={{ ...Fonts.Bold15red, maxWidth: 100 }}
              >
                {item.dollar}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default LoansStatementScreen;
