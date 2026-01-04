import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import colors from '@/components/ui/colors';

interface SelectAccountNoProps {
  accountNoCardClick: () => void;
  name: string;
  no: string;
  selected: boolean;
}

const SelectAccountNo: React.FC<SelectAccountNoProps> = ({
  accountNoCardClick,
  name,
  no,
  selected,
}) => {
  return (
    <TouchableOpacity
      onPress={accountNoCardClick}
      className="mx-5 mb-5 flex-row items-center rounded-[10px] bg-white px-4 py-2.5 shadow-md"
      style={{ elevation: 6 }}
    >
      <View className="flex-1 items-start">
        <Text className="text-base font-bold text-black">{name}</Text>
        <Text className="mt-1.5 text-base font-semibold text-black">{no}</Text>
      </View>

      <Ionicons
        name="checkmark-circle"
        size={22}
        color={selected ? colors.primary : colors.transparent}
      />
    </TouchableOpacity>
  );
};

export default SelectAccountNo;
