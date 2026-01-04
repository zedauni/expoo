import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loader from "../../components/loader";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const ChangePinScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`changePinScreen:${key}`);
  }

  const [currentPin, setCurrentPin] = useState<string>();
  const [newPin, setNewPin] = useState<string>();
  const [confirmPin, setConfirmPin] = useState<string>();

  const [resetLoaderModal, setResetLoaderModal] = useState<boolean>(false);

  const handleReset = () => {
    setResetLoaderModal(true);
    setTimeout(() => {
      setResetLoaderModal(false);
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
          {tr("changePin")}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={{ margin: Default.fixPadding * 2 }}>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold17black,
            }}
          >
            {tr("currentPin")}
          </Text>

          <View style={{ ...styles.textInput }}>
            <TextInput
              value={currentPin}
              onChangeText={setCurrentPin}
              keyboardType="number-pad"
              placeholder={tr("enterCurrentPin")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              numberOfLines={1}
              style={{
                padding: 0,
                ...Fonts.SemiBold15black,
                textAlign: isRtl ? "right" : "left",
              }}
            />
          </View>

          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold17black,
            }}
          >
            {tr("newPin")}
          </Text>

          <View style={{ ...styles.textInput }}>
            <TextInput
              value={newPin}
              onChangeText={setNewPin}
              keyboardType="number-pad"
              placeholder={tr("enterNewPin")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              numberOfLines={1}
              style={{
                padding: 0,
                ...Fonts.SemiBold15black,
                textAlign: isRtl ? "right" : "left",
              }}
            />
          </View>

          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold17black,
            }}
          >
            {tr("confirmPin")}
          </Text>

          <View style={{ ...styles.textInput }}>
            <TextInput
              value={confirmPin}
              onChangeText={setConfirmPin}
              keyboardType="number-pad"
              placeholder={tr("confirmNewPin")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              numberOfLines={1}
              style={{
                padding: 0,
                ...Fonts.SemiBold15black,
                textAlign: isRtl ? "right" : "left",
              }}
            />
          </View>
        </View>
        <Loader visible={resetLoaderModal} />
        <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
          <Text style={{ ...Fonts.Bold18white }}>{tr("reset")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChangePinScreen;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,

    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding * 0.8,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  resetBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
});
