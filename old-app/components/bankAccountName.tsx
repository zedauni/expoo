import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Colors, Fonts, Default } from "../constants/styles";
import { useTranslation } from "react-i18next";

interface BankAccountNameProps {
  isFirst?: boolean;
  bankAccountNameClickHandler: () => void;
  name: string;
}

const BankAccountName: React.FC<BankAccountNameProps> = (props) => {
  const { i18n } = useTranslation();
  const tr = (key: string) => i18n.t(key);

  const isRtl = i18n.dir() == "rtl";

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopColor: props.isFirst ? "transparent" : Colors.lightGrey,
      }}
    >
      <TouchableOpacity
        onPress={() => props.bankAccountNameClickHandler()}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          padding: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.Bold16black }}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankAccountName;
