import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`privacyPolicyScreen:${key}`);
  }

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
          {tr("privacyPolicy")}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: Default.fixPadding * 2,
          }}
        >
          <Image
            source={require("../../assets/images/splashIcon.png")}
            style={{ width: 78, height: 78, tintColor: Colors.primary }}
          />
          <Text
            style={{
              ...Fonts.SemiBold25primary,
              marginTop: Default.fixPadding * 0.5,
            }}
          >
            STAR BANK
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
          }}
        >
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold14grey,
            }}
          >
            {tr("mainDescription")}
          </Text>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold14grey,
              marginVertical: Default.fixPadding,
            }}
          >
            {tr("subDescription")}
          </Text>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold14grey,
            }}
          >
            {tr("mainDescription")}
          </Text>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold14grey,
              marginVertical: Default.fixPadding,
            }}
          >
            {tr("subDescription")}
          </Text>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold14grey,
            }}
          >
            {tr("subDescription")}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
