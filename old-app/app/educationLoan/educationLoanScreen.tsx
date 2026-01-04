import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import DashedLine from "react-native-dashed-line";
import EducationLoanModal from "../../components/educationLoanModal";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const EducationLoanScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`educationLoanScreen:${key}`);
  }

  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [message, setMessage] = useState<string>();

  const [educationLoanModal, setEducationLoanModal] = useState<boolean>(false);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View
        style={{
          zIndex: 1,
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
          {tr("educationLoan")}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <Image
          source={require("../../assets/images/educationImage.png")}
          style={{ resizeMode: "stretch", width: width, height: 190 }}
        />
        <View
          style={{
            position: "absolute",
            maxWidth: isRtl ? null : "60%",
            margin: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.Bold18primary }}>{tr("makeEducation")}</Text>
        </View>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.SemiBold14grey,
            marginTop: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2.5,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("description")}
        </Text>

        <DashedLine
          dashGap={2}
          dashLength={2}
          dashThickness={1.5}
          dashColor={Colors.grey}
        />

        <View
          style={{
            marginTop: Default.fixPadding * 2.5,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold17black,
            }}
          >
            {tr("phoneNumber")}
          </Text>

          <View style={{ ...styles.textInput }}>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="number-pad"
              placeholder={tr("enterNumber")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              numberOfLines={1}
              style={{
                padding: 0,
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                ...Fonts.SemiBold15black,
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.Bold17black,
            }}
          >
            {tr("message")}
          </Text>
          <View style={{ ...styles.textInput }}>
            <TextInput
              value={message}
              multiline={true}
              numberOfLines={7}
              onChangeText={setMessage}
              textAlignVertical="top"
              placeholder={tr("writeMessage")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              style={{
                padding: 0,
                textAlign: isRtl ? "right" : "left",
                height: 113,
                ...Fonts.SemiBold15black,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => setEducationLoanModal(true)}
        style={styles.interestedBtn}
      >
        <Text
          numberOfLines={1}
          style={{ ...Fonts.Bold18white, overflow: "hidden" }}
        >
          {tr("interested")}
        </Text>
      </TouchableOpacity>
      <EducationLoanModal
        visible={educationLoanModal}
        educationLoanModalClose={() => setEducationLoanModal(false)}
        okayClickHandle={() => {
          setEducationLoanModal(false);
          navigation.pop();
        }}
      />
    </View>
  );
};

export default EducationLoanScreen;

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding * 0.8,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  interestedBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
});
