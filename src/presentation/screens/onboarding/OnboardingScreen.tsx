import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {colors} from '../../../config/colors';
import {RootStackParams} from '../../navigation/StackNavigator';

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
    title: 'Titulo 2',
    desc: 'Anim est quis elit proident magna quis cupidatat curlpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ',
    img: require('../../assets/slide-2.png'),
  },
  {
    title: 'Titulo 3',
    desc: 'Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.',
    img: require('../../assets/slide-3.png'),
  },
];

export const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement} = event.nativeEvent;

    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);

    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };

  const scrollToSlide = (index: number) => {
    if (!flatListRef.current) return;

    flatListRef.current.scrollToIndex({index: index, animated: true});
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
          onPress={() => navigation.navigate('HomeScreen')}
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
