import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MyStatusBar from '@/components/my-status-bar';
import colors from '@/components/ui/colors';
import images from '@/constants/images';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();
  const [exitApp, setExitApp] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === 'android') {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            showMessage({
              message: t('onboardingScreen.tapBack'),
              type: 'info',
              backgroundColor: colors.darkGrey,
            });
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      return () => {
        subscription.remove();
      };
    }, [exitApp, t])
  );

  interface OnboardingSlide {
    id: string;
    image: ImageSourcePropType;
    title: string;
    subtitle: string;
  }

  const onboardingSlides: OnboardingSlide[] = [
    {
      id: '1',
      image: images.onboarding1,
      title: t('onboardingScreen.title1'),
      subtitle: t('onboardingScreen.description'),
    },
    {
      id: '2',
      image: images.onboarding2,
      title: t('onboardingScreen.title2'),
      subtitle: t('onboardingScreen.description'),
    },
    {
      id: '3',
      image: images.onboarding3,
      title: t('onboardingScreen.title3'),
      subtitle: t('onboardingScreen.description'),
    },
  ];

  const renderItemSlides = ({ item }: { item: OnboardingSlide }) => {
    return (
      <View className="flex-1 items-center" style={{ width }}>
        <View className="flex-[8] items-center justify-center">
          <Image
            source={item.image}
            resizeMode="contain"
            className="size-[294px]"
          />
        </View>
        <View className="mx-5 flex-[2] items-center justify-center">
          <Text className="font-inter text-xl font-bold text-black">
            {item.title}
          </Text>
          <Text className="text-grey mt-2.5 text-center font-inter text-sm font-semibold">
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== onboardingSlides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const ListFooterComponent = () => {
    return (
      <View
        className="mx-5 mb-4 mt-12 flex-row items-center justify-between"
        style={{ marginBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          disabled={currentSlideIndex === onboardingSlides.length - 1}
          onPress={() => router.push('/auth/login')}
        >
          <Text
            numberOfLines={1}
            className={`text-sm font-bold ${
              currentSlideIndex === onboardingSlides.length - 1
                ? 'text-transparent'
                : 'text-grey'
            }`}
          >
            {t('onboardingScreen.skip')}
          </Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              className={`mx-1 size-2.5 rounded-full ${
                currentSlideIndex === index
                  ? 'bg-primary h-2 w-9 rounded-[5px]'
                  : 'bg-lightGrey'
              }`}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => {
            if (currentSlideIndex === onboardingSlides.length - 1) {
              router.push('/auth/login');
            } else {
              goToNextSlide();
            }
          }}
          className="border-lightPrimary size-14 items-center justify-center rounded-full border-2 border-dotted"
        >
          <View className="bg-primary size-[46px] items-center justify-center rounded-full">
            <Ionicons name="arrow-forward" size={25} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1">
      <MyStatusBar />
      <View className="flex-1 bg-white">
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
      </View>
    </View>
  );
};

export default OnboardingScreen;
