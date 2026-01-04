import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, type MarkerPressEvent } from 'react-native-maps';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const NearByScreen = () => {
  const router = useRouter();
  const { title } = useLocalSearchParams();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  function tr(key: string) {
    return t(`nearByScreen.${key}`);
  }

  const _map = useRef<MapView>(null);
  const _scrollView = useRef<any>(null); // Animated.ScrollView doesn't have perfect types exported sometimes
  const regionTimeout = useRef<any>(null);

  const nearByData = [
    {
      key: '1',
      title: 'Star Bank',
      title2: 'Star Bank ATM',
      image: images.mapImage1,
      address: '2464 Royal Ln. Mesa,New  45463',
      min: '20 min',
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
      key: '2',
      title: 'Star Bank',
      title2: 'Star Bank ATM',
      image: images.mapImage2,
      address: '1901  Cir.Shiloh,Hawaii 81063',
      min: '1.4 km',
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
      key: '3',
      title: 'Star Bank',
      title2: 'Star Bank ATM',
      image: images.mapImage3,
      address: '6391 Elgin St. Celina, 10299',
      min: '1.4 km',
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
              ...(title === tr('nearbyBank') ? coordinate : coordinateATM),
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
      extrapolate: 'clamp',
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData: MarkerPressEvent) => {
    const markerID = mapEventData.nativeEvent.id;
    // @ts-ignore
    let x = markerID * CARD_WIDTH + markerID * 2; // Logic from original
    _scrollView.current?.scrollTo({ x: x, y: 0, animated: true });
  };

  const [mapReady, setMapReady] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setMapReady(true);
    }, 800);
  }, []);

  return (
    <View className="bg-regularGrey flex-1">
      <MyStatusBar />
      {mapReady && (
        <View
          className="bg-regularGrey flex-row items-center px-5 py-3 shadow-md"
          style={{
            zIndex: 1,
            flexDirection: isRtl ? 'row-reverse' : 'row',
            elevation: 5,
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
            {title}
          </Text>
        </View>
      )}

      {mapReady && (
        <View className="absolute bottom-0 z-[1]">
          <Animated.ScrollView
            horizontal
            pagingEnabled
            ref={_scrollView}
            scrollEventThrottle={1}
            snapToAlignment="center"
            decelerationRate={'fast'}
            snapToInterval={CARD_WIDTH + 20 * 2.8} // fixPadding * 2.8 approx 28? Original was Default.fixPadding * 2.8
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
              className="px-2.5"
              style={{
                flexDirection: isRtl ? 'row-reverse' : 'row',
                transform: [{ scaleX: isRtl ? -1 : 1 }],
              }}
            >
              {nearByData.map((item) => {
                return (
                  <View
                    key={item.key}
                    className="mx-2.5 mb-[30px] rounded-[10px] bg-white p-2.5 shadow-md"
                    style={{
                      flexDirection: isRtl ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      width: CARD_WIDTH,
                      elevation: 5,
                    }}
                  >
                    <Image
                      source={item.image}
                      style={{
                        resizeMode: 'contain',
                        width: 104,
                        height: 104,
                        borderRadius: 5,
                      }}
                    />

                    <View
                      className="flex-1"
                      style={{
                        alignItems: isRtl ? 'flex-end' : 'flex-start',
                        paddingLeft: isRtl ? 0 : 20,
                        paddingRight: isRtl ? 20 : 0,
                      }}
                    >
                      <Text className="font-nunito text-base font-bold text-black">
                        {title === tr('nearbyBank') ? item.title : item.title2}
                      </Text>
                      <Text
                        numberOfLines={2}
                        className="text-grey my-[3px] overflow-hidden font-nunito text-sm font-semibold"
                        style={{
                          textAlign: isRtl ? 'right' : 'left',
                        }}
                      >
                        {item.address}
                      </Text>
                      <View
                        className="items-center"
                        style={{
                          flexDirection: isRtl ? 'row-reverse' : 'row',
                        }}
                      >
                        <MaterialCommunityIcons
                          name="clock-time-two-outline"
                          size={14}
                          color={colors.black}
                        />
                        <Text className="mx-[5px] max-w-[60px] font-nunito text-sm font-semibold text-black">
                          {item.min}
                        </Text>
                      </View>

                      <Text className="text-primary mt-[3px] font-nunito text-sm font-bold">
                        {tr('direction')}
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
          loadingBackgroundColor={'transparent'}
          loadingIndicatorColor={colors.primary}
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
                  title === tr('nearbyBank')
                    ? marker.coordinate
                    : marker.coordinateATM
                }
                onPress={onMarkerPress}
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.Image
                    resizeMode="contain"
                    source={images.map2}
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
            image={images.map1}
            title={tr('youAreHere')}
          />
        </MapView>
      )}
    </View>
  );
};

export default NearByScreen;

const styles = StyleSheet.create({
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 13,
  },
});
