import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import colors from '@/components/ui/colors';

const { width } = Dimensions.get('window');

interface SuccessDepositModalProps {
  visible: boolean;
  successModalClose: () => void;
  okayClickHandle: () => void;
}

const SuccessDepositModal: React.FC<SuccessDepositModalProps> = ({
  visible,
  successModalClose,
  okayClickHandle,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={successModalClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={successModalClose}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center bg-transparentBlack">
          <View
            className="w-[90%] rounded-[10px] bg-white p-5 shadow-md"
            style={{ elevation: 6, width: width * 0.9 }}
          >
            <TouchableWithoutFeedback>
              <View>
                <View className="items-center justify-center pb-5">
                  <Ionicons
                    name="checkmark-circle"
                    size={62}
                    color={colors.green}
                  />
                  <Text className="mt-1.5 text-xl font-bold text-black">
                    {t('successDepositModal.success')}
                  </Text>
                  <Text className="mt-5 text-center text-base font-semibold text-black">
                    {t('successDepositModal.congratulation')}
                  </Text>
                </View>

                <View className="border-t-[0.7px] border-lightGrey" />

                <TouchableOpacity
                  onPress={okayClickHandle}
                  className="items-center justify-center self-center pt-5"
                >
                  <Text
                    numberOfLines={1}
                    className="text-lg font-bold text-primary"
                  >
                    {t('successDepositModal.okay')}
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
