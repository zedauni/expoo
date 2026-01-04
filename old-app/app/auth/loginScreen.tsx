import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import IntlPhoneInput from "react-native-intl-phone-input";
import { useTranslation } from "react-i18next";
import Loader from "../../components/loader";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`loginScreen:${key}`);
  }
  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissVisibleToast = () => setVisibleToast(!visibleToast);

  const [exitApp, setExitApp] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === "android") {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            setVisibleToast(true);
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [exitApp])
  );

  const [loginLoaderVisible, setLoginLoaderVisible] = useState(false);

  const handleLoginBtn = () => {
    setLoginLoaderVisible(true);
    setTimeout(() => {
      setLoginLoaderVisible(false);
      navigation.push("auth/registerScreen");
    }, 800);
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

        <Text
          style={{
            ...Fonts.Bold25white,
            textAlign: "center",
            marginTop: Default.fixPadding * 6,
          }}
        >
          {tr("login")}
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "height" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
          style={{
            maxHeight: height / 1.8,
            marginTop: Default.fixPadding * 3.2,
            marginBottom: Default.fixPadding * 2,
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
                  marginVertical: Default.fixPadding * 3,
                }}
              />
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ ...Fonts.Bold18black }}>
                  {tr("welcomeBack")}
                </Text>
                <Text style={{ ...Fonts.SemiBold14grey }}>{tr("happy")}</Text>
              </View>

              <IntlPhoneInput
                defaultCountry="IN"
                closeText={tr("close")}
                filterText={tr("search")}
                placeholder={tr("mobileNumber")}
                placeholderTextColor={Colors.grey}
                flagStyle={{
                  height: 0,
                  width: 0,
                }}
                inputProps={{
                  selectionColor: Colors.primary,
                }}
                modalCountryItemCountryNameStyle={{
                  ...Fonts.SemiBold16black,
                }}
                closeButtonStyle={{
                  ...Fonts.SemiBold16black,
                  backgroundColor: Colors.primary,
                }}
                dialCodeTextStyle={{
                  ...Fonts.SemiBold16black,
                  paddingRight: Default.fixPadding * 1.2,
                }}
                containerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: Default.fixPadding,
                  paddingHorizontal: Default.fixPadding * 1.5,
                  marginHorizontal: Default.fixPadding * 2,
                  marginVertical: Default.fixPadding * 4,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  ...Default.shadow,
                }}
                phoneInputStyle={{
                  padding: 0,
                  ...Fonts.SemiBold16black,
                  textAlign: isRtl ? "right" : "left",
                  paddingHorizontal: isRtl ? 0 : Default.fixPadding * 1.2,
                  borderLeftWidth: 2,
                  borderLeftColor: Colors.lightGrey,
                }}
              />
              <Loader visible={loginLoaderVisible} />
              <TouchableOpacity
                onPress={handleLoginBtn}
                style={styles.loginBtn}
              >
                <Text style={{ ...Fonts.Bold18white }}>{tr("login")}</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <SnackbarToast
          title={tr("tapBack")}
          visible={visibleToast}
          onDismiss={onDismissVisibleToast}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 3,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
});
