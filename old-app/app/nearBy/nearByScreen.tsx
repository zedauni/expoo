import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker, MarkerPressEvent } from "react-native-maps";
import MyStatusBar from "../../components/myStatusBar";
import { useLocalSearchParams, useNavigation } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;

const NearByScreen = () => {
  const navigation = useNavigation<any>();

  const { title } = useLocalSearchParams();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key: string) {
    return t(`nearByScreen:${key}`);
  }

  const _map = useRef<MapView>(null);
  const _scrollView = useRef<any>(null);
  const regionTimeout = useRef<any>(null);

  const nearByData = [
    {
      key: "1",
      title: "Star Bank",
      title2: "Star Bank ATM",
      image: require("../../assets/images/mapImage1.png"),
      address: "2464 Royal Ln. Mesa,New  45463",
      min: "20 min",
      coordinate: {
        latitude: 22.6293867,
        longitude: 88.4254486,
      },
      coordinateATM: {
        latitude: 22.6393867,
        longitude: 88.4454486,
      },
    },
    {
      key: "2",
      title: "Star Bank",
      title2: "Star Bank ATM",
      image: require("../../assets/images/mapImage2.png"),
      address: "1901  Cir.Shiloh,Hawaii 81063",
      min: "1.4 km",
      coordinate: {
        latitude: 22.6345648,
        longitude: 88.4377279,
      },
      coordinateATM: {
        latitude: 22.6365648,
        longitude: 88.4277279,
      },
    },
    {
      key: "3",
      title: "Star Bank",
      title2: "Star Bank ATM",
      image: require("../../assets/images/mapImage3.png"),
      address: "6391 Elgin St. Celina, 10299",
      min: "1.4 km",
      coordinate: {
        latitude: 22.6281662,
        longitude: 88.4410113,
      },
      coordinateATM: {
        latitude: 22.6481662,
        longitude: 88.4410113,
      },
    },
  ];

  const initialMapData = {
    latitude: 22.62938671242907,
    longitude: 88.4354486029795,
    latitudeDelta: 0.04864195044303443,
    longitudeDelta: 0.040142817690068,
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= nearByData.length) {
        index = nearByData.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout.current);

      regionTimeout.current = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate, coordinateATM } = nearByData[index];
          _map.current?.animateToRegion(
            {
              ...(title === tr("nearbyBank") ? coordinate : coordinateATM),
              latitudeDelta: initialMapData.latitudeDelta,
              longitudeDelta: initialMapData.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = nearByData.map((_, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData: MarkerPressEvent) => {
    const markerID = mapEventData.nativeEvent.id;
    // @ts-ignore
    let x = markerID * CARD_WIDTH + markerID * 2;
    _scrollView.current?.scrollTo({ x: x, y: 0, animated: true });
  };

  const [mapReady, setMapReady] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setMapReady(true);
    }, 800);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      {mapReady && (
        <View
          style={{
            zIndex: 1,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingHorizontal: Default.fixPadding * 2,
            paddingVertical: Default.fixPadding * 1.2,
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
            {title}
          </Text>
        </View>
      )}

      {mapReady && (
        <View style={{ position: "absolute", bottom: 0, zIndex: 1 }}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            ref={_scrollView}
            scrollEventThrottle={1}
            snapToAlignment="center"
            decelerationRate={"fast"}
            snapToInterval={CARD_WIDTH + Default.fixPadding * 2.8}
            showsHorizontalScrollIndicator={false}
            style={{ transform: [{ scaleX: isRtl ? -1 : 1 }] }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginHorizontal: Default.fixPadding,
                transform: [{ scaleX: isRtl ? -1 : 1 }],
              }}
            >
              {nearByData.map((item) => {
                return (
                  <View
                    key={item.key}
                    style={{
                      flexDirection: isRtl ? "row-reverse" : "row",
                      alignItems: "center",
                      padding: Default.fixPadding,
                      marginBottom: Default.fixPadding * 3,
                      marginHorizontal: Default.fixPadding,
                      width: CARD_WIDTH,
                      borderRadius: 10,
                      backgroundColor: Colors.white,
                      ...Default.shadow,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        resizeMode: "contain",
                        width: 104,
                        height: 104,
                        borderRadius: 5,
                      }}
                    />

                    <View
                      style={{
                        flex: 1,
                        alignItems: isRtl ? "flex-end" : "flex-start",
                        paddingLeft: isRtl ? 0 : Default.fixPadding * 2,
                        paddingRight: isRtl ? Default.fixPadding * 2 : 0,
                      }}
                    >
                      <Text style={{ ...Fonts.Bold16black }}>
                        {title === tr("nearbyBank") ? item.title : item.title2}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          ...Fonts.SemiBold14grey,
                          overflow: "hidden",
                          textAlign: isRtl ? "right" : "left",
                          marginVertical: Default.fixPadding * 0.3,
                        }}
                      >
                        {item.address}
                      </Text>
                      <View
                        style={{
                          flexDirection: isRtl ? "row-reverse" : "row",
                          alignItems: "center",
                        }}
                      >
                        <MaterialCommunityIcons
                          name="clock-time-two-outline"
                          size={14}
                          color={Colors.black}
                        />
                        <Text
                          style={{
                            ...Fonts.SemiBold14black,
                            marginHorizontal: Default.fixPadding * 0.5,
                            maxWidth: 60,
                          }}
                        >
                          {item.min}
                        </Text>
                      </View>

                      <Text
                        style={{
                          ...Fonts.Bold14primary,
                          marginTop: Default.fixPadding * 0.3,
                        }}
                      >
                        {tr("direction")}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.ScrollView>
        </View>
      )}

      {mapReady && (
        <MapView
          ref={_map}
          initialRegion={initialMapData}
          style={{ flex: 1 }}
          loadingEnabled={true}
          loadingBackgroundColor={"transparent"}
          loadingIndicatorColor={Colors.primary}
        >
          {nearByData.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            return (
              <Marker
                key={index}
                coordinate={
                  title === tr("nearbyBank")
                    ? marker.coordinate
                    : marker.coordinateATM
                }
                onPress={(e) => onMarkerPress(e)}
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    resizeMode="contain"
                    source={require("../../assets/images/map2.png")}
                    style={[styles.marker, scaleStyle]}
                  />
                </Animated.View>
              </Marker>
            );
          })}

          <Marker
            coordinate={{
              latitude: 22.61938671242907,
              longitude: 88.4354486029795,
            }}
            image={require("../../assets/images/map1.png")}
            title={tr("youAreHere")}
          />
        </MapView>
      )}
    </View>
  );
};

export default NearByScreen;

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  marker: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 13,
  },
});
