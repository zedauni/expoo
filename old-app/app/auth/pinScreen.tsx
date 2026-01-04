import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Image,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OtpInput } from "react-native-otp-entry";
import Loader from "../../components/loader";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const PinScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`pinScreen:${key}`);
  }

  const [continueLoaderVisible, setContinueLoaderVisible] = useState(false);

  const handleContinue = () => {
    setContinueLoaderVisible(true);
    setTimeout(() => {
      setContinueLoaderVisible(false);
      navigation.push("(tabs)");
    }, 1500);
  };

  const handleTextChange = (otp: string) => {
    if (otp.length === 4) {
      return handleContinue();
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
            {tr("enterPin")}
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
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Default.fixPadding * 3.5,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.Bold22black,
                      marginBottom: Default.fixPadding * 0.5,
                    }}
                  >
                    {tr("welcome")}
                  </Text>
                  <Text
                    style={{
                      ...Fonts.SemiBold16black,
                      textAlign: "center",
                      maxWidth: "50%",
                    }}
                  >
                    {tr("enterDigit")}
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: Default.fixPadding * 4.5,
                    marginVertical: Default.fixPadding * 6,
                  }}
                >
                  <OtpInput
                    numberOfDigits={4}
                    onTextChange={handleTextChange}
                    secureTextEntry={true}
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

                <Loader visible={continueLoaderVisible} />
                <TouchableOpacity
                  onPress={handleContinue}
                  style={styles.continueBtn}
                >
                  <Text style={{ ...Fonts.Bold18white }}>{tr("continue")}</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  continueBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
});
