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

interface LogoutModalProps {
  visible: boolean;
  logoutModalClose: () => void;
  yesClickHandler: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`logoutModal:${key}`);
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={props.visible}
      onRequestClose={props.logoutModalClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={props.logoutModalClose}
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
                  <Text style={{ ...Fonts.Bold18primary }}>{tr("logout")}</Text>
                  <Text
                    style={{
                      ...Fonts.Bold16black,
                      marginTop: Default.fixPadding,
                    }}
                  >
                    {tr("areYouSure")}
                  </Text>
                </View>
                <View
                  style={{ borderColor: Colors.lightGrey, borderWidth: 0.7 }}
                />
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignSelf: isRtl ? "flex-start" : "flex-end",
                    marginTop: Default.fixPadding,
                  }}
                >
                  <TouchableOpacity
                    onPress={props.logoutModalClose}
                    style={{ marginHorizontal: Default.fixPadding * 4 }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.Bold18grey, maxWidth: 100 }}
                    >
                      {tr("cancel")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={props.yesClickHandler}>
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.Bold18primary, maxWidth: 100 }}
                    >
                      {tr("yes")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default LogoutModal;
