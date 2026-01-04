import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { withTranslation } from "react-i18next";
import { LogBox, StatusBar, AppState } from "react-native";
import { Stack, useSegments } from "expo-router";
import i18n from "../languages/index"; //don't remove this line
import { useEffect } from "react";

LogBox.ignoreAllLogs();

const MainNavigation = () => {
  const segments = useSegments();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", () => {
      StatusBar.setBarStyle("light-content");
    });

    return () => {
      subscription.remove();
    };
  }, [segments]);

  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios_from_right" }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="onboarding/onboardingScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="auth/loginScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="auth/registerScreen" />
      <Stack.Screen name="auth/otpScreen" />
      <Stack.Screen name="auth/pinScreen" />
      <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
      <Stack.Screen name="services/servicesScreen" />
      <Stack.Screen name="latestTransaction/latestTransactionScreen" />
      <Stack.Screen name="notification/notificationScreen" />
      <Stack.Screen name="fundTransfer/fundTransferScreen" />
      <Stack.Screen
        name="successfully/successfullyScreen"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="accountDetail/accountDetailScreen" />
      <Stack.Screen name="statement/statementScreen" />
      <Stack.Screen name="addDeposit/addDepositScreen" />
      <Stack.Screen name="loansStatement/loansStatementScreen" />
      <Stack.Screen name="educationLoan/educationLoanScreen" />
      <Stack.Screen name="editProfile/editProfileScreen" />
      <Stack.Screen name="nearBy/nearByScreen" />
      <Stack.Screen name="changePin/changePinScreen" />
      <Stack.Screen name="language/languageScreen" />
      <Stack.Screen name="termsCondition/termsConditionScreen" />
      <Stack.Screen name="privacyPolicy/privacyPolicyScreen" />
      <Stack.Screen name="customerSupport/customerSupportScreen" />
    </Stack>
  );
};

const ReloadAppOnLanguageChange = withTranslation("translation", {
  bindI18n: "languageChanged",
  bindStore: false,
} as any)(MainNavigation);

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Bold: require("../assets/fonts/NunitoSans-Bold.ttf"),
    SemiBold: require("../assets/fonts/NunitoSans-SemiBold.ttf"),
    Regular: require("../assets/fonts/NunitoSans-Regular.ttf"),
    ExtraBold: require("../assets/fonts/NunitoSans-ExtraBold.ttf"),
    Inter_SemiBold: require("../assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <ReloadAppOnLanguageChange />;
}
