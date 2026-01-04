import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/styles";

const { width } = Dimensions.get("window");

interface EducationLoanModalProps {
  visible: boolean;
  educationLoanModalClose: () => void;
  okayClickHandle: () => void;
}

const EducationLoanModal: React.FC<EducationLoanModalProps> = (props) => {
  const { t } = useTranslation();

  function tr(key: string) {
    return t(`educationLoanModal:${key}`);
  }
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={props.visible}
      onRequestClose={props.educationLoanModalClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={props.educationLoanModalClose}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.transparentBlack,
          }}
        >
          <View
            style={{
              padding: Default.fixPadding * 2,
              width: width * 0.9,
              borderRadius: 10,
              backgroundColor: Colors.white,
              ...Default.shadow,
            }}
          >
            <TouchableWithoutFeedback>
              <View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: Default.fixPadding * 2,
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.Bold18primary,
                    }}
                  >
                    {tr("educationLoan")}
                  </Text>
                  <Text
                    style={{
                      ...Fonts.Bold16black,
                      textAlign: "center",
                      marginTop: Default.fixPadding,
                    }}
                  >
                    {tr("thankYou")}
                  </Text>
                </View>

                <View
                  style={{ borderColor: Colors.lightGrey, borderWidth: 0.7 }}
                />

                <TouchableOpacity
                  onPress={props.okayClickHandle}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    paddingTop: Default.fixPadding * 2,
                  }}
                >
                  <Text style={{ ...Fonts.Bold18primary }}>{tr("okay")}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default EducationLoanModal;
