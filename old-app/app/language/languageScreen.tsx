import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loader from "../../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const LanguageScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`languageScreen:${key}`);
  }

  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage
  );

  async function onChangeLang(lang: string) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem("@APP:languageCode", lang);
    } catch (error) {
      alert("something went wrong");
    }
  }

  const onDisableHandler = i18n.language === selectedLanguage;

  function languageOpt({ name, lang }: { name: string; lang: string }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSelectedLanguage(lang)}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: Default.fixPadding * 2,
          paddingVertical: Default.fixPadding * 1.2,
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
          borderRadius: 10,
          backgroundColor: Colors.white,
          ...Default.shadow,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            textAlign: isRtl ? "right" : "left",
            ...Fonts.SemiBold16black,
          }}
        >
          {name}
        </Text>
        <MaterialCommunityIcons
          name={selectedLanguage === lang ? "record-circle" : "circle-outline"}
          size={28}
          color={selectedLanguage === lang ? Colors.primary : Colors.lightGrey}
        />
      </TouchableOpacity>
    );
  }
  const [updateLoader, setUpdateLoader] = useState<boolean>(false);

  const handleUpdate = () => {
    setUpdateLoader(true);
    setTimeout(() => {
      setUpdateLoader(false);
      onChangeLang(selectedLanguage || "fr");
      navigation.pop();
    }, 1500);
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
          {tr("language")}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: Default.fixPadding * 2,
          }}
        >
          {languageOpt({ name: "Français", lang: "fr" })}
          {languageOpt({ name: "English", lang: "en" })}
        </View>
      </ScrollView>
      <Loader visible={updateLoader} />
      <TouchableOpacity
        onPress={() => {
          if (onDisableHandler) {
            return;
          } else {
            return handleUpdate();
          }
        }}
        style={styles.updateBtn}
      >
        <Text style={Fonts.Bold18white}>{tr("update")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  updateBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
});
