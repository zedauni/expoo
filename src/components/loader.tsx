import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Dimensions, Modal, Text, View } from 'react-native';

import colors from '@/components/ui/colors';

const { width } = Dimensions.get('window');

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  const { t } = useTranslation();

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View className="flex-1 items-center justify-center bg-transparentBlack">
        <View
          className="h-[150px] items-center justify-center rounded-[10px] bg-white shadow-md"
          style={{ width: width * 0.8, elevation: 6 }}
        >
          <ActivityIndicator color={colors.primary} size="large" />
          <Text className="mt-3 text-base font-bold text-primary">
            {t('loader.pleaseWait')}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
