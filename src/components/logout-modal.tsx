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

interface LogoutModalProps {
  visible: boolean;
  logoutModalClose: () => void;
  yesClickHandler: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  logoutModalClose,
  yesClickHandler,
}) => {
  const { t, i18n } = useTranslation();
  // We removed RTL support requirement, but sticking to logic if needed.
  // Here just simplifying layout.

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={logoutModalClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={logoutModalClose}
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
                    {t('logoutModal.logout')}
                  </Text>
                  <Text className="mt-2.5 text-base font-bold text-black">
                    {t('logoutModal.areYouSure')}
                  </Text>
                </View>
                <View className="border-t-[0.7px] border-lightGrey" />
                <View className="mt-2.5 flex-row items-center justify-end">
                  <TouchableOpacity
                    onPress={logoutModalClose}
                    className="mx-10"
                  >
                    <Text
                      numberOfLines={1}
                      className="max-w-[100px] text-lg font-bold text-grey"
                    >
                      {t('logoutModal.cancel')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={yesClickHandler}>
                    <Text
                      numberOfLines={1}
                      className="max-w-[100px] text-lg font-bold text-primary"
                    >
                      {t('logoutModal.yes')}
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
