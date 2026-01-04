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
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

interface SuccessDepositModalProps {
  visible: boolean;
  successModalClose: () => void;
  okayClickHandle: () => void;
}

const SuccessDepositModal: React.FC<SuccessDepositModalProps> = (props) => {
  const { t } = useTranslation();

  function tr(key: string) {
    return t(`successDepositModal:${key}`);
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={props.visible}
      onRequestClose={props.successModalClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={props.successModalClose}
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
                  <Ionicons
                    name="checkmark-circle"
                    size={62}
                    color={Colors.green}
                  />
                  <Text
                    style={{
                      ...Fonts.Bold20black,
                      marginTop: Default.fixPadding * 0.6,
                    }}
                  >
                    {tr("success")}
                  </Text>
                  <Text
                    style={{
                      ...Fonts.SemiBold16black,
                      textAlign: "center",
                      marginTop: Default.fixPadding * 2,
                    }}
                  >
                    {tr("congratulation")}
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
                  <Text numberOfLines={1} style={{ ...Fonts.Bold18primary }}>
                    {tr("okay")}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SuccessDepositModal;
