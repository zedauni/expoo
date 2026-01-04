import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Loader from "../../components/loader";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`registerScreen:${key}`);
  }

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  const [registerLoaderVisible, setRegisterLoaderVisible] = useState(false);

  const handleRegister = () => {
    setRegisterLoaderVisible(true);
    setTimeout(() => {
      setRegisterLoaderVisible(false);
      navigation.push("auth/otpScreen");
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
            {tr("register")}
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
            style={{
              maxHeight: height / 1.8,
              marginHorizontal: Default.fixPadding * 2,
              marginBottom: Default.fixPadding,
              borderRadius: 50,
              marginTop: Default.fixPadding * 3,
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

                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                    paddingVertical: Default.fixPadding * 1.2,
                    paddingHorizontal: Default.fixPadding * 1.5,
                    margin: Default.fixPadding * 2,
                    borderRadius: 10,
                    backgroundColor: Colors.white,
                    ...Default.shadow,
                  }}
                >
                  <Feather name="user" color={Colors.grey} size={18} />
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder={tr("name")}
                    placeholderTextColor={Colors.grey}
                    selectionColor={Colors.primary}
                    numberOfLines={1}
                    style={{
                      padding: 0,
                      ...Fonts.SemiBold16black,
                      flex: 1,
                      textAlign: isRtl ? "right" : "left",
                      marginHorizontal: Default.fixPadding * 1.2,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
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
                  <Feather name="phone" color={Colors.grey} size={18} />
                  <TextInput
                    value={number}
                    onChangeText={setNumber}
                    keyboardType="number-pad"
                    placeholder={tr("number")}
                    placeholderTextColor={Colors.grey}
                    selectionColor={Colors.primary}
                    numberOfLines={1}
                    style={{
                      padding: 0,
                      ...Fonts.SemiBold16black,
                      flex: 1,
                      textAlign: isRtl ? "right" : "left",
                      marginHorizontal: Default.fixPadding * 1.2,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
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
                  <Feather name="mail" color={Colors.grey} size={18} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholder={tr("email")}
                    placeholderTextColor={Colors.grey}
                    selectionColor={Colors.primary}
                    numberOfLines={1}
                    style={{
                      padding: 0,
                      ...Fonts.SemiBold16black,
                      flex: 1,
                      textAlign: isRtl ? "right" : "left",
                      marginHorizontal: Default.fixPadding * 1.2,
                    }}
                  />
                </View>
                <Loader visible={registerLoaderVisible} />
                <TouchableOpacity
                  onPress={handleRegister}
                  style={styles.registerBtn}
                >
                  <Text style={{ ...Fonts.Bold18white }}>{tr("register")}</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  registerBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    marginVertical: Default.fixPadding * 3,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
});
