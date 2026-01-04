import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loader from "../../components/loader";
import SnackbarToast from "../../components/snackbarToast";
import { BottomSheet } from "react-native-btr";
import * as ImagePicker from "expo-image-picker";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const EditProfileScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`editProfileScreen:${key}`);
  }

  const [name, setName] = useState<string>("Leslie Alexander");
  const [email, setEmail] = useState<string>("lesliealexander example .com");
  const [number, setNumber] = useState<string>("1234567890");

  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const toggleCloseUploadImage = () => {
    setUploadImage(!uploadImage);
  };

  const [pickedImage, setPickedImage] = useState<string | null>();
  const [removeImage, setRemoveImage] = useState<boolean>(false);

  const [removeImageToast, setRemoveImageToast] = useState<boolean>(false);
  const onDismissRemoveImage = () => setRemoveImageToast(false);

  const galleryHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
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
    const result = await ImagePicker.launchCameraAsync();

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
      navigation.pop();
    }, 1000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.2,
          paddingHorizontal: Default.fixPadding * 2,
          backgroundColor: Colors.regularGrey,
          ...Default.shadow,
        }}
      >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={23}
            color={Colors.black}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...Fonts.Bold20black,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("editProfile")}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 4,
          }}
        >
          {!pickedImage ? (
            <View>
              {removeImage ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 102,
                    width: 102,
                    borderRadius: 51,
                    backgroundColor: Colors.lightGrey,
                  }}
                >
                  <Ionicons name="person" size={45} color={Colors.white} />
                </View>
              ) : (
                <Image
                  source={require("../../assets/images/profile.png")}
                  style={{ height: 102, width: 102, borderRadius: 51 }}
                />
              )}
            </View>
          ) : (
            <Image
              style={{
                height: 102,
                width: 102,
                borderRadius: 51,
              }}
              source={{ uri: pickedImage }}
            />
          )}

          <TouchableOpacity
            onPress={() => toggleCloseUploadImage()}
            style={{
              bottom: 0,
              left: isRtl ? 0 : null,
              right: isRtl ? null : 0,
              ...styles.cameraCircle,
            }}
          >
            <Ionicons name="camera-outline" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("name")}
        </Text>
        <View style={styles.textInputCard}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={tr("enterName")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              padding: 0,
              flex: 1,
              ...Fonts.SemiBold15black,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("email")}
        </Text>
        <View style={styles.textInputCard}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder={tr("enterEmail")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            numberOfLines={1}
            style={{
              padding: 0,
              flex: 1,
              ...Fonts.SemiBold15black,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>

        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...Fonts.Bold17black,
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("mobile")}
        </Text>
        <View style={styles.textInputCard}>
          <TextInput
            value={number}
            onChangeText={setNumber}
            keyboardType={"number-pad"}
            selectionColor={Colors.primary}
            placeholder={tr("enterMobile")}
            placeholderTextColor={Colors.grey}
            numberOfLines={1}
            style={{
              padding: 0,
              flex: 1,
              ...Fonts.SemiBold15black,
              textAlign: isRtl ? "right" : "left",
            }}
          />
        </View>
      </ScrollView>

      <Loader visible={updateLoader} />
      <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}>
        <Text style={{ ...Fonts.Bold18white }}>{tr("update")}</Text>
      </TouchableOpacity>

      <BottomSheet
        visible={uploadImage}
        onBackButtonPress={toggleCloseUploadImage}
        onBackdropPress={toggleCloseUploadImage}
      >
        <View style={styles.bottomSheetMain}>
          <Text
            style={{
              ...Fonts.SemiBold18black,
              textAlign: "center",
              marginVertical: Default.fixPadding,
            }}
          >
            {tr("changeProfile")}
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              justifyContent: "space-between",
              marginVertical: Default.fixPadding,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={cameraHandler}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="camera" size={25} color={Colors.blue} />
              </View>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  marginVertical: Default.fixPadding,
                }}
              >
                {tr("camera")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={galleryHandler}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="image" size={25} color={Colors.darkGreen} />
              </View>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  marginVertical: Default.fixPadding,
                }}
              >
                {tr("gallery")}
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
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="trash" size={25} color={Colors.red} />
              </View>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold16black,
                  marginVertical: Default.fixPadding,
                }}
              >
                {tr("remove")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SnackbarToast
          visible={cameraNotGranted}
          onDismiss={onDismissCameraNotGranted}
          title={tr("deny")}
        />
      </BottomSheet>

      <SnackbarToast
        visible={removeImageToast}
        onDismiss={onDismissRemoveImage}
        title={tr("removeImage")}
      />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  bottomSheetMain: {
    paddingVertical: Default.fixPadding,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,
  },
  round: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.white,
  },
  updateBtn: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.2,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadowBtn,
  },
  cameraCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: Colors.regularGrey,
  },
  textInputCard: {
    paddingVertical: Default.fixPadding * 1.2,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding * 0.8,
    marginBottom: Default.fixPadding * 3,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
