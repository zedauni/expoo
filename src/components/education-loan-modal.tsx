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

const { width } = Dimensions.get('window');

interface EducationLoanModalProps {
  visible: boolean;
  educationLoanModalClose: () => void;
  okayClickHandle: () => void;
}

const EducationLoanModal: React.FC<EducationLoanModalProps> = ({
  visible,
  educationLoanModalClose,
  okayClickHandle,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={educationLoanModalClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={educationLoanModalClose}
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
                  <Text className="text-lg font-bold text-primary">
                    {t('educationLoanModal.educationLoan')}
                  </Text>
                  <Text className="mt-2.5 text-center text-base font-bold text-black">
                    {t('educationLoanModal.thankYou')}
                  </Text>
                </View>

                <View className="border-t-[0.7px] border-lightGrey" />

                <TouchableOpacity
                  onPress={okayClickHandle}
                  className="items-center justify-center self-center pt-5"
                >
                  <Text className="text-lg font-bold text-primary">
                    {t('educationLoanModal.okay')}
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

export default EducationLoanModal;
