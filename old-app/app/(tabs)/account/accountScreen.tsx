import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../../constants/styles";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import LogoutModal from "../../../components/logoutModal";
import MyStatusBar from "../../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const AccountScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`accountScreen:${key}`);
  }

  const [logoutModal, setLogoutModal] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <ImageBackground
        source={require("../../../assets/images/depositImage.png")}
        resizeMode="cover"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: width,
          height: 80,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.ExtraBold20white }}>{tr("account")}</Text>
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingHorizontal: Default.fixPadding * 2,
            paddingVertical: Default.fixPadding * 1.2,
            marginBottom: Default.fixPadding * 2,
            backgroundColor: Colors.extraLightGrey,
            ...Default.shadow,
          }}
        >
          <Image
            source={require("../../../assets/images/profile.png")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />

          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              paddingHorizontal: Default.fixPadding,
            }}
          >
            <Text numberOfLines={1} style={{ ...Fonts.Bold16black }}>
              Leslie Alexander
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold14grey,
                marginTop: Default.fixPadding * 0.2,
              }}
            >
              +91 1234567890
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.push("editProfile/editProfileScreen")}
          >
            <Feather name="edit" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.push("nearBy/nearByScreen", { title: tr("nearbyBank") })
          }
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.mainTouchableOpacity,
          }}
        >
          <View style={styles.circle}>
            <MaterialCommunityIcons
              name="bank-outline"
              size={20}
              color={Colors.primary}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("nearbyBank")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.push("nearBy/nearByScreen", { title: tr("nearbyATMs") })
          }
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.mainTouchableOpacity,
          }}
        >
          <View style={styles.circle}>
            <Octicons name="credit-card" size={18} color={Colors.primary} />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("nearbyATMs")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push("changePin/changePinScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.mainTouchableOpacity,
          }}
        >
          <View style={styles.circle}>
            <Octicons name="pin" size={18} color={Colors.primary} />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("changePin")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push("language/languageScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.mainTouchableOpacity,
          }}
        >
          <View style={styles.circle}>
            <Fontisto name="world-o" size={18} color={Colors.primary} />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("language")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push("privacyPolicy/privacyPolicyScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.mainTouchableOpacity,
          }}
        >
          <View style={styles.circle}>
            <MaterialCommunityIcons
              name="shield-alert-outline"
              size={20}
              color={Colors.primary}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("PrivacyPolicy")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push("termsCondition/termsConditionScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.mainTouchableOpacity,
          }}
        >
          <View style={styles.circle}>
            <AntDesign name="profile" size={18} color={Colors.primary} />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("termsCondition")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.push("customerSupport/customerSupportScreen")
          }
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.mainTouchableOpacity,
          }}
        >
          <View style={styles.circle}>
            <AntDesign
              name="customerservice"
              size={18}
              color={Colors.primary}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("customerSupport")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setLogoutModal(true)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.mainTouchableOpacity,
          }}
        >
          <View style={styles.circle}>
            <Feather name="log-out" size={18} color={Colors.primary} />
          </View>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold15black,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("logout")}
          </Text>
        </TouchableOpacity>
        <LogoutModal
          visible={logoutModal}
          logoutModalClose={() => setLogoutModal(false)}
          yesClickHandler={() => {
            navigation.push("auth/loginScreen");
            setLogoutModal(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  mainTouchableOpacity: {
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 2.5,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lightGrey,
  },
});
