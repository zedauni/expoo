import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

interface SnackbarToastProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
}

const SnackbarToast = ({ visible, onDismiss, title }: SnackbarToastProps) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      style={styles.snackBarStyle}
      duration={1000}
    >
      <Text className="font-nunito text-sm font-semibold text-white">
        {title}
      </Text>
    </Snackbar>
  );
};

export default SnackbarToast;

const styles = StyleSheet.create({
  snackBarStyle: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    right: -10,
    backgroundColor: '#333333',
    elevation: 0,
  },
});
