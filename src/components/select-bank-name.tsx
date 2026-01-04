import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SelectBankNameProps {
  bankNameClickHandler: () => void;
  name: string;
  isFirst?: boolean;
}

const SelectBankName: React.FC<SelectBankNameProps> = ({
  bankNameClickHandler,
  name,
  isFirst,
}) => {
  return (
    <View
      className={`border-t ${isFirst ? 'border-transparent' : 'border-lightGrey'}`}
    >
      <TouchableOpacity
        onPress={bankNameClickHandler}
        className="flex-row items-center px-5 py-4"
      >
        <Text className="text-base font-bold text-black">{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectBankName;
