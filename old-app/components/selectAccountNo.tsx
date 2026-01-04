import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Colors, Fonts, Default } from "../constants/styles";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

interface SelectAccountNoProps {
  accountNoCardClick: () => void;
  name: string;
  no: string;
  selected: boolean;
}

const SelectAccountNo: React.FC<SelectAccountNoProps> = (props) => {
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  return (
    <TouchableOpacity
      onPress={() => props.accountNoCardClick()}
      style={{
        flexDirection: isRtl ? "row-reverse" : "row",
        alignItems: "center",
        paddingVertical: Default.fixPadding * 0.9,
        paddingHorizontal: Default.fixPadding * 1.5,
        marginBottom: Default.fixPadding * 2,
        marginHorizontal: Default.fixPadding * 2,
        borderRadius: 10,
        backgroundColor: Colors.white,
        ...Default.shadow,
      }}
    >
      <View
        style={{
          flex: 1,
          alignItems: isRtl ? "flex-end" : "flex-start",
        }}
      >
        <Text style={{ ...Fonts.Bold16black }}>{props.name}</Text>
        <Text
          style={{
            ...Fonts.SemiBold16black,
            marginTop: Default.fixPadding * 0.6,
          }}
        >
          {props.no}
        </Text>
      </View>

      <Ionicons
        name="checkmark-circle"
        size={22}
        color={props.selected ? Colors.primary : Colors.transparent}
      />
    </TouchableOpacity>
  );
};

export default SelectAccountNo;
