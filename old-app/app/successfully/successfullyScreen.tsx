import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import DashedLine from "react-native-dashed-line";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const SuccessfullyScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`successfullyScreen:${key}`);
  }
  useEffect(() => {
    navigation.addListener("beforeRemove", (e: { preventDefault: () => void }) => {
      e.preventDefault();
      navigation.push("(tabs)");
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Ionicons name="checkmark-circle" size={102} color={Colors.green} />
          <Text
            style={{
              ...Fonts.Bold20black,
              textAlign: "center",
              marginTop: Default.fixPadding * 2,
            }}
          >
            {tr("successfully")}
          </Text>
          <Text
            style={{ ...Fonts.Bold14grey, marginTop: Default.fixPadding * 0.5 }}
          >
            5 feb 2022 at 9.00am
          </Text>
        </View>
        <View
          style={{
            marginTop: Default.fixPadding * 2.5,
            marginHorizontal: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              paddingTop: Default.fixPadding * 1.6,
              paddingBottom: Default.fixPadding * 2,
              paddingHorizontal: Default.fixPadding * 2,
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
                style={{ ...Fonts.SemiBold16grey, overflow: "hidden" }}
              >
                {tr("transferred")}
              </Text>
              <Text
                style={{
                  ...Fonts.Bold14black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                Virat Sharma
              </Text>
            </View>
            <View
              style={{
                flex: 1.5,
                alignItems: isRtl ? "flex-end" : "flex-start",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16grey,
                  overflow: "hidden",
                }}
              >
                {tr("from")}
              </Text>
              <Text
                style={{
                  textAlign: isRtl ? "right" : "left",
                  ...Fonts.Bold14black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                SB 1234 5647 8956 5654
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
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: Default.fixPadding * 2,
              paddingBottom: Default.fixPadding * 1.6,
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
                style={{ ...Fonts.SemiBold16grey, overflow: "hidden" }}
              >
                {tr("remark")}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Bold14black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                Rent
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
                style={{ ...Fonts.SemiBold16grey, overflow: "hidden" }}
              >
                {tr("amount")}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Bold14black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                $1000.00
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
                style={{
                  ...Fonts.SemiBold16grey,
                  overflow: "hidden",
                }}
              >
                {tr("paymentMode")}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.Bold14black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                IMPS
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={() => navigation.push("(tabs)")}
      >
        <Text
          style={{
            ...Fonts.Bold16black,
            margin: Default.fixPadding,
            textAlign: "center",
          }}
        >
          {tr("backToHome")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessfullyScreen;
