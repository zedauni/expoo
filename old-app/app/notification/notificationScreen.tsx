import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SwipeListView } from "react-native-swipe-list-view";
import SnackbarToast from "../../components/snackbarToast";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MyStatusBar from "../../components/myStatusBar";
import { useNavigation } from "expo-router";

const NotificationScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`notificationScreen:${key}`);
  }

  const [removeNotificationToast, setRemoveNotificationToast] = useState<boolean>(false);
  const onDismiss = () => setRemoveNotificationToast(false);

  const notificationList = [
    {
      key: "1",
      title: "Loan application approved!",
      description: "Your car loan application has been successfully approved",
      status: "Aug 20,2022 at 09:36 AM",
      color: Colors.lightGreen,
      iconName: "check",
    },
    {
      key: "2",
      title: "Loan EMI period expires!",
      description: "Your car loan application has been successfully approved",
      status: "Aug 20,2022 at 09:36 AM",
      color: Colors.yellow,
      iconName: "alert-outline",
    },
    {
      key: "3",
      title: "Loan application was rejected!",
      description: "Your car loan application has been successfully approved",
      status: "Aug 20,2022 at 09:36 AM",
      color: Colors.pink,
      iconName: "close",
    },
    {
      key: "4",
      title: "Loan application approved!",
      description: "Your car loan application has been successfully approved",
      status: "Aug 20,2022 at 09:36 AM",
      color: Colors.lightGreen,
      iconName: "check",
    },
  ];

  const rowTranslateAnimatedValues: { [key: string]: Animated.Value } = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  interface NotificationItem {
    key: string;
    title: string;
    description: string;
    status: string;
    color: string;
    iconName: string;
  }

  const [notification, setNotification] = useState<NotificationItem[]>(
    notificationList.map((NotificationItem, i) => ({
      key: `${i}`,
      title: NotificationItem.title,
      description: NotificationItem.description,
      status: NotificationItem.status,
      color: NotificationItem.color,
      iconName: NotificationItem.iconName,
    }))
  );

  const onSwipeValueChange = (swipeData: { key: string; value: number }) => {
    const { key, value } = swipeData;
    if (
      value < -Dimensions.get("window").width ||
      value > Dimensions.get("window").width
    ) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...notification];
        const prevIndex = notification.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setNotification(newData);
        setRemoveNotificationToast(true);
      });
    }
  };

  const renderItem = (data: { item: NotificationItem }) => {
    return (
      <View style={{ backgroundColor: Colors.regularGrey }}>
        <View
          style={{
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 2,
            marginBottom: Default.fixPadding * 2,
            borderRadius: 10,
            backgroundColor: Colors.white,
            ...Default.shadow,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 22,
                height: 22,
                borderRadius: 11,
                backgroundColor: data.item.color,
              }}
            >
              <MaterialCommunityIcons
                name={data.item.iconName}
                size={15}
                color={Colors.white}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                ...Fonts.Bold16black,
                overflow: "hidden",
                marginHorizontal: Default.fixPadding,
              }}
            >
              {data.item.title}
            </Text>
          </View>

          <Text
            numberOfLines={2}
            style={{
              ...Fonts.Regular15black,
              overflow: "hidden",
              textAlign: isRtl ? "right" : "left",
              paddingVertical: Default.fixPadding,
            }}
          >
            {data.item.description}
          </Text>

          <View style={{ borderWidth: 0.5, borderColor: Colors.lightGrey }} />

          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold12grey,
              overflow: "hidden",
              textAlign: isRtl ? "right" : "left",
              paddingTop: Default.fixPadding,
            }}
          >
            {data.item.status}
          </Text>
        </View>
      </View>
    );
  };

  const renderHiddenItem = () => (
    <View
      style={{
        flex: 1,
        marginBottom: Default.fixPadding * 2,
        backgroundColor: Colors.primary,
      }}
    />
  );
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
          {tr("notification")}
        </Text>
      </View>

      {notification.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="notifications-off-outline"
            size={48}
            color={Colors.grey}
          />
          <Text style={{ ...Fonts.Bold16grey, marginTop: Default.fixPadding }}>
            {tr("noNotification")}
          </Text>
        </View>
      ) : (
        <SwipeListView
          data={notification}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          onSwipeValueChange={onSwipeValueChange}
          rightOpenValue={-Dimensions.get("window").width}
          leftOpenValue={Dimensions.get("window").width}
          useNativeDriver={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
        />
      )}

      <SnackbarToast
        title={tr("remove")}
        visible={removeNotificationToast}
        onDismiss={onDismiss}
      />
    </View>
  );
};

export default NotificationScreen;
