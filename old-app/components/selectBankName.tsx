import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Colors, Fonts, Default } from "../constants/styles";
import { useTranslation } from "react-i18next";

interface SelectBankNameProps {
  bankNameClickHandler: () => void;
  name: string;
  isFirst?: boolean;
}

const SelectBankName: React.FC<SelectBankNameProps> = (props) => {
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
        onPress={() => props.bankNameClickHandler()}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.5,
          paddingHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.Bold16black }}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectBankName;
