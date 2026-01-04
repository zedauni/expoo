import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OtpInput } from "react-native-otp-entry";
import Loader from "../../components/loader";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const OtpScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`otpScreen:${key}`);
  }

  const [verifyLoaderVisible, setVerifyLoaderVisible] = useState(false);

  const handleVerify = () => {
    setVerifyLoaderVisible(true);
    setTimeout(() => {
      setVerifyLoaderVisible(false);
      navigation.push("auth/pinScreen");
    }, 800);
  };

  const handleTextChange = (otp: string) => {
    if (otp.length === 4) {
      return handleVerify();
    }
  };

  const screenBackground = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={{
              width: width,
              height: height * 0.3,
            }}
          />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <Image
              source={require("../../assets/images/splashIcon.png")}
              style={{ width: 78, height: 78, tintColor: Colors.primary }}
            />
            <Text style={{ ...Fonts.SemiBold25primary }}>STAR BANK</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        {screenBackground()}
        <View>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={{
              alignSelf: isRtl ? "flex-end" : "flex-start",
              paddingHorizontal: Default.fixPadding * 2,
              paddingVertical: Default.fixPadding * 1.2,
            }}
          >
            <Ionicons
              name={isRtl ? "arrow-forward" : "arrow-back"}
              size={25}
              color={Colors.white}
            />
          </TouchableOpacity>

          <Text
            style={{
              ...Fonts.Bold25white,
              textAlign: "center",
              marginTop: Default.fixPadding * 0.8,
            }}
          >
            {tr("verification")}
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
            style={{
              maxHeight: height / 1.8,
              marginTop: Default.fixPadding * 3.8,
              marginBottom: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 2,
              borderRadius: 50,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <View
              style={{
                overflow: "hidden",
                borderRadius: 50,
              }}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
              >
                <Image
                  source={require("../../assets/images/image.png")}
                  style={{
                    alignSelf: "center",
                    width: 140,
                    height: 140,
                    marginTop: Default.fixPadding,
                  }}
                />
                <Text
                  style={{
                    ...Fonts.SemiBold14grey,
                    textAlign: "center",
                    marginHorizontal: Default.fixPadding * 3,
                  }}
                >
                  {tr("pleaseEnter")}
                </Text>

                <View
                  style={{
                    marginHorizontal: Default.fixPadding * 4.5,
                    marginVertical: Default.fixPadding * 5.6,
                  }}
                >
                  <OtpInput
                    numberOfDigits={4}
                    onTextChange={handleTextChange}
                    theme={{
                      pinCodeContainerStyle: {
                        borderWidth: 0,
                        width: 48,
                        height: 48,
                        borderRadius: 10,
                        backgroundColor: Colors.white,
                        ...Default.shadow,
                      },
                      pinCodeTextStyle: { ...Fonts.SemiBold22primary },
                      focusedPinCodeContainerStyle: {
                        borderWidth: 0,
                        borderRadius: 10,
                      },
                      focusStickStyle: { backgroundColor: Colors.primary },
                    }}
                  />
                </View>
                <Loader visible={verifyLoaderVisible} />
                <TouchableOpacity
                  onPress={handleVerify}
                  style={styles.continueBtn}
                >
                  <Text style={{ ...Fonts.Bold18white }}>{tr("verify")}</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    ...Fonts.Bold15grey,
                    textAlign: "center",
                    marginBottom: Default.fixPadding * 2,
                  }}
                >
                  {tr("resend")}
                </Text>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  continueBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
});
