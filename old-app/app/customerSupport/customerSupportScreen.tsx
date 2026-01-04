import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loader from "../../components/loader";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const CustomerSupportScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`customerSupportScreen:${key}`);
  }

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();

  const [submitLoaderModal, setSubmitLoaderModal] = useState<boolean>(false);

  const handleSubmit = () => {
    setSubmitLoaderModal(true);
    setTimeout(() => {
      setSubmitLoaderModal(false);
      navigation.pop();
    }, 800);
  };

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
          {tr("customerSupport")}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: Default.fixPadding * 2,
          }}
        >
          <Image
            source={require("../../assets/images/contactImage.png")}
            style={{ resizeMode: "contain", width: 153, height: 153 }}
          />
          <Text
            style={{
              ...Fonts.SemiBold18black,
              textAlign: "center",
              marginTop: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 4,
            }}
          >
            {tr("weAreHere")}
          </Text>
        </View>
        <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold17black,
            }}
          >
            {tr("name")}
          </Text>
          <View style={{ ...styles.textInput }}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder={tr("enterName")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              numberOfLines={1}
              style={{
                padding: 0,
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold15black,
              }}
            />
          </View>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold17black,
            }}
          >
            {tr("email")}
          </Text>
          <View style={{ ...styles.textInput }}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder={tr("enterEmail")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              numberOfLines={1}
              style={{
                padding: 0,
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold15black,
              }}
            />
          </View>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold17black,
            }}
          >
            {tr("message")}
          </Text>
          <View style={{ ...styles.textInput }}>
            <TextInput
              value={message}
              multiline={true}
              numberOfLines={7}
              textAlignVertical="top"
              onChangeText={setMessage}
              placeholder={tr("enterMessage")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              style={{
                padding: 0,
                textAlign: isRtl ? "right" : "left",
                height: 144,
                ...Fonts.SemiBold15black,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Loader visible={submitLoaderModal} />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
        <Text style={{ ...Fonts.Bold18white }}>{tr("submit")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomerSupportScreen;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,

    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding * 0.8,
    marginBottom: Default.fixPadding * 3,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
});
