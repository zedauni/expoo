import React, { useEffect } from "react";
import { Text, Image, View } from "react-native";
import { Colors, Fonts, Default } from "../constants/styles";
import MyStatusBar from "../components/myStatusBar";
import { useNavigation } from "expo-router";

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.push("onboarding/onboardingScreen");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.primary,
        }}
      >
        <Image
          source={require("../assets/images/splashIcon.png")}
          style={{ width: 78, height: 78 }}
        />
        <Text
          style={{
            ...Fonts.SemiBold25white,
            marginTop: Default.fixPadding * 0.5,
          }}
        >
          STAR BANK
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
