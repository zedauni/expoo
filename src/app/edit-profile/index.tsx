import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomSheet } from 'react-native-btr';

import Loader from '@/components/loader';
import MyStatusBar from '@/components/my-status-bar';
import SnackbarToast from '@/components/snackbar-toast';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const EditProfileScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`editProfileScreen.${key}`);
  }

  const [name, setName] = useState<string>('Leslie Alexander');
  const [email, setEmail] = useState<string>('lesliealexander example .com');
  const [number, setNumber] = useState<string>('1234567890');

  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const toggleCloseUploadImage = () => {
    setUploadImage(!uploadImage);
  };

  const [pickedImage, setPickedImage] = useState<string | null>(null); // Fixed type here
  const [removeImage, setRemoveImage] = useState<boolean>(false);

  const [removeImageToast, setRemoveImageToast] = useState<boolean>(false);
  const onDismissRemoveImage = () => setRemoveImageToast(false);

  const galleryHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corrected const
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      toggleCloseUploadImage();
    }
  };

  const [cameraNotGranted, setCameraNotGranted] = useState<boolean>(false);
  const onDismissCameraNotGranted = () => setCameraNotGranted(false);

  const cameraHandler = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      setCameraNotGranted(true);
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
      toggleCloseUploadImage();
    }
  };

  const [updateLoader, setUpdateLoader] = useState<boolean>(false);

  const handleUpdate = () => {
    setUpdateLoader(true);
    setTimeout(() => {
      setUpdateLoader(false);
      router.back();
    }, 1000);
  };

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      <View
        className="bg-regularGrey flex-row items-center px-5 py-3 shadow-md"
        style={{
          flexDirection: isRtl ? 'row-reverse' : 'row',
          elevation: 6,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name={isRtl ? 'arrow-forward' : 'arrow-back'}
            size={23}
            color={colors.black}
          />
        </TouchableOpacity>
        <Text className="mx-4 font-nunito text-xl font-bold text-black">
          {tr('editProfile')}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="my-8 mt-5 items-center justify-center self-center">
          {!pickedImage ? (
            <View>
              {removeImage ? (
                <View className="bg-lightGrey size-[102px] items-center justify-center rounded-full">
                  <Ionicons name="person" size={45} color={colors.white} />
                </View>
              ) : (
                <Image
                  source={images.profile}
                  className="size-[102px] rounded-full"
                />
              )}
            </View>
          ) : (
            <Image
              className="size-[102px] rounded-full"
              source={{ uri: pickedImage }}
            />
          )}

          <TouchableOpacity
            onPress={() => toggleCloseUploadImage()}
            className="bg-regularGrey absolute bottom-0 size-8 items-center justify-center rounded-full"
            style={{
              left: isRtl ? 0 : undefined,
              right: isRtl ? undefined : 0,
            }}
          >
            <Ionicons name="camera-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        >
          {tr('name')}
        </Text>
        <View className="mx-5 mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={tr('enterName')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="flex-1 p-0 font-nunito text-[15px] font-semibold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          />
        </View>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        >
          {tr('email')}
        </Text>
        <View className="mx-5 mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md">
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder={tr('enterEmail')}
            placeholderTextColor={colors.grey}
            selectionColor={colors.primary}
            numberOfLines={1}
            className="flex-1 p-0 font-nunito text-[15px] font-semibold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          />
        </View>

        <Text
          className="mx-5 font-nunito text-[17px] font-bold text-black"
          style={{ textAlign: isRtl ? 'right' : 'left' }}
        >
          {tr('mobile')}
        </Text>
        <View className="mx-5 mb-5 mt-2 rounded-[10px] bg-white px-4 py-3 shadow-md">
          <TextInput
            value={number}
            onChangeText={setNumber}
            keyboardType={'number-pad'}
            selectionColor={colors.primary}
            placeholder={tr('enterMobile')}
            placeholderTextColor={colors.grey}
            numberOfLines={1}
            className="flex-1 p-0 font-nunito text-[15px] font-semibold text-black"
            style={{ textAlign: isRtl ? 'right' : 'left' }}
          />
        </View>
      </ScrollView>

      <Loader visible={updateLoader} />
      <TouchableOpacity
        onPress={handleUpdate}
        className="bg-primary m-5 items-center justify-center rounded-[10px] p-3 shadow-md"
        style={{ elevation: 5 }}
      >
        <Text className="font-nunito text-lg font-bold text-white">
          {tr('update')}
        </Text>
      </TouchableOpacity>

      <BottomSheet
        visible={uploadImage}
        onBackButtonPress={toggleCloseUploadImage}
        onBackdropPress={toggleCloseUploadImage}
      >
        <View className="rounded-t-[10px] bg-white py-3">
          <Text className="mb-3 text-center font-nunito text-[18px] font-semibold text-black">
            {tr('changeProfile')}
          </Text>
          <View
            className="mx-5 mb-3 flex-row justify-between"
            style={{ flexDirection: isRtl ? 'row-reverse' : 'row' }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={cameraHandler}
              className="flex-1 items-center justify-center"
            >
              <View
                className="size-[50px] items-center justify-center rounded-full bg-white shadow-md"
                style={{ elevation: 3 }}
              >
                <Ionicons name="camera" size={25} color={colors.blue} />
              </View>
              <Text className="my-3 font-nunito text-base font-semibold text-black">
                {tr('camera')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={galleryHandler}
              className="flex-1 items-center justify-center"
            >
              <View
                className="size-[50px] items-center justify-center rounded-full bg-white shadow-md"
                style={{ elevation: 3 }}
              >
                <Ionicons name="image" size={25} color={colors.darkGreen} />
              </View>
              <Text className="my-3 font-nunito text-base font-semibold text-black">
                {tr('gallery')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                toggleCloseUploadImage();
                setRemoveImageToast(!removeImageToast);
                setRemoveImage(true);
                setPickedImage(null);
              }}
              className="flex-1 items-center justify-center"
            >
              <View
                className="size-[50px] items-center justify-center rounded-full bg-white shadow-md"
                style={{ elevation: 3 }}
              >
                <Ionicons name="trash" size={25} color={colors.red} />
              </View>
              <Text className="my-3 font-nunito text-base font-semibold text-black">
                {tr('remove')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SnackbarToast
          visible={cameraNotGranted}
          onDismiss={onDismissCameraNotGranted}
          title={tr('deny')}
        />
      </BottomSheet>

      <SnackbarToast
        visible={removeImageToast}
        onDismiss={onDismissRemoveImage}
        title={tr('removeImage')}
      />
    </View>
  );
};

export default EditProfileScreen;
