import React, { useState, useCallback } from "react";
import { BackHandler, Image, Platform, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors, Default } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import SnackbarToast from "../../components/snackbarToast";
import { useFocusEffect } from "@react-navigation/native";
import { Tabs } from "expo-router";

export default function _layout() {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`bottomTab:${key}`);
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
  const title1 = isRtl ? tr("account") : tr("home");
  const title2 = isRtl ? tr("home") : tr("account");
  const title3 = isRtl ? tr("loans") : tr("deposit");
  const title4 = isRtl ? tr("deposit") : tr("loans");

  return (
    <>
      <Tabs
        initialRouteName="home/homeScreen"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            justifyContent: "center",
            alignItems: "center",
            padding: Default.fixPadding * 0.5,
            height: 68,
            borderTopWidth: 0,
            backgroundColor: Colors.white,
            paddingTop: Default.fixPadding * 0.4,
            ...Default.shadow,
          },
          tabBarLabelStyle: {
            fontFamily: "Bold",
            fontSize: 15,
          },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: Colors.white,
              }}
            />
          ),
          tabBarInactiveTintColor: Colors.grey,
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ focused }) => {
            if (route.name === "home/homeScreen") {
              return (
                <Ionicons
                  name={"home-outline"}
                  size={20}
                  color={focused ? Colors.primary : Colors.grey}
                />
              );
            } else if (route.name === "deposit/depositScreen") {
              return (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/primaryDeposit.png")
                      : require("../../assets/images/greyDeposit.png")
                  }
                  resizeMode="contain"
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
              );
            } else if (route.name === "loans/loansScreen") {
              return (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/primaryLoans.png")
                      : require("../../assets/images/greyLoans.png")
                  }
                  resizeMode="contain"
                  style={{ height: 24, width: 24 }}
                />
              );
            } else if (route.name === "account/accountScreen") {
              return (
                <Ionicons
                  name={"person-outline"}
                  size={20}
                  color={focused ? Colors.primary : Colors.grey}
                />
              );
            }
          },
        })}
      >
        <Tabs.Screen
          name={isRtl ? "account/accountScreen" : "home/homeScreen"}
          options={{
            title: title1,
          }}
        />
        <Tabs.Screen
          name={isRtl ? "loans/loansScreen" : "deposit/depositScreen"}
          options={{
            title: title3,
          }}
        />

        <Tabs.Screen
          name={isRtl ? "deposit/depositScreen" : "loans/loansScreen"}
          options={{
            title: title4,
          }}
        />
        <Tabs.Screen
          name={isRtl ? "home/homeScreen" : "account/accountScreen"}
          options={{
            title: title2,
          }}
        />
      </Tabs>

      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </>
  );
}
