import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {colors} from '../../../config/colors';
import {RootStackParams} from '../../navigation/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';

interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: 'AIDI',
    desc: 'Bienvenidos',
    img: require('../../assets/slide-1.png'),
  },
  {
    title: 'Acuerdos',
    desc: 'Lorem lorem lorem lorem ',
    img: require('../../assets/slide-2.png'),
  },
];

export const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;

    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);

    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };

  const scrollToSlide = (index: number) => {
    if (!flatListRef.current) return;

    flatListRef.current.scrollToIndex({index: index, animated: true});
  };

  const handleFinish = () => {
    // Navegar a HomeScreen y reemplazar la pantalla de OnboardingScreen
    navigation.reset({
      index: 0,
      routes: [{name: 'HomeScreen'}],
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      {/*    <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      /> */}

      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={item => item.title}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        /* Para que no pueda ir de una página a la otra asi sin más */
        scrollEnabled={false}
        /* Referencia al scroll */
        onScroll={onScroll}
      />

      {currentSlideIndex === items.length - 1 ? (
        <Pressable
          // onPress={() => navigation.navigate('HomeScreen')}
          onPress={handleFinish}
          style={{position: 'absolute', bottom: 60, right: 30, width: 100}}>
          <Text>Finalizar</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => scrollToSlide(currentSlideIndex + 1)}
          style={{position: 'absolute', bottom: 60, right: 30, width: 100}}>
          <Text>Siguiente</Text>
        </Pressable>
      )}
    </View>
  );
};

interface SlideItemProps {
  item: Slide;
}

const SlideItem = ({item}: SlideItemProps) => {
  const {width} = useWindowDimensions();
  const {title, desc, img} = item;

  return (
    <View
      style={{
        flex: 1,
        width: width,
        backgroundColor: colors.background,
        borderRadius: 5,
        padding: 40,
        justifyContent: 'center',
      }}>
      <Image
        source={img}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: 'center',
          alignSelf: 'center',
        }}
      />
      <Text style={{color: colors.primary}}>{title}</Text>
      <Text style={{color: colors.text, marginTop: 20}}>{desc}</Text>
    </View>
  );
};
