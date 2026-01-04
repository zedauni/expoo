import React from "react";
import { Modal, Text, View, Dimensions, ActivityIndicator } from "react-native";
import { Colors, Default, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = (props) => {
  const { t } = useTranslation();

  function tr(key: string) {
    return t(`loader:${key}`);
  }

  return (
    <Modal animationType="fade" transparent={true} visible={props.visible}>
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
            justifyContent: "center",
            alignItems: "center",
            width: width * 0.8,
            borderRadius: 10,
            height: 150,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <ActivityIndicator color={Colors.primary} size={"large"} />
          <Text
            style={{
              ...Fonts.Bold16primary,
              marginTop: Default.fixPadding * 1.2,
            }}
          >
            {tr("pleaseWait")}
          </Text>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;
