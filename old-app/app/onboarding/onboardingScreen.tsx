import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  FlatList,
  Image,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
} from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { Colors, Default, Fonts, Images } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import SnackbarToast from "../../components/snackbarToast";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";
import { dir } from "@/languages";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  // const isRtl = i18n.dir() == "rtl";
  const isRtl = dir(i18n.language) == "rtl";

  function tr(key: string) {
    return t(`onboardingScreen:${key}`);
  }

  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissVisibleToast = () => setVisibleToast(!visibleToast);

  const [exitApp, setExitApp] = useState(0);
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === "android") {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            setVisibleToast(true);
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [exitApp])
  );

  interface OnboardingSlide {
    id: string;
    image: ImageSourcePropType;
    title: string;
    subtitle: string;
  }

  const onboardingSlides: OnboardingSlide[] = [
    {
      id: "1",
      image: Images.onboarding1,
      title: tr("title1"),
      subtitle: tr("description"),
    },
    {
      id: "2",
      image: Images.onboarding2,
      title: tr("title2"),
      subtitle: tr("description"),
    },
    {
      id: "3",
      image: Images.onboarding3,
      title: tr("title3"),
      subtitle: tr("description"),
    },
  ];

  const renderItemSlides = ({ item }: { item: OnboardingSlide }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: width,
        }}
      >
        <View
          style={{
            flex: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={item.image}
            style={{
              resizeMode: "contain",
              width: 294,
              height: 294,
            }}
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.Bold20black }}>{item.title}</Text>
          <Text
            style={{
              ...Fonts.SemiBold14grey,
              textAlign: "center",
              marginTop: Default.fixPadding,
            }}
          >
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const updateCurrentSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != onboardingSlides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const ListFooterComponent = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: Default.fixPadding * 5,
          marginBottom: Default.fixPadding * 1.5,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <TouchableOpacity
          disabled={currentSlideIndex == onboardingSlides.length - 1}
          onPress={() => navigation.push("auth/loginScreen")}
        >
          <Text
            numberOfLines={1}
            style={{
              ...(currentSlideIndex == onboardingSlides.length - 1
                ? Fonts.Bold14transparent
                : Fonts.Bold14grey),
            }}
          >
            {tr("skip")}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dotIndicator,
                currentSlideIndex == index && {
                  width: 36,
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: Colors.primary,
                },
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (currentSlideIndex == onboardingSlides.length - 1) {
              return navigation.push("auth/loginScreen");
            } else {
              goToNextSlide();
            }
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "dotted",
            height: 56,
            width: 56,
            borderRadius: 28,
            borderWidth: 2,
            borderColor: Colors.lightPrimary,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: Colors.primary,
            }}
          >
            <Ionicons
              name={isRtl ? "arrow-back" : "arrow-forward"}
              size={25}
              color={Colors.white}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <FlatList
          ref={ref}
          horizontal
          pagingEnabled
          data={onboardingSlides}
          renderItem={renderItemSlides}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          showsHorizontalScrollIndicator={false}
        />
        <ListFooterComponent />
        <SnackbarToast
          visible={visibleToast}
          title={tr("tapBack")}
          onDismiss={onDismissVisibleToast}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  dotIndicator: {
    marginHorizontal: Default.fixPadding * 0.5,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightGrey,
  },
});
