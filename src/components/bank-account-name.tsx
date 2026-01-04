import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface BankAccountNameProps {
  isFirst?: boolean;
  bankAccountNameClickHandler: () => void;
  name: string;
}

const BankAccountName: React.FC<BankAccountNameProps> = ({
  isFirst,
  bankAccountNameClickHandler,
  name,
}) => {
  return (
    <View
      className={`border-t ${isFirst ? 'border-transparent' : 'border-lightGrey'}`}
    >
      <TouchableOpacity
        onPress={bankAccountNameClickHandler}
        className="flex-row items-center p-5"
      >
        <Text className="text-base font-bold text-black">{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BankAccountName;
