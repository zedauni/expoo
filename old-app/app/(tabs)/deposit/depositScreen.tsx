import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DashedLine from "react-native-dashed-line";
import MyStatusBar from "../../../components/myStatusBar";
import { useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const DepositScreen = () => {
  const navigation = useNavigation<any>();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`depositScreen:${key}`);
  }

  const currentDepositList = [
    {
      key: "1",
      title: "Deposit for 2 year",
      date: "12 march 2022",
      dollar: "$500.00",
      depositTo: "1234 5678 9101",
      status: tr("pending"),
      rate: "2% rate",
    },
    {
      key: "2",
      title: "Deposit for 3 year",
      date: "14 march 2022",
      dollar: "$900.00",
      depositTo: "1234 5678 9101",
      status: tr("pending"),
      rate: "2% rate",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../../../assets/images/depositImage.png")}
          resizeMode="cover"
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: width,
            height: 80,
            paddingHorizontal: Default.fixPadding * 2,
          }}
        >
          <Text style={{ ...Fonts.ExtraBold20white }}>{tr("deposit")}</Text>
        </ImageBackground>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Default.fixPadding * 8 }}
        >
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold16black,
              marginTop: Default.fixPadding * 2,
              marginBottom: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {tr("currentDeposit")}
          </Text>

          {currentDepositList.map((item) => {
            return (
              <View
                key={item.key}
                style={{
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: Default.fixPadding * 1.4,
                    paddingBottom: Default.fixPadding * 1.8,
                    paddingHorizontal: Default.fixPadding * 1.8,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: isRtl ? "row-reverse" : "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 38,
                        height: 38,
                        borderRadius: 19,
                        backgroundColor: Colors.extraLightGrey,
                      }}
                    >
                      <Image
                        resizeMode="contain"
                        source={require("../../../assets/images/primaryDeposit.png")}
                        style={{
                          width: 22,
                          height: 22,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flex: 1,
                        alignItems: isRtl ? "flex-end" : "flex-start",
                        paddingHorizontal: Default.fixPadding * 1.5,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{ ...Fonts.Bold16black, overflow: "hidden" }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...Fonts.Bold14grey,
                          marginTop: Default.fixPadding * 0.3,
                          overflow: "hidden",
                        }}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </View>

                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Bold18black, maxWidth: 100 }}
                  >
                    {item.dollar}
                  </Text>
                </View>

                <DashedLine
                  dashGap={2}
                  dashLength={2}
                  dashThickness={1.5}
                  dashColor={Colors.primary}
                />

                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: Default.fixPadding,
                    paddingHorizontal: Default.fixPadding * 2,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: isRtl ? "flex-end" : "flex-start",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                    >
                      {tr("depositTo")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold15black,
                        marginTop: Default.fixPadding * 0.5,
                      }}
                    >
                      {item.depositTo}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: Default.fixPadding * 0.2,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                    >
                      {tr("status")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold15red,
                        marginTop: Default.fixPadding * 0.5,
                      }}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: isRtl ? "flex-start" : "flex-end",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                    >
                      {tr("rate")}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        ...Fonts.SemiBold15black,
                        marginTop: Default.fixPadding * 0.5,
                      }}
                    >
                      {item.rate}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}

          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...Fonts.SemiBold16black,
              marginBottom: Default.fixPadding * 1.5,
              marginHorizontal: Default.fixPadding * 2,
            }}
          >
            {tr("completedDeposit")}
          </Text>

          <View
            style={{
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
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: Default.fixPadding * 1.4,
                paddingBottom: Default.fixPadding * 1.8,
                paddingHorizontal: Default.fixPadding * 1.8,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    backgroundColor: Colors.lightGrey,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../../../assets/images/primaryDeposit.png")}
                    style={{
                      width: 22,
                      height: 22,
                    }}
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    alignItems: isRtl ? "flex-end" : "flex-start",
                    paddingHorizontal: Default.fixPadding * 1.5,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ ...Fonts.Bold16black, overflow: "hidden" }}
                  >
                    Deposit for 1 year
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold14grey,
                      marginTop: Default.fixPadding * 0.3,
                      overflow: "hidden",
                    }}
                  >
                    10 march 2021
                  </Text>
                </View>
              </View>

              <Text
                numberOfLines={1}
                style={{ ...Fonts.Bold18black, maxWidth: 100 }}
              >
                $600.00
              </Text>
            </View>

            <DashedLine
              dashGap={2}
              dashLength={2}
              dashThickness={1.5}
              dashColor={Colors.primary}
            />

            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: Default.fixPadding,
                paddingHorizontal: Default.fixPadding * 2,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: isRtl ? "flex-end" : "flex-start",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                >
                  {tr("depositTo")}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold15black,
                    marginTop: Default.fixPadding * 0.3,
                  }}
                >
                  1234 5678 9101
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: Default.fixPadding * 0.2,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                >
                  {tr("status")}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold15green,
                    marginTop: Default.fixPadding * 0.3,
                  }}
                >
                  {tr("completed")}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: isRtl ? "flex-start" : "flex-end",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
                >
                  {tr("rate")}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold15black,
                    marginTop: Default.fixPadding * 0.3,
                  }}
                >
                  2% rate
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => navigation.push("addDeposit/addDepositScreen")}
          style={{
            ...styles.addBtn,
            right: isRtl ? null : Default.fixPadding * 2,
            left: isRtl ? Default.fixPadding * 2 : null,
          }}
        >
          <MaterialIcons name="add" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DepositScreen;

const styles = StyleSheet.create({
  addBtn: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: Default.fixPadding * 2,
    backgroundColor: Colors.primary,
  },
});
